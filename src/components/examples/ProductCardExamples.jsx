import React from 'react';
import ProductCard from '../Card/ProductCard';
import { CustomerIcon, CartIcon, CompanyIcon, MarketingIcon, AnalyticsIcon } from '../Card/Icons';
import '../../styles/components/Dashboard.css';

/**
 * ProductCard Examples - Demonstrates various configurations
 * This component showcases different ways to use the reusable ProductCard
 */
function ProductCardExamples() {
  const handleCardClick = (cardName, data) => {
    alert(`${cardName} clicked! Data: ${JSON.stringify(data)}`);
  };

  return (
    <div className="dashboard">
      <h1>ProductCard Component Examples</h1>
      
      {/* Section 1: Basic Cards with Numbers */}
      <section>
        <h2>Basic Cards with Numbers</h2>
        <div className="card-container card-container-5">
          <ProductCard
            number="150"
            title="Total Products"
            onClick={() => handleCardClick('Products', { count: 150 })}
          />
          <ProductCard
            number="89"
            title="Active Orders"
            showRedDot={true}
            onClick={() => handleCardClick('Orders', { count: 89 })}
          />
          <ProductCard
            number="24"
            title="New Reviews"
            showRedDot={false}
            linkText="read reviews →"
          />
          <ProductCard
            number="--"
            title="Coming Soon"
            disabled={true}
            showRedDot={false}
            linkText="stay tuned"
          />
          <ProductCard
            number="100%"
            title="System Health"
            showRedDot={false}
            customColor="#e8f5e8"
          />
        </div>
      </section>

      {/* Section 2: Icon Cards */}
      <section>
        <h2>Cards with Icons</h2>
        <div className="card-container card-container-5">
          <ProductCard
            icon={<CustomerIcon />}
            title="Customer Management"
            showRedDot={true}
            onClick={() => handleCardClick('Customers')}
          />
          <ProductCard
            icon={<CartIcon />}
            title="Order Processing"
            showRedDot={true}
            linkText="process orders →"
          />
          <ProductCard
            icon={<CompanyIcon />}
            title="Company Profile"
            showRedDot={false}
            linkText="edit profile →"
          />
          <ProductCard
            icon={<MarketingIcon />}
            title="Marketing Tools"
            showRedDot={true}
            customColor="#fff3e0"
          />
          <ProductCard
            icon={<AnalyticsIcon />}
            title="Analytics"
            showRedDot={false}
            linkText="view insights →"
          />
        </div>
      </section>

      {/* Section 3: Mixed Layout */}
      <section>
        <h2>Large and Normal Cards</h2>
        <div className="card-container card-container-2">
          <ProductCard
            title="Sales Dashboard"
            size="large"
            hideCircle={true}
            showRedDot={false}
            linkText="open dashboard →"
            customColor="#f8f9fa"
            onClick={() => handleCardClick('Sales Dashboard')}
          />
          <ProductCard
            icon={<AnalyticsIcon />}
            title="Quick Stats"
            size="normal"
            showRedDot={true}
            linkText="view all →"
          />
        </div>
      </section>

      {/* Section 4: Custom Styled Cards */}
      <section>
        <h2>Custom Styled Cards</h2>
        <div className="card-container card-container-5">
          <ProductCard
            number="$12.5K"
            title="Revenue"
            customColor="#e3f2fd"
            linkText="revenue report →"
            className="revenue-card"
          />
          <ProductCard
            number="99.9%"
            title="Uptime"
            customColor="#e8f5e8"
            showRedDot={false}
            linkText="status page →"
          />
          <ProductCard
            icon={<MarketingIcon />}
            title="Campaigns"
            customColor="#fff3e0"
            showRedDot={true}
            linkText="manage campaigns →"
          />
          <ProductCard
            number="5★"
            title="Rating"
            customColor="#fce4ec"
            showRedDot={false}
            linkText="view reviews →"
          />
          <ProductCard
            number="24/7"
            title="Support"
            customColor="#f3e5f5"
            showRedDot={false}
            linkText="contact support →"
          />
        </div>
      </section>

      {/* Section 5: Different States */}
      <section>
        <h2>Different Card States</h2>
        <div className="card-container card-container-5">
          <ProductCard
            number="Active"
            title="Normal State"
            showRedDot={true}
          />
          <ProductCard
            number="Hover"
            title="Hover Effect"
            showRedDot={false}
            linkText="try hovering →"
          />
          <ProductCard
            number="--"
            title="Disabled State"
            disabled={true}
            showRedDot={false}
            linkText="unavailable"
          />
          <ProductCard
            icon={<CustomerIcon />}
            title="With Notification"
            showRedDot={true}
            linkText="check notifications →"
          />
          <ProductCard
            number="New"
            title="Custom Link Text"
            showRedDot={false}
            linkText="explore feature →"
          />
        </div>
      </section>
    </div>
  );
}

export default ProductCardExamples;
