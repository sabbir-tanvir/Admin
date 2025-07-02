import React, { useState } from 'react';
import '../../styles/Cards/ProductImgCard.css';

/**
 * Reusable ProductImgCard Component
 * 
 * @param {string} imageUrl - URL of the product image
 * @param {string} title - Product title/name
 * @param {string|number} cost - Product cost value
 * @param {string|number} sell - Product selling price
 * @param {string|number} min - Product minimum price
 * @param {string} currency - Currency symbol, defaults to '$'
 * @param {boolean} badge - Optional badge text to display on the image
 * @param {string} badgeType - Badge type: 'sale', 'new', 'hot', etc.
 * @param {boolean} isOutOfStock - Whether the product is out of stock
 * @param {function} onClick - Click handler for the entire card
 */
const ProductImgCard = ({
    imageUrl = "https://via.placeholder.com/150",
    title = "Product Name",
    cost = 99.99,
    sell = 109.99,
    min = 89.99,
    currency = "$",
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

    // Format the price values properly
    const formatPrice = (value) => {
        // Handle different formats including commas for thousands
        if (typeof value === 'number') {
            return value.toLocaleString();
        }
        return value;
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
            className={`product-img-card ${isOutOfStock ? 'out-of-stock' : ''}`}
            onClick={handleClick}
        >
            <div className="product-img-container">
                <img
                    src={displayImageUrl}
                    alt={title}
                    className="product-img"
                    onError={(e) => {
                        console.log("Image failed to load:", imageUrl);
                        setImageError(true);
                    }}
                />

                {badge && (
                    <span className={`product-badge ${badgeType}`}>
                        {badge}
                    </span>
                )}

                {isOutOfStock && (
                    <div className="out-of-stock-overlay">
                        <span>Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="product-details-card">
                <h3 className="product-title">{title}</h3>
                <div className="product-price-details">
                    <div className="price-item">
                        <span className="price-label">Cost:</span>
                        <span className="price-value">{currency}{formatPrice(cost)}</span>
                    </div>
                    <div className="price-item">
                        <span className="price-label">Sell:</span>
                        <span className="price-value">{currency}{formatPrice(sell)}</span>
                    </div>
                    <div className="price-item">
                        <span className="price-label">min:</span>
                        <span className="price-value">{currency}{formatPrice(min)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductImgCard;