import React from 'react';

const AdditionalChargeSection = () => {
  return (
    <section className="additional-charge-section">
      <div className="section-title">Additional Charge</div>
      <div className="business-settings-inline-group">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <input type="text" className="business-settings-input" placeholder="Additional charge name" defaultValue="Additional Charge" />
        <input type="number" className="business-settings-input" placeholder="Charge amount ($)" defaultValue={10} />
      </div>
    </section>
  );
};

export default AdditionalChargeSection; 