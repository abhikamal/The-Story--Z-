import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <h1 style={{ marginBottom: '2rem' }}>Your <span className="text-gradient">Cart</span></h1>
      
      {(!cartItems || cartItems.length === 0) ? (
        <div className="glass-card text-center" style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--surface-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <ShoppingBag size={40} />
          </div>
          <div>
            <h3>Your cart is empty</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Looks like you haven't added anything yet.</p>
          </div>
          <Link to="/catalog" className="btn btn-primary mt-2">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cartItems.map(item => (
              <div key={item.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', background: 'var(--surface-accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '10px' }}>{item.category}</div>
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>Quantity: {item.quantity}</p>
                  <p className="text-gradient" style={{ fontWeight: 600 }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>
          <div className="glass-card" style={{ padding: '2rem', position: 'sticky', top: '100px' }}>
            <h3 className="mb-4">Order Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 600, borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginBottom: '2rem' }}>
              <span>Total</span>
              <span className="text-gradient">₹{getCartTotal().toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Proceed to Checkout <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
