import React from 'react';
import '../../styles/Cards/TotalOrderDelevary.css';

/**
 * Reusable StatCard Component for statistics like orders, deliveries, etc.
 * 
 * @param {string} title - Title text for the card
 * @param {React.ReactNode} icon - Icon component to display
 * @param {string} iconClass - CSS class for the icon background/color
 * @param {string|number} number - Main statistic to display
 * @param {Array} stats - Array of statistic objects [{text, type, icon}]
 * @param {function} onClick - Click handler function
 * @param {string} className - Additional CSS classes
 */
const StatCard = ({
  title,
  icon,
  iconClass,
  number,
  stats = [],
  onClick,
  className = '',
}) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div className={`stat-card ${className}`} onClick={handleClick}>
      <div className="stat-card-header">
        <h3>{title}</h3>
      </div>
      <div className="stat-card-body">
        <div className={`stat-card-icon ${iconClass}`}>
          {icon}
        </div>
        <div className="stat-card-content">
          <h2 className="stat-card-number">{number}</h2>
          {stats.map((stat, index) => (
            <p key={index} className={`stat-card-trend ${stat.type || ''}`}>
              {stat.icon}
              {stat.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
