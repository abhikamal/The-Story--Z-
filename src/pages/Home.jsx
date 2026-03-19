import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section section flex-center" style={{ minHeight: '90vh', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid hero-grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem' }}>
            <div className="hero-content animate-fade-in">
              <div className="badge" style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--accent-bg)', color: 'var(--accent-secondary)', borderRadius: 'var(--border-radius-full)', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem', border: '1px solid var(--accent-border)' }}>
                🚀 The Future of E-Commerce
              </div>
              <h1 className="hero-title" style={{ marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                Discover Premium <br />
                <span className="text-gradient">Digital Assets</span>
              </h1>
              <p className="hero-subtitle" style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '500px' }}>
                Explore our curated collection of high-quality products. From advanced electronics to digital tools, find exactly what you need to upgrade your life.
              </p>
              <div className="hero-btns" style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/catalog" className="btn btn-primary">
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link to="/catalog" className="btn btn-secondary">
                  Browse Catalog
                </Link>
              </div>
            </div>
            
            <div className="hero-image glass-card" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', background: 'linear-gradient(145deg, var(--surface-color), var(--surface-accent))', position: 'relative' }}>
              <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'var(--accent-gradient)', filter: 'blur(40px)', position: 'absolute', opacity: 0.3 }}></div>
              <TrendingUp size={64} color="var(--accent-primary)" style={{ zIndex: 1 }} />
              <h3 style={{ zIndex: 1 }}>Featured Collection</h3>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--accent-primary)', filter: 'blur(100px)', opacity: 0.1, zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'var(--accent-secondary)', filter: 'blur(120px)', opacity: 0.1, zIndex: 1 }}></div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'var(--surface-color)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2 style={{ fontSize: '2.5rem' }}>Why Choose <span className="text-gradient">NEXUS</span></h2>
            <p style={{ color: 'var(--text-secondary)' }}>Experience e-commerce like never before</p>
          </div>
          
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--accent-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent-primary)' }}>
                <Shield size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Secure Payments</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Your transactions are protected by industry-leading encryption and security protocols.</p>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--accent-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent-primary)' }}>
                <Star size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Premium Quality</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Every product in our catalog is rigorously verified for quality and authenticity.</p>
            </div>
            
            <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <div style={{ width: '60px', height: '60px', background: 'var(--accent-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent-primary)' }}>
                <TrendingUp size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Fast Delivery</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Get instant access to digital products and expedited shipping for physical goods.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
