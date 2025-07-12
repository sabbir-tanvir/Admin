import React from 'react';
import TotalCard from '../components/Card/TotalCard';
import '../styles/MarketorPanel/marketorOrder.css';
import { useNavigate } from 'react-router-dom';

function MarketorOrder() {
  const navigate = useNavigate();

  const handleViewAll = (section) => {
    console.log(`View All clicked for ${section}`);
    // Navigation logic for each section
    if (section === 'Total Orders') {
      navigate('/marketor-panel/order-status');
    }
  };
  // Define icons
  const totalOrdersIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="47" viewBox="0 0 48 47" fill="none">
      <path d="M10.6215 5.39712L32.9336 14.9585L24 18.7857L1.81613 9.27837C2.31563 8.76875 2.9265 8.357 3.62175 8.09037L10.6215 5.39712ZM15.1372 3.66237L20.3685 1.65087C22.7072 0.751793 25.2962 0.751793 27.6349 1.65087L44.3816 8.09037C45.0735 8.36037 45.6844 8.76537 46.1839 9.27837L37.2199 13.1191L15.1372 3.66237ZM47.6048 12.3429L25.6875 21.7355V46.8792C26.3512 46.7667 27.0004 46.589 27.6349 46.346L44.3816 39.9031C45.3364 39.5355 46.1573 38.8872 46.7363 38.0438C47.3153 37.2003 47.6251 36.2012 47.625 35.1781V12.8154C47.625 12.6579 47.6171 12.5004 47.6014 12.3429M22.3125 46.8792V21.7355L0.398625 12.3429C0.385231 12.5 0.377351 12.6576 0.375 12.8154V35.1781C0.375135 36.2016 0.685475 37.201 1.26509 38.0445C1.84471 38.888 2.66638 39.536 3.62175 39.9031L20.3651 46.346C20.9996 46.589 21.6488 46.7667 22.3125 46.8792Z" fill="#FF7F30"/>
    </svg>
  );

  const productRequestIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
      <path d="M37.1318 10.125V7.875H32.6318V12.375H10.1272V7.875H5.62725V10.125H3.375V50.6362H5.625V52.8862H34.8818V50.6362H32.6318V48.3862H34.8818V46.1362H32.6318V41.634H34.8818V39.384H32.6318V37.134H34.8818V34.884H37.1318V32.6318H39.3818V10.1272L37.1318 10.125ZM28.1318 41.634H19.1295V37.134H28.1295L28.1318 41.634ZM28.1318 48.384H7.875V46.134H28.1318V48.384ZM7.875 19.1318H10.125V21.3818H12.375V19.1318H14.6272V16.8817H16.8772V19.1318H14.6272V21.3818H12.375L12.3772 23.6318H10.1272L10.125 21.3818H7.87725L7.875 19.1318ZM7.875 28.1318H10.125V30.3818H12.375V28.1318H14.6272V25.8818H16.8772V28.1318H14.6272V30.3818H12.375L12.3772 32.634H10.1272V30.384H7.87725L7.875 28.1318ZM10.125 37.134V39.384H12.375V37.134H14.6272V34.884H16.8772V37.134H14.6272V39.384H12.375L12.3772 41.634H10.1272L10.125 39.384H7.87725V37.134H10.125ZM34.8818 30.384H32.6318V32.634H19.1295V28.134H34.8818V30.384ZM34.8818 23.634H19.1295V19.1273H34.8818V23.634Z" fill="#0D9801"/>
      <path d="M52.8862 39.3818V37.1318H50.6362V34.8818H48.3862V37.1318H46.1362V34.8818H41.634V37.1318H39.384V34.8818H37.134V37.1318H34.884V39.3818H37.134V41.6318H34.884V46.134H37.134V48.384H34.884V50.634H37.134V52.884H39.384V50.634H41.634V52.884H46.134V50.634H48.384V52.884H50.634V50.634H52.8862V48.384H50.6362V46.134H52.8862V41.634H50.6362V39.384L52.8862 39.3818ZM46.1362 46.134H41.634V41.634H46.134L46.1362 46.134ZM30.3818 5.625V10.125H12.375V5.625H14.625V3.375H28.1273V5.625H30.3818Z" fill="#0D9801"/>
    </svg>
  );

  const onlineCustomersIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
      <path d="M23.625 47.25C23.625 47.25 20.25 47.25 20.25 43.875C20.25 40.5 23.625 30.375 37.125 30.375C50.625 30.375 54 40.5 54 43.875C54 47.25 50.625 47.25 50.625 47.25H23.625ZM37.125 27C39.8103 27 42.3857 25.9333 44.2845 24.0345C46.1833 22.1356 47.25 19.5603 47.25 16.875C47.25 14.1897 46.1833 11.6143 44.2845 9.71554C42.3857 7.81674 39.8103 6.75 37.125 6.75C34.4397 6.75 31.8643 7.81674 29.9655 9.71554C28.0667 11.6143 27 14.1897 27 16.875C27 19.5603 28.0667 22.1356 29.9655 24.0345C31.8643 25.9333 34.4397 27 37.125 27ZM17.604 47.25C17.1039 46.1963 16.8544 45.0412 16.875 43.875C16.875 39.3019 19.17 34.5938 23.409 31.32C21.2935 30.6667 19.0889 30.3479 16.875 30.375C3.375 30.375 0 40.5 0 43.875C0 47.25 3.375 47.25 3.375 47.25H17.604ZM15.1875 27C17.4253 27 19.5714 26.1111 21.1537 24.5287C22.7361 22.9464 23.625 20.8003 23.625 18.5625C23.625 16.3247 22.7361 14.1786 21.1537 12.5963C19.5714 11.0139 17.4253 10.125 15.1875 10.125C12.9497 10.125 10.8036 11.0139 9.22129 12.5963C7.63895 14.1786 6.75 16.3247 6.75 18.5625C6.75 20.8003 7.63895 22.9464 9.22129 24.5287C10.8036 26.1111 12.9497 27 15.1875 27Z" fill="#FFAF1A"/>
    </svg>
  );

  // Define trend icon
  const trendIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8L6 12L14 4" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );



  return (
    <div className="marketor-order">
      <h2 className="marketor-order-page-title">Marketor Order Overview</h2>
      
      <div className="marketor-order-content">
        <TotalCard
          title="Total Orders"
          icon={totalOrdersIcon}
          number="546"
          showTrend={true}
          trendText="32 new today"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Total Orders')}
          onClick={() => handleViewAll('Total Orders')}
        />
        
        <TotalCard
          title="Product Requests"
          icon={productRequestIcon}
          number="87"
          showTrend={true}
          trendText="12 pending review"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Product Requests')}
        />
        
        <TotalCard
          title="Online Customers"
          icon={onlineCustomersIcon}
          number="128"
          showTrend={true}
          trendText="5% increase"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Online Customers')}
        />
      </div>
    </div>
  );
};

export default MarketorOrder;