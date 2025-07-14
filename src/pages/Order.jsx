import React from 'react';
import OrderDetails from '../components/orderDetails/OrderDetailsTable';
import '../styles/pages/Order.css';
import TotalOrderCard from '../components/Card/TotalOrderCard';
import TotalDelivery from '../components/Card/TotalDelevary';
import OrderStatCard from '../components/Card/OrderStatCard';

function Order() {
    // This would come from your backend API in a real implementation
    const orderData = {
        total: 60,
        newToday: 10
    };

    const deliveryData = {
        total: 30,
        onTheWay: 5,
        stopped: 5
    };

    return (
        <div className="order-dashboard">
            <h2 className="order-page-title">Order Overview</h2>

            <div className="individual-cards-container">
                <div className="card-wrappers">
                    <div className="card-wrapper">
                        <TotalOrderCard orderData={orderData} />
                    </div>
                    <div className="card-wrapper">
                        <TotalDelivery deliveryData={deliveryData} />
                    </div>
                </div>


                <div className="card-wrapper">
                    <OrderStatCard
                        title="Order stats"
                        number={60}
                        trendText="5 orders since last Week"
                        trendType="positive"
                        chartData={[40, 42, 45, 42, 48, 46, 49, 53, 50, 52, 55, 60]}
                    />
                </div>
            </div>

            <div className="order-details-container">
                <OrderDetails />
            </div>
        </div>
    );
}

export default Order;