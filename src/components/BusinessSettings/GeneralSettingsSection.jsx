import React from 'react';

const GeneralSettingsSection = () => {
  return (
    <section className="general-settings-section">
      <div className="section-title">
        <span className="section-icon">⚙️</span> General Settings
      </div>
      <div className="general-settings-grid">
        <div className="business-settings-form-group">
          <label className="business-settings-label">Time zone</label>
          <select className="business-settings-select"><option>GMT+6</option></select>
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Time format</label>
          <select className="business-settings-select"><option>24h</option><option>12h</option></select>
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Currency Symbol</label>
          <select className="business-settings-select"><option>$</option><option>৳</option></select>
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Copyright Text</label>
          <input type="text" className="business-settings-input" placeholder="" />
        </div>
        <div className="business-settings-form-group currency-pos-group">
          <label className="business-settings-label">Currency Position</label>
          <div className="business-settings-radio-group">
            <label><input type="radio" className="business-settings-radio" name="currency-pos" defaultChecked /> Left</label>
            <label><input type="radio" className="business-settings-radio" name="currency-pos" /> Right</label>
          </div>
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Digit after decimal point</label>
          <input type="number" className="business-settings-input" min="0" max="4" defaultValue={2} />
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Cookies Text</label>
          <input type="text" className="business-settings-input" placeholder="" />
        </div>
      </div>
    </section>
  );
};

export default GeneralSettingsSection; 