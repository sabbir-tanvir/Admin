import React from 'react';

const ShippingChargeSection = () => {
  return (
    <section className="shipping-charge-section">
      <div className="section-title">Shipping Charge</div>
      <div className="business-settings-inline-group">
        <input type="number" className="business-settings-input" placeholder="Minimum shipping charge" />
        <input type="number" className="business-settings-input" placeholder="Per km shipping charge" />
      </div>
    </section>
  );
};

export default ShippingChargeSection; 