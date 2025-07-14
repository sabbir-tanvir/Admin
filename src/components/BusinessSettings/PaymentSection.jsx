import React from 'react';

const PaymentSection = () => {
  return (
    <section className="payment-section">
      <div className="section-title">Payment</div>
      <div className="business-settings-inline-group">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <div className="business-settings-radio-group">
          <label><input type="radio" className="business-settings-radio" name="payment-type" /> COD</label>
          <label><input type="radio" className="business-settings-radio" name="payment-type" /> Digital Payment</label>
          <label><input type="radio" className="business-settings-radio" name="payment-type" defaultChecked /> Both</label>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection; 