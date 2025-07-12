import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MarketorPanel/OrderIdPage.css';

const OrderIdPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await fetch('/data/data.json');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                const allOrders = data.marketorOrders || [];
                const foundOrder = allOrders.find(o => o.orderId === orderId);

                if (foundOrder) {
                    // Add a placeholder image URL to the order data
                    foundOrder.imageUrl = 'https://via.placeholder.com/400x400.png?text=Product+Image';
                    setOrder(foundOrder);
                } else {
                    setError('Order not found.');
                }
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const getStatusClass = (status) => {
        if (!status) return '';
        const statusLower = status.toLowerCase();
        if (statusLower === 'completed') return 'status-completed';
        if (statusLower === 'processing') return 'status-processing';
        if (statusLower === 'shipped') return 'status-shipped';
        if (statusLower === 'cancelled') return 'status-cancelled';
        return '';
    };

    if (loading) {
        return <div className="loading-container">Loading order details...</div>;
    }

    if (error) {
        return <div className="error-container">Error: {error}</div>;
    }

    if (!order) {
        return <div className="container">Order not found.</div>;
    }

    return (
        <div className="order-id-page-container">
            <div className="order-id-header">
                <h2>Order Details</h2>
                <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
            </div>
            <div className="order-id-content">
                <div className="order-image-section">
                    <img src={order.imageUrl} alt={order.item} className="order-product-image" />
                </div>
                <div className="order-info-section">
                    <h1>{order.item}</h1>
                    <p className="order-id-text">Order ID: {order.orderId}</p>
                    <div className="order-details-grid">
                        <div className="detail-item">
                            <span className="detail-label">Customer:</span>
                            <span className="detail-value">{order.customer}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Date:</span>
                            <span className="detail-value">{new Date(order.date).toLocaleString()}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Quantity:</span>
                            <span className="detail-value">{order.quantity}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Price:</span>
                            <span className="detail-value">{order.price}</span>
                        </div>
                        <div className="detail-item">
                            <span className="detail-label">Status:</span>
                            <span className={`detail-value status ${getStatusClass(order.orderStatus)}`}>
                                {order.orderStatus}
                            </span>
                        </div>
                    </div>
                    <div className="order-actions">
                        <button className="action-button primary">Contact Customer</button>
                        <button className="action-button">Print Invoice</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderIdPage;
