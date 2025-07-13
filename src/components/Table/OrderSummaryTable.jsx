import React from 'react';
import '../../styles/components/OrderSummaryTable.css';

const OrderSummaryTable = ({ orders }) => {
  return (
    <div className="order-summary-table-wrapper">
      <table className="order-summary-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.amount.toLocaleString()}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummaryTable; 