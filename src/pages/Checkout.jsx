import { useState } from 'react';
import { CreditCard, Truck, ShieldCheck, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder, coupons } = useStore();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) return <div className="container" style={{ paddingTop: '100px' }}>Loading...</div>;
  if (!user) return null;

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const platformFee = 10;
  const finalTotal = subtotal + tax + platformFee - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const validCoupon = coupons.find(c => c.code === couponCode.toUpperCase());
    if (validCoupon) {
      setDiscount(subtotal * (validCoupon.discount_percent / 100));
      alert(`Coupon applied! ${validCoupon.discount_percent}% off.`);
    } else {
      alert("Invalid coupon code or no coupons generated.");
      setDiscount(0);
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    // Process "payment" and save order
    await addOrder({
      items: cartItems,
      total: finalTotal,
      paymentMethod,
      status: 'Processing',
      shippingAddress: `${shippingData.address}, ${shippingData.city}, ${shippingData.state} ${shippingData.zip}`,
      customerName: `${shippingData.firstName} ${shippingData.lastName}`,
      customerEmail: user.email,
      customerPhone: shippingData.phone
    });
    
    alert(`Payment of ₹${finalTotal.toFixed(2)} via ${paymentMethod} successful! Your order has been placed.`);
    clearCart();
    navigate('/');
  };

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <h1 className="mb-4">Secure <span className="text-gradient">Checkout</span></h1>
      
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
        
        {/* Left Form */}
        <div>
          <div className="glass-card mb-4" style={{ padding: '2rem' }}>
            <h3 className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={20} className="text-gradient" /> Shipping Information
            </h3>
            
            <form>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '-1rem' }}>
                <div className="input-group">
                  <label htmlFor="fName">First Name</label>
                  <input type="text" id="fName" className="input" placeholder="John" value={shippingData.firstName} onChange={e => setShippingData({...shippingData, firstName: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label htmlFor="lName">Last Name</label>
                  <input type="text" id="lName" className="input" placeholder="Doe" value={shippingData.lastName} onChange={e => setShippingData({...shippingData, lastName: e.target.value})} required />
                </div>
              </div>
              
              <div className="input-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" className="input" placeholder="123 Example St" value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} required />
              </div>

              <div className="input-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" className="input" placeholder="+91 XXXXX XXXXX" value={shippingData.phone} onChange={e => setShippingData({...shippingData, phone: e.target.value})} required />
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '-1rem' }}>
                <div className="input-group">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" className="input" placeholder="Metropolis" value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label htmlFor="state">State/Prov</label>
                  <input type="text" id="state" className="input" placeholder="NY" value={shippingData.state} onChange={e => setShippingData({...shippingData, state: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label htmlFor="zip">ZIP</label>
                  <input type="text" id="zip" className="input" placeholder="10001" value={shippingData.zip} onChange={e => setShippingData({...shippingData, zip: e.target.value})} required />
                </div>
              </div>
            </form>
          </div>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="mb-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CreditCard size={20} className="text-gradient" /> Payment Method
            </h3>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div 
                className="glass-card" 
                onClick={() => setPaymentMethod('UPI')}
                style={{ flex: 1, padding: '1rem', textAlign: 'center', cursor: 'pointer', ...(paymentMethod === 'UPI' ? { border: '1px solid var(--accent-primary)', background: 'var(--accent-bg)' } : {}) }}>
                <QrCode size={20} style={{ display: 'block', margin: '0 auto 0.5rem' }} />
                UPI / QR
              </div>
              <div 
                className="glass-card" 
                onClick={() => setPaymentMethod('Credit Card')}
                style={{ flex: 1, padding: '1rem', textAlign: 'center', cursor: 'pointer', ...(paymentMethod === 'Credit Card' ? { border: '1px solid var(--accent-primary)', background: 'var(--accent-bg)' } : {}) }}>
                Credit Card
              </div>
              <div 
                className="glass-card" 
                onClick={() => setPaymentMethod('Net Banking')}
                style={{ flex: 1, padding: '1rem', textAlign: 'center', cursor: 'pointer', ...(paymentMethod === 'Net Banking' ? { border: '1px solid var(--accent-primary)', background: 'var(--accent-bg)' } : {}) }}>
                Net Banking
              </div>
            </div>
            
            {paymentMethod === 'UPI' && (
              <div className="text-center mb-4" style={{ padding: '2rem', background: 'var(--surface-accent)', borderRadius: '8px' }}>
                <QrCode size={120} style={{ margin: '0 auto 1rem', color: 'var(--text-secondary)' }} />
                <p>Scan to pay <strong>₹{finalTotal.toFixed(2)}</strong></p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                  <input type="text" className="input" placeholder="Enter UPI ID (e.g. name@okbank)" style={{ maxWidth: '200px' }} />
                  <button className="btn btn-secondary">Verify</button>
                </div>
              </div>
            )}
            
            {paymentMethod === 'Credit Card' && (
            
            <form>
              <div className="input-group">
                <label htmlFor="cardName">Name on Card</label>
                <input type="text" id="cardName" className="input" placeholder="JOHN DOE" required />
              </div>
              
              <div className="input-group">
                <label htmlFor="cardNum">Card Number</label>
                <input type="text" id="cardNum" className="input" placeholder="0000 0000 0000 0000" required />
              </div>
              
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '-1rem' }}>
                <div className="input-group">
                  <label htmlFor="exp">Expiry (MM/YY)</label>
                  <input type="text" id="exp" className="input" placeholder="12/26" />
                </div>
                <div className="input-group">
                  <label htmlFor="cvv">CVV</label>
                  <input type="text" id="cvv" className="input" placeholder="123" />
                </div>
              </div>
            </form>
            )}
          </div>
        </div>
        
        {/* Right Summary */}
        <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
          <h3 className="mb-2">Order Summary</h3>
          
          <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem', maxHeight: '200px', overflowY: 'auto' }}>
            {cartItems && cartItems.length > 0 ? cartItems.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                <span>{item.name} x{item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            )) : <p>No items in cart.</p>}
          </div>

          <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <input type="text" className="input" placeholder="Discount Code" value={couponCode} onChange={e => setCouponCode(e.target.value)} style={{ flex: 1, padding: '0.5rem' }} />
            <button type="submit" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>Apply</button>
          </form>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--success)' }}>
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Tax (8%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Platform Fee</span>
            <span>₹{platformFee.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 600, borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '2rem' }}>
            <span>Total</span>
            <span className="text-gradient">₹{finalTotal.toFixed(2)}</span>
          </div>
          
          <button onClick={handleCheckout} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
            <ShieldCheck size={20} /> Pay ₹{finalTotal.toFixed(2)}
          </button>
          
          <p className="text-center mt-2" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Your payment is processed securely. We don't save your CVV.
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
