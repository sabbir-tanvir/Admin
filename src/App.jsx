import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';

import './styles/global.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/Order.jsx';
import Seller from './pages/Seller.jsx';
import Marketor from './pages/MarketorPage.jsx';
import SellerID from './components/sellerDetails/SellerId.jsx';
import AllMarketors from './components/marketorDetails/AllMarketor.jsx';
import MarketorProfile from './components/marketorDetails/MarketorProfile.jsx';
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
import CustomerProfile from './components/CustomerDetails/CustomerProfile.jsx';
import SellerDashboard from './SellerPanel/sellerDashbord.jsx';
import SellerProduct from './SellerPanel/SellerProduct.jsx';
import SellerOrder from './SellerPanel/SellerOrder.jsx';
import SellerAddaOrder from './SellerPanel/sellerAddaOrder.jsx';
import SellerOrderApprove from './SellerPanel/sellerOrderAprove.jsx';
import SellerAnalytics from './SellerPanel/sellerAnalytics.jsx';
import MarketorDashboard from './MarketorPanel/marketorDashbord.jsx';
import MarketorProduct from './MarketorPanel/marketorProduct.jsx';
import MarketorOrder from './MarketorPanel/marketorOrder.jsx';
import MProductStatus from './MarketorPanel/MProductStatus.jsx';
import MOrdersStatus from './MarketorPanel/mOrdersStatus.jsx';
import AllSuppliers from './MarketorPanel/allSuplier.jsx';
import SupplierProfile from './MarketorPanel/supplierProfile.jsx';
import OrderIdPage from './MarketorPanel/OrderIdPage.jsx';
import MarketorProductAdd from './MarketorPanel/mAddProduct.jsx';
import AdminAnalytics from './pages/AdminAnalytics.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import OrderDetails from './components/OrderTable/OrderDetails.jsx';
import PaymentHistory from './components/OrderTable/PaymentHistory.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import MarketerProfile from './pages/MarketerProfile.jsx';

// Business Settings Components
import BusinessSettings from './pages/BusinessSettings.jsx';
import OrderSettings from './pages/OrderSettings.jsx';
import RefundSettings from './pages/RefundSettings.jsx';
import SellerSettings from './pages/SellerSettings.jsx';
import DeliverySettings from './pages/DeliverySettings.jsx';
import CustomerSettingsSection from './components/BusinessSettings/CustomerSettingsSection.jsx';
import PrioritySetupSection from './components/BusinessSettings/PrioritySetupSection.jsx';
import LanguageSettingsSection from './components/BusinessSettings/LanguageSettingsSection.jsx';
import LandingPageSettingsSection from './components/BusinessSettings/LandingPageSettingsSection.jsx';
import WebsocketSettingsSection from './components/BusinessSettings/WebsocketSettingsSection.jsx';
import AutomatedMessageSection from './components/BusinessSettings/AutomatedMessageSection.jsx';
import DistrubStatementSection from './components/BusinessSettings/DistrubStatementSection.jsx';
import Login from './Authentication/Login.jsx';

// Authentication Components

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth */}
          <Route path="/login" element={<Login />} />

          {/* Owner (formerly Admin) Protected Routes */}
          <Route element={<ProtectedRoute roles={["owner"]} />}>
            <Route path="/" element={<Layout userRole="owner" />}>
              <Route index element={<Home />} />
              <Route path="dashboard" element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="order" element={<Order />} />
              <Route path="order/:orderId" element={<ErrorBoundary><OrderDetails /></ErrorBoundary>} />
              <Route path="order/:orderId/payments" element={<ErrorBoundary><PaymentHistory /></ErrorBoundary>} />
              <Route path="seller" element={<Seller />} />
              <Route path="marketor" element={<Marketor />} />
              <Route path="marketor/all" element={<AllMarketors />} />
              <Route path="customer/user" element={<AllCustomer />} />
              <Route path="customer/user/:id" element={<CustomerProfile />} />
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
              <Route path="admin-analytics" element={<AdminAnalytics />} />
              <Route path="business-settings" element={<BusinessSettings />}>
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
            </Route>
          </Route>

          {/* Seller Protected Routes */}
          <Route element={<ProtectedRoute roles={["seller"]} />}>
            <Route path="/seller-panel" element={<Layout userRole="seller" />}>
              <Route index element={<SellerDashboard />} />
              <Route path="dashboard" element={<SellerDashboard />} />
              <Route path="product" element={<SellerProduct />} />
              <Route path="order" element={<SellerOrder />} />
              <Route path="order/add" element={<SellerAddaOrder />} />
              <Route path="order/approve" element={<SellerOrderApprove />} />
              <Route path="analytics" element={<SellerAnalytics />} />
            </Route>
          </Route>

            {/* Marketor (Marketer) Protected Routes */}
          <Route element={<ProtectedRoute roles={["marketer"]} />}>
            <Route path="/marketor-panel" element={<Layout userRole="marketer" />}>
              <Route index element={<MarketorDashboard />} />
              <Route path="dashboard" element={<MarketorDashboard />} />
              <Route path="product" element={<MarketorProduct />} />
              <Route path="order" element={<MarketorOrder />} />
              <Route path="product-status" element={<MProductStatus />} />
              <Route path="order-status" element={<MOrdersStatus />} />
              <Route path="supplier" element={<AllSuppliers />} />
              <Route path="supplier/:id" element={<SupplierProfile />} />
              <Route path="order/:orderId" element={<OrderIdPage />} />
              <Route path="product/add" element={<MarketorProductAdd />} />
              <Route path="profile" element={<MarketerProfile />} />
            </Route>
          </Route>
          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} newestOnTop pauseOnHover theme="colored" />
      </Router>
    </AuthProvider>
  );
}

export default App;