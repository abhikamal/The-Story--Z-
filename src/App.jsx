import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import RequestItem from './pages/RequestItem';
import Admin from './pages/Admin';
import AdminInventory from './pages/AdminInventory';
import CustomerCare from './pages/CustomerCare';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/request" element={<RequestItem />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/support" element={<CustomerCare />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
