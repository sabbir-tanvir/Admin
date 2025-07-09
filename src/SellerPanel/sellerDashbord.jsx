import React from 'react';
import Layout from '../components/Layout';
import OrderStatCard from '../components/Card/OrderStatCard';
import TotalOrderCard from '../components/Card/TotalOrderCard';
import TotalDelivery from '../components/Card/TotalDelevary';
import TopCategoryCard from '../components/Card/TopCatagoryCard';
import '../styles/SellerPanel/sellerDashbord.css';

function SellerDashboard() {
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
        <Layout userRole="seller">
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
                    
                    <div className="card-wrappers chart-row">
                        <div className="card-wrapper top-category-wrapper">
                            <TopCategoryCard />
                        </div>
                        <div className="card-wrapper order-stats-wrapper">
                            <OrderStatCard
                                title="Order stats"
                                number={60}
                                trendText="5 orders since last Week"
                                    trendType="positive"
                                    chartData={[40, 42, 45, 42, 48, 46, 49, 53, 50, 52, 55, 60]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        </Layout>
    );
}


export default SellerDashboard;