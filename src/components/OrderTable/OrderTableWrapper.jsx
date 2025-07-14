import React, { useState, useEffect } from 'react';
import OrderTable from './OrderTable';
import ErrorBoundary from './ErrorBoundary';
import '../../styles/orderTable.css';

const OrderTableWrapper = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="order-container">
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          fontSize: '1.1rem', 
          color: '#666' 
        }}>
          Loading order data...
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <OrderTable />
    </ErrorBoundary>
  );
};

export default OrderTableWrapper; 