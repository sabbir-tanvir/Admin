import React, { useState } from 'react';
import '../styles/SellerPanel/sellerProductCard.css';

/**
 * Reusable SellerProductCard Component
 *
 * Props:
 *  imageUrl - product main image
 *  title - product name
 *  sku - product SKU code
 *  price - numeric or string price
 *  stock - available stock
 *  categoryName - category name
 *  tags - array of tag objects {id,name}
 *  status - 'Approved' | 'Pending' (derived)
 *  onClick - click handler
 */
const SellerProductCard = ({
    imageUrl = 'https://via.placeholder.com/300x300?text=Product',
    title = 'Product Name',
    sku = 'SKU-0000',
    price = '0.00',
    stock = 0,
    categoryName = '—',
    tags = [],
    status = 'Pending',
    onClick,
}) => {
    const [imageError, setImageError] = useState(false);

    const handleClick = () => { if (onClick) onClick(); };

    const fallbackImages = [
        'https://images.unsplash.com/photo-1530269022189-2d7aed45b394',
        'https://images.unsplash.com/photo-1558340642-2c7fee71b4f3',
        'https://via.placeholder.com/300x300/2196f3/ffffff?text=Product'
    ];

    const displayImageUrl = imageError ? fallbackImages[Math.floor(Math.random() * fallbackImages.length)] : imageUrl;

    const firstTag = Array.isArray(tags) && tags.length ? tags[0].name : null;
    const badgeType = status === 'Approved' ? 'approved' : 'pending';

    return (
        <div className={`seller-product-card ${stock === 0 ? 'out-of-stock' : ''}`} onClick={handleClick}>
            <div className="seller-product-img-container">
                <img
                    src={displayImageUrl}
                    alt={title}
                    className="seller-product-img"
                    onError={() => setImageError(true)}
                />
                <span className={`seller-product-badge ${badgeType}`}>{status}</span>
                {stock === 0 && (
                    <div className="seller-out-of-stock-overlay"><span>Out of Stock</span></div>
                )}
            </div>
            <div className="seller-product-details-card">
                <h3 className="seller-product-title" title={title}>{title}</h3>
                <div className="seller-product-meta">
                    <span className="meta-cat" title={categoryName}>{categoryName}</span>
                    {firstTag && <> · <span className="meta-tag" title={firstTag}>{firstTag}</span></>}
                </div>
                <div className="seller-product-price-details">
                    <div className="seller-price-item"><span className="seller-price-label">SKU</span><span className="seller-price-value">{sku}</span></div>
                    <div className="seller-price-item"><span className="seller-price-label">Price</span><span className="seller-price-value">{price}</span></div>
                    <div className="seller-price-item"><span className="seller-price-label">Stock</span><span className="seller-price-value">{stock}</span></div>
                </div>
            </div>
        </div>
    );
};

export default SellerProductCard;