import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import ExportMenu from "./ExportMenu";

const Controls = ({
    search,
    setSearch,
    status,
    setStatus,
    showFilter,
    setShowFilter,
    filtered,
    showExport,
    setShowExport,
}) => {
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

            <ExportMenu
                filtered={filtered}
                showExport={showExport}
                setShowExport={setShowExport}
            />

            <div className="filter-dropdown">
                <button
                    className="filter-btn"
                    title="Filter"
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <span>Filter </span>
                    <FiFilter />
                </button>
                {showFilter && (
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
