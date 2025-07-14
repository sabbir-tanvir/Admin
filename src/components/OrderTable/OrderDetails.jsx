import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderDetails, getPaymentHistory } from '../../services/api';
import '../../styles/Cards/orderTable.css';
import '../../styles/components/BluePagination.css';
import axios from 'axios';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payments, setPayments] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    setLoading(true);
    getOrderDetails(orderId)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch order details');
        setLoading(false);
      });
    // Fetch payment history for the order
    getPaymentHistory(orderId)
      .then(res => {
        setPayments(res.data.payments || []);
        setPaymentSummary(res.data.summary || null);
      })
      .catch(() => {
        setPayments([]);
        setPaymentSummary(null);
      });
    // Fetch all orders for navigation
    axios.get('/orderId.json').then(res => {
      setAllOrders(res.data);
    });
  }, [orderId]);

  // Find current order index
  const currentIndex = allOrders.findIndex(o => o.orderId === orderId);
  const prevOrderId = currentIndex > 0 ? allOrders[currentIndex - 1]?.orderId : null;
  const nextOrderId = currentIndex < allOrders.length - 1 ? allOrders[currentIndex + 1]?.orderId : null;
  
  // Pagination props for BluePagination
  const currentPage = currentIndex + 1; // 1-based indexing
  const totalPages = allOrders.length;
  
  const handlePageChange = (page) => {
    const targetOrderId = allOrders[page - 1]?.orderId;
    if (targetOrderId) {
      navigate(`/order/${targetOrderId}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>No order found</div>;

  return (
    <div className="order-details-container">
      <div className="order-details-header-row">
        <h2 className="main-heading">Order Id # {order.orderId}</h2>
        <div className="order-details-nav-btns">
          {/* Previous Order Button */}
          <button 
            className="blue-pagination-btn blue-pagination-arrow"
            onClick={() => prevOrderId && navigate(`/order/${prevOrderId}`)}
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
            onClick={() => nextOrderId && navigate(`/order/${nextOrderId}`)}
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
      <div className="order-details-main">
        {/* Left: order info + table; Right: customer, delivery, payment cards */}
        <div style={{gridColumn: '1 / span 1', display: 'flex', flexDirection: 'column', gap: 18}}>
          <div className="order-info-box" style={{marginBottom: 18}}>
            <div>
              <div><span className="label-bold">Order date</span> : {order.date || '-'}</div>
              <div><span className="label-bold">Marketers name</span> : {order.marketerName || '-'}</div>
              <div><span className="label-bold">Seller name</span> : {order.sellerName || '-'}</div>
              <div><span className="label-bold">Company name</span> : {order.company || '-'}</div>
            </div>
            <div className="vertical-divider" />
            <div>
              <div><span className="label-bold">Order Status</span> : <span className="status-text delivered">{order.status}</span></div>
              <div><span className="label-bold">payment method</span> : {order.paymentMethod || '-'}</div>
              <div><span className="label-bold">Payment Status</span> : <span className={`status-text ${order.paymentStatus === 'Paid' ? 'paid' : 'due'}`}>{order.paymentStatus}</span></div>
            </div>
          </div>
          <div className="order-details-table-wrapper">
            <table className="order-details-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product name</th>
                  <th>Code</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Offer price</th>
                  <th>Final price</th>
                </tr>
              </thead>
              <tbody>
                {order.products && order.products.length > 0 ? order.products.map((product, idx) => (
                  <tr key={product.code || idx}>
                    <td>{idx + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.code}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.offerPrice}</td>
                    <td>{product.finalPrice}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="7">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="order-details-right-col" style={{gridColumn: '2 / span 1'}}>
          <div className="customer-info-box">
            <h3 className="section-heading">Customer info</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={order.customerImage || "https://randomuser.me/api/portraits/men/32.jpg"} alt="customer" />
              <div>
                <div><span className="label-bold">Name:</span> {order.customer}</div>
                <div><span className="label-bold">Contact:</span> {order.phone}</div>
                <div><span className="label-bold">Mail:</span> {order.email || '-'}</div>
                <div><span className="label-bold">Address:</span> {order.address || '-'}</div>
              </div>
            </div>
          </div>
          <div className="delivery-info-box">
            <h3 className="section-heading">Delivery info</h3>
            <div><span className="label-bold">Name:</span> {order.customer}</div>
            <div><span className="label-bold">Contact:</span> {order.phone}</div>
            <div><span className="label-bold">Address:</span> {order.address || '-'}</div>
          </div>
          <div className="payment-history-box">
            <h3 className="section-heading">Payment History</h3>
            <div className="payment-history-table-wrapper">
              <table className="payment-history-table">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Payment date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments && payments.length > 0 ? payments.slice(0, 3).map((p, idx) => (
                    <tr key={p.id || idx}>
                      <td>{p.amount}</td>
                      <td>{p.date}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan="2">No payment history found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <button className="view-all-btn" onClick={() => navigate(`/order/${order.orderId}/payments`)}>
              View all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 