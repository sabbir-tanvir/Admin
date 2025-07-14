import React, { useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import '../styles/pages/OrderSettings.css';

const OrderSettings = () => {
  const [orderDeliveryVerification, setOrderDeliveryVerification] = useState(false);
  const [scheduleOrder, setScheduleOrder] = useState(false);
  const [homeDelivery, setHomeDelivery] = useState(false);
  const [timeInterval, setTimeInterval] = useState('');
  const [timeUnit, setTimeUnit] = useState('min');
  const [cancelReason, setCancelReason] = useState('');
  const [userType, setUserType] = useState('');
  const [reasonList, setReasonList] = useState([
    { id: 1, reason: 'I ordered the wrong food', type: 'Customer', status: false }
  ]);

  return (
    <>
      <div className="order-settings-wrapper">
        {/* Main Card */}
        <div className="order-settings-card">
          <div className="order-settings-row">
            <div className="order-settings-toggle-group">
              <span>Order delivery verification</span>
              <label className="switch">
                <input type="checkbox" checked={orderDeliveryVerification} onChange={e => setOrderDeliveryVerification(e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="order-settings-toggle-group">
              <span>Schedule Order</span>
              <label className="switch">
                <input type="checkbox" checked={scheduleOrder} onChange={e => setScheduleOrder(e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="order-settings-toggle-group">
              <span>Home Delivery</span>
              <label className="switch">
                <input type="checkbox" checked={homeDelivery} onChange={e => setHomeDelivery(e.target.checked)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="order-settings-row">
            <div className="order-settings-interval-group">
              <span>Time Interval for Scheduled Delivery</span>
              <div className="order-settings-interval-inputs">
                <input type="text" value={timeInterval} onChange={e => setTimeInterval(e.target.value)} />
                <select value={timeUnit} onChange={e => setTimeUnit(e.target.value)}>
                  <option value="min">min</option>
                  <option value="hour">hour</option>
                </select>
              </div>
            </div>
          </div>
          <div className="order-settings-btn-row">
            <button className="order-reset-btn" type="button">Reset</button>
            <button className="order-save-btn" type="button">Save</button>
          </div>
        </div>

        {/* Order Cancellation Card */}
        <div className="order-cancel-card">
          <div className="order-cancel-title">Order Cancellation Messages</div>
          <div className="order-cancel-form-row">
            <div className="order-cancel-form-group">
              <span>Shipping Charge</span>
            </div>
          </div>
          <div className="order-cancel-form-row">
            <div className="order-cancel-form-group" style={{ flex: 2 }}>
              <span>Order Cancellation Reason (Default)</span>
              <input type="text" value={cancelReason} onChange={e => setCancelReason(e.target.value)} />
              <div className="order-cancel-note">
                *Users cannot cancel an order if the Admin does not specify a cause for cancellation even though they see the 'Cancel Order' option. So Admin MUST provide a proper Order Cancellation Reason and select the related user.
              </div>
            </div>
            <div className="order-cancel-form-group" style={{ flex: 1 }}>
              <span>User Type</span>
              <select value={userType} onChange={e => setUserType(e.target.value)}>
                <option value="">Select</option>
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="order-cancel-btn-row">
            <button className="order-reset-btn" type="button">Reset</button>
            <button className="order-save-btn" type="button">Submit</button>
          </div>
        </div>

        {/* Order Cancellation Reason List Table */}
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

export default OrderSettings; 