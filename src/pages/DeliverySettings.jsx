import React, { useState, useEffect } from 'react';
import { MdLocalShipping, MdLocationOn, MdAccessTime, MdAttachMoney } from 'react-icons/md';
import '../styles/pages/OrderSettings.css';

const DeliverySettings = () => {
  const [deliveryFee, setDeliveryFee] = useState(5);
  const [freeDeliveryThreshold, setFreeDeliveryThreshold] = useState(50);
  const [deliveryTime, setDeliveryTime] = useState(30);
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch delivery data from JSON file
    fetch('/deliveryData.json')
      .then(response => response.json())
      .then(data => {
        setDeliveryZones(data.deliveryZones);
        setDeliveryFee(data.deliverySettings.baseDeliveryFee);
        setFreeDeliveryThreshold(data.deliverySettings.freeDeliveryThreshold);
        setDeliveryTime(data.deliverySettings.estimatedDeliveryTime);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading delivery data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="order-settings-wrapper">
        <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.1rem', color: '#666' }}>
          Loading delivery data...
        </div>
      </div>
    );
  }

  return (
    <div className="order-settings-wrapper">
      {/* Delivery Settings Card */}
      <div className="order-settings-card">
        <div className="order-settings-row">
          <div style={{display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600}}>
            <MdLocalShipping style={{fontSize: 24}} /> Delivery Management Settings
          </div>
        </div>
        <div className="order-settings-row">
          <div className="order-settings-interval-group">
            <span>Base Delivery Fee ($)</span>
            <div className="order-settings-interval-inputs">
              <input 
                type="number" 
                value={deliveryFee} 
                onChange={e => setDeliveryFee(e.target.value)}
                min="0"
                step="0.5"
              />
              <span style={{fontSize: '1rem', color: '#666'}}>$</span>
            </div>
          </div>
          <div className="order-settings-interval-group">
            <span>Free Delivery Threshold ($)</span>
            <div className="order-settings-interval-inputs">
              <input 
                type="number" 
                value={freeDeliveryThreshold} 
                onChange={e => setFreeDeliveryThreshold(e.target.value)}
                min="0"
              />
              <span style={{fontSize: '1rem', color: '#666'}}>$</span>
            </div>
          </div>
          <div className="order-settings-interval-group">
            <span>Estimated Delivery Time (min)</span>
            <div className="order-settings-interval-inputs">
              <input 
                type="number" 
                value={deliveryTime} 
                onChange={e => setDeliveryTime(e.target.value)}
                min="10"
                max="120"
              />
              <span style={{fontSize: '1rem', color: '#666'}}>min</span>
            </div>
          </div>
        </div>
        <div className="order-settings-btn-row">
          <button className="order-reset-btn" type="button">Reset</button>
          <button className="order-save-btn" type="button">Save</button>
        </div>
      </div>

      {/* Delivery Zones Card */}
      <div className="order-cancel-table-card">
        <div className="order-cancel-table-title">Delivery Zones</div>
        <div className="order-cancel-table-controls">
          <input className="order-cancel-table-search" placeholder="Search zones" />
          <button className="order-cancel-table-export">Export</button>
          <button className="order-cancel-table-filter">Filter</button>
        </div>
        <table className="order-cancel-table">
          <thead>
            <tr>
              <th>Zone ID</th>
              <th>Zone Name</th>
              <th>Delivery Fee</th>
              <th>Delivery Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveryZones.map((zone) => (
              <tr key={zone.id}>
                <td>{zone.id}</td>
                <td>{zone.name}</td>
                <td>${zone.fee}</td>
                <td>{zone.time}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    backgroundColor: zone.status === 'active' ? '#d1f7c4' : '#fee2e2',
                    color: zone.status === 'active' ? '#15803d' : '#dc2626'
                  }}>
                    {zone.status}
                  </span>
                </td>
                <td>
                  <button className="order-cancel-action-edit" title="Edit"><MdLocationOn /></button>
                  <button className="order-cancel-action-delete" title="Delete"><MdLocalShipping /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliverySettings; 