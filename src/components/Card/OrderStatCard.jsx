import React from 'react';
import '../../styles/Cards/OrderStatCard.css';

/**
 * Reusable OrderStatCard Component
 * 
 * @param {string} title - Title text for the card
 * @param {React.ReactNode} icon - Icon component to display
 * @param {string|number} number - Main statistic to display
 * @param {string} trendText - Text showing trend (e.g. "5 orders since last Week")
 * @param {React.ReactNode} trendIcon - Icon for the trend indicator
 * @param {string} trendType - Type of trend: 'positive', 'negative', 'warning', or custom class
 * @param {Array} chartData - Array of data points for the chart
 * @param {string} chartLineColor - Color for the chart line
 * @param {string} chartFillColor - Color for the area under the chart line
 * @param {function} onClick - Click handler function
 * @param {string} className - Additional CSS classes
 * @param {boolean} hideChart - Whether to hide the chart section
 * @param {boolean} hideDivider - Whether to hide the bottom divider
 * @param {object} customStyles - Custom styles for the card
 */
const OrderStatCard = ({ 
  title = "Order stats",
  icon,
  number = 60,
  trendText = "5 orders since last Week",
  trendIcon,
  trendType = "positive",
  chartData = [40, 42, 45, 42, 48, 46, 49, 53, 50, 52, 55, 60],
  chartLineColor = "#009E18",
  chartFillColor = "rgba(0, 158, 24, 0.1)",
  onClick,
  className = '',
  hideChart = false,
  hideDivider = false,
  customStyles = {}
}) => {
  // Calculate chart points based on data
  const getChartPath = () => {
    const width = 100;
    const height = 40;
    const padding = 5;
    
    const max = Math.max(...chartData);
    const min = Math.min(...chartData);
    
    const xStep = (width - padding * 2) / (chartData.length - 1);
    
    // Map data points to SVG path coordinates
    return chartData.map((value, index) => {
      const x = padding + index * xStep;
      const y = height - padding - ((value - min) / (max - min) * (height - padding * 2));
      return `${x},${y}`;
    }).join(' ');
  };

  // Default trend icon if none provided
  const defaultTrendIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
  <path d="M9.4134 0.6875L0.906738 13.4475H17.9201L9.4134 0.6875Z" fill="#009E18"/>
</svg>
  );

  // Default icon if none provided
  const defaultIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="63" height="63" viewBox="0 0 63 63" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8669 4.50122C21.5643 4.50121 21.2659 4.57245 20.996 4.70918C20.726 4.84591 20.492 5.0443 20.313 5.28827C20.134 5.53224 20.0149 5.81494 19.9654 6.11349C19.916 6.41203 19.9375 6.71803 20.0283 7.0067L20.4523 8.35581H14.1578C13.6466 8.35581 13.1564 8.55886 12.795 8.9203C12.4335 9.28174 12.2305 9.77195 12.2305 10.2831V56.5381C12.2305 57.0493 12.4335 57.5395 12.795 57.9009C13.1564 58.2623 13.6466 58.4654 14.1578 58.4654H48.849C49.3602 58.4654 49.8504 58.2623 50.2118 57.9009C50.5732 57.5395 50.7763 57.0493 50.7763 56.5381V10.2831C50.7763 9.77195 50.5732 9.28174 50.2118 8.9203C49.8504 8.55886 49.3602 8.35581 48.849 8.35581H42.5583L42.9823 7.0067C43.0732 6.71772 43.0947 6.41138 43.045 6.11253C42.9954 5.81369 42.8759 5.53077 42.6965 5.28671C42.517 5.04266 42.2825 4.84435 42.0121 4.70787C41.7416 4.5714 41.4428 4.5006 41.1398 4.50122H21.8669ZM24.488 8.35581H38.5187L37.3122 12.2104H25.6945L24.488 8.35581ZM43.0671 27.6287H19.9396V23.7741H43.0671V27.6287ZM43.0671 37.2652H19.9396V33.4106H43.0671V37.2652ZM19.9396 46.9016H35.358V43.0471H19.9396V46.9016Z" fill="#009E18"/>
</svg>
  );

  // Handle click event
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div 
      className={`order-stat-card ${className}`} 
      onClick={handleClick}
      style={customStyles}
    >
      <div className="order-stat-content">
        <div className="order-stat-header">
          <h3>{title}</h3>
          <div className="order-icon">
            {icon || defaultIcon}
          </div>
        </div>
        <div className="order-stat-number">{number}</div>
        <div className={`order-stat-trend ${trendType}`}>
          {trendIcon || defaultTrendIcon}
          <span>{trendText}</span>
        </div>
      </div>
      
      {!hideChart && (
        <div className="order-stat-chart">
          <svg width="100%" height="60" viewBox="0 0 100 40" preserveAspectRatio="none">
            {/* Background grid lines */}
            <line x1="0" y1="10" x2="100" y2="10" stroke="#e0f2e0" strokeWidth="1" />
            <line x1="0" y1="20" x2="100" y2="20" stroke="#e0f2e0" strokeWidth="1" />
            <line x1="0" y1="30" x2="100" y2="30" stroke="#e0f2e0" strokeWidth="1" />
            
            {/* Chart line */}
            <polyline
              points={getChartPath()}
              fill="none"
              stroke={chartLineColor}
              strokeWidth="2"
            />
            
            {/* Area under the line */}
            <polyline
              points={`${getChartPath()} 100,40 0,40`}
              fill={chartFillColor}
              stroke="none"
            />
          </svg>
        </div>
      )}
      
      {!hideDivider && <div className="order-stat-divider"></div>}
    </div>
  );
};

export default OrderStatCard;