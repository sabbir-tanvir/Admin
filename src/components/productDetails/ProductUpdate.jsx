import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getProductRequests, approveProductRequest } from '../../services/api.js';
import { toast } from 'react-toastify';
import '../../styles/components/ProductUpdate.css';

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
        purchasingCost: '',
        shopName: '',
        address: '',
        price: '',
        minPrice: '',
        productInfo: '',
        imageUrl: '',
        isApproved: false
    });
    const [loading, setLoading] = useState(!passedProduct);
    const [notFound, setNotFound] = useState(false);

    // Helper: map raw API product to local editable structure
    const mapApiProduct = (apiP) => ({
        id: apiP.id,
        name: apiP.name || '',
        category: apiP.category != null ? String(apiP.category) : '',
        purchasingCost: '', // no data yet
        shopName: '', // no data yet
        address: '', // no data yet
        price: apiP.price || '',
        minPrice: '', // no data yet
        productInfo: apiP.description || '',
        imageUrl: apiP.image || '',
        isApproved: apiP.is_approved === true
    });

    useEffect(() => {
        if (passedProduct) {
            setProduct(mapApiProduct(passedProduct));
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
                if (found) setProduct(mapApiProduct(found)); else setNotFound(true);
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        fetchSingle();
    }, [passedProduct, productId]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission (approve). We only send fields that have values; for approve action
    // backend currently only needs is_approved flag, so we ignore empty optional fields entirely.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product.id) return;
        if (product.isApproved) {
            toast.info('Already approved');
            return;
        }
        try {
            // Minimal payload is handled inside approveProductRequest; buildNonEmptyPayload kept for future.
            const { data } = await approveProductRequest(product.id);
            setProduct(prev => ({ ...prev, isApproved: data?.is_approved === true }));
            toast.success('Product approved');
            // Redirect to product list after approval
            navigate('/productlist', { replace: true });
        } catch (err) {
            console.error('Approve product failed', err.response?.data || err);
            const msg = err.response?.data?.detail || 'Approve failed';
            toast.error(msg);
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
                    <h1>Product Update</h1>
                    <div className="action-buttons">
                        <button
                            type="button"
                            className="update-btn"
                            onClick={handleSubmit}
                            disabled={product.isApproved}
                        >{product.isApproved ? 'Approved' : 'Approve'}</button>
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
                                <div className="form-field">
                                    <label className="price-label">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={product.price}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-field">
                                    <label className="min-price-label">Min-Price</label>
                                    <input
                                        type="text"
                                        name="minPrice"
                                        value={product.minPrice}
                                        onChange={handleInputChange}
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

