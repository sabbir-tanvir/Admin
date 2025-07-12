import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MarketorPanel/mAddProduct.css';
const MarketorProductAdd = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    // Product state with sample data (would be fetched from API in real app)
    const [product, setProduct] = useState({
        id: productId || '1',
        name: 'Gasket',
        category: 'Valve',
        purchasingCost: '60000',
        shopName: 'Industrial Supplies Ltd',
        address: '123 Factory Lane, Industrial District',
        price: '80000',
        minPrice: '70000',
        productInfo: 'Industrial grade gasket for high-pressure pipeline connections. Made with durable materials that can withstand extreme conditions.',
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Updated product data:', product);
        // Would send update to API here
        alert('Product updated successfully!');
    };

    // Handle cancel action
    const handleCancel = () => {
        // Navigate back to products list
        navigate('/productlist');
    };

    return (
        <div className="product-update-page">
            <div className="product-update-wrapper">
                <div className="product-update-header">
                    <h1>Product Update</h1>
                    <div className="action-buttons">
                        <button type="button" className="update-btn" onClick={handleSubmit}>Add</button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>cancel</button>
                    </div>
                </div>

                <form className="product-update-content">
                    <div className="product-image-column">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="product-image"
                        />
                    </div>

                    <div className="product-form-column">
                                <div className="form-row">
                                    <div className="form-field">
                                        <label className="name-label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={product.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label className="category-label">Catagory</label>
                                        <input
                                            type="text"
                                            name="category"
                                            value={product.category}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-field">
                                        <label className="cost-label">Purchasing cost</label>
                                        <input
                                            type="text"
                                            name="purchasingCost"
                                            value={product.purchasingCost}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label className="shop-label">Shop Name</label>
                                        <input
                                            type="text"
                                            name="shopName"
                                            value={product.shopName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                
                                <div className="price-info-container">
                                    <div className="price-section">
                                        <div className="form-field">
                                        <label className="address-label">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={product.address}
                                            onChange={handleInputChange}
                                            className="form-input"
                                        />
                                    </div>
                                       

                                        
                                    </div>

                                    <div className="info-section">
                                        <div className="form-field">
                                            <label className="info-label">Product info</label>
                                            <textarea
                                                name="productInfo"
                                                value={product.productInfo}
                                                onChange={handleInputChange}
                                                rows="2"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>



                        </div>
                    </form>
            </div>
        </div>
    );
};

export default MarketorProductAdd;

