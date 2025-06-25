import React from 'react';
import '../../styles/components/SeeMBrn.css';

/**
 * Reusable SeeMBtn Component
 * @param {string} text - Button text to display
 * @param {function} onClick - Click handler function
 * @param {string} className - Additional CSS classes
 * @param {boolean} disabled - Whether the button is disabled
 */
function SeeMBtn({ 
  text = "See More", 
  onClick, 
  className = "", 
  disabled = false 
}) {
  return (
    <button 
      className={`seemore-btn ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default SeeMBtn;