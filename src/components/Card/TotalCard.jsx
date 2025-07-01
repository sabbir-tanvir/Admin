import React from 'react';
import '../../styles/Cards/TotalCard.css';

/**
 * Reusable TotalCard Component for dashboard statistics
 * 
 * @param {string} title - Title text for the card
 * @param {React.ReactNode} icon - Icon component to display
 * @param {string|number} number - Main statistic to display
 * @param {string} trendText - Text showing trend (e.g. "10 new today")
 * @param {React.ReactNode} trendIcon - Icon for the trend indicator
 * @param {string} trendType - Type of trend: 'positive', 'negative', 'warning'
 * @param {boolean} showTrend - Whether to show the trend section
 * @param {string} seeMoreText - Text for see more button
 * @param {function} onClick - Click handler function
 * @param {function} onSeeMoreClick - See more click handler function
 * @param {string} className - Additional CSS classes
 */
const TotalCard = ({
    title,
    icon,
    number,
    trendText,
    trendIcon,
    trendType = "positive",
    showTrend = false,
    seeMoreText = "see more →",
    onClick,
    onSeeMoreClick,
    className = ''
}) => {
    const handleCardClick = (e) => {
        // Prevent card click when see more button is clicked
        if (e.target.closest('.see-more-btn')) {
            return;
        }
        if (onClick) onClick();
    };

    const handleSeeMoreClick = (e) => {
        e.stopPropagation();
        if (onSeeMoreClick) onSeeMoreClick();
    };

    // Default trend icon if none provided
    const defaultTrendIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="currentColor">
            <path d="M6 0L12 10H0L6 0Z" />
        </svg>
    );

    return (
        <div
            className={`total-card ${className}`}
            onClick={handleCardClick}
        >

            <div className="total-card-header">
                <div className="total-card-icon">
                    {icon}
                </div>

            </div>
            <div className="total-card-body">
                <div className="total-card-title">
                    <h3>{title}</h3>
                </div>

                <div className="total-card-content">
                    <div className="total-card-number">{number}</div>
                    {showTrend && (
                        <div className={`total-card-trend ${trendType}`}>
                            {trendIcon || defaultTrendIcon}
                            <span>{trendText}</span>
                        </div>
                    )}
                </div>
                <div className="total-card-footer">
                    <button
                        className="see-more-btn"
                        onClick={handleSeeMoreClick}
                    >
                        {seeMoreText}
                    </button>
                </div>
            </div>


        </div>
    );
};

export default TotalCard;