import React from 'react';
import '../../styles/Cards/SummaryCard.css';
import MiniLineChart from '../Charts/MiniLineChart';

/**
 * SummaryCard - Reusable card for dashboard summary stats
 * @param {string} title - Card title
 * @param {React.ReactNode} icon - Icon to display
 * @param {string|number} value - Main value/stat
 * @param {string} trend - Trend text (e.g., '+10k since last week')
 * @param {string} trendType - 'up' | 'down' | 'neutral'
 * @param {string} color - Main color for icon/accent
 * @param {string} iconBg - Optional background for the icon
 * @param {Array} chartData - Data points for the mini chart
 */
const SummaryCard = ({ 
  title, 
  icon, 
  value, 
  trend, 
  trendType = 'neutral', 
  color = '#eee', 
  iconBg,
  chartData = [] 
}) => {
  // Determine chart color based on trend type
  const chartColor = trendType === 'up' ? '#0bbf4f' : trendType === 'down' ? '#ff3b3b' : '#aaa';
  
  const UpArrow = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 2}}>
      <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="#0BBF4F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const DownArrow = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 2}}>
      <path d="M8 4V12M8 12L4 8M8 12L12 8" stroke="#FF3B3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <div className="summary-card-root">
      <div className="summary-card-header-row">
        <div className="summary-card-title-group">
          <span className="summary-card-title">{title}</span>
          <div className="summary-card-value">{value}</div>
          <div className={`summary-card-trend ${trendType} summary-card-trend-compact`}>
            {trendType === 'up' && <UpArrow />}
            {trendType === 'down' && <DownArrow />}
            <span>{trend}</span>
          </div>
        </div>
        <span className="summary-card-icon-nobg">{icon}</span>
      </div>
      {chartData.length > 0 && (
        <div className="summary-card-chart summary-card-chart-bordered">
          <MiniLineChart data={chartData} color={chartColor} theme={trendType} />
        </div>
      )}
    </div>
  );
};

export default SummaryCard;