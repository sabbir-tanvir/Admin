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
          <div key={index} className="grid-item" tabIndex={0} aria-label={item.name || `${type} ${index + 1}`}>
            <img
              src={item.image || createSVGPlaceholder(type === 'products' ? 'P' : 'C', 80, 80, '#f8f9fa', '#6c757d')}
              alt={item.name || `${type} ${index + 1}`}
              className="grid-image"
              onError={(e) => {
                e.target.src = createSVGPlaceholder(type === 'products' ? 'P' : 'C', 80, 80, '#f8f9fa', '#6c757d');
              }}
              loading="lazy"
            />
            {item.name && (
              <div className="grid-info" title={item.name}>
                <span className="name">{item.name.length > 18 ? `${item.name.slice(0,18)}…` : item.name}</span>
              </div>
            )}
            {item.total_sold != null && (
              <div className="grid-sold-bottom" aria-label={`Total sold ${item.total_sold}`}>{item.total_sold ?? 0}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridDisplay;
