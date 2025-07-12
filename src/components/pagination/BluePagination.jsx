import React from 'react';
import '../../styles/components/BluePagination.css';

/**
 * Blue Circular Pagination Component
 * @param {number} currentPage - Current active page
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback function when page changes
 * @param {number} maxVisiblePages - Maximum number of page buttons to show (default: 4)
 */
const BluePagination = ({ currentPage, totalPages, onPageChange, maxVisiblePages = 4 }) => {
  // Calculate which pages to show
  const getVisiblePages = () => {
    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - delta, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);
    
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="blue-pagination">
      <button 
        className="blue-pagination-btn blue-pagination-arrow blue-pagination-next"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 30 30" fill="none">
          <path d="M15 0.9375C7.23375 0.9375 0.9375 7.23375 0.9375 15C0.9375 22.7663 7.23375 29.0625 15 29.0625C22.7663 29.0625 29.0625 22.7663 29.0625 15C29.0625 7.23375 22.7663 0.9375 15 0.9375ZM22.9688 17.5444H14.2064V22.5L7.03125 15L14.2064 7.5V12.7233H22.9688V17.5444Z" fill="#005967"/>
        </svg>
      </button>

      {/* Show visible pages */}
      {visiblePages.map(page => (
        <button
          key={page}
          className={`blue-pagination-btn blue-pagination-number ${page === currentPage ? 'blue-active' : ''}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      <button 
        className="blue-pagination-btn blue-pagination-arrow blue-pagination-next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 30 30" fill="none">
          <g clipPath="url(#clip0_176_120)">
            <path d="M15 0.9375C22.7663 0.9375 29.0625 7.23375 29.0625 15C29.0625 22.7663 22.7663 29.0625 15 29.0625C7.23375 29.0625 0.9375 22.7663 0.9375 15C0.9375 7.23375 7.23375 0.9375 15 0.9375ZM7.03125 17.5444H15.7936V22.5L22.9688 15L15.7936 7.5V12.7233H7.03125V17.5444Z" fill="#005967"/>
          </g>
          <defs>
            <clipPath id="clip0_176_120">
              <rect width="30" height="30" fill="white" transform="matrix(-1 0 0 1 30 0)"/>
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default BluePagination;