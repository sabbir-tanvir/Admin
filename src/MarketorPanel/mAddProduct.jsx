import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MarketorPanel/mAddProduct.css';
import { createProductRequest } from '../services/api.js';

const MarketorProductAdd = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        description: '',
        category: '', // numeric ID expected
        price: '',
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        const file = e.target.files?.[0];
        setImage(file || null);
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        // Basic validation
        if (!form.name || !form.description || !form.category || !form.price || !image) {
            alert('All fields including image are required');
            return;
        }
        setSubmitting(true);
        try {
            await createProductRequest({ ...form, image });
            alert('Product request submitted');
            navigate('/marketor-panel/product');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => navigate('/marketor-panel/product');

    return (
        <div className="product-update-page">
            <div className="product-update-wrapper">
                <div className="product-update-header">
                    <h1>Add Product</h1>
                    <div className="action-buttons">
                        <button type="button" className="update-btn" onClick={handleSubmit} disabled={submitting}>{submitting ? 'Submitting...' : 'Add'}</button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                <form className="product-update-content" onSubmit={handleSubmit}>
                    <div className="product-image-column">
                        {preview ? (
                            <img src={preview} alt={form.name || 'preview'} className="product-image" />
                        ) : (
                            <div className="product-image placeholder">Image Preview</div>
                        )}
                        <input type="file" accept="image/*" onChange={handleImage} />
                    </div>
                    <div className="product-form-column">
                        <div className="form-row">
                            <div className="form-field">
                                <label className="name-label">Name</label>
                                <input name="name" value={form.name} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label className="category-label">Category ID</label>
                                <input name="category" value={form.category} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-field">
                                <label className="cost-label">Price</label>
                                <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" />
                            </div>
                        </div>
                        <div className="price-info-container">
                            <div className="info-section" style={{ width: '100%' }}>
                                <div className="form-field">
                                    <label className="info-label">Description</label>
                                    <textarea name="description" value={form.description} onChange={handleChange} rows="4" />
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

