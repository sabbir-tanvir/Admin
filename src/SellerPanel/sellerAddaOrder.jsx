import React, { useState } from 'react';
import '../styles/SellerPanel/sellerAddaOrder.css';

function SellerAddaOrder() {
  const [orderItems, setOrderItems] = useState([
    { id: 1, customerName: 'Jack', productName: 'Jack', productId: '125056', quantity: 5, total: '70,000' }
  ]);

  const handleAddItem = () => {
    const newId = orderItems.length > 0 ? Math.max(...orderItems.map(item => item.id)) + 1 : 1;
    setOrderItems([...orderItems, { 
      id: newId, 
      customerName: '', 
      productName: '', 
      productId: '', 
      quantity: 0, 
      total: '0'
    }]);
  };

  const handleOrderSubmit = () => {
    // Handle order submission
    console.log('Order submitted:', orderItems);
    alert('Order submitted successfully!');
  };

  const handleCancel = () => {
    // Handle order cancellation
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrderItems([]);
    }
  };

  return (
    <div className="seller-add-order-container">
      <div className="seller-add-order-header">
        <h2>Add an Order</h2>
        <div className="seller-add-order-actions">
          <button className="order-submit-button" onClick={handleOrderSubmit}>Order</button>
          <button className="order-cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
      
      <div className="seller-add-order-table-container">
            <table className="seller-order-table">
              <thead>
                <tr>
                  <th>SI</th>
                  <th>Customer Name</th>
                  <th>Product Name</th>
                  <th>Product id</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        value={item.customerName}
                        onChange={(e) => {
                          const updatedItems = [...orderItems];
                          updatedItems[index].customerName = e.target.value;
                          setOrderItems(updatedItems);
                        }}
                        placeholder="Enter customer name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.productName}
                        onChange={(e) => {
                          const updatedItems = [...orderItems];
                          updatedItems[index].productName = e.target.value;
                          setOrderItems(updatedItems);
                        }}
                        placeholder="Enter product name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.productId}
                        onChange={(e) => {
                          const updatedItems = [...orderItems];
                          updatedItems[index].productId = e.target.value;
                          setOrderItems(updatedItems);
                        }}
                        placeholder="Enter product ID"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const updatedItems = [...orderItems];
                          updatedItems[index].quantity = e.target.value;
                          setOrderItems(updatedItems);
                        }}
                        placeholder="Enter quantity"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.total}
                        onChange={(e) => {
                          const updatedItems = [...orderItems];
                          updatedItems[index].total = e.target.value;
                          setOrderItems(updatedItems);
                        }}
                        placeholder="Enter total"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
        <div className="seller-add-order-controls">
          <button className="add-item-button" onClick={handleAddItem}>Add another item</button>
        </div>
      </div>
    </div>
  );
};

export default SellerAddaOrder;