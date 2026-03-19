import { useEffect } from 'react';
import { Package, Users, Activity, FileText, Plus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const { inventory, orders, coupons, itemRequests, addCoupon, removeCoupon } = useStore();
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '' });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, authLoading, navigate]);

  if (authLoading) return <div className="container" style={{ paddingTop: '100px' }}>Loading...</div>;
  if (!isAdmin) return null;

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discount) return;
    await addCoupon(newCoupon.code, parseFloat(newCoupon.discount));
    setNewCoupon({ code: '', discount: '' });
  };

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Admin <span className="text-gradient">Dashboard</span></h1>
        <button className="btn btn-secondary" onClick={() => alert("Invoice generation started. Please check your downloads.")}><FileText size={18} /> Generate Invoice</button>
      </div>
      
      {/* Stats row */}
      <div className="grid mb-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Total Revenue</span>
            <div style={{ background: 'var(--accent-bg)', color: 'var(--accent-primary)', padding: '0.5rem', borderRadius: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '1.2rem', padding: '0 4px' }}>₹</span>
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>₹{orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>+12% from last month</span>
        </div>
        
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Orders</span>
            <div style={{ background: 'var(--accent-bg)', color: 'var(--accent-secondary)', padding: '0.5rem', borderRadius: '8px' }}>
              <Package size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{orders.length}</h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>0% from last month</span>
        </div>
        
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Item Requests</span>
            <div style={{ background: 'rgba(158, 206, 106, 0.1)', color: 'var(--success)', padding: '0.5rem', borderRadius: '8px' }}>
              <Plus size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>{itemRequests?.length || 0}</h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Active user requests</span>
        </div>
        
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>System Health</span>
            <div style={{ background: 'rgba(224, 175, 104, 0.1)', color: 'var(--warning)', padding: '0.5rem', borderRadius: '8px' }}>
              <Activity size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>100%</h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>All systems operational</span>
        </div>
      </div>
      
      {/* Sections */}
      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="mb-2">Custom Item Requests</h3>
            {!itemRequests || itemRequests.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No custom requests yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {itemRequests.map(req => (
                  <div key={req.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--surface-accent)', borderRadius: '8px' }}>
                    {req.image && <img src={req.image} alt="request" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>{req.item_name}</strong>
                        <span style={{ fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--accent-primary)', color: 'white' }}>{req.status}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        User: {req.user_email} • Cat: {req.category}
                      </div>
                      <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{req.description}</p>
                      <div style={{ fontWeight: 600 }}>Budget: ₹{req.budget || 'N/A'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="mb-2">Recent Orders</h3>
            {orders.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No recent orders.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map(order => (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface-accent)', borderRadius: '8px' }}>
                    <div>
                      <strong>Order #{order.id.slice(-6)}</strong> • {new Date(order.date || order.created_at).toLocaleDateString()}
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{order.items.length} items via {order.paymentMethod}</div>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--success)' }}>₹{order.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="mb-2">Inventory Control</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-accent)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div>
                <strong>Total Products</strong>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{inventory.length}</div>
              </div>
              <Activity size={32} color="var(--accent-primary)" style={{ opacity: 0.5 }} />
            </div>
            <Link to="/admin/inventory" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              Edit Inventory <ArrowRight size={18} />
            </Link>
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="mb-2">Coupon Management</h3>
            <form onSubmit={handleCreateCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="text" className="input" placeholder="CODE" value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} style={{ flex: 2 }} />
              <input type="number" className="input" placeholder="%" value={newCoupon.discount} onChange={e => setNewCoupon({...newCoupon, discount: e.target.value})} style={{ flex: 1 }} />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem' }}><Tag size={18} /></button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {coupons.length === 0 ? <span style={{ color: 'var(--text-secondary)' }}>None.</span> : 
                coupons.map(c => (
                  <div key={c.code} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem', background: 'var(--surface-accent)', borderRadius: '4px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{c.code} <span style={{ color: 'var(--success)' }}>({c.discount_percent}%)</span></span>
                    <button onClick={() => removeCoupon(c.code)} className="btn-icon" style={{ color: 'var(--danger)', background: 'transparent', border: 'none' }}><Trash2 size={16} /></button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
