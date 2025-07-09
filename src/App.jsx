import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';

import './styles/global.css';
import Order from './pages/Order.jsx';
import Seller from './pages/Seller.jsx';
import Marketor from './pages/MarketorPage.jsx';
import SellerID from './components/sellerDetails/SellerId.jsx';
import AllMarketors from './pages/AllMarketor.jsx';
import MarketorProfile from './pages/MarketorProfile.jsx';
import Customer from './pages/Customer.jsx';
import Profile from './pages/Profile.jsx';
import ProductsList from './pages/TotalProduct.jsx';
import ProductUpdate from './components/productDetails/ProductUpdate.jsx';
import AddMarketor from './components/marketorDetails/AddaMarketor.jsx';
import AddEmployee from './components/employDetails/AddEmployee.jsx';
import EmployeeDetails from './components/employDetails/EmployeeDetails.jsx';
import AddSeller from './components/sellerDetails/AddSeller.jsx';
import Employ from './components/sellerDetails/AllSeller.jsx';
import AllCustomer from './components/CustomerDetails/AllCustomer.jsx';
import SellerDashboard from './SellerPanel/sellerDashbord.jsx';
import SellerProduct from './SellerPanel/SellerProduct.jsx';
import SellerOrder from './SellerPanel/SellerOrder.jsx';
import SellerAddaOrder from './SellerPanel/sellerAddaOrder.jsx';
import SellerOrderApprove from './SellerPanel/sellerOrderAprove.jsx';
import SellerAnalytics from './SellerPanel/sellerAnalytics.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes with layout */}
        <Route path="/" element={<Layout userRole="admin" />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="seller" element={<Seller />} />
          <Route path="marketor" element={<Marketor />} />
          <Route path="marketor/all" element={<AllMarketors />} />
          <Route path="customer/user" element={<AllCustomer />} />
          <Route path="seller/user" element={<Employ />} />
          <Route path="seller/user/:id" element={<SellerID />} />
          <Route path="marketor/user/:id" element={<MarketorProfile />} />
          <Route path="customer" element={<Customer />} />
          <Route path="profile" element={<Profile />} />
          <Route path="productlist" element={<ProductsList />} />
          <Route path="product/update/:productId" element={<ProductUpdate />} />
          <Route path="add-marketor" element={<AddMarketor />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employee/:id" element={<EmployeeDetails />} />
          <Route path="seller/add-seller" element={<AddSeller />} />
        </Route>

        {/* Seller routes with layout */}
        <Route path="/seller-panel" element={<Layout userRole="seller" />}>
          <Route index element={<SellerDashboard />} />
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="product" element={<SellerProduct />} />
          <Route path="order" element={<SellerOrder />} />
          <Route path="order/add" element={<SellerAddaOrder />} />
          <Route path="order/approve" element={<SellerOrderApprove />} />
          <Route path="analytics" element={<SellerAnalytics />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;