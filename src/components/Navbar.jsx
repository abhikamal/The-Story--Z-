import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const { cartItems = [] } = useCart() || {};

  return (
    <nav className="navbar glass">
      <div className="container">
        <Link to="/" className="brand" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
          NEX<span className="text-gradient">US</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
          <Link to="/catalog" className={`nav-link ${isActive('/catalog')}`}>Shop</Link>
          <Link to="/request" className={`nav-link ${isActive('/request')}`}>Request Item</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className={`nav-link ${isActive('/admin')}`} style={{ color: 'var(--accent-primary)' }}>Admin Panel</Link>
          )}
        </div>

        <div className="nav-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }} onClick={() => alert("Search functionality coming soon")} title="Search">
            <Search size={20} />
          </button>
          <Link to="/cart" className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', position: 'relative' }}>
            <ShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'var(--accent-primary)', fontSize: '10px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            )}
          </Link>
          {user ? (
            <button onClick={logout} className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }} title="Logout">
              <LogOut size={20} />
            </button>
          ) : (
            <Link to="/login" className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
              <User size={20} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
