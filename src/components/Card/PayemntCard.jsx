import React from 'react';
import '../../styles/Cards/PaymentCard.css';

/**
 * PaymentCard Component - Reusable card for displaying payment information
 * 
 * @param {string} type - Type of payment card: 'payment' or 'commission'
 * @param {string} title - Custom title (optional, will use default based on type)
 * @param {string} paidAmount - Amount that has been paid
 * @param {string} dueAmount - Amount that is due (optional, only for payment type)
 * @param {string} totalAmount - Total amount (for commission type)
 * @param {function} onClick - Click handler function
 * @param {string} className - Additional CSS classes
 */
const PaymentCard = ({ 
  type = 'payment', // 'payment' or 'commission'
  title,
  paidAmount,
  dueAmount,
  totalAmount,
  onClick,
  className = ''
}) => {
  const getTitle = () => {
    if (title) return title;
    return type === 'commission' ? 'Commission Amount' : 'Payment status';
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`payment-card ${className}`} 
      onClick={handleClick}
    >
      <div className="payment-card-header">
        <h3 className="payment-card-title">{getTitle()}</h3>
      </div>
      
      <div className="payment-card-content">
        {type === 'commission' ? (
          <div className="payment-amount-section">
            <span className="payment-amount">{totalAmount || '$0'}</span>
          </div>
        ) : (
          <div className="payment-details">
            <div className="payment-item">
              <span className="payment-label">Paid :</span>
              <span className="payment-value">{paidAmount || '$0'}</span>
            </div>
            <div className="payment-item">
              <span className="payment-label">Due :</span>
              <span className="payment-value">{dueAmount || '$0'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCard;