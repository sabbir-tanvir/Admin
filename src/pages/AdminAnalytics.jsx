import React, { useState, useEffect } from 'react';
import '../styles/pages/AdminAnalytics.css';
import SummaryCard from '../components/Card/SummaryCard';
import axios from 'axios';
import WebsiteMetricsChart from '../components/Charts/WebsiteMetricsChart';
import TopCategoriesDonut from '../components/Charts/TopCategoriesDonut';
import OrderSummaryStats from '../components/Table/OrderSummaryStats';
import CardContainer from '../components/Card/CardContainer';

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M21.17 4.17L19.07 2.07C18.8445 1.84445 18.5772 1.66622 18.2836 1.54657C17.99 1.42692 17.6757 1.36772 17.358 1.37199C17.0403 1.37626 16.7277 1.44393 16.4375 1.57129C16.1474 1.69865 15.885 1.88376 15.665 2.116L4.5 13.281V18.001H9.22L20.385 6.836C20.6172 6.61603 20.8023 6.35361 20.9297 6.06344C21.0571 5.77327 21.1247 5.46068 21.1289 5.14298C21.1332 4.82529 21.0741 4.51057 20.9543 4.21726C20.8345 3.92395 20.6563 3.65747 20.43 3.432L21.17 4.172V4.17ZM7.93 16H6.5V14.57L15.558 5.512L16.988 6.942L7.93 16Z" fill="#4FBF67"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 11C12.7911 11 13.5645 10.7654 14.2223 10.3259C14.8801 9.88635 15.3928 9.26164 15.6955 8.53074C15.9983 7.79983 16.0775 6.99556 15.9231 6.21964C15.7688 5.44372 15.3878 4.73098 14.8284 4.17157C14.269 3.61216 13.5563 3.2312 12.7804 3.07686C12.0044 2.92252 11.2002 3.00173 10.4693 3.30448C9.73836 3.60723 9.11365 4.11992 8.67412 4.77772C8.2346 5.43552 8 6.20888 8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11ZM12 5C12.3956 5 12.7822 5.1173 13.1111 5.33706C13.44 5.55683 13.6964 5.86918 13.8478 6.23463C13.9991 6.60009 14.0387 7.00222 13.9616 7.39018C13.8844 7.77814 13.6939 8.13451 13.4142 8.41422C13.1345 8.69392 12.7781 8.8844 12.3902 8.96157C12.0022 9.03874 11.6001 8.99914 11.2346 8.84776C10.8692 8.69639 10.5568 8.44004 10.3371 8.11114C10.1173 7.78224 10 7.39556 10 7C10 6.46957 10.2107 5.96086 10.5858 5.58579C10.9609 5.21072 11.4696 5 12 5Z" fill="#FFBA7B"/>
    <path d="M12 13C10.1435 13 8.36301 13.7375 7.05025 15.0503C5.7375 16.363 5 18.1435 5 20C5 20.2652 5.10536 20.5196 5.29289 20.7071C5.48043 20.8946 5.73478 21 6 21C6.26522 21 6.51957 20.8946 6.70711 20.7071C6.89464 20.5196 7 20.2652 7 20C7 18.6739 7.52678 17.4021 8.46447 16.4645C9.40215 15.5268 10.6739 15 12 15C13.3261 15 14.5979 15.5268 15.5355 16.4645C16.4732 17.4021 17 18.6739 17 20C17 20.2652 17.1054 20.5196 17.2929 20.7071C17.4804 20.8946 17.7348 21 18 21C18.2652 21 18.5196 20.8946 18.7071 20.7071C18.8946 20.5196 19 20.2652 19 20C19 18.1435 18.2625 16.363 16.9497 15.0503C15.637 13.7375 13.8565 13 12 13Z" fill="#FFBA7B"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 14C12.5304 14 13.0391 13.7893 13.4142 13.4142C13.7893 13.0391 14 12.5304 14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14Z" fill="#FF7F30"/>
    <path d="M21.872 11.998C21.77 11.795 17.922 4 12 4C6.078 4 2.23 11.795 2.128 11.998L2 12.278L2.127 12.557C2.23 12.76 6.078 20.555 12 20.555C17.922 20.555 21.77 12.76 21.872 12.557L22 12.278L21.872 11.998ZM12 18.555C8.359 18.555 5.298 13.618 4.336 12.277C5.298 10.936 8.359 6 12 6C15.641 6 18.702 10.936 19.664 12.278C18.702 13.618 15.641 18.555 12 18.555Z" fill="#FF7F30"/>
  </svg>
);

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTimeframe, setActiveTimeframe] = useState('Days');

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get('/dashboardData.json')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load dashboard data');
        setLoading(false);
      });
  }, []);

  const handleTimeframeChange = (timeframe) => {
    setActiveTimeframe(timeframe);
    // In a real app, you might fetch new data based on the timeframe
  };

  // Generate sample chart data for summary cards
  const getChartData = (type) => {
    if (!data) return [];
    
    switch(type) {
      case 'revenue':
        return data.metrics.revenue;
      case 'customers':
        return data.metrics.customers;
      case 'visitors':
        return data.metrics.visitors;
      default:
        return [];
    }
  };

  return (
    <div className="admin-analytics-root">
      <main className="admin-analytics-main">
        <h2 className="admin-analytics-title">Admin Analysis</h2>
        {loading ? (
          <div style={{textAlign: 'center', padding: '40px 0'}}>
            <span className="loader"></span> Loading...
          </div>
        ) : error ? (
          <div style={{color: 'red', textAlign: 'center', padding: '40px 0'}}>{error}</div>
        ) : data && (
          <>
            <div className="admin-analytics-summary-cards">
              <CardContainer style={{padding: 0}}>
                <SummaryCard
                  title={data.summary.revenue.title}
                  icon={<WalletIcon />}
                  value={`$${data.summary.revenue.value.toLocaleString()}`}
                  trend={`$${data.summary.revenue.trend.toLocaleString()} since last Week`}
                  trendType={data.summary.revenue.trendType}
                  color="#e6f9ed"
                  iconBg="linear-gradient(135deg, #e6f9ed 60%, #b6f0d3 100%)"
                  chartData={getChartData('revenue')}
                />
              </CardContainer>
              <CardContainer style={{padding: 0}}>
                <SummaryCard
                  title={data.summary.customers.title}
                  icon={<UserIcon />}
                  value={`${(data.summary.customers.value/1000).toFixed(0)}k`}
                  trend={`${(data.summary.customers.trend/1000).toFixed(0)}k since last Week`}
                  trendType={data.summary.customers.trendType}
                  color="#fff7e6"
                  iconBg="linear-gradient(135deg, #fff7e6 60%, #ffe0b2 100%)"
                  chartData={getChartData('customers')}
                />
              </CardContainer>
              <CardContainer style={{padding: 0}}>
                <SummaryCard
                  title={data.summary.visitors.title}
                  icon={<EyeIcon />}
                  value={`${(data.summary.visitors.value/1000).toFixed(0)}k`}
                  trend={`${Math.abs(data.summary.visitors.trend/1000).toFixed(0)}k since last Week`}
                  trendType={data.summary.visitors.trendType}
                  color="#ffeaea"
                  iconBg="linear-gradient(135deg, #ffeaea 60%, #ffbdbd 100%)"
                  chartData={getChartData('visitors')}
                />
              </CardContainer>
            </div>
            
            <div className="admin-analytics-charts-row">
              <CardContainer className="metrics-card">
                <div className="website-metrics-header">
                  <div className="section-title">
                    <h3>Website metrics</h3>
                    <p className="section-subtitle">in the last 30 days</p>
                  </div>
                  <div className="timeframe-buttons">
                    <button 
                      className={`chart-btn ${activeTimeframe === 'Days' ? 'active' : ''}`}
                      onClick={() => handleTimeframeChange('Days')}
                    >Days</button>
                    <button 
                      className={`chart-btn ${activeTimeframe === 'Week' ? 'active' : ''}`}
                      onClick={() => handleTimeframeChange('Week')}
                    >Week</button>
                    <button 
                      className={`chart-btn ${activeTimeframe === 'Months' ? 'active' : ''}`}
                      onClick={() => handleTimeframeChange('Months')}
                    >Months</button>
                  </div>
                </div>
                
                <div className="website-metrics-summary">
                  <div className="website-metric-item">
                    <div className="website-metric-label">Revenue</div>
                    <div className="website-metric-value">${data.summary.revenue.value.toLocaleString()}</div>
                    <div className={`website-metric-trend ${data.summary.revenue.trendType}`}>
                      <span className="trend-arrow">{data.summary.revenue.trendType === 'up' ? '▲' : '▼'}</span>
                      <span>${data.summary.revenue.trend.toLocaleString()} since last month</span>
                    </div>
                  </div>
                  <div className="website-metric-item">
                    <div className="website-metric-label">Total Customer</div>
                    <div className="website-metric-value">{(data.summary.customers.value/1000).toFixed(0)}k</div>
                    <div className={`website-metric-trend ${data.summary.customers.trendType}`}>
                      <span className="trend-arrow">{data.summary.customers.trendType === 'up' ? '▲' : '▼'}</span>
                      <span>{(data.summary.customers.trend/1000).toFixed(0)}k since last month</span>
                    </div>
                  </div>
                  <div className="website-metric-item">
                    <div className="website-metric-label">Total Sites visitors</div>
                    <div className="website-metric-value">{(data.summary.visitors.value/1000).toFixed(0)}k</div>
                    <div className={`website-metric-trend ${data.summary.visitors.trendType}`}>
                      <span className="trend-arrow">{data.summary.visitors.trendType === 'up' ? '▲' : '▼'}</span>
                      <span>{Math.abs(data.summary.visitors.trend/1000).toFixed(0)}k since last month</span>
                    </div>
                  </div>
                </div>
                
                <div className="website-metrics-chart-container">
                  <WebsiteMetricsChart
                    labels={data.metrics.labels}
                    revenue={data.metrics.revenue}
                    customers={data.metrics.customers}
                    visitors={data.metrics.visitors}
                  />
                </div>
              </CardContainer>
              
              <CardContainer className="donut-card">
                <div className="section-title">
                  <h3>Top Categories</h3>
                </div>
                <TopCategoriesDonut categories={data.categories} />
              </CardContainer>
            </div>
            
            <CardContainer className="admin-analytics-order-summary">
              <div className="section-title">
                <h3>Order Summary</h3>
              </div>
              <OrderSummaryStats orders={data.orders} />
            </CardContainer>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminAnalytics;