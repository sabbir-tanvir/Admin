import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';

import './styles/global.css';
import Order from './pages/Order.jsx';
import Seller from './pages/Seller.jsx';
import Marketor from './pages/MarketorPage.jsx';
import Employ from './pages/Employ.jsx';
import SellerID from './components/sellerDetails/SellerId.jsx';
import AllMarketors from './pages/AllMarketor.jsx';
import MarketorProfile from './pages/MarketorProfile.jsx';
import Customer from './pages/Customer.jsx';
import Profile from './pages/Profile.jsx';
import ProductsList from './pages/TotalProduct.jsx';
import ProductUpdate from './components/productDetails/ProductUpdate.jsx';
import AdminAnalytics from './pages/AdminAnalytics.jsx';
import ProductInfo from './components/productDetails/ProductInfo.jsx';
import BusinessSettings from './pages/BusinessSettings';
import OrderSettings from './pages/OrderSettings';
import RefundSettings from './pages/RefundSettings';
import SellerSettings from './pages/SellerSettings';
import DeliverySettings from './pages/DeliverySettings';
import OrderDetails from './components/OrderTable/OrderDetails';
import PaymentHistory from './components/OrderTable/PaymentHistory';
import ErrorBoundary from './components/OrderTable/ErrorBoundary';
import CustomerSettingsSection from './components/BusinessSettings/CustomerSettingsSection';
import LanguageSettingsSection from './components/BusinessSettings/LanguageSettingsSection';
import LandingPageSettingsSection from './components/BusinessSettings/LandingPageSettingsSection';
import WebsocketSettingsSection from './components/BusinessSettings/WebsocketSettingsSection';
import AutomatedMessageSection from './components/BusinessSettings/AutomatedMessageSection';
import DistrubStatementSection from './components/BusinessSettings/DistrubStatementSection';
import PrioritySetupSection from './components/BusinessSettings/PrioritySetupSection';

// Authentication imports
import Login from './pages/Authentication/Login.jsx';
import Signup from './pages/Authentication/Signup.jsx';
import LoginChoice from './pages/Authentication/LoginChoice.jsx';
import SignupChoice from './pages/Authentication/SignupChoice.jsx';
import ForgotPassword from './pages/Authentication/ForgotPassword.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={<LoginChoice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-select" element={<SignupChoice />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:orderId" element={
          <ErrorBoundary>
            <OrderDetails />
          </ErrorBoundary>
        } />
        <Route path="/order/:orderId/payments" element={
          <ErrorBoundary>
            <PaymentHistory />
          </ErrorBoundary>
        } />
        <Route path="/seller" element={<Seller />} />
        <Route path="/marketor" element={<Marketor />} />
        <Route path="/marketor/all" element={<AllMarketors />} />
        <Route path="/business-settings" element={<BusinessSettings />}>
          <Route path="order-settings" element={<OrderSettings />} />
          <Route path="refund" element={<RefundSettings />} />
          <Route path="seller" element={<SellerSettings />} />
          <Route path="delivery" element={<DeliverySettings />} />
          <Route path="customers" element={<CustomerSettingsSection />} />
          <Route path="priority-setup" element={<PrioritySetupSection />} />
          <Route path="language" element={<LanguageSettingsSection />} />
          <Route path="landing-page" element={<LandingPageSettingsSection />} />
          <Route path="websocket" element={<WebsocketSettingsSection />} />
          <Route path="automated-message" element={<AutomatedMessageSection />} />
          <Route path="disturb-statement" element={<DistrubStatementSection />} />
        </Route>

        <Route path="/seller/user" element={<Employ />} />
        <Route path="/seller/user/:id" element={<SellerID />} />
        <Route path="/marketor/user/:id" element={<MarketorProfile />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/productlist" element={<ProductsList />} />
        <Route path="/product/update/:productId" element={<ProductUpdate />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
        <Route path="/product/info/:productId" element={<ProductInfo />} />

        {/* Add more routes as needed */}
        {/* Example: <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;