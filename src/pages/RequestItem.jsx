import { useState } from 'react';
import { Send, Upload, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RequestItem = () => {
  const { addItemRequest } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState({
    itemName: '',
    category: '',
    description: '',
    budget: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image exceeds 2MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setRequest({ ...request, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to submit a request.");
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    const result = await addItemRequest({
      user_email: user.email,
      item_name: request.itemName,
      category: request.category,
      description: request.description,
      budget: request.budget,
      image: request.image,
      status: 'Pending'
    });

    if (result.success) {
      alert("Request submitted successfully! We will get back to you soon.");
      navigate('/');
    } else {
      alert("Failed to submit request. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <div className="animate-fade-in">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Request an <br/><span className="text-gradient">Anime Item</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '450px' }}>
            Looking for a rare figure or a specific model kit? Tell us what you need, and our otakus will find it for you!
          </p>
          
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>How it works</h4>
            <ol style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Submit your request with a reference image</li>
              <li>We check our global suppliers/collectors</li>
              <li>We send you a price quote via email</li>
              <li>You confirm and we ship it to you</li>
            </ol>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="itemName">Item Name</label>
              <input 
                type="text" 
                id="itemName" 
                className="input" 
                placeholder="E.g. Gojo Satoru Limited Edition" 
                value={request.itemName}
                onChange={e => setRequest({...request, itemName: e.target.value})}
                required 
              />
            </div>

            <div className="input-group">
              <label htmlFor="category">Category</label>
              <select 
                id="category" 
                className="input" 
                style={{ appearance: 'none' }} 
                value={request.category}
                onChange={e => setRequest({...request, category: e.target.value})}
                required
              >
                <option value="">Select a category</option>
                <option value="Figures">Figures</option>
                <option value="Models">Models</option>
                <option value="Decor">Decor</option>
                <option value="Apparel">Apparel</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="image">Reference Image (Optional)</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)' }}>
                <input 
                  type="file" 
                  id="image" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  style={{ flex: 1, fontSize: '0.85rem' }}
                />
                {request.image ? (
                  <img src={request.image} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                ) : (
                  <Upload size={20} color="var(--text-secondary)" />
                )}
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="description">Detailed Description</label>
              <textarea 
                id="description" 
                className="textarea" 
                rows="3" 
                placeholder="Scale, brand, condition, or any other details..."
                value={request.description}
                onChange={e => setRequest({...request, description: e.target.value})}
                required
              ></textarea>
            </div>

            <div className="input-group">
              <label htmlFor="budget">Estimated Budget (₹)</label>
              <input 
                type="number" 
                id="budget" 
                className="input" 
                placeholder="e.g. 5000" 
                value={request.budget}
                onChange={e => setRequest({...request, budget: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'} <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestItem;
