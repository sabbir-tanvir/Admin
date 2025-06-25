import React from 'react';
import { createSVGPlaceholder } from '../../utils/placeholderUtils';
import '../../styles/components/UserList.css';

/**
 * Reusable UserList Component for displaying customers and marketers
 * @param {Array} users - Array of user objects (limited to first 4)
 * @param {string} type - Type of users ('customers' or 'marketers')
 */
function UserList({ users, type = 'customers' }) {
  // Limit to exactly 4 people to prevent scrolling
  const limitedUsers = users.slice(0, 4);
  
  return (
    <div className="user-list">
      {limitedUsers.map((user, index) => (
        <div key={index} className="user-item">
          <div className="user-avatar">
            <img 
              src={user.avatar || createSVGPlaceholder(user.name?.charAt(0) || 'U', 60, 60, '#e9ecef', '#6c757d')} 
              alt={user.name || 'User'}
              onError={(e) => {
                e.target.src = createSVGPlaceholder(user.name?.charAt(0) || 'U', 60, 60, '#e9ecef', '#6c757d');
              }}
            />
          </div>
          <div className="user-info">
            <div className="user-name">Name: {user.name}</div>
            <div className="user-contact">Contact: {user.contact}</div>
          </div>
          <div className="user-stats">
            <div className="user-orders">
              {type === 'customers' ? `Order ${user.orders}` : `Sales ${user.sales}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
