import React from 'react';
import '../../styles/Cards/SalesCard.css'; // Adjust the path as necessary

/**
 * SalesCard Component - Simplified card for displaying sales data
 * 
 * @param {string|number} number - Number to display in the circle
 * @param {string} title - Title text to display
 * @param {string} value - Value to display (amount, count, etc.)
 * @param {boolean} showRedDot - Whether to show the red notification dot
 * @param {function} onClick - Click handler function
 * @param {string} className - Additional CSS classes
 */
function SalesCard({ 
  number, 
  title, 
  value,
  showRedDot = true, 
  onClick,
  className = ''
}) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`sales-card ${className}`}
      onClick={handleClick}
    >
      <div className="sales-circle">
        <span className="sales-number">{number}</span>
        {showRedDot && <div className="sales-red-dot"></div>}
      </div>
      
      <h2 className="sales-title">{title}</h2>
      
      {value && <span className="sales-value">{value}</span>}
      
    </div>
  );
}

export default SalesCard;