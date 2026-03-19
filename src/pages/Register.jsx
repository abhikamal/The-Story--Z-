import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      register(formData.name, formData.email, formData.password);
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  return (
    <div className="container flex-center" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}>
        <div className="text-center mb-4">
          <h2>Create Account</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Join NEXUS for exclusive products</p>
        </div>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" className="input" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input" placeholder="name@example.com" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="input" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="input-group" style={{ marginBottom: 0 }}>
              <label htmlFor="confirmPassword">Confirm</label>
              <input type="password" id="confirmPassword" className="input" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <input type="checkbox" style={{ marginTop: '4px' }} required /> 
              <span>I agree to the <a href="#" style={{ color: 'var(--accent-primary)' }} onClick={(e) => { e.preventDefault(); alert("Opening Terms of Service..."); }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--accent-primary)' }} onClick={(e) => { e.preventDefault(); alert("Opening Privacy Policy..."); }}>Privacy Policy</a></span>
            </label>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Create Account
          </button>
        </form>
        
        <div className="text-center mt-4" style={{ fontSize: '0.95rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>Already have an account? </span>
          <Link to="/login" style={{ fontWeight: '500' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
