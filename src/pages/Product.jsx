import React from 'react';
import ProductCard from '../components/Card/ProductCard.jsx';
import { CustomerIcon, CartIcon, CompanyIcon } from '../components/Card/Icons.jsx';
import '../styles/pages/ProductPage.css';
import ProductDetails from '../components/productDetails/ProductDetails.jsx';
 import TotalCard from '../components/Card/TotalCard.jsx';
import TopCategoryCard from '../components/Card/TopCatagoryCard.jsx';

function Product() {
  // Sample data for calculations
  const totalProducts = 156;
  const approvalPending = 23;
  const newProducts = 8;

  const handleCardClick = (action) => {
    console.log(`${action} clicked!`);
  };
  const handleViewAll = (section) => {
    console.log(`View All clicked for ${section}`);
    // Add navigation logic for each section
  };

  const productIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
      <path d="M24.5643 60.1358C29.686 62.825 32.2468 64.1667 35.0002 64.1667V35L7.69433 20.6296L7.57766 20.825C5.8335 23.7825 5.8335 27.4662 5.8335 34.8308V35.1721C5.8335 42.5337 5.8335 46.2175 7.57475 49.175C9.31891 52.1354 12.4572 53.7833 18.731 57.0762L24.5643 60.1358Z" fill="#C58700" />
      <path opacity="0.7" d="M51.2664 12.9266L45.4331 9.86415C40.3143 7.1779 37.7535 5.83331 35.0002 5.83331C32.2439 5.83331 29.686 7.17498 24.5643 9.86415L18.731 12.9266C12.5943 16.1466 9.456 17.7916 7.69434 20.6266L35.0002 35L62.306 20.6296C60.5385 17.7916 57.406 16.1466 51.2664 12.9266Z" fill="#C58700" />
      <path opacity="0.5" d="M62.4254 20.825L62.3058 20.6296L35 35V64.1667C37.7533 64.1667 40.3142 62.825 45.4358 60.1358L51.2692 57.0733C57.5429 53.7804 60.6812 52.1354 62.4254 49.175C64.1667 46.2175 64.1667 42.5337 64.1667 35.175V34.8337C64.1667 27.4692 64.1667 23.7825 62.4254 20.825Z" fill="#C58700" />
      <path d="M18.4421 13.0783L18.7338 12.9267L23.0884 10.64L49.63 25.2379L61.3696 19.3725C61.7682 19.8236 62.1202 20.3078 62.4254 20.825C62.8629 21.5658 63.1896 22.3533 63.4346 23.2313L51.7709 29.0617V37.9167C51.7709 38.4968 51.5404 39.0532 51.1302 39.4635C50.7199 39.8737 50.1635 40.1042 49.5834 40.1042C49.0032 40.1042 48.4468 39.8737 48.0366 39.4635C47.6263 39.0532 47.3959 38.4968 47.3959 37.9167V31.2492L37.1875 36.3533V63.8867C36.4731 64.0719 35.7381 64.166 35 64.1667C34.2767 64.1667 33.5621 64.0733 32.8125 63.8867V36.3533L6.56836 23.2283C6.81336 22.3533 7.14003 21.5658 7.57753 20.825C7.88086 20.3078 8.2328 19.8236 8.63336 19.3725L35 32.5558L44.8788 27.6179L18.4421 13.0783Z" fill="#C58700" />
    </svg>
  );

  return (
    <div className="product-page">
      {/* Product Stats Cards - 2+1 layout */}
      <div className="product-cards-section">
        <div className="card-container-split">
          <div className="left-cards">
            <TotalCard
              title="Total Products"
              icon={productIcon}
              number="5000"
                  showTrend={false}
                  onSeeMoreClick={() => window.location.href = "/productlist"}
                />
                <TotalCard
                  title="Approval Pending"
                  icon={productIcon}
                  number="5000"
                  showTrend={false}
                  onSeeMoreClick={() => window.location.href = "/productlist"}
                />
              </div>
              
              <div className="right-card">
                <TopCategoryCard />
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="product-details-section">
            <ProductDetails />
          </div>
    </div>
  );
}

export default Product;