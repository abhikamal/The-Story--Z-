import { useCart } from '../context/CartContext';
import { useStore } from '../context/StoreContext';

const Catalog = () => {
  const { addToCart } = useCart();
  const { inventory } = useStore();

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <h1>Product <span className="text-gradient">Catalog</span></h1>
      <p style={{ color: 'var(--text-secondary)' }}>Browse our premium selection of items.</p>
      
      <div className="grid mt-4" style={{ gridTemplateColumns: 'revert' }}>
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
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
      </div>
    </div>
  );
};

export default Catalog;
