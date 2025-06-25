import React from 'react';
import '../styles/components/Leftbar.css';

function LeftBar() {
  return (
    <div className="leftbar">
      <div className="leftbar-header">
        <h2>Admin <br /> Panel</h2>
      </div>
      <div className="leftbar-menu">
        <ul>
          <li><a href="#dashboard" className="active">Dashboard</a></li>
          <li><a href="#product-approval">Product Approval</a></li>
          <li><a href="#product">Product</a></li>
          <li><a href="#orders-overview">Orders Overview</a></li>
          <li><a href="#companies">Companies</a></li>
          <li><a href="#marketers">Marketers</a></li>
          <li><a href="#admin-analytics">Admin Analytics</a></li>
          <li><a href="#system-alerts">System Alerts</a></li>
          <li><a href="#platform-settings">Platform Settings</a></li>
          <li><a href="#logout">Logout</a></li>
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;