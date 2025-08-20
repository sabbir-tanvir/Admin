import React from 'react';
import '../styles/pages/Profile.css';

// Simple clone of Profile for marketer role (can diverge later)
export default function MarketerProfile() {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-top-section">
          <div className="profile-avatar-section">
            <div className="profile-avatar-container">
              <img
                src="https://via.placeholder.com/150"
                alt="Marketer Profile"
                className="profile-avatar-image"
              />
            </div>
          </div>
        </div>
        <div className="profile-middle-section">
          <h3 className="section-title">Marketer Profile</h3>
          <p style={{padding:'8px 0'}}>Basic marketer info page placeholder.</p>
        </div>
      </div>
    </div>
  );
}
