import React from 'react';
import { createSVGPlaceholder } from '../../utils/placeholderUtils';
import '../../styles/components/GridDisplay.css';

/**
 * Reusable GridDisplay Component for 4x2 image grids
 * @param {Array} items - Array of items with image URLs
 * @param {string} type - Type of grid ('products' or 'companies')
 */
function GridDisplay({ items, type = 'products' }) {
  // Ensure exactly 8 items for 4x2 grid
  const gridItems = items.slice(0, 8);

  return (
    <div className="grid-display">
      <div className="grid-container">
        {gridItems.map((item, index) => (
          <div key={index} className="grid-item">
            <img 
              src={item.image || createSVGPlaceholder(type === 'products' ? 'P' : 'C', 80, 80, '#f8f9fa', '#6c757d')}
              alt={item.name || `${type} ${index + 1}`}
              className="grid-image"
              onError={(e) => {
                e.target.src = createSVGPlaceholder(type === 'products' ? 'P' : 'C', 80, 80, '#f8f9fa', '#6c757d');
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridDisplay;
