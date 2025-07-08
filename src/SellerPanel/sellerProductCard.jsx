import React, { useState } from 'react';
import '../styles/SellerPanel/sellerProductCard.css';

/**
 * Reusable SellerProductCard Component
 * 
 * @param {string} imageUrl - URL of the product image
 * @param {string} title - Product title/name
 * @param {string} productId - Product ID
 * @param {boolean} badge - Optional badge text to display on the image
 * @param {string} badgeType - Badge type: 'sale', 'new', 'hot', etc.
 * @param {boolean} isOutOfStock - Whether the product is out of stock
 * @param {function} onClick - Click handler for the entire card
 */
const SellerProductCard = ({
    imageUrl = "https://via.placeholder.com/150",
    title = "Product Name",
    productId = "PRD-0001",
    badge,
    badgeType = "sale",
    isOutOfStock = false,
    onClick,
}) => {
    // Add state to track image loading errors
    const [imageError, setImageError] = useState(false);
    
    const handleClick = () => {
        if (onClick) onClick();
    };

    // Sample fallback image URLs - you can replace these with your actual product images
    const fallbackImages = [
        "https://images.unsplash.com/photo-1530269022189-2d7aed45b394",
        "https://images.unsplash.com/photo-1558340642-2c7fee71b4f3",
        "https://via.placeholder.com/300x300/2196f3/ffffff?text=Product"
    ];

    // If there's an error, use one of the fallback images
    const displayImageUrl = imageError ? 
        fallbackImages[Math.floor(Math.random() * fallbackImages.length)] : 
        imageUrl;

    return (
        <div
            className={`seller-product-card ${isOutOfStock ? 'out-of-stock' : ''}`}
            onClick={handleClick}
        >
            <div className="seller-product-img-container">
                <img
                    src={displayImageUrl}
                    alt={title}
                    className="seller-product-img"
                    onError={() => {
                        console.log("Image failed to load:", imageUrl);
                        setImageError(true);
                    }}
                />

                {badge && (
                    <span className={`seller-product-badge ${badgeType}`}>
                        {badge}
                    </span>
                )}

                {isOutOfStock && (
                    <div className="seller-out-of-stock-overlay">
                        <span>Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="seller-product-details-card">
                <h3 className="seller-product-title">Name: {title}</h3>
                <h3 className="seller-product-id">ID: {productId}</h3>
            </div>
        </div>
    );
};

export default SellerProductCard;