import React from 'react';
import Navbar from '../components/Navbar';
import LeftBar from '../components/Leftbar';
import OrderDetails from '../components/orderDetails/OrderDetails';
import '../styles/pages/Order.css';

function Order() {
    return (
        <div className="order-page">
            <Navbar />
            <div className="order-main-content">
                <LeftBar />
                <div className="order-content">
                    <h2 className="order-page-title">Order Overview</h2>
                    <OrderDetails />
                </div>
            </div>
        </div>
    );
}

export default Order;