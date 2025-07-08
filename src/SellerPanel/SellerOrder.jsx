import React from 'react';
import TotalOrderCard from '../components/Card/TotalOrderCard';
import StatCard from '../components/Card/StatCard';
import OrderStatCard from '../components/Card/OrderStatCard';
import Navbar from '../components/Navbar';
import LeftBar from '../components/Leftbar';
import TotalDelivery from '../components/Card/TotalDelevary';
import '../styles/SellerPanel/sellerOrder.css';

function SellerOrder() {
  return (
    <div className="seller-order-page">
      <Navbar />
      <div className="seller-content-container">
        <LeftBar userRole="seller" />
        <div className="seller-order-dashboard">
          <h2 className="seller-order-page-title">Order Overview</h2>
          <div className="seller-order-layout">
            <div className="seller-order-left-column">

                <TotalOrderCard />
                <TotalDelivery />
              </div>
            <div className="seller-order-right-column">

                <OrderStatCard />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrder;