import React, { useState } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import { MdSettings } from 'react-icons/md';
import '../styles/pages/BusinessSettings.css';
import BusinessInfoSection from '../components/BusinessSettings/BusinessInfoSection';
import GeneralSettingsSection from '../components/BusinessSettings/GeneralSettingsSection';
import BusinessRulesSection from '../components/BusinessSettings/BusinessRulesSection';
import FreeDeliverySection from '../components/BusinessSettings/FreeDeliverySection';
import AdditionalChargeSection from '../components/BusinessSettings/AdditionalChargeSection';
import PaymentSection from '../components/BusinessSettings/PaymentSection';
import ShippingChargeSection from '../components/BusinessSettings/ShippingChargeSection';
import SaveResetButtons from '../components/BusinessSettings/SaveResetButtons';

const tabList = [
  { label: 'Landing Page', path: '/business-settings/landing-page' },
  { label: 'Footer', path: '/business-settings/footer' },
  { label: 'Business information', path: '/business-settings' },
  { label: 'Order Settings', path: '/business-settings/order-settings' },
  { label: 'Refund', path: '/business-settings/refund' },
  { label: 'Seller', path: '/business-settings/seller' },
  { label: 'Delivery', path: '/business-settings/delivery' },
  { label: 'Customers', path: '/business-settings/customers' },
  { label: 'Priority Setup', path: '/business-settings/priority-setup' },
  { label: 'Language', path: '/business-settings/language' },
  { label: 'Websocket', path: '/business-settings/websocket' },
  { label: 'DisturbStatement', path: '/business-settings/disturb-statement' },
  { label: 'Automated Message', path: '/business-settings/automated-message' },
];

const initialSettings = {
  // Business Info
  companyName: 'SAFE',
  email: 'Example@gmail.com',
  phone: '+880*********74',
  country: '',
  address: '',
  logo: null,
  favicon: null,
  lat: null,
  lng: null,
  // General Settings
  timezone: 'GMT+6',
  timeFormat: '24h',
  currencySymbol: '$',
  copyright: '',
  currencyPosition: 'left',
  decimalDigits: 2,
  cookiesText: '',
  // Business Rules
  commissionOrder: '',
  commissionDelivery: '',
  confirmOrder: 'marketer',
  orderNotification: false,
  // Free Delivery
  freeDeliveryEnabled: false,
  freeDeliveryType: 'all',
  freeDeliveryOver: 5000,
  // Additional Charge
  additionalChargeEnabled: false,
  additionalChargeName: 'Additional Charge',
  additionalChargeAmount: 10,
  // Payment
  paymentEnabled: false,
  paymentType: 'both',
  // Shipping
  minShipping: '',
  perKmShipping: '',
  // Maintenance
  maintenance: false,
};

const BusinessSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const location = useLocation();

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setSettings(initialSettings);
  };

  const handleSave = () => {
    // TODO: Implement save logic (API call)
    alert('Settings saved!');
  };

  return (
    <div className="business-settings-container">
      <main className="business-settings-main">
        <div className="settings-header">
          <h2><MdSettings size={24} style={{ marginRight: 8, verticalAlign: 'middle' }} /> Site settings</h2>
        </div>

        {/* Navigation Tabs */}
        <div className="settings-tabs">
          {tabList.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => isActive ? 'tab active' : 'tab'}
              end={tab.path === '/business-settings'}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>

        {/* Render subpages or default */}
        {location.pathname === '/business-settings' && (
          <>
            <section className="maintenance-mode-section">
              <div className="maintenance-mode-header">
                <MdSettings size={20} className="maintenance-icon" /> Maintenance mode
                <label className="switch">
                  <input type="checkbox" checked={settings.maintenance} onChange={e => handleChange('maintenance', e.target.checked)} />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="maintenance-desc">
                By turning the 'Maintenance Mode' ON all your apps and customer website will be disabled temporarily. Only the Admin Panel Admin Landing Page & Store Panel will be functional.
              </div>
            </section>
            <BusinessInfoSection settings={settings} onChange={handleChange} />
            <GeneralSettingsSection settings={settings} onChange={handleChange} />
            <BusinessRulesSection settings={settings} onChange={handleChange} />
            <FreeDeliverySection settings={settings} onChange={handleChange} />
            <AdditionalChargeSection settings={settings} onChange={handleChange} />
            <PaymentSection settings={settings} onChange={handleChange} />
            <ShippingChargeSection settings={settings} onChange={handleChange} />
            <SaveResetButtons onSave={handleSave} onReset={handleReset} />
          </>
        )}

        {/* For subpages, render <Outlet /> for nested routes */}
        {location.pathname !== '/business-settings' && <Outlet />}
      </main>
    </div>
  );
};

export default BusinessSettings; 