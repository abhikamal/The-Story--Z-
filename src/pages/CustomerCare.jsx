import { useState } from 'react';
import { MessageSquare, Phone, Mail, HelpCircle } from 'lucide-react';

const CustomerCare = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="text-center mb-4 animate-fade-in">
        <h1 style={{ fontSize: '3rem' }}>How can we <span className="text-gradient">help you?</span></h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>We're here to assist you with any questions or issues.</p>
      </div>
      
      <div className="grid mb-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
        <div className="glass-card text-center hover-scale" style={{ padding: '2rem' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--accent-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--accent-primary)' }}>
            <MessageSquare size={32} />
          </div>
          <h3>Live Chat</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Chat with our support team in real-time. Available 24/7.</p>
          <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => alert('Live chat initiated. An agent will be with you shortly.')}>Start Chat</button>
        </div>
        
        <div className="glass-card text-center hover-scale" style={{ padding: '2rem' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--accent-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--accent-primary)' }}>
            <Phone size={32} />
          </div>
          <h3>Phone Support</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Call us directly for urgent assistance regarding your orders.</p>
          <a href="tel:+1234567890" className="btn btn-primary" style={{ width: '100%', display: 'inline-block' }}>1-800-123-4567</a>
        </div>
        
        <div className="glass-card text-center hover-scale" style={{ padding: '2rem' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--accent-bg)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--accent-primary)' }}>
            <Mail size={32} />
          </div>
          <h3>Email Us</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Send us an email and we'll get back to you within 24 hours.</p>
          <a href="mailto:support@nexus.com" className="btn btn-secondary" style={{ width: '100%', display: 'inline-block' }}>support@nexus.com</a>
        </div>
      </div>
      
      <div className="glass-card" style={{ padding: '3rem 2rem', marginTop: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <HelpCircle size={32} className="text-gradient" />
          <h2 style={{ margin: 0 }}>Frequently Asked Questions</h2>
        </div>
        
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>How long does shipping take?</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Standard shipping takes 3-5 business days. Expedited shipping is available at checkout for 1-2 day delivery.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>What is your return policy?</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We offer a 30-day money-back guarantee on all our products. Digital assets are non-refundable once downloaded.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>How do I track my order?</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Once your order ships, you will receive a tracking number via email. You can also track in your account dashboard.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>Do you ship internationally?</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Yes, we ship to over 50 countries worldwide. International shipping rates and times vary by location.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
