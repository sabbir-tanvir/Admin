import React, { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import ExportMenu from "./Exportmenu"; 

const Controls = ({
  search,
  setSearch,
  status,
  setStatus,
  filtered,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div className="search-filter-wrapper">
      <div className="search-box">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Ex:10001"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ExportMenu filtered={filtered} />

      <div
        className="filter-dropdown"
        onMouseEnter={() => setFilterOpen(true)}
        onMouseLeave={() => setFilterOpen(false)}
        tabIndex={0}
        style={{ position: 'relative' }}
      >
        <button
          className="filter-btn"
          title="Filter"
          type="button"
        >
          <span>Filter </span>
          <FiFilter />
        </button>
        {filterOpen && (
          <ul className="filter-menu">
            <li onClick={() => setStatus("")}>All</li>
            <li onClick={() => setStatus("Delivered")}>Delivered</li>
            <li onClick={() => setStatus("Pending")}>Pending</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Controls;
