import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MarketorPanel/mOrdersStatus.css';
import Pagination from '../components/pagination/Pagination';

function MOrdersStatus() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  

  // Fetch orders data from JSON file
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Using relative path for development environment
        const response = await fetch('/data/data.json');
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        // If the data.json file has marketorOrders, use that
        // Otherwise, we'll fall back to our mock data
        if (data.marketorOrders && data.marketorOrders.length > 0) {
          setOrders(data.marketorOrders);
        } else {
          // Sample order data as fallback
          const mockOrders = [
            {
              id: 1,
              orderId: "ORD100054",
              date: "2025-08-25 17:40",
              customer: "John Doe",
              item: "Premium Headphones",
              quantity: 2,
              price: "$149.99",
              orderStatus: "Completed"
            },
            {
              id: 2,
              orderId: "ORD100055",
              date: "2025-08-25 18:30",
              customer: "Sarah Smith",
              item: "Wireless Keyboard",
              quantity: 1,
              price: "$59.99",
              orderStatus: "Processing"
            },
            {
              id: 3,
              orderId: "ORD100056",
              date: "2025-08-26 09:15",
              customer: "Alex Johnson",
              item: "Smart Watch",
              quantity: 1,
              price: "$199.99",
              orderStatus: "Shipped"
            },
            {
              id: 4,
              orderId: "ORD100057",
              date: "2025-08-26 14:20",
              customer: "Emma Wilson",
              item: "Bluetooth Speaker",
              quantity: 3,
              price: "$79.99",
              orderStatus: "Completed"
            },
            {
              id: 5,
              orderId: "ORD100058",
              date: "2025-08-27 10:45",
              customer: "Michael Brown",
              item: "Gaming Mouse",
              quantity: 1,
              price: "$49.99",
              orderStatus: "Cancelled"
            },
            {
              id: 6,
              orderId: "ORD100059",
              date: "2025-08-27 16:30",
              customer: "Jessica Taylor",
              item: "Laptop Stand",
              quantity: 2,
              price: "$29.99",
              orderStatus: "Completed"
            },
            {
              id: 7,
              orderId: "ORD100060",
              date: "2025-08-28 08:50",
              customer: "David Miller",
              item: "USB-C Hub",
              quantity: 1,
              price: "$39.99",
              orderStatus: "Processing"
            }
          ];
          setOrders(mockOrders);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Try fallback path if first attempt fails
        try {
          const fallbackResponse = await fetch('../data/data.json');
          
          if (!fallbackResponse.ok) {
            throw new Error(`Error: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
          }
          
          const data = await fallbackResponse.json();
          if (data.marketorOrders && data.marketorOrders.length > 0) {
            setOrders(data.marketorOrders);
          } else {
            throw new Error("No marketor orders data found");
          }
          setLoading(false);
        } catch (fallbackError) {
          console.error("Fallback fetch also failed:", fallbackError);
          // Provide some mock data for development/testing
          const mockOrders = [
            {
              id: 1,
              orderId: "ORD100054",
              date: "2025-08-25 17:40",
              customer: "John Doe",
              item: "Premium Headphones",
              quantity: 2,
              price: "$149.99",
              orderStatus: "Completed"
            },
            {
              id: 2,
              orderId: "ORD100055",
              date: "2025-08-25 18:30",
              customer: "Sarah Smith",
              item: "Wireless Keyboard",
              quantity: 1,
              price: "$59.99",
              orderStatus: "Processing"
            },
            {
              id: 3,
              orderId: "ORD100056",
              date: "2025-08-26 09:15",
              customer: "Alex Johnson",
              item: "Smart Watch",
              quantity: 1,
              price: "$199.99",
              orderStatus: "Shipped"
            },
            {
              id: 4,
              orderId: "ORD100057",
              date: "2025-08-26 14:20",
              customer: "Emma Wilson",
              item: "Bluetooth Speaker",
              quantity: 3,
              price: "$79.99",
              orderStatus: "Completed"
            },
            {
              id: 5,
              orderId: "ORD100058",
              date: "2025-08-27 10:45",
              customer: "Michael Brown",
              item: "Gaming Mouse",
              quantity: 1,
              price: "$49.99",
              orderStatus: "Cancelled"
            },
            {
              id: 6,
              orderId: "ORD100059",
              date: "2025-08-27 16:30",
              customer: "Jessica Taylor",
              item: "Laptop Stand",
              quantity: 2,
              price: "$29.99",
              orderStatus: "Completed"
            },
            {
              id: 7,
              orderId: "ORD100060",
              date: "2025-08-28 08:50",
              customer: "David Miller",
              item: "USB-C Hub",
              quantity: 1,
              price: "$39.99",
              orderStatus: "Processing"
            }
          ];
          setOrders(mockOrders);
          setError("Using mock data - couldn't load from server");
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, []);

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort orders
  const sortedAndFilteredOrders = useMemo(() => {
    // First, filter the orders
    let filteredOrders = [...orders];
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredOrders = filteredOrders.filter(order => 
        (order.orderId && order.orderId.toLowerCase().includes(searchTermLower)) ||
        (order.customer && order.customer.toLowerCase().includes(searchTermLower)) ||
        (order.item && order.item.toLowerCase().includes(searchTermLower)) ||
        (order.orderStatus && order.orderStatus.toLowerCase().includes(searchTermLower))
      );
    }

    // Then sort the filtered orders
    if (sortConfig.key) {
      filteredOrders.sort((a, b) => {
        // Handle date strings
        if (sortConfig.key === 'date') {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);
          
          if (sortConfig.direction === 'ascending') {
            return dateA - dateB;
          }
          return dateB - dateA;
        }
        // Handle numeric values
        else if (typeof a[sortConfig.key] === 'number') {
          if (sortConfig.direction === 'ascending') {
            return a[sortConfig.key] - b[sortConfig.key];
          }
          return b[sortConfig.key] - a[sortConfig.key];
        }
        // Handle strings
        else {
          const valueA = a[sortConfig.key] ? a[sortConfig.key].toString().toLowerCase() : '';
          const valueB = b[sortConfig.key] ? b[sortConfig.key].toString().toLowerCase() : '';
          
          if (sortConfig.direction === 'ascending') {
            return valueA.localeCompare(valueB);
          }
          return valueB.localeCompare(valueA);
        }
      });
    }

    return filteredOrders;
  }, [orders, searchTerm, sortConfig]);

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = sortedAndFilteredOrders.slice(startIndex, startIndex + itemsPerPage);
  
  // Pagination component props
  const paginationProps = {
    currentPage,
    totalPages: Math.ceil(sortedAndFilteredOrders.length / itemsPerPage),
    onPageChange: (page) => setCurrentPage(page)
  };

  const getStatusClass = (status) => {
    if (!status) return '';
    
    const statusLower = status.toLowerCase();
    if (statusLower === 'completed') {
      return 'status-completed';
    } else if (statusLower === 'processing') {
      return 'status-processing';
    } else if (statusLower === 'shipped') {
      return 'status-shipped';
    } else if (statusLower === 'cancelled') {
      return 'status-cancelled';
    } else {
      return '';
    }
  };

  const handleExport = () => {
    console.log('Export functionality to be implemented');
  };

  const handleFilter = () => {
    console.log('Filter functionality to be implemented');
  };

  const handleView = (orderId) => {
    navigate(`/marketor-panel/order/${orderId}`);
  };

  const handlePrint = (orderId) => {
    console.log(`Print order ${orderId}`);
  };

  return (
    <div className="orders-status-container">
      <div className="orders-status-title">
        <h2>Order Status</h2>
      </div>
      
      <div className="orders-status-details">
        {/* Header Controls */}
        <div className="orders-status-header">
          <div className="search-section">
            <div className="search-input-container">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.7416 10.3333L15.0833 13.6666L13.6666 15.0833L10.3333 11.7416C9.2 12.6666 7.73331 13.1666 6.16665 13.1666C2.96665 13.1666 0.333313 10.5333 0.333313 7.33331C0.333313 4.13331 2.96665 1.49998 6.16665 1.49998C9.36665 1.49998 12 4.13331 12 7.33331C12 8.89998 11.5 10.3666 10.575 11.4999M6.16665 11.5C8.46665 11.5 10.3333 9.63331 10.3333 7.33331C10.3333 5.03331 8.46665 3.16665 6.16665 3.16665C3.86665 3.16665 2 5.03331 2 7.33331C2 9.63331 3.86665 11.5 6.16665 11.5Z" fill="#999999" />
              </svg>
              <input
                type="text"
                placeholder="Ex:ORD10001"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-inputtt"
              />
            </div>
          </div>
          <div className="action-buttons">
            <button className="export-btn" onClick={handleExport}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10.5L12 6.5H9V2H7V6.5H4L8 10.5ZM14 11V13H2V11H0V13C0 14.1 0.9 15 2 15H14C15.1 15 16 14.1 16 13V11H14Z" fill="#319F43" />
              </svg>
              <span>Export</span>
            </button>
            <button className="filter-btn" onClick={handleFilter}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 2H15L9.667 8.6V12.667L6.333 14V8.6L1 2Z" fill="currentColor" />
              </svg>
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Orders Status Table */}
        <div className="table-container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading orders data...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="retry-button" onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          ) : (
            <table className="orders-status-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('id')} className={`sortable-header ${sortConfig.key === 'id' ? 'active-sort' : ''}`}>
                    SI
                    <span className={`sort-icon ${sortConfig.key === 'id' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'id' ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  </th>
                  <th onClick={() => requestSort('orderId')} className={`sortable-header ${sortConfig.key === 'orderId' ? 'active-sort' : ''}`}>
                    ORDER ID
                    <span className={`sort-icon ${sortConfig.key === 'orderId' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'orderId' ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  </th>
                  <th onClick={() => requestSort('date')} className={`sortable-header ${sortConfig.key === 'date' ? 'active-sort' : ''}`}>
                    DATE
                    <span className={`sort-icon ${sortConfig.key === 'date' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'date' ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  </th>
                  <th onClick={() => requestSort('customer')} className={`sortable-header ${sortConfig.key === 'customer' ? 'active-sort' : ''}`}>
                    CUSTOMER
                    <span className={`sort-icon ${sortConfig.key === 'customer' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'customer' ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  </th>
                  <th onClick={() => requestSort('item')} className={`sortable-header ${sortConfig.key === 'item' ? 'active-sort' : ''}`}>
                    ITEM
                    <span className={`sort-icon ${sortConfig.key === 'item' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'item' ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  </th>
                  <th onClick={() => requestSort('quantity')} className={`sortable-header ${sortConfig.key === 'quantity' ? 'active-sort' : ''}`}>
                    QUANTITY
                    <span className={`sort-icon ${sortConfig.key === 'quantity' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'quantity' ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  </th>
                  <th onClick={() => requestSort('price')} className={`sortable-header ${sortConfig.key === 'price' ? 'active-sort' : ''}`}>
                    PRICE
                    <span className={`sort-icon ${sortConfig.key === 'price' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'price' ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  </th>
                  <th onClick={() => requestSort('orderStatus')} className={`sortable-header ${sortConfig.key === 'orderStatus' ? 'active-sort' : ''}`}>
                    ORDER STATUS
                    <span className={`sort-icon ${sortConfig.key === 'orderStatus' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'orderStatus' ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  </th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order, index) => (
                  <tr key={order.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{order.orderId}</td>
                    <td>{order.date}</td>
                    <td>{order.customer}</td>
                    <td>{order.item}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>
                      <span className={`status ${getStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td>
                      <div className="action-icons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => handleView(order.orderId)}
                          title="View"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <rect x="0.5" y="1" width="23" height="23" rx="4.5" stroke="#FFAF1A" />
                            <path d="M12 9.5C11.2044 9.5 10.4413 9.81607 9.87868 10.3787C9.31607 10.9413 9 11.7044 9 12.5C9 13.2956 9.31607 14.0587 9.87868 14.6213C10.4413 15.1839 11.2044 15.5 12 15.5C12.7956 15.5 13.5587 15.1839 14.1213 14.6213C14.6839 14.0587 15 13.2956 15 12.5C15 11.7044 14.6839 10.9413 14.1213 10.3787C13.5587 9.81607 12.7956 9.5 12 9.5ZM12 17.5C10.6739 17.5 9.40215 16.9732 8.46447 16.0355C7.52678 15.0979 7 13.8261 7 12.5C7 11.1739 7.52678 9.90215 8.46447 8.96447C9.40215 8.02678 10.6739 7.5 12 7.5C13.3261 7.5 14.5979 8.02678 15.5355 8.96447C16.4732 9.90215 17 11.1739 17 12.5C17 13.8261 16.4732 15.0979 15.5355 16.0355C14.5979 16.9732 13.3261 17.5 12 17.5ZM12 5C7 5 2.73 8.11 1 12.5C2.73 16.89 7 20 12 20C17 20 21.27 16.89 23 12.5C21.27 8.11 17 5 12 5Z" fill="#FFAF1A" />
                          </svg>
                        </button>
                        <button
                          className="action-btn print-btn"
                          onClick={() => handlePrint(order.orderId)}
                          title="Print"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <rect x="0.5" y="1" width="23" height="23" rx="4.5" stroke="#319F43" />
                            <path d="M18 7.5H6V3.5H18V7.5ZM18 13C18.2833 13 18.521 12.904 18.713 12.712C18.905 12.52 19.0007 12.2827 19 12C18.9993 11.7173 18.9033 11.48 18.712 11.288C18.5207 11.096 18.2833 11 18 11C17.7167 11 17.4793 11.096 17.288 11.288C17.0967 11.48 17.0007 11.7173 17 12C16.9993 12.2827 17.0953 12.5203 17.288 12.713C17.4807 12.9057 17.718 13.0013 18 13ZM16 19.5V15.5H8V19.5H16ZM18 21.5H6V17.5H2V11.5C2 10.65 2.29167 9.93767 2.875 9.363C3.45833 8.78833 4.16667 8.50067 5 8.5H19C19.85 8.5 20.5627 8.78767 21.138 9.363C21.7133 9.93833 22.0007 10.6507 22 11.5V17.5H18V21.5Z" fill="#319F43" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={paginationProps.totalPages}
            onPageChange={paginationProps.onPageChange}
          />
        )}
      </div>
    </div>
  );
}

export default MOrdersStatus;