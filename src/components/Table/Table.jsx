import React, { useState, useMemo } from 'react';
import Pagination from '../pagination/Pagination';
import '../../styles/components/Table.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Reusable Table Component
 * 
 * @param {Array} columns - Array of column objects with { key, header, render? }
 * @param {Array} data - Array of data objects
 * @param {string} searchPlaceholder - Placeholder text for search input
 * @param {Array} searchKeys - Array of keys to search in data objects
 * @param {number} itemsPerPage - Number of items per page
 * @param {boolean} showExport - Whether to show export button
 * @param {boolean} showFilter - Whether to show filter button
 * @param {boolean} showSearch - Whether to show search input
 * @param {function} onExport - Export handler function
 * @param {function} onFilter - Filter handler function
 * @param {string} className - Additional CSS classes
 */
const Table = ({ 
  
  columns = [],
  data = [],
  searchPlaceholder = "Search...",
  searchKeys = [],
  itemsPerPage = 7,
  showExport = true,
  showFilter = true,
  showSearch = true,
  onExport,
  onFilter,
  className = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort data
  const processedData = useMemo(() => {
    let filteredItems = data.filter(item => {
      if (!searchTerm) return true;
      
      return searchKeys.some(key => {
        const value = item[key];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      });
    });

    if (sortConfig.key) {
      filteredItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        // Numbers
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
        }

        const stringA = String(aValue).toLowerCase();
        const stringB = String(bValue).toLowerCase();

        // Currency-like (existing behavior)
        if (sortConfig.key === 'totalPrice') {
          const numA = parseFloat(stringA.replace(/[^0-9.-]+/g, ''));
          const numB = parseFloat(stringB.replace(/[^0-9.-]+/g, ''));
          if (!isNaN(numA) && !isNaN(numB)) {
            return sortConfig.direction === 'ascending' ? numA - numB : numB - numA;
          }
        }

        // Numeric-like strings (e.g., Product Id)
        if (sortConfig.key === 'id') {
          const numA = Number(String(aValue).replace(/[^0-9.-]+/g, ''));
          const numB = Number(String(bValue).replace(/[^0-9.-]+/g, ''));
          if (!isNaN(numA) && !isNaN(numB)) {
            return sortConfig.direction === 'ascending' ? numA - numB : numB - numA;
          }
        }

        // Default string compare
        if (stringA < stringB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (stringA > stringB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }

    return filteredItems;
  }, [data, searchTerm, searchKeys, sortConfig]);


  // Calculate pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExport = async () => {
    if (onExport) {
      onExport(processedData);
    } else {
      // Default PDF export functionality
      await exportToPDF();
    }
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Product Details Export', 14, 15);
    
    // Add export date
    doc.setFontSize(10);
    doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 14, 25);
    
    // Prepare columns for export (exclude only actions)
    const exportColumns = columns.filter(col => col.key !== 'actions');
    const headers = exportColumns.map(col => col.header);
    
    // Helper to get marketer display text
    const getMarketerText = (item) => {
      if (item?.marketer_name) return item.marketer_name;
      const u = item?.user ?? item?.marketer ?? null;
      if (!u) return '';
      if (typeof u === 'object') {
        return u.name || u.username || u.email || '';
      }
      return `User #${u}`;
    };

    // Helper to get image src
    const getImageSrc = (item) => {
      return (
        item?.image ||
        item?.main_image ||
        item?.image_url ||
        (Array.isArray(item?.images) && item.images[0]?.url) ||
        null
      );
    };

    // Build table body values; image cell left blank (we'll draw it)
    const tableData = processedData.map((item, index) => {
      return exportColumns.map(col => {
        if (col.key === 'sl') return (index + 1).toString();
        if (col.key === 'price') return item.price || '';
        if (col.key === 'created_at') {
          const d = item.added_date || item.created_at || item.date;
          if (!d) return '';
          try {
            const dt = new Date(d);
            if (!isNaN(dt.getTime())) return dt.toISOString().slice(0, 10);
          } catch {
            /* ignore invalid date format */
          }
          return String(d).slice(0, 10);
        }
        if (col.key === 'marketer_name' || col.key === 'marketer' || col.key === 'user') {
          return getMarketerText(item);
        }
        if (col.key === 'image') {
          // We'll draw the image; return empty text placeholder
          return '';
        }
        const v = item[col.key];
        return v === 0 ? '0' : (v ?? '');
      });
    });

    // Preload images as data URLs for drawing into the table
    const imageColIndex = exportColumns.findIndex(c => c.key === 'image');
    let imageDataUrls = [];
    if (imageColIndex !== -1) {
      const toAbsolute = (url) => {
        try {
          if (!url) return null;
          if (url.startsWith('data:')) return url;
          const u = new URL(url, window.location.origin);
          return u.href;
        } catch {
          return null;
        }
      };
      const fetchToDataURL = async (url) => {
        try {
          const abs = toAbsolute(url);
          if (!abs) return null;
          const res = await fetch(abs, { mode: 'cors' });
          if (!res.ok) return null;
          const blob = await res.blob();
          return await new Promise((resolve) => {
            const fr = new FileReader();
            fr.onload = () => resolve(fr.result);
            fr.onerror = () => resolve(null);
            fr.readAsDataURL(blob);
          });
        } catch {
          return null;
        }
      };
      imageDataUrls = await Promise.all(
        processedData.map(it => fetchToDataURL(getImageSrc(it)))
      );
    }
    
    // Use autoTable v5 API
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 35,
      styles: {
        fontSize: 9,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 35 },
      tableWidth: 'auto',
      didDrawCell: (data) => {
        if (imageColIndex !== -1 && data.section === 'body' && data.column.index === imageColIndex) {
          const img = imageDataUrls[data.row.index];
          if (img) {
            const padding = 2;
            const size = Math.min(14, data.cell.height - 4);
            try {
              doc.addImage(img, data.cell.x + padding, data.cell.y + padding, size, size);
            } catch {
              // ignore addImage errors
            }
          }
        }
      }
    });
    // Save the PDF
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    doc.save(`product_export_${timestamp}.pdf`);
  };  const handleFilter = () => {
    if (onFilter) {
      onFilter();
    } else {
      console.log('Filter functionality to be implemented');
    }
  };

  return (
    <div className={`reusable-table ${className}`}>
      {/* Header Controls */}
      {(showSearch || showExport || showFilter) && (
        <div className="table-header-controls">
          {showSearch && (
            <div className="table-search-section">
              <div className="table-search-container">
                <svg className="table-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.7416 10.3333L15.0833 13.6666L13.6666 15.0833L10.3333 11.7416C9.2 12.6666 7.73331 13.1666 6.16665 13.1666C2.96665 13.1666 0.333313 10.5333 0.333313 7.33331C0.333313 4.13331 2.96665 1.49998 6.16665 1.49998C9.36665 1.49998 12 4.13331 12 7.33331C12 8.89998 11.5 10.3666 10.575 11.4999M6.16665 11.5C8.46665 11.5 10.3333 9.63331 10.3333 7.33331C10.3333 5.03331 8.46665 3.16665 6.16665 3.16665C3.86665 3.16665 2 5.03331 2 7.33331C2 9.63331 3.86665 11.5 6.16665 11.5Z" fill="#999999" />
                </svg>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="table-search-input"
                />
              </div>
            </div>
          )}
          
          <div className="table-action-buttons">
            {showExport && (
              <button className="table-export-btn" onClick={handleExport}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 16" fill="none">
                  <path d="M0.5 15.8929H13.5V14.0357H0.5M13.5 5.67861H9.78571V0.107178H4.21429V5.67861H0.5L7 12.1786L13.5 5.67861Z" fill="#319F43" />
                </svg>
                <span>Export</span>
                <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.13804 10.62L2.82804 5.04705C2.73939 4.95406 2.68994 4.83052 2.68994 4.70205C2.68994 4.57358 2.73939 4.45003 2.82804 4.35705L2.83404 4.35105C2.87701 4.30581 2.92874 4.26979 2.98607 4.24518C3.0434 4.22056 3.10514 4.20787 3.16754 4.20787C3.22993 4.20787 3.29167 4.22056 3.349 4.24518C3.40634 4.26979 3.45806 4.30581 3.50104 4.35105L8.50104 9.59905L13.499 4.35105C13.542 4.30581 13.5937 4.26979 13.6511 4.24518C13.7084 4.22056 13.7701 4.20787 13.8325 4.20787C13.8949 4.20787 13.9567 4.22056 14.014 4.24518C14.0713 4.26979 14.1231 4.30581 14.166 4.35105L14.172 4.35705C14.2607 4.45003 14.3101 4.57358 14.3101 4.70205C14.3101 4.83052 14.2607 4.95406 14.172 5.04705L8.86204 10.62C8.81534 10.6691 8.75918 10.7081 8.69695 10.7347C8.63472 10.7614 8.56773 10.7751 8.50004 10.7751C8.43234 10.7751 8.36535 10.7614 8.30312 10.7347C8.2409 10.7081 8.18473 10.6691 8.13804 10.62Z" fill="#009BB3" />
                </svg>
              </button>
            )}
            
            {showFilter && (
              <button className="table-filter-btn" onClick={handleFilter}>
                <span>Filter</span>
                <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.032 4.75H13.968C14.425 4.75 14.822 4.75 15.133 4.78C15.44 4.808 15.818 4.875 16.126 5.128C16.523 5.454 16.747 5.942 16.75 6.45C16.752 6.84 16.578 7.176 16.41 7.442C16.242 7.712 15.999 8.032 15.715 8.406L13.119 11.828C12.867 12.16 12.804 12.248 12.76 12.338C12.7142 12.4323 12.6809 12.5321 12.661 12.635C12.641 12.735 12.638 12.847 12.638 13.269V17.512C12.638 17.72 12.638 17.924 12.624 18.09C12.609 18.254 12.572 18.517 12.4 18.753C12.19 19.04 11.863 19.226 11.5 19.248C11.198 19.267 10.953 19.145 10.81 19.065C10.6472 18.9682 10.4884 18.8647 10.334 18.755L9.345 18.072L9.297 18.039C9.106 17.908 8.894 17.763 8.735 17.562C8.59682 17.3886 8.49389 17.1899 8.432 16.977C8.361 16.733 8.362 16.477 8.362 16.239V13.269C8.362 12.847 8.358 12.735 8.339 12.635C8.3188 12.5321 8.28518 12.4322 8.239 12.338C8.196 12.248 8.133 12.16 7.881 11.828L5.285 8.406C5.001 8.032 4.758 7.712 4.589 7.442C4.422 7.176 4.249 6.84 4.25 6.45C4.25053 6.19734 4.30672 5.9479 4.41457 5.71941C4.52242 5.49092 4.67928 5.289 4.874 5.128C5.182 4.875 5.56 4.808 5.867 4.779C6.178 4.75 6.574 4.75 7.032 4.75ZM5.808 6.305C5.77434 6.3419 5.75424 6.38916 5.751 6.439C5.757 6.458 5.781 6.52 5.861 6.646C5.989 6.851 6.191 7.118 6.501 7.527L9.076 10.921L9.111 10.967C9.312 11.231 9.472 11.442 9.589 11.682C9.69167 11.8933 9.76567 12.115 9.811 12.347C9.862 12.608 9.861 12.874 9.861 13.211V16.179C9.861 16.337 9.862 16.426 9.866 16.493L9.872 16.555C9.87887 16.5815 9.89113 16.6064 9.908 16.628L9.949 16.662C9.999 16.702 10.069 16.75 10.197 16.838L11.138 17.488V13.21C11.138 12.873 11.138 12.607 11.189 12.346C11.2343 12.1147 11.3083 11.893 11.411 11.681C11.528 11.441 11.688 11.231 11.889 10.966L11.924 10.92L14.499 7.526C14.809 7.116 15.011 6.85 15.139 6.645C15.219 6.519 15.243 6.457 15.249 6.438C15.2458 6.38816 15.2257 6.3409 15.192 6.304C15.1266 6.28659 15.0596 6.27587 14.992 6.272C14.76 6.25 14.436 6.249 13.932 6.249H7.068C6.564 6.249 6.24 6.249 6.008 6.272C5.94043 6.27587 5.87342 6.28759 5.808 6.305ZM16.25 10.5C16.25 10.3011 16.329 10.1103 16.4697 9.96967C16.6103 9.82902 16.8011 9.75 17 9.75H20C20.1989 9.75 20.3897 9.82902 20.5303 9.96967C20.671 10.1103 20.75 10.3011 20.75 10.5C20.75 10.6989 20.671 10.8897 20.5303 11.0303C20.3897 11.171 20.1989 11.25 20 11.25H17C16.8011 11.25 16.6103 11.171 16.4697 11.0303C16.329 10.8897 16.25 10.6989 16.25 10.5ZM14.75 13C14.75 12.8011 14.829 12.6103 14.9697 12.4697C15.1103 12.329 15.3011 12.25 15.5 12.25H20C20.1989 12.25 20.3897 12.329 20.5303 12.4697C20.671 12.6103 20.75 12.8011 20.75 13C20.75 13.1989 20.671 13.3897 20.5303 13.5303C20.3897 13.671 20.1989 13.75 20 13.75H15.5C15.3011 13.75 15.1103 13.671 14.9697 13.5303C14.829 13.3897 14.75 13.1989 14.75 13ZM14.25 15.5C14.25 15.3011 14.329 15.1103 14.4697 14.9697C14.6103 14.829 14.8011 14.75 15 14.75H20C20.1989 14.75 20.3897 14.829 20.5303 14.9697C20.671 15.1103 20.75 15.3011 20.75 15.5C20.75 15.6989 20.671 15.8897 20.5303 16.0303C20.3897 16.171 20.1989 16.25 20 16.25H15C14.8011 16.25 14.6103 16.171 14.4697 16.0303C14.329 15.8897 14.25 15.6989 14.25 15.5ZM14.25 18C14.25 17.8011 14.329 17.6103 14.4697 17.4697C14.6103 17.329 14.8011 17.25 15 17.25H17.5C17.6989 17.25 17.8897 17.329 18.0303 17.4697C18.171 17.6103 18.25 17.8011 18.25 18C18.25 18.1989 18.171 18.3897 18.0303 18.5303C17.8897 18.671 17.6989 18.75 17.5 18.75H15C14.8011 18.75 14.6103 18.671 14.4697 18.5303C14.329 18.3897 14.25 18.1989 14.25 18Z" fill="black" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="reusable-table-container">
        <table className="reusable-data-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  onClick={() => column.sortable && requestSort(column.key)}
                  className={column.sortable ? 'sortable-header' : ''}
                >
                  {column.header}
                  {column.sortable && (
                    <span className={`sort-icon ${sortConfig.key === column.key && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === column.key ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? column.render(item, startIndex + rowIndex) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Table;