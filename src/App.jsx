import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';

import './styles/global.css';
import Order from './pages/Order.jsx';
import Seller from './pages/Seller.jsx';
import Marketor from './pages/Marketor.jsx';
import Employ from './pages/Employ.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/marketor" element={<Marketor />} />
        <Route path="/seller/user" element={<Employ />} />



        {/* Add more routes as needed */}
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;