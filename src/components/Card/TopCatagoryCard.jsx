import React from 'react';
import '../../styles/Cards/TopCategoryCard.css'; // Adjust the path as necessary

const DonutChart = ({ data }) => {
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercentage = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut-chart">
      {data.map((item, index) => {
        const dashoffset = circumference * (1 - accumulatedPercentage / 100);
        const dasharray = `${(circumference * item.percentage) / 100} ${circumference}`;
        accumulatedPercentage += item.percentage;
        const rotation = (accumulatedPercentage - item.percentage) * 3.6;

        return (
          <circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={dasharray}
            strokeDashoffset={dashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2}) rotate(${rotation} ${size / 2} ${size / 2})`}
            className="donut-segment"
          />
        );
      })}
    </svg>
  );
};

const TopCategoryCard = () => {
  const categories = [
    { name: 'Insulators', percentage: 25, color: '#FFB800' }, // Orange
    { name: 'Insulators', percentage: 30, color: '#007BFF' }, // Blue
    { name: 'Insulators', percentage: 20, color: '#FF4D4D' }, // Red
    { name: 'Insulators', percentage: 25, color: '#28A745' }, // Green
  ];

  return (
    <div className="top-category-card">
      <div className="category-header">
        <h3>Top Categories</h3>
      </div>
      <div className="category-chart-container">
        <div className="chart-wrapper">
          <DonutChart data={categories} />
          <div className="chart-labels">
            <div className="label-item top-left">
              <div className="label-line"></div>
              <div className="label-text">
                <span>Insulators</span>
                <span className="percentage" style={{ backgroundColor: '#D4EDDA', color: '#155724' }}>25%</span>
              </div>
            </div>
            <div className="label-item top-right">
              <div className="label-line"></div>
              <div className="label-text">
                <span>Insulators</span>
                <span className="percentage" style={{ backgroundColor: '#FFF3CD', color: '#856404' }}>25%</span>
              </div>
            </div>
            <div className="label-item bottom-left">
              <div className="label-line"></div>
              <div className="label-text">
                <span>Insulators</span>
                <span className="percentage" style={{ backgroundColor: '#F8D7DA', color: '#721C24' }}>20%</span>
              </div>
            </div>
            <div className="label-item bottom-right">
              <div className="label-line"></div>
              <div className="label-text">
                <span>Insulators</span>
                <span className="percentage" style={{ backgroundColor: '#CCE5FF', color: '#004085' }}>30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCategoryCard;