import React from "react";
import { FiEye, FiPrinter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Table = ({ orders, page, pageSize }) => {
  const navigate = useNavigate();

  const view = (o) => navigate(`/order/${o.orderId}`);

  const print = (o) => {
    const html = `
      <html><body><h2>Order ${o.orderId}</h2><p>${o.customer} (${o.phone})</p><p>${o.date}</p><p>${o.company}</p><p>${o.quantity} x $${o.price}</p><p>Status: ${o.status}</p></body></html>`;
    const win = window.open("", "", "width=600,height=400");
    win.document.write(html);
    win.document.close();
    win.print();
    win.close();
  };

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Sl</th>
          <th>Order ID</th>
          <th>Date</th>
          <th>Customer</th>
          <th>Company</th>
          <th>Item Quantity</th>
          <th>Price</th>
          <th>Order Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length === 0 ? (
          <tr><td colSpan="9">No orders found</td></tr>
        ) : (
          orders.map((o, i) => (
            <tr key={o.orderId}>
              <td>{(page - 1) * pageSize + i + 1}</td>
              <td>{o.orderId}</td>
              <td>{o.date}</td>
              <td>{o.customer}<br /><small>{o.phone}</small></td>
              <td>{o.company}</td>
              <td>{o.quantity}</td>
              <td>${o.price}</td>
              <td>
                <span className={`status ${o.status.toLowerCase()}`}>{o.status}</span>
              </td>
              <td className="action-col">
                <button className="icon-btn view" onClick={() => view(o)}><FiEye /></button>
                <button className="icon-btn print" onClick={() => print(o)}><FiPrinter /></button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
export default Table;