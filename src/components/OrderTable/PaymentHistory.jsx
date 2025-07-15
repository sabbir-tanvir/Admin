import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaymentHistory } from '../../services/api';
import axios from 'axios';
import '../../styles/Cards/orderTable.css';
import '../../styles/components/BluePagination.css';

const PaymentHistory = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPaymentHistory(orderId)
      .then(res => {
        setPayments(res.data?.payments || []);
        setSummary(res.data?.summary || null);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch payment history');
        setLoading(false);
      });
    // Fetch all orders for navigation
    axios.get('/orderId.json').then(res => {
      setAllOrders(res.data);
    });
  }, [orderId]);

  // add nothing

  // Find current order index
  const currentIndex = allOrders.findIndex(o => o.orderId === orderId);
  const prevOrderId = currentIndex > 0 ? allOrders[currentIndex - 1]?.orderId : null;
  const nextOrderId = currentIndex < allOrders.length - 1 ? allOrders[currentIndex + 1]?.orderId : null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="payment-history-container">
      <div className="order-details-header-row">
        <h2 className="main-heading">Order Id # {orderId}</h2>
        <div className="order-details-nav-btns">
          {/* Previous Order Button */}
          <button 
            className="blue-pagination-btn blue-pagination-arrow"
            onClick={() => prevOrderId && navigate(`/order/${prevOrderId}/payments`)}
            disabled={!prevOrderId}
            aria-label="Previous order"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 30 30" fill="none">
              <path d="M15 0.9375C7.23375 0.9375 0.9375 7.23375 0.9375 15C0.9375 22.7663 7.23375 29.0625 15 29.0625C22.7663 29.0625 29.0625 22.7663 29.0625 15C29.0625 7.23375 22.7663 0.9375 15 0.9375ZM22.9688 17.5444H14.2064V22.5L7.03125 15L14.2064 7.5V12.7233H22.9688V17.5444Z" fill="#005967"/>
            </svg>
          </button>

          {/* Next Order Button */}
          <button 
            className="blue-pagination-btn blue-pagination-arrow"
            onClick={() => nextOrderId && navigate(`/order/${nextOrderId}/payments`)}
            disabled={!nextOrderId}
            aria-label="Next order"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 30 30" fill="none">
              <g clipPath="url(#clip0_176_120)">
                <path d="M15 0.9375C22.7663 0.9375 29.0625 7.23375 29.0625 15C29.0625 22.7663 22.7663 29.0625 15 29.0625C7.23375 29.0625 0.9375 22.7663 0.9375 15C0.9375 7.23375 7.23375 0.9375 15 0.9375ZM7.03125 17.5444H15.7936V22.5L22.9688 15L15.7936 7.5V12.7233H7.03125V17.5444Z" fill="#005967"/>
              </g>
              <defs>
                <clipPath id="clip0_176_120">
                  <rect width="30" height="30" fill="white" transform="matrix(-1 0 0 1 30 0)"/>
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <h3 className="section-heading">Payment History</h3>
      <div className="payment-history-row">
        <div className="customer-info-box">
          <h3 className="section-heading">Customer info</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={summary?.customerImage || "https://randomuser.me/api/portraits/men/32.jpg"} alt="customer" />
            <div>
              <div><span className="label-bold">Name:</span> {summary?.customer || '-'}</div>
              <div><span className="label-bold">Contact:</span> {summary?.phone || '-'}</div>
              <div><span className="label-bold">Mail:</span> {summary?.email || '-'}</div>
              <div><span className="label-bold">Address:</span> {summary?.address || '-'}</div>
            </div>
          </div>
        </div>
        <div className="delivery-info-box">
          <h3 className="section-heading">Delivery info</h3>
          <div><span className="label-bold">Name:</span> {summary?.customer || '-'}</div>
          <div><span className="label-bold">Contact:</span> {summary?.phone || '-'}</div>
          <div><span className="label-bold">Address:</span> {summary?.address || '-'}</div>
        </div>
        <div className="payment-status-box">
          <h3 className="section-heading">Payment status</h3>
          <div><span className="label-bold">Paid :</span> {summary?.paidAmount || 0}</div>
          <div><span className="label-bold">Due:</span> {summary?.dueAmount || 0}</div>
          {summary?.dueAmount > 0 && <button>Due</button>}
        </div>
      </div>
      <div className="payment-history-table-wrapper">
        <table className="payment-history-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Paid</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? payments.map((p, idx) => (
              <tr key={p.id || idx}>
                <td>{p.amount}</td>
                <td>{p.date}</td>
                <td>{p.paid}</td>
                <td>{p.due}</td>
              </tr>
            )) : (
              <tr><td colSpan="4">No payment history found</td></tr>
            )}
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                <button>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory; 