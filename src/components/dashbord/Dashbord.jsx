import React from 'react';
import ProductCard from '../Card/ProductCard';
import { CustomerIcon, CartIcon, CompanyIcon, MarketingIcon } from '../Card/Icons';
import UserList from '../UserList/UserList';
import GridDisplay from '../Grid/GridDisplay';
import '../../styles/components/Dashboard.css';
import salesImage from '../../assets/img.png';
import SeeMBtn from '../button/SeemoreBtn';
import OrderStatCard from '../Card/OrderStatCard';
import TotalOrderCard from '../Card/TotalOrderCard';

function Dashboard() {
    // Example click handlers for demonstration
    const handleCardClick = (cardName) => {
        console.log(`${cardName} card clicked!`);
        // You can add navigation logic here
    };

    const handleViewAll = (section) => {
        console.log(`View All clicked for ${section}`);
        // Add navigation logic for each section
    };

    // Sample data for Top Customers (exactly 4 people)
    const topCustomers = [
        {
            name: "Jack Jonson",
            contact: "+880***********74",
            orders: 60,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Jack Jonson",
            contact: "+880***********74",
            orders: 60,
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Jack Jonson",
            contact: "+880***********74",
            orders: 60,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Jack Jonson",
            contact: "+880***********74",
            orders: 60,
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    ];

    // Sample data for Top Marketers (exactly 4 people)
    const topMarketers = [
        {
            name: "Sarah Wilson",
            contact: "+880***********45",
            sales: 85,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Mike Chen",
            contact: "+880***********67",
            sales: 72,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Emily Davis",
            contact: "+880***********89",
            sales: 68,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Alex Rodriguez",
            contact: "+880***********12",
            sales: 55,
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
        }
    ];

    // Sample data for Top Selling Products (8 items for 4x2 grid)
    const topProducts = [
        { name: "Smartphone", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop" },
        { name: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=150&h=150&fit=crop" },
        { name: "Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop" },
        { name: "Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop" },
        { name: "Camera", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=150&h=150&fit=crop" },
        { name: "Tablet", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=150&h=150&fit=crop" },
        { name: "Speaker", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=150&h=150&fit=crop" },
        { name: "Gaming Console", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=150&h=150&fit=crop" }
    ];

    // Sample data for Most Popular Companies (8 items for 4x2 grid)
    const topCompanies = [
        { name: "Apple", image: "https://logo.clearbit.com/apple.com" },
        { name: "Microsoft", image: "https://logo.clearbit.com/microsoft.com" },
        { name: "Google", image: "https://logo.clearbit.com/google.com" },
        { name: "Amazon", image: "https://logo.clearbit.com/amazon.com" },
        { name: "Samsung", image: "https://logo.clearbit.com/samsung.com" },
        { name: "Sony", image: "https://logo.clearbit.com/sony.com" },
        { name: "Intel", image: "https://logo.clearbit.com/intel.com" },
        { name: "NVIDIA", image: "https://logo.clearbit.com/nvidia.com" }
    ];
    const orderData = {
        total: 60,
        newToday: 10
    };


    return (
        <div className="dashboard">
            <div className="dashboard-cards">
                            <h2 className="dashboard-title">Dashboard</h2>

                <div className="card-container-5">
                    <TotalOrderCard orderData={orderData} />
                    <TotalOrderCard orderData={orderData} />
                    <TotalOrderCard orderData={orderData} />
                </div>

                <div className="card-container-2">
                    <OrderStatCard
                        title="Sales Overview"
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="45" viewBox="0 0 43 45" fill="none">
                                <path d="M6.6665 0.52002C5.0089 0.52002 3.41919 1.20905 2.24709 2.43554C1.07498 3.66203 0.416504 5.3255 0.416504 7.06002V44.12H35.8332C37.4908 44.12 39.0805 43.431 40.2526 42.2045C41.4247 40.978 42.0832 39.3145 42.0832 37.58V15.78C42.0832 14.0455 41.4247 12.382 40.2526 11.1555C39.0805 9.92905 37.4908 9.24002 35.8332 9.24002H6.6665C6.11397 9.24002 5.58407 9.01034 5.19337 8.60151C4.80266 8.19268 4.58317 7.63819 4.58317 7.06002C4.58317 6.48185 4.80266 5.92736 5.19337 5.51853C5.58407 5.1097 6.11397 4.88002 6.6665 4.88002H37.9165V0.52002H6.6665ZM33.7498 28.86H27.4998V24.5H33.7498V28.86Z" fill="#02A71A" />
                            </svg>
                        }
                        number="$84,500"
                        trendText="$10,500 since last Week"
                        trendType="positive"
                        chartData={[70000, 72000, 75000, 73000, 78000, 76000, 79000, 82000, 80000, 81000, 83000, 84500]}
                        chartLineColor="#02A71A"
                        chartFillColor="rgba(2, 167, 26, 0.1)"
                    />
                    <div>
                        <TotalOrderCard orderData={orderData} />
                        <TotalOrderCard orderData={orderData} />
                    </div>
                </div>
            </div>

            <div className="item-boxs">
                <div className='item-box'>
                    <div className="item-box-header">
                        <h2>Top Selling Product</h2>
                    </div>
                    <div className="item-box-content">
                        <GridDisplay items={topProducts} type="products" />
                    </div>
                    <SeeMBtn
                        text="See More -->"
                        onClick={() => handleViewAll('Top Selling Product')}
                    />
                </div>

                <div className='item-box'>
                    <div className="item-box-header">
                        <h2>Most Popular Company</h2>
                    </div>
                    <div className="item-box-content">
                        <GridDisplay items={topCompanies} type="companies" />
                    </div>
                    <SeeMBtn
                        text="See More -->"
                        onClick={() => handleViewAll('Most Popular Company')}
                    />
                </div>

                <div className='item-box'>
                    <div className="item-box-header">
                        <h2>Top Customers</h2>
                    </div>
                    <div className="item-box-content">
                        <UserList
                            users={topCustomers}
                            title="Top Customers"
                            showContact={true}
                            showOrders={true}
                        />

                    </div>
                    <SeeMBtn
                        text="See More -->"
                        onClick={() => handleViewAll('Top Customers')}
                    />
                </div>

                <div className='item-box'>
                    <div className="item-box-header">
                        <h2>Top Marketers</h2>
                    </div>
                    <div className="item-box-content">
                        <UserList
                            users={topMarketers}
                            title="Top Marketers"
                            showContact={true}
                            showOrders={false}
                        />

                    </div>
                    <SeeMBtn
                        text="See More -->"
                        onClick={() => handleViewAll('Top Marketers')}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;