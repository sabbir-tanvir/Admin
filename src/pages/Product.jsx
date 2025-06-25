import React from 'react';
import Navbar from '../components/Navbar.jsx';
import LeftBar from '../components/Leftbar.jsx';
import ProductCard from '../components/Card/ProductCard.jsx';
import { CustomerIcon, CartIcon, CompanyIcon } from '../components/Card/Icons.jsx';
import '../styles/pages/ProductPage.css';
import ProductDetails from '../components/productDetails/ProductDetails.jsx';

function Product() {
  // Sample data for calculations
  const totalProducts = 156;
  const approvalPending = 23;
  const newProducts = 8;

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
              <ProductCard
                icon={<CustomerIcon />}
                number={approvalPending}
                title="Approval"
                size="normal"
                showRedDot={true}
                onClick={() => handleCardClick('Approval')}
              />
              <ProductCard
                icon={<CompanyIcon />}
                number={newProducts}
                title="New Products"
                size="normal"
                showRedDot={true}
                onClick={() => handleCardClick('New Products')}
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="product-details-section">
            <ProductDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;