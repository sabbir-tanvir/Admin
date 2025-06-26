import React from 'react';
import Navbar from '../components/Navbar.jsx';
import LeftBar from '../components/Leftbar.jsx';
import ProductCard from '../components/Card/ProductCard.jsx';
import { CustomerIcon, CartIcon, CompanyIcon } from '../components/Card/Icons.jsx';
import '../styles/pages/ProductPage.css';
import SellerDetails from '../components/sellerDetails/SellerDetails.jsx';

function Product() {
  // Sample data for calculations
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
                title="Total Product"
                size="normal"
                showRedDot={false}
                onClick={() => handleCardClick('Total Product')}
              />
              
            </div>
          </div>

          <div>
            <h1>Top Seller</h1>
            <div>

            </div>
          </div>

        {/* Seller details table  */}
        <SellerDetails />
        </div>
      </div>
    </div>
  );
}

export default Product;