import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Plus, Trash2, Edit2, Package, ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminInventory = () => {
  const { inventory, addProduct, removeProduct, updateProduct } = useStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Single Add form
  const [newItem, setNewItem] = useState({ name: '', stock: '', price: '', image: '', category: 'Figures' });
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        alert("Image exceeds 2MB limitation. Please select a smaller file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.stock || !newItem.price) return;
    await addProduct({ 
      name: newItem.name, 
      stock: parseInt(newItem.stock), 
      price: parseFloat(newItem.price), 
      image: newItem.image,
      category: newItem.category 
    });
    setNewItem({ name: '', stock: '', price: '', image: '', category: 'Figures' });
    setIsAdding(false);
  };

  const handleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredInventory.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredInventory.map(item => item.id));
    }
  };

  const handleBulkRemove = async () => {
    if (confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      for (const id of selectedItems) {
        await removeProduct(id);
      }
      setSelectedItems([]);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const saveEdit = async () => {
    await updateProduct(editingId, {
      name: editForm.name,
      stock: parseInt(editForm.stock),
      price: parseFloat(editForm.price),
      image: editForm.image,
      category: editForm.category
    });
    setEditingId(null);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', minHeight: '80vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link to="/admin" className="btn-icon" style={{ background: 'var(--surface-accent)', color: 'var(--text-primary)' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ margin: 0 }}>Inventory <span className="text-gradient">Management</span></h1>
      </div>

      <div className="glass-card mb-4" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
          <div className="input" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 2, padding: '0.5rem 1rem' }}>
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', width: '100%' }}
            />
          </div>
          <select className="input" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ flex: 1 }}>
            <option value="All">All Categories</option>
            <option value="Figures">Figures</option>
            <option value="Models">Models</option>
            <option value="Decor">Decor</option>
            <option value="Apparel">Apparel</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {selectedItems.length > 0 && (
            <button className="btn btn-secondary" onClick={handleBulkRemove} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}>
              <Trash2 size={16} /> Delete Selected ({selectedItems.length})
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add New Item
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="glass-card mb-4 animate-fade-in" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-primary)' }}>
          <h3 className="mb-2">Add New Product</h3>
          <form onSubmit={handleAddItem} style={{ display: 'grid', gridTemplateColumns: 'revert', gap: '1rem' }}>
            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '1rem' }}>
              <input type="text" className="input" placeholder="Product Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
              <input type="number" className="input" placeholder="Price (₹)" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
              <input type="number" className="input" placeholder="Stock Qty" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: e.target.value})} />
              <select className="input" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                <option value="Figures">Figures</option>
                <option value="Models">Models</option>
                <option value="Decor">Decor</option>
                <option value="Apparel">Apparel</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Upload Product Image (Max 2MB)</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--surface-color)', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={e => handleImageUpload(e, (base64) => setNewItem({...newItem, image: base64}))} 
                  style={{ flex: 1, color: 'var(--text-secondary)' }}
                />
                {newItem.image && <img src={newItem.image} alt="Preview" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', background: 'var(--surface-accent)' }} />}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Product</button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--surface-accent)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem', width: '40px' }}>
                <input type="checkbox" onChange={handleSelectAll} checked={selectedItems.length === filteredInventory.length && filteredInventory.length > 0} />
              </th>
              <th style={{ padding: '1rem' }}>Product Details</th>
              <th style={{ padding: '1rem' }}>Category</th>
              <th style={{ padding: '1rem' }}>Price (₹)</th>
              <th style={{ padding: '1rem' }}>Stock</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <Package size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                  <p>No products found matching your criteria.</p>
                </td>
              </tr>
            ) : (
              filteredInventory.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem' }}>
                    <input type="checkbox" checked={selectedItems.includes(item.id)} onChange={() => handleSelect(item.id)} />
                  </td>
                  
                  {editingId === item.id ? (
                    <>
                      <td style={{ padding: '0.5rem 1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <input type="text" className="input" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} style={{ padding: '0.5rem' }} placeholder="Name" />
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={e => handleImageUpload(e, (base64) => setEditForm({...editForm, image: base64}))} 
                              style={{ maxWidth: '160px', fontSize: '11px', color: 'var(--text-secondary)' }} 
                            />
                            {editForm.image && <img src={editForm.image} alt="Preview" style={{ width: '24px', height: '24px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.5rem 1rem' }}>
                        <select className="input" value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} style={{ padding: '0.5rem' }}>
                          <option value="Figures">Figures</option>
                          <option value="Models">Models</option>
                          <option value="Decor">Decor</option>
                          <option value="Apparel">Apparel</option>
                          <option value="Other">Other</option>
                        </select>
                      </td>
                      <td style={{ padding: '0.5rem 1rem' }}>
                        <input type="number" className="input" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} style={{ padding: '0.5rem', width: '100px' }} />
                      </td>
                      <td style={{ padding: '0.5rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button onClick={() => setEditForm({...editForm, stock: Math.max(0, editForm.stock - 1)})} style={{ background: 'var(--surface-accent)', border: 'none', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                          <input type="number" className="input" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: parseInt(e.target.value) || 0})} style={{ padding: '0.5rem', width: '80px', textAlign: 'center' }} />
                          <button onClick={() => setEditForm({...editForm, stock: editForm.stock + 1})} style={{ background: 'var(--surface-accent)', border: 'none', color: 'var(--text-primary)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                        </div>
                      </td>
                      <td style={{ padding: '0.5rem 1rem', textAlign: 'right' }}>
                        <button onClick={saveEdit} className="btn-icon" style={{ background: 'rgba(158, 206, 106, 0.1)', color: 'var(--success)', border: 'none', marginRight: '0.5rem' }}>
                          <Save size={18} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="btn-icon" style={{ background: 'var(--surface-accent)', color: 'var(--text-secondary)', border: 'none' }}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        {item.image ? (
                          <img src={item.image} alt="product" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', background: 'var(--surface-color)' }} />
                        ) : (
                          <div style={{ width: '40px', height: '40px', borderRadius: '4px', background: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Package size={20} color="var(--text-secondary)" />
                          </div>
                        )}
                        {item.name}
                      </td>
                      <td style={{ padding: '1rem' }}><span style={{ fontSize: '0.85rem', background: 'var(--accent-bg)', color: 'var(--text-secondary)', padding: '4px 8px', borderRadius: '4px' }}>{item.category}</span></td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>₹{Number(item.price).toFixed(2)}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ 
                          color: item.stock === 0 ? 'var(--danger)' : item.stock < 5 ? 'var(--warning)' : 'var(--success)',
                          fontWeight: 500
                        }}>
                          {item.stock} in stock
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <button onClick={() => startEdit(item)} className="btn-icon" style={{ background: 'transparent', color: 'var(--accent-primary)', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => removeProduct(item.id)} className="btn-icon" style={{ background: 'transparent', color: 'var(--danger)', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInventory;
