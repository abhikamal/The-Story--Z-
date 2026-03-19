import { useState } from 'react';
import { Send } from 'lucide-react';

const RequestItem = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Request submitted successfully! We will get back to you soon.");
    e.target.reset();
  };

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div className="animate-fade-in">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Request an <br/><span className="text-gradient">Item</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '450px' }}>
            Can't find what you're looking for? Let us know, and we'll source it for you through our global network of premium suppliers.
          </p>
          
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>How it works</h4>
            <ol style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Submit your request with details</li>
              <li>Our team searches our network</li>
              <li>We email you a custom quote within 24 hours</li>
              <li>You approve and we fulfill the order</li>
            </ol>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="itemName">Item Name</label>
              <input type="text" id="itemName" className="input" placeholder="E.g. Vintage Camera Model X" required />
            </div>

            <div className="input-group">
              <label htmlFor="category">Category</label>
              <select id="category" className="input" style={{ appearance: 'none' }} required>
                <option value="">Select a category</option>
                <option value="electronics">Electronics</option>
                <option value="digital">Digital Assets</option>
                <option value="apparel">Apparel</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="description">Detailed Description</label>
              <textarea id="description" className="textarea" rows="4" placeholder="Any specific requirements, condition, version, etc." required></textarea>
            </div>

            <div className="input-group">
              <label htmlFor="budget">Estimated Budget (Optional)</label>
              <input type="text" id="budget" className="input" placeholder="$0.00" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Submit Request <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
