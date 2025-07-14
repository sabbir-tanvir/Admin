import React from 'react';
import { MdEdit, MdLocationOn } from 'react-icons/md';

const BusinessInfoSection = ({ settings, onChange }) => {
  return (
    <section className="business-info-section">
      <div className="section-title">Business information</div>
      <div className="business-info-grid-pixel">
        {/* Row 1: Company, Email, Phone, Country */}
        <div className="business-settings-form-group">
          <label className="business-settings-label">Company name</label>
          <input type="text" className="business-settings-input" value={settings.companyName} onChange={e => onChange('companyName', e.target.value)} />
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Email</label>
          <input type="email" className="business-settings-input" value={settings.email} onChange={e => onChange('email', e.target.value)} />
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Phone</label>
          <input type="text" className="business-settings-input" value={settings.phone} onChange={e => onChange('phone', e.target.value)} />
        </div>
        <div className="business-settings-form-group">
          <label className="business-settings-label">Country</label>
          <input type="text" className="business-settings-input" value={settings.country} onChange={e => onChange('country', e.target.value)} />
        </div>
        {/* Row 2: Left (address, logo+favicon), Right (map) */}
        <div className="info-left-stack">
          <div className="info-card address-card">
            <label className="business-settings-label">Address</label>
            <textarea className="business-settings-textarea" value={settings.address} onChange={e => onChange('address', e.target.value)} />
          </div>
          <div className="logo-favicon-row">
            <div className="info-card upload-card-pixel logo-half">
              <label className="business-settings-label">Logo ( 3:1 )</label>
              <div className="upload-area">
                {settings.logo ? (
                  <img src={URL.createObjectURL(settings.logo)} alt="Logo Preview" className="upload-preview" />
                ) : (
                  <MdEdit className="edit-icon" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  onChange={e => onChange('logo', e.target.files[0])}
                />
              </div>
            </div>
            <div className="info-card upload-card-pixel favicon-half">
              <label className="business-settings-label">Favicon ( 1:1 )</label>
              <div className="upload-area">
                {settings.favicon ? (
                  <img src={URL.createObjectURL(settings.favicon)} alt="Favicon Preview" className="upload-preview favicon-preview" />
                ) : (
                  <MdEdit className="edit-icon" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="upload-input"
                  onChange={e => onChange('favicon', e.target.files[0])}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="info-card map-card-pixel info-map-half">
          <div className="map-instruction">
            <MdLocationOn className="map-location-icon" />
            <span>Clicking on the map will set Latitude and Longitude automatically</span>
          </div>
          <iframe
            title="Google Map"
            width="100%"
            height="140"
            style={{ border: 0, borderRadius: '10px', marginTop: '0' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902017063191!2d90.3915633154316!3d23.7509033946247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b894b6b6b6b6%3A0x7b7b7b7b7b7b7b7b!2sDhaka!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default BusinessInfoSection; 