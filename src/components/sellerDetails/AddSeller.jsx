import React, { useState } from 'react';
import '../../styles/sellerDetails/AddSeller.css';

function AddSeller() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contact: '',
    email: '',
    company: '',
    address: '',
    productCategory: '',
    businessType: '',
    profileImage: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      contact: '',
      email: '',
      company: '',
      address: '',
      productCategory: '',
      businessType: '',
      profileImage: null
    });
  };

  return (
    <div className="add-seller-page">
      <div className="add-seller-container">
            <h1 className="page-title">Add a Seller</h1>
            
            <div className="form-content">
              <div className="form-left">
                <div className="image-upload-section">
                  <div className="image-preview">
                    {formData.profileImage ? (
                      <img 
                        src={URL.createObjectURL(formData.profileImage)} 
                        alt="Profile preview"
                        className="preview-image"
                      />
                    ) : (
                      <div className="placeholder-image">
                        <img 
                          src="/api/placeholder/200/250" 
                          alt="Default profile"
                          className="default-image"
                        />
                      </div>
                    )}
                  </div>
                  <label htmlFor="image-upload" className="upload-button">
                    Add a picture
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className="form-right">
                <div className="form-section">
                  <h3 className="section-title">Name</h3>
                  <div className="input-row">
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

                <div className="form-section">
                  <div className="input-row">
                    <div className="input-group">
                      <h3 className="section-title">Contact</h3>
                      <input
                        type="tel"
                        name="contact"
                        placeholder="01********"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="input-group">
                      <h3 className="section-title">Email</h3>
                      <input
                        type="email"
                        name="email"
                        placeholder="seller@company.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="input-row">
                    <div className="input-group">
                      <h3 className="section-title">Company Name</h3>
                      <input
                        type="text"
                        name="company"
                        placeholder="Company name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                    <div className="input-group">
                      <h3 className="section-title">Business Type</h3>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Select Business Type</option>
                        <option value="Retail">Retail</option>
                        <option value="Wholesale">Wholesale</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Service">Service</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="input-row">
                    <div className="input-group">
                      <h3 className="section-title">Product Category</h3>
                      <select
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleInputChange}
                        className="form-input"
                      >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Food">Food & Beverages</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Health">Health & Beauty</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <h3 className="section-title">Address</h3>
                      <input
                        type="text"
                        name="address"
                        placeholder="Company address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    ADD
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default AddSeller;
