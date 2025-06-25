import React from 'react';
import ProductCard from '../Card/ProductCard';
import { CustomerIcon, CartIcon, CompanyIcon, MarketingIcon } from '../Card/Icons';
import UserList from '../UserList/UserList';
import GridDisplay from '../Grid/GridDisplay';
import '../../styles/components/Dashboard.css';
import salesImage from '../../assets/img.png';
import SeeMBtn from '../button/SeemoreBtn';

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

    return (
        <div className="dashboard">
            <div className="dashboard-cards">
                <div className="card-container card-container-5">
                    <ProductCard
                        number="50"
                        title="Products"
                        size="normal"
                        showRedDot={true}
                        onClick={() => handleCardClick('Products')}
                    />
                    <ProductCard
                        icon={<CustomerIcon />}
                        title="Customer"
                        size="normal"
                        showRedDot={true}
                        onClick={() => handleCardClick('Customer')}
                    />
                    <ProductCard
                        icon={<CartIcon />}
                        title="Orders Summary"
                        size="normal"
                        showRedDot={true}
                        onClick={() => handleCardClick('Orders')}
                    />
                    <ProductCard
                        icon={<CompanyIcon />}
                        title="Company"
                        size="normal"
                        showRedDot={true}
                        onClick={() => handleCardClick('Company')}
                    />
                    <ProductCard
                        icon={<MarketingIcon />}
                        title="Marketers"
                        size="normal"
                        showRedDot={true}
                        onClick={() => handleCardClick('Marketers')}
                    />
                </div>

                <div className="card-container card-container-2">
                    <ProductCard
                        title="Sales Overview"
                        size="large"
                        showRedDot={false}
                        backgroundImage={salesImage}
                        linkText="view details →"
                        onClick={() => handleCardClick('Sales Overview')}
                    />
                    <ProductCard
                        icon={<CompanyIcon />}
                        title="Analytics"
                        size="normal"
                        showRedDot={false}
                        linkText="view report →"
                        onClick={() => handleCardClick('Analytics')}
                    />
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