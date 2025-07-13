import React from 'react';

const CardContainer = ({ children, style = {}, className = '' }) => (
  <div
    className={`card-container ${className}`}
    style={{
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 4px 16px 0 rgba(44, 62, 80, 0.07)',
      padding: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

export default CardContainer; 