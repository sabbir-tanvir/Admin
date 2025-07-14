import React, { useState } from 'react';
import { MdEdit, MdDelete, MdSettings } from 'react-icons/md';
import '../styles/pages/OrderSettings.css';

const RefundSettings = () => {
  const [refundMode, setRefundMode] = useState(false);
  const [refundReason, setRefundReason] = useState('');
  const [reasonList, setReasonList] = useState([
    { id: 1, reason: 'I ordered the wrong food', type: 'Customer', status: false },
    { id: 2, reason: 'I have a food allergy', type: 'Customer', status: false }
  ]);

  const handleAddReason = () => {
    if (refundReason.trim()) {
      setReasonList([
        ...reasonList,
        { id: reasonList.length + 1, reason: refundReason, type: 'Customer', status: true }
      ]);
      setRefundReason('');
    }
  };

  return (
    <>
      <div className="order-settings-wrapper">
        {/* Refund Request Mode Card */}
        <div className="order-settings-card">
          <div className="order-settings-row" style={{marginBottom: 0}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600}}>
              <MdSettings style={{fontSize: 22}} /> Refund Request Mode
            </div>
            <label className="switch">
              <input type="checkbox" checked={refundMode} onChange={e => setRefundMode(e.target.checked)} />
              <span className="slider round"></span>
            </label>
          </div>
          <div style={{marginTop: 8, fontSize: '0.97rem', color: '#222', fontWeight: 500}}>
            *Customers cannot request a Refund if the Admin does not specify a cause for refund even though they see the Refund option. So Admin MUST provide a proper Refund Reason. At least one reason Must be ON in the reason list.
          </div>
        </div>

        {/* Add Refund Reason Card */}
        <div className="order-settings-card">
          <div className="order-cancel-title" style={{marginBottom: 8}}>Add a Refund Reason</div>
          <div style={{fontWeight: 500, marginBottom: 6}}>Order Refund Reason (Default)</div>
          <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
            <input
              type="text"
              value={refundReason}
              onChange={e => setRefundReason(e.target.value)}
              style={{flex: 1, border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 14px', fontSize: '1rem', background: '#fafbfc'}}
            />
            <button className="order-save-btn" style={{minWidth: 90}} onClick={handleAddReason}>Add</button>
          </div>
        </div>

        {/* Refund Reason List Table */}
        <div className="order-cancel-table-card">
          <div className="order-cancel-table-title">Order Cancellation Reason list</div>
          <div className="order-cancel-table-controls">
            <input className="order-cancel-table-search" placeholder="Ex.10001" />
            <button className="order-cancel-table-export">Export</button>
            <button className="order-cancel-table-filter">Filter</button>
          </div>
          <table className="order-cancel-table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Reason</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reasonList.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.reason}</td>
                  <td>{item.type}</td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" checked={item.status} onChange={() => {
                        const updated = reasonList.map((r, i) => i === idx ? { ...r, status: !r.status } : r);
                        setReasonList(updated);
                      }} />
                      <span className="slider round"></span>
                    </label>
                  </td>
                  <td>
                    <button className="order-cancel-action-edit"><MdEdit /></button>
                    <button className="order-cancel-action-delete"><MdDelete /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RefundSettings; 