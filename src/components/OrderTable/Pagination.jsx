import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}><FiChevronLeft /></button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          className={page === i + 1 ? "active" : ""}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button disabled={page === totalPages} onClick={() => setPage(page + 1)}><FiChevronRight /></button>
    </div>
  );
};
export default Pagination;
