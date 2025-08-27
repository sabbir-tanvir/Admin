import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getProductRequests, updateProductRequest, API_BASE_URL } from '../../services/api.js';
import { toast } from 'react-toastify';
import '../../styles/components/ProductUpdate.css';

// Robust truthy check for backend variations
const toBool = (v) => v === true || v === 1 || v === '1' || String(v).toLowerCase() === 'true';

const ProductUpdate = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const location = useLocation();
    const passedProduct = location.state?.product;

    // Unified product state; keep extra fields even if empty
    const [product, setProduct] = useState({
        id: productId || '',
        name: '',
        category: '',
        price: '',
        productInfo: '', // maps to description
        sku: '',
        stock: '',
        imported_from: '',
        imageUrl: '',
        isApproved: false,
        is_favorite: undefined,
        is_featured: undefined,
        is_imported: undefined,
        is_offer: undefined,
    });
    const [loading, setLoading] = useState(!passedProduct);
    const [saving, setSaving] = useState(false);
    // no longer needed once we use single PUT
    const [notFound, setNotFound] = useState(false);

    // Helper: map raw API product to local editable structure
    const resolveUrl = useCallback((url) => {
        try {
            if (!url) return '';
            if (typeof url !== 'string') return '';
            if (url.startsWith('http') || url.startsWith('data:')) return url;
            const base = API_BASE_URL || window.location.origin;
            return new URL(url, base).href;
        } catch {
            return '';
        }
    }, []);

    const getImageSrc = useCallback((p) => {
        const src = p?.image || p?.main_image || p?.image_url || (Array.isArray(p?.images) && (p.images[0]?.url || p.images[0])) || '';
        return resolveUrl(src);
    }, [resolveUrl]);

    const mapApiProduct = useCallback((apiP) => ({
        id: apiP.id,
        name: apiP.name || '',
        category: apiP.category != null ? String(apiP.category) : '',
        price: apiP.price || '',
        productInfo: apiP.description || '',
        sku: apiP.sku || '',
        stock: apiP.stock != null ? String(apiP.stock) : '',
        imported_from: apiP.imported_from || '',
        imageUrl: getImageSrc(apiP),
        isApproved: toBool(apiP.is_approved) || String(apiP.status || '').toLowerCase() === 'approved',
        is_favorite: apiP.is_favorite,
        is_featured: apiP.is_featured,
        is_imported: apiP.is_imported,
        is_offer: apiP.is_offer,
    }), [getImageSrc]);

    useEffect(() => {
        if (passedProduct) {
            const mapped = mapApiProduct(passedProduct);
            setProduct(mapped);
            // no-op
            setLoading(false);
            return;
        }
        // Fallback: fetch list and extract single product
        const fetchSingle = async () => {
            try {
                setLoading(true);
                const { data } = await getProductRequests();
                const list = Array.isArray(data) ? data : [];
                const found = list.find(p => String(p.id) === String(productId));
                if (found) {
                    const mapped = mapApiProduct(found);
                    setProduct(mapped);
                    // no-op
                } else setNotFound(true);
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchSingle();
    }, [passedProduct, productId, mapApiProduct]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission: PUT to update fields and approval status.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.id) return;
        try {
            setSaving(true);
            // Build safe payload with only relevant fields
            const payload = {};
            if (product.name !== '') payload.name = product.name;
            // category as int when valid
            if (product.category !== '') {
                const cat = parseInt(product.category, 10);
                if (!Number.isNaN(cat)) payload.category = cat;
            }
            if (product.price !== '') payload.price = String(product.price);
            if (product.productInfo !== '') payload.description = product.productInfo;
            if (product.sku !== '') payload.sku = product.sku;
            if (product.imported_from !== '') payload.imported_from = product.imported_from;
            if (product.stock !== '') {
                const st = parseInt(product.stock, 10);
                if (!Number.isNaN(st)) payload.stock = st;
            }
            payload.is_favorite = !!product.is_favorite;
            payload.is_featured = !!product.is_featured;
            payload.is_imported = !!product.is_imported;
            payload.is_offer = !!product.is_offer;
            payload.is_approved = !!product.isApproved;
            await updateProductRequest(product.id, payload);
            // no-op
            toast.success('Updated');
        } catch (err) {
            console.error('Update product failed', err.response?.data || err);
            const msg = err.response?.data?.detail || 'Update failed';
            toast.error(msg);
        } finally {
            setSaving(false);
        }
    };

    // Handle cancel action
    const handleCancel = () => {
        // Navigate back to products list
        navigate('/productlist');
    };

    if (loading) return <div style={{ padding: 24 }}>Loading product...</div>;
    if (notFound) return <div style={{ padding: 24 }}>Product not found.</div>;

    return (
        <div className="product-update-page">
            <div className="product-update-wrapper">
                <div className="product-update-header">
                    <div className="header-left">
                        <h1>Product Update</h1>
                        <label className="toggle">
                            <input
                                type="checkbox"
                                checked={!!product.isApproved}
                                onChange={(e) => setProduct(prev => ({ ...prev, isApproved: e.target.checked }))}
                            />
                            <span className="switch" aria-hidden="true"></span>
                            <span className="toggle-text">Approved</span>
                        </label>
                    </div>
                    <div className="action-buttons">
                        <button
                            type="button"
                            className="update-btn"
                            onClick={handleSubmit}
                            disabled={saving}
                            title={product.isApproved ? 'Save updates to this product' : 'Approve and save updates to this product'}
                        >Update</button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>cancel</button>
                    </div>
                </div>

                <form className="product-update-content">
                    <div className="product-image-column">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                            />
                        ) : null}
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
                                <label className="category-label">Category</label>
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
                                <label className="sku-label">SKU</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={product.sku}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-field">
                                <label className="stock-label">Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={product.stock}
                                    onChange={handleInputChange}
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* <div className="form-row">
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
                        </div> */}

                        {/* Flag toggles (compact) */}
                        <div className="flags-row">


                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={!!product.is_favorite}
                                    onChange={(e) => setProduct(prev => ({ ...prev, is_favorite: e.target.checked }))}
                                />
                                <span className="switch" aria-hidden="true"></span>
                                <span className="toggle-text">Is Favorite</span>
                            </label>

                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={!!product.is_featured}
                                    onChange={(e) => setProduct(prev => ({ ...prev, is_featured: e.target.checked }))}
                                />
                                <span className="switch" aria-hidden="true"></span>
                                <span className="toggle-text">Is Featured</span>
                            </label>

                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={!!product.is_imported}
                                    onChange={(e) => setProduct(prev => ({ ...prev, is_imported: e.target.checked }))}
                                />
                                <span className="switch" aria-hidden="true"></span>
                                <span className="toggle-text">Is Imported</span>
                            </label>

                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={!!product.is_offer}
                                    onChange={(e) => setProduct(prev => ({ ...prev, is_offer: e.target.checked }))}
                                />
                                <span className="switch" aria-hidden="true"></span>
                                <span className="toggle-text">Is Offer</span>
                            </label>
                        </div>


                        <div className="price-info-container">
                            <div className="price-section">
                                {/* <div className="form-field">
                                    <label className="address-label">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={product.address}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div> */}
                                <div className="form-field">
                                    <label className="imported-from-label">Imported From</label>
                                    <input
                                        type="text"
                                        name="imported_from"
                                        value={product.imported_from}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-field">
                                    <label className="price-label">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* 
                                <div className="form-field">
                                    <label className="min-price-label">Min-Price</label>
                                    <input
                                        type="text"
                                        name="minPrice"
                                        value={product.minPrice}
                                        onChange={handleInputChange}
                                    />
                                </div> */}
                            </div>

                            <div className="info-section">
                                <div className="form-field">
                                    <label className="info-label">Product info</label>
                                    <textarea
                                        name="productInfo"
                                        value={product.productInfo}
                                        onChange={handleInputChange}
                                        rows="4"
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

export default ProductUpdate;

