import React from 'react';
import '../../styles/components/ProductCard.css';

/**
 * Reusable ProductCard Component
 * 
 * @param {string|number} number - Number to display in the circle (when no icon)
 * @param {string} title - Title text to display
 * @param {JSX.Element} icon - SVG icon component to display instead of number
 * @param {boolean} showRedDot - Whether to show the red notification dot
 * @param {string} size - Size variant: 'normal' or 'large'
 * @param {function} onClick - Click handler function
 * @param {string} className - Additional CSS classes
 * @param {boolean} hideCircle - Whether to hide the circular element completely
 * @param {string} linkText - Custom text for the "see more" link
 * @param {string} customColor - Custom background color for the card
 * @param {boolean} disabled - Whether the card is disabled/non-interactive
 * @param {string} backgroundImage - URL or path to background image for the circle
 */
function ProductCard({ 
  number, 
  title, 
  icon, 
  showRedDot = true, 
  size = 'normal', 
  onClick,
  className = '',
  hideCircle = false,
  linkText = 'see more →',
  customColor,
  disabled = false,
  backgroundImage
}) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const cardStyle = customColor ? { backgroundColor: customColor } : {};
  
  const circleStyle = backgroundImage ? {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <div 
      className={`product-card ${size === 'large' ? 'product-card-large' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      onClick={handleClick}
      style={cardStyle}
    >
      {!hideCircle && (
        <div 
          className={`card-circle ${size === 'large' ? 'card-circle-large' : ''} ${backgroundImage ? 'has-background' : ''}`}
          style={circleStyle}
        >
          {!backgroundImage && (
            <span className="card-number">
              {icon ? icon : number}
            </span>
          )}
          {showRedDot && <div className="red-dot"></div>}
        </div>
      )}
      <h2 className={size === 'large' ? 'large-text' : ''}>{title}</h2>
      <span className={`see-more ${size === 'large' ? 'see-more-large' : ''}`}>
        {linkText}
      </span>
    </div>
  );
}

export default ProductCard;