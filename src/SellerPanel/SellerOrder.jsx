import React from 'react';
import TotalOrderCard from '../components/Card/TotalOrderCard';
import StatCard from '../components/Card/StatCard';
import OrderStatCard from '../components/Card/OrderStatCard';
import TotalDelivery from '../components/Card/TotalDelevary';
import '../styles/SellerPanel/sellerOrder.css';

function SellerOrder() {
  return (
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
  );
};

export default SellerOrder;