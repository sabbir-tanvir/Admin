import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('OrderTable Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="order-container">
          <div style={{ 
            textAlign: 'center', 
            padding: '2rem', 
            fontSize: '1.1rem', 
            color: '#dc3545' 
          }}>
            <h3>Something went wrong with the order table.</h3>
            <p>Please refresh the page or contact support if the problem persists.</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 