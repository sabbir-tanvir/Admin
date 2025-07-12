import React from 'react';
import { useNavigate } from 'react-router-dom';
import TotalCard from '../components/Card/TotalCard';
import TopCategoryCard from '../components/Card/TopCatagoryCard';
import '../styles/MarketorPanel/marketorDashbord.css';

function MarketorDashboard() {
  const navigate = useNavigate();

  const handleViewAll = (section) => {
    console.log(`View All clicked for ${section}`);
    // Navigation logic for each section
    if (section === 'Total Order') {
      navigate('/marketor-panel/order-status');
    }
  };

  const orderIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none">
      <path d="M24.5648 60.1358C29.6865 62.825 32.2473 64.1667 35.0006 64.1667V35L7.69482 20.6296L7.57815 20.825C5.83398 23.7825 5.83398 27.4662 5.83398 34.8308V35.1721C5.83398 42.5337 5.83398 46.2175 7.57523 49.175C9.3194 52.1354 12.4577 53.7833 18.7315 57.0762L24.5648 60.1358Z" fill="#C58700" />
      <path opacity="0.7" d="M51.2654 12.9267L45.4321 9.86418C40.3134 7.17793 37.7525 5.83334 34.9992 5.83334C32.2429 5.83334 29.685 7.17501 24.5634 9.86418L18.73 12.9267C12.5934 16.1467 9.45503 17.7917 7.69336 20.6267L34.9992 35L62.305 20.6296C60.5375 17.7917 57.405 16.1467 51.2654 12.9267Z" fill="#C58700" />
      <path opacity="0.5" d="M62.4254 20.825L62.3058 20.6296L35 35V64.1667C37.7533 64.1667 40.3142 62.825 45.4358 60.1358L51.2692 57.0733C57.5429 53.7804 60.6812 52.1354 62.4254 49.175C64.1667 46.2175 64.1667 42.5337 64.1667 35.175V34.8337C64.1667 27.4692 64.1667 23.7825 62.4254 20.825Z" fill="#C58700" />
      <path d="M18.4421 13.0783L18.7338 12.9267L23.0884 10.64L49.63 25.2379L61.3696 19.3725C61.7682 19.8236 62.1202 20.3078 62.4254 20.825C62.8629 21.5658 63.1896 22.3533 63.4346 23.2313L51.7709 29.0617V37.9167C51.7709 38.4968 51.5404 39.0532 51.1302 39.4635C50.7199 39.8737 50.1635 40.1042 49.5834 40.1042C49.0032 40.1042 48.4468 39.8737 48.0366 39.4635C47.6263 39.0532 47.3959 38.4968 47.3959 37.9167V31.2492L37.1875 36.3533V63.8867C36.4731 64.0719 35.7381 64.166 35 64.1667C34.2767 64.1667 33.5621 64.0733 32.8125 63.8867V36.3533L6.56836 23.2283C6.81336 22.3533 7.14003 21.5658 7.57753 20.825C7.88086 20.3078 8.2328 19.8236 8.63336 19.3725L35 32.5558L44.8788 27.6179L18.4421 13.0783Z" fill="#C58700" />
    </svg>
  );
  const trendIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8L6 12L14 4" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const PIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="50" viewBox="0 0 37 50" fill="none">
      <path d="M21.724 1.00903L30.4526 9.79528L36.4965 44.038L6.54778 49.3438L0.503906 15.1011L5.6943 3.84903L21.724 1.00903Z" fill="#FFAF1A" fill-opacity="0.5" stroke="black" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" />
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
          onClick={() => handleViewAll('Total Order')}
          onSeeMoreClick={() => handleViewAll('Total Order')}
        />
        <TotalCard
          title="Total Revenue"
          icon={PIcon}
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