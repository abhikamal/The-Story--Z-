import { useState } from 'react';
import { Package, Users, Activity, FileText, Plus, Trash2, Tag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

const Admin = () => {
  const { inventory, orders, coupons, addCoupon, removeCoupon } = useStore();
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '' });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discount) return;
    addCoupon(newCoupon.code, parseFloat(newCoupon.discount));
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
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Active Users</span>
            <div style={{ background: 'rgba(158, 206, 106, 0.1)', color: 'var(--success)', padding: '0.5rem', borderRadius: '8px' }}>
              <Users size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', margin: 0 }}>0</h2>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>0% from last month</span>
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
            <h3 className="mb-2">Recent Orders</h3>
            {orders.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No recent orders.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {orders.map(order => (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--surface-accent)', borderRadius: '8px' }}>
                    <div>
                      <strong>Order #{order.id.slice(-6)}</strong> • {new Date(order.date).toLocaleDateString()}
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{order.items.length} items via {order.paymentMethod}</div>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--success)' }}>₹{order.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="mb-2">Coupon Management</h3>
            <form onSubmit={handleCreateCoupon} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input type="text" className="input" placeholder="CODE (e.g. DIWALI)" value={newCoupon.code} onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})} style={{ flex: 2 }} />
              <input type="number" className="input" placeholder="Discount %" value={newCoupon.discount} onChange={e => setNewCoupon({...newCoupon, discount: e.target.value})} style={{ flex: 1 }} />
              <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><Tag size={18} /> Add</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {coupons.length === 0 ? <span style={{ color: 'var(--text-secondary)' }}>No active coupons.</span> : 
                coupons.map(c => (
                  <div key={c.code} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem', background: 'var(--surface-accent)', borderRadius: '4px' }}>
                    <span style={{ fontWeight: 'bold' }}>{c.code} <span style={{ fontWeight: 'normal', color: 'var(--success)' }}>({c.discountPercent}%)</span></span>
                    <button onClick={() => removeCoupon(c.code)} className="btn-icon" style={{ color: 'var(--danger)', background: 'transparent', border: 'none' }}><Trash2 size={16} /></button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 className="mb-2">Full Inventory Management</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Access the dedicated inventory module to add multiple items, adjust stock levels, perform bulk actions, and search through categories.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-accent)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <div>
                <strong>Total Products</strong>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{inventory.length}</div>
              </div>
              <Activity size={32} color="var(--accent-primary)" style={{ opacity: 0.5 }} />
            </div>
            <Link to="/admin/inventory" className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              Manage Full Inventory <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
