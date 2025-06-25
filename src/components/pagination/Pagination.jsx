import React from 'react';
import '../../styles/components/Pagination.css';

/**
 * Reusable Pagination Component
 * @param {number} currentPage - Current active page
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback function when page changes
 * @param {number} maxVisiblePages - Maximum number of page buttons to show (default: 5)
 */
function Pagination({ currentPage, totalPages, onPageChange, maxVisiblePages = 5 }) {
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
    <div className="pagination">
      <button 
        className="pagination-btn pagination-prev"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <span className="pagination-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12.7269 3.687C12.8171 3.59153 12.8876 3.47923 12.9344 3.3565C12.9812 3.23377 13.0034 3.10302 12.9997 2.97172C12.996 2.84042 12.9664 2.71113 12.9128 2.59125C12.8591 2.47136 12.7823 2.36322 12.6869 2.273C12.5914 2.18279 12.4791 2.11226 12.3563 2.06544C12.2336 2.01863 12.1029 1.99644 11.9716 2.00016C11.8403 2.00387 11.711 2.03341 11.5911 2.08709C11.4712 2.14077 11.3631 2.21753 11.2729 2.313L2.77285 11.313C2.59732 11.4987 2.49951 11.7445 2.49951 12C2.49951 12.2555 2.59732 12.5013 2.77285 12.687L11.2729 21.688C11.3625 21.7856 11.4706 21.8643 11.5909 21.9198C11.7112 21.9752 11.8414 22.0062 11.9738 22.0109C12.1062 22.0156 12.2382 21.9939 12.3621 21.9472C12.4861 21.9004 12.5995 21.8295 12.6959 21.7386C12.7922 21.6476 12.8695 21.5384 12.9232 21.4173C12.977 21.2963 13.0062 21.1657 13.009 21.0333C13.0119 20.9008 12.9885 20.7691 12.94 20.6458C12.8916 20.5225 12.8191 20.4101 12.7269 20.315L4.87485 12L12.7269 3.687Z" fill="black"/>
</svg></span>
      </button>

      {/* Show first page if not visible */}
      {visiblePages[0] > 1 && (
        <>
          <button 
            className="pagination-btn pagination-number"
            onClick={() => handlePageClick(1)}
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="pagination-ellipsis">...</span>}
        </>
      )}

      {/* Show visible pages */}
      {visiblePages.map(page => (
        <button
          key={page}
          className={`pagination-btn pagination-number ${page === currentPage ? 'active' : ''}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}

      {/* Show last page if not visible */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && 
            <span className="pagination-ellipsis">...</span>
          }
          <button 
            className="pagination-btn pagination-number"
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button 
        className="pagination-btn pagination-next"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="pagination-arrow"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11.2731 3.687C11.1829 3.59153 11.1124 3.47923 11.0656 3.3565C11.0188 3.23377 10.9966 3.10302 11.0003 2.97172C11.004 2.84042 11.0336 2.71113 11.0872 2.59125C11.1409 2.47136 11.2177 2.36322 11.3131 2.273C11.4086 2.18279 11.5209 2.11226 11.6437 2.06544C11.7664 2.01863 11.8971 1.99644 12.0284 2.00016C12.1597 2.00387 12.289 2.03341 12.4089 2.08709C12.5288 2.14077 12.6369 2.21753 12.7271 2.313L21.2271 11.313C21.4027 11.4987 21.5005 11.7445 21.5005 12C21.5005 12.2555 21.4027 12.5013 21.2271 12.687L12.7271 21.688C12.6375 21.7856 12.5294 21.8643 12.4091 21.9198C12.2888 21.9752 12.1586 22.0062 12.0262 22.0109C11.8938 22.0156 11.7618 21.9939 11.6379 21.9472C11.5139 21.9004 11.4005 21.8295 11.3041 21.7386C11.2078 21.6476 11.1305 21.5384 11.0768 21.4173C11.023 21.2963 10.9938 21.1657 10.991 21.0333C10.9881 20.9008 11.0115 20.7691 11.06 20.6458C11.1084 20.5225 11.1809 20.4101 11.2731 20.315L19.1251 12L11.2731 3.687Z" fill="black"/>
</svg></span>
      </button>
    </div>
  );
}

export default Pagination;