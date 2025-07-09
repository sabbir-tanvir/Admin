import React from 'react';
import StatCard from '../components/Card/StatCard';
import TopCategoryCard from '../components/Card/TopCatagoryCard';
import SalesCard from '../components/Card/SalesCard';
import OrderStatCard from '../components/Card/OrderStatCard';
import '../styles/SellerPanel/sellerAnalytics.css';

function SellerAnalytics() {
  // Sample data for demonstration
  const monthlyData = [42, 45, 48, 46, 50, 53, 56, 58, 54, 59, 62, 65];
  const weeklyData = [35, 38, 42, 39, 43, 45, 48];

  return (
    <div className="seller-analytics">
                <h2 className="analytics-header">Seller Analytics Dashboard</h2>
                
                {/* Stats Overview Row */}
                <div className="analytics-overview">
                    <StatCard 
                        title="Total Sales"
                        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L22 8.5V15.5L12 22L2 15.5V8.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 22V15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M22 8.5L12 15.5L2 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 15.5L12 8.5L22 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 2V8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>}
                        iconClass="icon-blue"
                        number="$24,875"
                        stats={[
                            { text: 'Up 18% from last month', type: 'positive', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg> }
                        ]}
                        className="analytics-card"
                    />
                    
                    <StatCard 
                        title="Total Revenue"
                        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 1V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>}
                        iconClass="icon-green"
                        number="$18,452"
                        stats={[
                            { text: 'Up 12% from last month', type: 'positive', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg> }
                        ]}
                        className="analytics-card"
                    />
                    
                    <StatCard 
                        title="Total Orders"
                        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>}
                        iconClass="icon-purple"
                        number="324"
                        stats={[
                            { text: 'Up 8% from last month', type: 'positive', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 19V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg> }
                        ]}
                        className="analytics-card"
                    />
                </div>
                
                {/* Charts and Analytics Row */}
                <div className="analytics-charts">
                    <div className="chart-card monthly-performance">
                        <h3>Monthly Performance</h3>
                        <OrderStatCard
                            title="Sales Growth"
                            number="26%"
                            trendText="15% increase since last month"
                            trendType="positive"
                            chartData={monthlyData}
                            chartLineColor="#007BFF"
                            chartFillColor="rgba(0, 123, 255, 0.1)"
                            className="performance-chart"
                        />
                    </div>
                    
                    <div className="chart-card weekly-orders">
                        <h3>Weekly Orders</h3>
                        <OrderStatCard
                            title="Order Trend"
                            number="48"
                            trendText="8 orders more than last week"
                            trendType="positive"
                            chartData={weeklyData}
                            chartLineColor="#28a745"
                            chartFillColor="rgba(40, 167, 69, 0.1)"
                            className="performance-chart"
                        />
                    </div>
                </div>

            </div>
  );
};

export default SellerAnalytics;