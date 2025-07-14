import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';

const initialState = {
  loyaltyEnabled: false,
  usdPointAmount: 10,
  pointPerOrder: 10,
  minPointToConvert: 10,
  earningPerReferral: '',
  shippingDiscountEnabled: false,
  discountAmount: '',
  discountType: 'percentage',
  validity: '',
  validityType: 'day',
};

const CustomerSettingsSection = ({ onSave, onReset }) => {
  const [state, setState] = useState(initialState);

  const handleChange = (field, value) => {
    setState((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setState(initialState);
    if (onReset) onReset();
  };

  const handleSave = () => {
    if (onSave) onSave(state);
  };

  return (
    <div>
      {/* Customer Setup Card */}
      <section className="business-info-section" style={{marginBottom:20, boxShadow:'0 1px 4px rgba(0,0,0,0.03)', border:'1px solid #e5e7eb', borderRadius:16, padding:'18px 24px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:0}}>
          <FaCog style={{marginRight:8}} />
          <span style={{fontWeight:600, fontSize:16}}>Customer Setup</span>
        </div>
        <div style={{marginTop:16, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span style={{fontWeight:500, color:'#222'}}>Customer Can Earn Loyalty Point</span>
          <label className="switch">
            <input type="checkbox" checked={state.loyaltyEnabled} onChange={e => handleChange('loyaltyEnabled', e.target.checked)} />
            <span className="slider round"></span>
          </label>
        </div>
      </section>

      {/* Loyalty Point Settings Card */}
      <section className="business-info-section" style={{marginBottom:20, boxShadow:'0 1px 4px rgba(0,0,0,0.03)', border:'1px solid #e5e7eb', borderRadius:16, padding:'18px 24px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:0}}>
          <FaCog style={{marginRight:8}} />
          <span style={{fontWeight:600, fontSize:16}}>Customer Loyalty Point Settings</span>
        </div>
        <div style={{display:'flex',gap:18,marginTop:16}}>
          <div style={{flex:1}}>
            <label style={{fontWeight:500,fontSize:13,marginBottom:4,display:'block'}}>1 USD Equivalent point amount</label>
            <input type="number" className="input" placeholder="10" value={state.usdPointAmount} onChange={e => handleChange('usdPointAmount', e.target.value)} />
          </div>
          <div style={{flex:1}}>
            <label style={{fontWeight:500,fontSize:13,marginBottom:4,display:'block'}}>Loyalty Point Earn Per Order (%)</label>
            <input type="number" className="input" placeholder="10" value={state.pointPerOrder} onChange={e => handleChange('pointPerOrder', e.target.value)} />
          </div>
          <div style={{flex:1}}>
            <label style={{fontWeight:500,fontSize:13,marginBottom:4,display:'block'}}>Minimum Point Required To Convert</label>
            <input type="number" className="input" placeholder="10" value={state.minPointToConvert} onChange={e => handleChange('minPointToConvert', e.target.value)} />
          </div>
        </div>
      </section>

      {/* Referral & Shipping Settings Card */}
      <section className="business-info-section" style={{marginBottom:0, boxShadow:'0 1px 4px rgba(0,0,0,0.03)', border:'1px solid #e5e7eb', borderRadius:16, padding:'18px 24px'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:0}}>
          <FaCog style={{marginRight:8}} />
          <span style={{fontWeight:600, fontSize:16}}>Customer Loyalty Point Settings</span>
        </div>
        <div style={{display:'flex',gap:32,marginTop:16,alignItems:'flex-start',flexWrap:'wrap'}}>
          {/* Left: Descriptions */}
          <div style={{flex:1,minWidth:220,maxWidth:320,display:'flex',flexDirection:'column',gap:24}}>
            <div>
              <div style={{fontWeight:600,fontSize:14,marginBottom:4}}>Who Share the code</div>
              <div style={{fontSize:12,color:'#444',lineHeight:1.5}}>
                Customers will receive the wallet balance rewards for sharing their referral code with friends who use the code when signing up and completing their first order.
              </div>
            </div>
            <div>
              <div style={{fontWeight:600,fontSize:14,marginBottom:4,marginTop:18}}>Who Use the code</div>
              <div style={{fontSize:12,color:'#444',lineHeight:1.5}}>
                By applying the referral code during signup and when making their first purchase customers will enjoy a discount for a limited time.
              </div>
            </div>
          </div>
          {/* Right: Blue Cards (stacked vertically) */}
          <div style={{flex:2,display:'flex',flexDirection:'column',gap:18,minWidth:320}}>
            {/* Earning Per Referral USD */}
            <div style={{background:'#e9f2fb',borderRadius:12,padding:'18px 20px',marginBottom:0}}>
              <div style={{fontWeight:600,fontSize:15,marginBottom:8}}>Earning Per Referral USD</div>
              <input type="number" className="input" placeholder="" value={state.earningPerReferral} onChange={e => handleChange('earningPerReferral', e.target.value)} style={{width:'100%'}} />
            </div>
            {/* Shipping Charge */}
            <div style={{background:'#e9f2fb',borderRadius:12,padding:'18px 20px',marginBottom:0}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                <div style={{fontWeight:600,fontSize:15}}>Shipping Charge</div>
                <label className="switch">
                  <input type="checkbox" checked={state.shippingDiscountEnabled} onChange={e => handleChange('shippingDiscountEnabled', e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div style={{fontSize:12,marginBottom:12,background:'#fff',borderRadius:8,padding:'8px 12px',color:'#444',fontWeight:500}}>Customer will get Discount on first order</div>
              <div style={{display:'flex',gap:8,marginBottom:10}}>
                <div style={{flex:1}}>
                  <label style={{fontWeight:500,fontSize:13,marginBottom:4,display:'block'}}>Discount Amount (%)</label>
                  <input type="number" className="input" placeholder="" value={state.discountAmount} onChange={e => handleChange('discountAmount', e.target.value)} />
                </div>
                <div style={{flex:1}}>
                  <label style={{fontWeight:500,fontSize:13,marginBottom:4,display:'block'}}>Percentage (%)</label>
                  <select className="input" value={state.discountType} onChange={e => handleChange('discountType', e.target.value)}>
                    <option value="percentage">Percentage (%)</option>
                    <option value="usd">USD</option>
                  </select>
                </div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <div style={{flex:1}}>
                  <label style={{fontWeight:500,fontSize:13,marginBottom:4,display:'block'}}>Validity</label>
                  <input type="number" className="input" placeholder="" value={state.validity} onChange={e => handleChange('validity', e.target.value)} />
                </div>
                <div style={{flex:1}}>
                  <label style={{fontWeight:500,fontSize:13,marginBottom:4,display:'block'}}>Day</label>
                  <select className="input" value={state.validityType} onChange={e => handleChange('validityType', e.target.value)}>
                    <option value="day">Day</option>
                    <option value="month">Month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Save/Reset Buttons */}
      <div className="save-reset-buttons" style={{display:'flex',justifyContent:'flex-end',gap:16,marginTop:32}}>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="save-btn" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default CustomerSettingsSection; 