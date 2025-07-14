import React from 'react';

const BusinessRulesSection = ({ settings, onChange }) => {
  return (
    <section className="business-rules-section">
      <div className="section-title">
        <span className="section-icon">⚙️</span> Buisness Rules Setup
      </div>
      <div className="business-rules-grid">
        <div className="business-settings-form-group">
          <label className="business-settings-label">Default Commission Rate On Order (%)</label>
          <input type="number" className="business-settings-input" min="0" max="100" value={settings.commissionOrder} onChange={e => onChange('commissionOrder', e.target.value)} />
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Commission Rate On Delivery Charge (%)</label>
          <input type="number" className="business-settings-input" min="0" max="100" value={settings.commissionDelivery} onChange={e => onChange('commissionDelivery', e.target.value)} />
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Who Will Confirm Order</label>
          <div className="business-settings-radio-group">
            <label><input type="radio" className="business-settings-radio" name="confirm-order" checked={settings.confirmOrder === 'marketer'} onChange={() => onChange('confirmOrder', 'marketer')} /> Marketer</label>
            <label><input type="radio" className="business-settings-radio" name="confirm-order" checked={settings.confirmOrder === 'deliveryman'} onChange={() => onChange('confirmOrder', 'deliveryman')} /> Deliveryman</label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessRulesSection; 