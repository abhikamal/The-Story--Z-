import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

const Catalog = () => {
  const { addToCart } = useCart();
  const { inventory, loading } = useStore();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <h1>Product <span className="text-gradient">Catalog</span></h1>
      <p style={{ color: 'var(--text-secondary)' }}>Browse our premium selection of items.</p>
      
      <div className="mt-4">
        {loading ? (
          <div className="flex-center" style={{ height: '300px', flexDirection: 'column', gap: '1rem' }}>
            <div className="spinner"></div>
            <p style={{ color: 'var(--text-secondary)' }}>Loading exclusive collection...</p>
          </div>
        ) : inventory.length === 0 ? (
          <div className="glass-card flex-center" style={{ height: '300px', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>No products found in the catalog.</p>
            <button className="btn btn-secondary" onClick={() => window.location.reload()}>Refresh Page</button>
          </div>
        ) : (
          <div className="product-grid">
            {inventory.map(product => (
            <div key={product.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {product.image ? (
                <div style={{ height: '200px', width: '100%', overflow: 'hidden', borderRadius: 'var(--border-radius-sm)' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <div style={{ height: '200px', background: 'var(--surface-accent)', borderRadius: 'var(--border-radius-sm)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                  {product.category} Image
                </div>
              )}
              <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{product.name}</div>
              <div style={{ color: 'var(--text-secondary)' }}>{product.category}</div>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="text-gradient" style={{ fontWeight: 600, fontSize: '1.25rem' }}>₹{Number(product.price).toFixed(2)}</span>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} onClick={() => handleAddToCart(product)}>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
