import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MarketorPanel/mAddProduct.module.css';
import { createProductRequest } from '../services/api.js';
import { toast } from 'react-toastify';

const MarketorProductAdd = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        description: '',
        category: '', // numeric ID expected
        price: '',
        sku: '',
        brand: '',
        imported_from: '',
        stock: '',
        tagsText: '', // comma-separated input; will be split into array on submit
        is_imported: false,
        rating: '',
    });
    const [preview, setPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [dragMain, setDragMain] = useState(false);
    const [dragGallery, setDragGallery] = useState(false);
    const mainInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleImage = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else setPreview(null);
    };

    const handleGallery = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const urls = files.map(f => URL.createObjectURL(f));
        setGalleryPreviews(prev => [...prev, ...urls]);
    };

    // Drag and drop handlers
    const onDropMain = (e) => {
        e.preventDefault();
        setDragMain(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(file));
        }
    };
    const onDropGallery = (e) => {
        e.preventDefault();
        setDragGallery(false);
        const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('image/'));
        if (files.length) {
            setGalleryPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
        }
    };
    const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleRemoveGallery = (idx) => {
        setGalleryPreviews(prev => prev.filter((_, i) => i !== idx));
    };
    const clearGallery = () => { setGalleryPreviews([]); };
    const clearMain = () => { setPreview(null); };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        // Minimal required validation for JSON endpoint
        if (!form.name || !form.description || !form.category || !form.price || !form.sku || !preview) {
            toast.warning('Name, Category, Price, SKU, Description and Main Image are required');
            return;
        }
        setSubmitting(true);
        try {
            const fileFromInput = mainInputRef.current?.files?.[0] || null;
            const submission = {
                name: form.name,
                sku: form.sku,
                description: form.description,
                category: form.category,
                price: form.price,
                image: fileFromInput,
                stock: form.stock,
                imported_from: form.imported_from,
            };
            await createProductRequest(submission);
            toast.success('Product request submitted');
            navigate('/marketor-panel/product');
        } catch (err) {
            if (err.response) {
                console.error('Create product 400 payload:', err.response.data);
            } else {
                console.error('Create product error (no response):', err);
            }
            const data = err.response?.data;
            let msg = data?.message || data?.detail;
            if (!msg && typeof data === 'object' && data) {
                const firstKey = Object.keys(data)[0];
                const firstVal = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
                msg = `${firstKey}: ${firstVal}`;
            }
            toast.error(msg || 'Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => navigate('/marketor-panel/product');

    return (
        <div className={styles['product-update-page']}>
            <div className={styles['product-update-wrapper']}>
                <div className={styles['product-update-header']}>
                    <h1>Add Product</h1>
                    <div className={styles['action-buttons']}>
                        <button type="button" className={styles['update-btn']} onClick={handleSubmit} disabled={submitting}>{submitting ? 'Submitting...' : 'Add'}</button>
                        <button type="button" className={styles['cancel-btn']} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                <form className={styles['product-update-content']} onSubmit={handleSubmit}>
                    <div className={styles['product-image-column']}>
                        <div
                            className={`${styles.uploader} ${dragMain ? styles.dragover : ''}`}
                            onDragEnter={(e) => { prevent(e); setDragMain(true); }}
                            onDragOver={prevent}
                            onDragLeave={() => setDragMain(false)}
                            onDrop={onDropMain}
                            onClick={() => mainInputRef.current?.click()}
                        >
                            {preview ? (
                                <img src={preview} alt={form.name || 'preview'} className={styles['product-image']} />
                            ) : (
                                <div className={styles['uploader-placeholder']}>Drop main image here or click to choose</div>
                            )}
                            {preview && (
                                <button type="button" className={styles['btn-clear']} onClick={(e) => { e.stopPropagation(); clearMain(); }}>Remove</button>
                            )}
                            <input ref={mainInputRef} type="file" accept="image/*" onChange={handleImage} hidden />
                        </div>

                        <div className={styles['gallery-block']}>
                            <div className={styles['gallery-header']}>
                                <span>Gallery Images</span>
                                {galleryPreviews.length > 0 && (
                                    <button type="button" className={styles['btn-link']} onClick={clearGallery}>Clear all</button>
                                )}
                            </div>
                            <div
                                className={`${styles.uploader} ${styles.small} ${dragGallery ? styles.dragover : ''}`}
                                onDragEnter={(e) => { prevent(e); setDragGallery(true); }}
                                onDragOver={prevent}
                                onDragLeave={() => setDragGallery(false)}
                                onDrop={onDropGallery}
                                onClick={() => galleryInputRef.current?.click()}
                            >
                                <div className={styles['uploader-placeholder']}>Drop multiple images or click to select</div>
                                <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGallery} hidden />
                            </div>
                            {galleryPreviews?.length > 0 && (
                                <div className={styles['thumb-grid']}>
                                    {galleryPreviews.map((src, idx) => (
                                        <div key={idx} className={styles.thumb}>
                                            <img src={src} alt={`gallery-${idx}`} />
                                            <button type="button" className={styles['thumb-remove']} onClick={() => handleRemoveGallery(idx)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles['product-form-column']}>
                        <div className={`${styles['fields-grid']} ${styles['fields-grid-2']}`}>
                            <div className={styles['form-field']}>
                                <label className={styles['name-label']}>Name</label>
                                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" />
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['category-label']}>Category ID</label>
                                <input name="category" value={form.category} onChange={handleChange} placeholder="e.g. 1" />
                            </div>

                        </div>
                        <div className={`${styles['fields-grid']} ${styles['fields-grid-3']}`}>
                            <div className={styles['form-field']}>
                                <label className={styles['cost-label']}>Price</label>
                                <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" placeholder="e.g. 1990.00" />
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['shop-label']}>SKU</label>
                                <input name="sku" value={form.sku} onChange={handleChange} placeholder="Unique SKU" />
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['min-price-label']}>Stock</label>
                                <input name="stock" value={form.stock} onChange={handleChange} type="number" min="0" placeholder="Quantity" />
                            </div>
                        </div>
                        <div className={`${styles['fields-grid']} ${styles['fields-grid-3']}`}>
                            <div className={styles['form-field']}>
                                <label className={styles['shop-label']}>Brand</label>
                                <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand name (optional for now)" />
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['address-label']}>Imported From</label>
                                <input name="imported_from" value={form.imported_from} onChange={handleChange} placeholder="Country of origin" />
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['info-label']}>Tags (comma separated)</label>
                                <input name="tagsText" value={form.tagsText} onChange={handleChange} placeholder="e.g. gaming, keyboard, combo" />
                            </div>
                        </div>
                        <div className={styles['price-info-container']}>
                            <div className={styles['info-section']} style={{ width: '100%' }}>
                                <div className={styles['form-field']}>
                                    <label className={styles['info-label']}>Description</label>
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

