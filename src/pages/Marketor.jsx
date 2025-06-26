import React from 'react';
import Navbar from '../components/Navbar';
import LeftBar from '../components/Leftbar';
import '../styles/pages/Marketor.css';
import ProductCard from '../components/Card/ProductCard';
import Topmarketor from '../components/marketorDetails/topMarketor';
import MarketorDetails from '../components/marketorDetails/MarketorDetails';

function Marketor() {
    const totalProducts = 156;


    const handleCardClick = (action) => {
        console.log(`${action} clicked!`);
    };

    return (
        <div className="app">
            <Navbar />
            <div className="main-layout">
                <LeftBar />
                <div className="product-page">
                    {/* Product Stats Cards - Only 3 cards */}
                    <div className="product-cards-section">
                        <div className="card-container-3">
                            <ProductCard
                                number={totalProducts}
                                title="Total seller"
                                size="normal"
                                showRedDot={false}
                                onClick={() => handleCardClick('Total Product')}
                            />

                        </div>
                    </div>

                    <div>
                        <top />
                        <div>
                            <Topmarketor />
                        </div>
                    </div>

                    {/* Seller details table  */}
                    <MarketorDetails />
                </div>
            </div>
        </div>
    );
}

export default Marketor;