import React from 'react';

const FreeDeliverySection = () => {
  return (
    <section className="free-delivery-section">
      <div className="section-title">Free Delivery Option</div>
      <div className="free-delivery-toggle-row">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="business-settings-radio-group">
        <label>
          <input type="radio" className="business-settings-radio" name="free-delivery" defaultChecked /> Set free delivery for all store
        </label>
        <label>
          <input type="radio" className="business-settings-radio" name="free-delivery" /> Set Specific Criteria
        </label>
        <input type="number" className="business-settings-input" placeholder="Free delivery over ($)" defaultValue={5000} />
      </div>
    </section>
  );
};

export default FreeDeliverySection; 