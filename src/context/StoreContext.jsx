import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

const INITIAL_PRODUCTS = [
  { id: '1', name: 'Gojo Satoru 1/7 Scale Figure', price: 14999, stock: 10, category: 'Figures', image: 'https://placehold.co/300x400/2a2a35/9ece6a?text=Gojo+Figure' },
  { id: '2', name: 'Demon Slayer Katana Replica', price: 4500, stock: 25, category: 'Decor', image: 'https://placehold.co/300x400/2a2a35/f7768e?text=Katana' },
  { id: '3', name: 'Neon Genesis Evangelion Poster', price: 899, stock: 100, category: 'Decor', image: 'https://placehold.co/300x400/2a2a35/7aa2f7?text=Eva+Poster' },
  { id: '4', name: 'Gundam RX-78-2 Master Grade Model', price: 6500, stock: 15, category: 'Models', image: 'https://placehold.co/300x400/2a2a35/e0af68?text=Gundam+Model' },
  { id: '5', name: 'Akatsuki Cloak Premium Edition', price: 3499, stock: 50, category: 'Apparel', image: 'https://placehold.co/300x400/2a2a35/bb9af7?text=Akatsuki+Cloak' },
  { id: '6', name: 'Studio Ghibli Music Box', price: 2999, stock: 20, category: 'Decor', image: 'https://placehold.co/300x400/2a2a35/7dcfff?text=Music+Box' },
];

export const StoreProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const storedInv = localStorage.getItem('nexus_inventory');
    if (storedInv) {
      const parsed = JSON.parse(storedInv);
      if (parsed.length > 0 && parsed[0].image === undefined) {
        setInventory(INITIAL_PRODUCTS);
      } else {
        setInventory(parsed);
      }
    } else {
      setInventory(INITIAL_PRODUCTS);
    }

    const storedOrders = localStorage.getItem('nexus_orders');
    if (storedOrders) setOrders(JSON.parse(storedOrders));

    const storedCoupons = localStorage.getItem('nexus_coupons');
    if (storedCoupons) setCoupons(JSON.parse(storedCoupons));
  }, []);

  useEffect(() => {
    if (inventory.length > 0) localStorage.setItem('nexus_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('nexus_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nexus_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const addProduct = (product) => setInventory([...inventory, { id: Date.now().toString(), ...product }]);
  
  const updateProduct = (id, updates) => {
    setInventory(inventory.map(item => item.id === id ? { ...item, ...updates } : item));
  };
  
  const removeProduct = (id) => setInventory(inventory.filter(item => item.id !== id));

  const addOrder = (order) => setOrders([{ id: Date.now().toString(), date: new Date().toISOString(), ...order }, ...orders]);

  const addCoupon = (code, discountPercent) => setCoupons([...coupons, { code: code.toUpperCase(), discountPercent }]);
  
  const removeCoupon = (code) => setCoupons(coupons.filter(c => c.code !== code));

  const value = {
    inventory,
    addProduct,
    updateProduct,
    removeProduct,
    orders,
    addOrder,
    coupons,
    addCoupon,
    removeCoupon
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
