import React, { useState } from 'react';
import '../styles/pages/Profile.css';
import Navbar from '../components/Navbar';
import LeftBar from '../components/Leftbar';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '01000000000',
    email: 'Example@gmail.com'
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveBasicInfo = () => {
    console.log('Saving basic info:', formData);
    // Add save logic here
  };

  const handleSavePassword = () => {
    console.log('Saving password:', passwordData);
    // Add password save logic here
  };

  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        <LeftBar />
        <div className="profile-page">
          <div className="profile-container">
            {/* Top Section - Avatar */}
            <div className="profile-top-section">
              <div className="profile-avatar-section">
                <div className="profile-avatar-container">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Admin Profile"
                    className="profile-avatar-image"
                  />
                  <button className="edit-avatar-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Section - Basic Information */}
            <div className="profile-middle-section">
              <h3 className="section-title">Basic Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Full name</label>

                  <div className="form-row-inputs">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSaveBasicInfo}>
                  Save
                </button>
              </div>
            </div>

            {/* Bottom Section - Password */}
            <div className="profile-bottom-section">
              <h3 className="section-title">Change Your Password</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="8+ character needed"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="8+ character needed"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="save-btn" onClick={handleSavePassword}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;