import React from 'react';
import TotalCard from '../components/Card/TotalCard';
import TopCategoryCard from '../components/Card/TopCatagoryCard';
import '../../styles/MarketorPanel/marketorDashbord.css';

function MarketorDashboard() {


    const handleViewAll = (section) => {
        console.log(`View All clicked for ${section}`);
        // Add navigation logic for each section
    };

  const orderIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF7F30"/>
      <path d="M16.5 11H13v3h3.5v1H13v3h-1v-3H9V11h3V8h1v3h3.5v1z" fill="#FF7F30"/>
    </svg>
  );
  const trendIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8L6 12L14 4" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <div className="marketor-dashboard">
      <h2 className="marketor-dashboard-title">Marketor Dashboard</h2>
      
      {/* First row with 3 cards */}
      <div className="marketor-dashboard-content">
        <TotalCard
          title="Total Order"
          icon={orderIcon}
          number="60"
          showTrend={true}
          trendText="10 new today"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Total Order')}
        />
        <TotalCard
          title="Total Revenue"
          icon={orderIcon}
          number="$12,500"
          showTrend={true}
          trendText="5% increase"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Total Revenue')}
        />
        <TotalCard
          title="Total Customers"
          icon={orderIcon}
          number="245"
          showTrend={true}
          trendText="8 new today"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Total Customers')}
        />
      </div>
      
      {/* Second row with the big TopCategoryCard in the middle */}
      <div className="marketor-bottom-content">
        <div className="top-category-card-wrapper">
          <TopCategoryCard />
        </div>
      </div>
    </div>
  );
};

export default MarketorDashboard;