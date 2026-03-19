import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [itemRequests, setItemRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      const { data: invData, error: invError } = await supabase.from('inventory').select('*');
      if (invError) throw invError;
      setInventory(invData || []);

      const { data: ordData, error: ordError } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (ordError) throw ordError;
      setOrders(ordData || []);

      const { data: cpnData, error: cpnError } = await supabase.from('coupons').select('*');
      if (cpnError) throw cpnError;
      setCoupons(cpnData || []);

      const { data: reqData, error: reqError } = await supabase.from('item_requests').select('*').order('created_at', { ascending: false });
      if (reqError) throw reqError;
      setItemRequests(reqData || []);
    } catch (error) {
      console.error('CRITICAL STORE ERROR:', error.message);
      // Ensure state is at least empty rather than stuck
      setInventory(prev => prev.length ? prev : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  const addProduct = async (product) => {
    const { data, error } = await supabase.from('inventory').insert([product]).select();
    if (error) {
      console.error('Error adding product:', error.message);
      return { success: false, error: error.message };
    }
    setInventory([...inventory, data[0]]);
    return { success: true };
  };
  
  const updateProduct = async (id, updates) => {
    const { error } = await supabase.from('inventory').update(updates).eq('id', id);
    if (error) {
      console.error('Error updating product:', error.message);
      return { success: false, error: error.message };
    }
    setInventory(inventory.map(item => item.id === id ? { ...item, ...updates } : item));
    return { success: true };
  };
  
  const removeProduct = async (id) => {
    const { error } = await supabase.from('inventory').delete().eq('id', id);
    if (error) {
      console.error('Error removing product:', error.message);
      return { success: false, error: error.message };
    }
    setInventory(inventory.filter(item => item.id !== id));
    return { success: true };
  };

  const addOrder = async (order) => {
    const { data, error } = await supabase.from('orders').insert([order]).select();
    if (error) {
      console.error('Error adding order:', error.message);
      return { success: false, error: error.message };
    }
    setOrders([data[0], ...orders]);
    return { success: true };
  };

  const addCoupon = async (code, discountPercent) => {
    const { data, error } = await supabase.from('coupons').insert([{ code: code.toUpperCase(), discount_percent: discountPercent }]).select();
    if (error) {
      console.error('Error adding coupon:', error.message);
      return { success: false, error: error.message };
    }
    setCoupons([...coupons, data[0]]);
    return { success: true };
  };
  
  const removeCoupon = async (code) => {
    const { error } = await supabase.from('coupons').delete().eq('code', code);
    if (error) {
      console.error('Error removing coupon:', error.message);
      return { success: false, error: error.message };
    }
    setCoupons(coupons.filter(c => c.code !== code));
    return { success: true };
  };

  const addItemRequest = async (request) => {
    const { data, error } = await supabase.from('item_requests').insert([request]).select();
    if (error) {
      console.error('Error adding item request:', error.message);
      return { success: false, error: error.message };
    }
    setItemRequests([data[0], ...itemRequests]);
    return { success: true };
  };

  const value = {
    inventory,
    addProduct,
    updateProduct,
    removeProduct,
    orders,
    addOrder,
    coupons,
    addCoupon,
    removeCoupon,
    itemRequests,
    addItemRequest,
    loading,
    refreshStore: fetchStoreData
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
