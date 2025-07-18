import React from 'react';
import TotalCard from '../components/Card/TotalCard';
import '../styles/MarketorPanel/marketorProduct.css';
import { useNavigate } from 'react-router-dom';

function MarketorProduct() {
  const navigate = useNavigate();

  const handleViewAll = (section) => {
    console.log(`View All clicked for ${section}`);
    // Navigation logic for each section
    if (section === 'Total Products') {
      navigate('/marketor-panel/product-status');
    }
    if (section === 'Total Suppliers') {
      navigate('/marketor-panel/supplier');
    }
  };


  // Define icons
  const totalProductIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.25072 11.2916L8.25081 15.3749L4.16735 15.375V33.75H16.8993L18.459 34.5289V24.9941L19.4797 25.5607L20.5005 26.1263L21.5214 25.5607L22.5423 24.994V34.5289L24.102 33.75H36.834V15.375L32.7505 15.3749L32.7504 11.2916H40.9174V37.8333H25.0637L20.5006 40.1159L15.9356 37.8333H0.0839844V11.2916H8.25072ZM34.7924 27.625V30.6875H24.584V27.625H34.7924ZM16.4173 27.625V30.6875H6.20898V27.625H16.4173ZM34.7924 21.5V24.5625H24.584V23.8605L28.8361 21.4999L34.7924 21.5ZM12.1653 21.4999L16.4173 23.8605V24.5625H6.20908V21.5L12.1653 21.4999ZM20.5006 0.981201L30.709 6.65257V17.9953L20.5006 23.6669L10.2923 17.9955V6.65257L20.5006 0.981201ZM16.4173 11.2568V19.0622L18.459 20.1973V12.3921L16.4173 11.2568ZM12.334 8.98868V16.7939L14.3756 17.9291V10.1238L12.334 8.98868ZM24.6575 5.62596L17.5056 9.52558L19.4492 10.6056L26.5337 6.66721L24.6575 5.62596ZM20.5006 3.31684L13.4161 7.2532L15.3924 8.35159L22.5444 4.45207L20.5006 3.31684Z" fill="#D25000" />
    </svg>
  );

  const approveProductIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
      <path d="M37.1318 10.125V7.875H32.6318V12.375H10.1272V7.875H5.62725V10.125H3.375V50.6362H5.625V52.8862H34.8818V50.6362H32.6318V48.3862H34.8818V46.1362H32.6318V41.634H34.8818V39.384H32.6318V37.134H34.8818V34.884H37.1318V32.6318H39.3818V10.1272L37.1318 10.125ZM28.1318 41.634H19.1295V37.134H28.1295L28.1318 41.634ZM28.1318 48.384H7.875V46.134H28.1318V48.384ZM7.875 19.1318H10.125V21.3818H12.375V19.1318H14.6272V16.8817H16.8772V19.1318H14.6272V21.3818H12.375L12.3772 23.6318H10.1272L10.125 21.3818H7.87725L7.875 19.1318ZM7.875 28.1318H10.125V30.3818H12.375V28.1318H14.6272V25.8818H16.8772V28.1318H14.6272V30.3818H12.375L12.3772 32.634H10.1272V30.384H7.87725L7.875 28.1318ZM10.125 37.134V39.384H12.375V37.134H14.6272V34.884H16.8772V37.134H14.6272V39.384H12.375L12.3772 41.634H10.1272L10.125 39.384H7.87725V37.134H10.125ZM34.8818 30.384H32.6318V32.634H19.1295V28.134H34.8818V30.384ZM34.8818 23.634H19.1295V19.1273H34.8818V23.634Z" fill="#0D9801" />
      <path d="M52.8862 39.3818V37.1318H50.6362V34.8818H48.3862V37.1318H46.1362V34.8818H41.634V37.1318H39.384V34.8818H37.134V37.1318H34.884V39.3818H37.134V41.6318H34.884V46.134H37.134V48.384H34.884V50.634H37.134V52.884H39.384V50.634H41.634V52.884H46.134V50.634H48.384V52.884H50.634V50.634H52.8862V48.384H50.6362V46.134H52.8862V41.634H50.6362V39.384L52.8862 39.3818ZM46.1362 46.134H41.634V41.634H46.134L46.1362 46.134ZM30.3818 5.625V10.125H12.375V5.625H14.625V3.375H28.1273V5.625H30.3818Z" fill="#0D9801" />
    </svg>
  );

  const supplierIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 54 54" fill="none">
      <path d="M23.625 47.25C23.625 47.25 20.25 47.25 20.25 43.875C20.25 40.5 23.625 30.375 37.125 30.375C50.625 30.375 54 40.5 54 43.875C54 47.25 50.625 47.25 50.625 47.25H23.625ZM37.125 27C39.8103 27 42.3857 25.9333 44.2845 24.0345C46.1833 22.1356 47.25 19.5603 47.25 16.875C47.25 14.1897 46.1833 11.6143 44.2845 9.71554C42.3857 7.81674 39.8103 6.75 37.125 6.75C34.4397 6.75 31.8643 7.81674 29.9655 9.71554C28.0667 11.6143 27 14.1897 27 16.875C27 19.5603 28.0667 22.1356 29.9655 24.0345C31.8643 25.9333 34.4397 27 37.125 27ZM17.604 47.25C17.1039 46.1963 16.8544 45.0412 16.875 43.875C16.875 39.3019 19.17 34.5938 23.409 31.32C21.2935 30.6667 19.0889 30.3479 16.875 30.375C3.375 30.375 0 40.5 0 43.875C0 47.25 3.375 47.25 3.375 47.25H17.604ZM15.1875 27C17.4253 27 19.5714 26.1111 21.1537 24.5287C22.7361 22.9464 23.625 20.8003 23.625 18.5625C23.625 16.3247 22.7361 14.1786 21.1537 12.5963C19.5714 11.0139 17.4253 10.125 15.1875 10.125C12.9497 10.125 10.8036 11.0139 9.22129 12.5963C7.63895 14.1786 6.75 16.3247 6.75 18.5625C6.75 20.8003 7.63895 22.9464 9.22129 24.5287C10.8036 26.1111 12.9497 27 15.1875 27Z" fill="#FFAF1A" />
    </svg>
  );

  // Define trend icon
  const trendIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 8L6 12L14 4" stroke="#28A745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );


  return (
    <div className="marketor-product">
      <h2 className="marketor-product-title">Marketor Products</h2>

      <div className="marketor-product-content">
        <TotalCard
          title="Total Products"
          icon={totalProductIcon}
          number="486"
          showTrend={true}
          trendText="15 new today"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Total Products')}
          onClick={() => handleViewAll('Total Products')}
        />

        <TotalCard
          title="Approved Products"
          icon={approveProductIcon}
          number="325"
          showTrend={true}
          trendText="8 new today"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Approved Products')}
        />

        <TotalCard
          title="Total Suppliers"
          icon={supplierIcon}
          number="42"
          showTrend={true}
          trendText="3 new this week"
          trendIcon={trendIcon}
          trendType="positive"
          onSeeMoreClick={() => handleViewAll('Total Suppliers')}
          onClick={() => handleViewAll('Total Suppliers')}

        />
      </div>
    </div>
  );
};

export default MarketorProduct;
