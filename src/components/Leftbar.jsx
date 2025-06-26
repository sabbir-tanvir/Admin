import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Leftbar.css';

function LeftBar() {
  return (
    <div className="leftbar">
      <div className="leftbar-header">
        <h2>Admin <br /> Panel</h2>
      </div>
      <div className="leftbar-menu">
        <ul>
          <li><Link to="/dashboard" className="active">Dashboard</Link></li>
          <li><Link to="/product">Product</Link></li>
          <li><Link to="/seller">Seller</Link></li>

          <li><Link to="/order">Orders Overview</Link></li>
          <li><Link to="#companies">Companies</Link></li>
          <li><Link to="/marketor">Marketers</Link></li>
          <li><Link to="#admin-analytics">Admin Analytics</Link></li>
          <li><Link to="#system-alerts">System Alerts</Link></li>
          <li><Link to="#platform-settings">Platform Settings</Link></li>
          <li><Link to="#logout">Logout</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default LeftBar;