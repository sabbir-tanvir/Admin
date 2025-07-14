import React, { useState, useEffect } from 'react';
import { MdStore, MdPerson, MdAttachMoney, MdCheckCircle, MdCancel } from 'react-icons/md';
import '../styles/pages/OrderSettings.css';

const SellerSettings = () => {
  const [sellerCommission, setSellerCommission] = useState(15);
  const [autoApproval, setAutoApproval] = useState(false);
  const [sellerList, setSellerList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch seller data from JSON file
    fetch('/sellerData.json')
      .then(response => response.json())
      .then(data => {
        setSellerList(data.sellers);
        setSellerCommission(data.sellerSettings.defaultCommission);
        setAutoApproval(data.sellerSettings.autoApproval);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading seller data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="order-settings-wrapper">
        <div style={{ textAlign: 'center', padding: '2rem', fontSize: '1.1rem', color: '#666' }}>
          Loading seller data...
        </div>
      </div>
    );
  }

  return (
    <div className="order-settings-wrapper">
      {/* Seller Management Card */}
      <div className="order-settings-card">
        <div className="order-settings-row">
          <div style={{display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600}}>
            <MdStore style={{fontSize: 24}} /> Seller Management Settings
          </div>
        </div>
        <div className="order-settings-row">
          <div className="order-settings-toggle-group">
            <span>Auto-approve new sellers</span>
            <label className="switch">
              <input type="checkbox" checked={autoApproval} onChange={e => setAutoApproval(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="order-settings-interval-group">
            <span>Default Commission Rate (%)</span>
            <div className="order-settings-interval-inputs">
              <input 
                type="number" 
                value={sellerCommission} 
                onChange={e => setSellerCommission(e.target.value)}
                min="0"
                max="50"
              />
              <span style={{fontSize: '1rem', color: '#666'}}>%</span>
            </div>
          </div>
        </div>
        <div className="order-settings-btn-row">
          <button className="order-reset-btn" type="button">Reset</button>
          <button className="order-save-btn" type="button">Save</button>
        </div>
      </div>

      {/* Seller List Card */}
      <div className="order-cancel-table-card">
        <div className="order-cancel-table-title">Registered Sellers</div>
        <div className="order-cancel-table-controls">
          <input className="order-cancel-table-search" placeholder="Search sellers..." />
          <button className="order-cancel-table-export">Export</button>
          <button className="order-cancel-table-filter">Filter</button>
        </div>
        <table className="order-cancel-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Commission</th>
              <th>Products</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerList.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.id}</td>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    backgroundColor: seller.status === 'active' ? '#d1f7c4' : '#fef3c7',
                    color: seller.status === 'active' ? '#15803d' : '#d97706'
                  }}>
                    {seller.status}
                  </span>
                </td>
                <td>{seller.commission}%</td>
                <td>{seller.products}</td>
                <td>
                  <button className="order-cancel-action-edit" title="Edit"><MdPerson /></button>
                  <button className="order-cancel-action-delete" title="Delete"><MdCancel /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerSettings; 