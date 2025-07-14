import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../pagination/Pagination';
import '../../styles/components/OrderDetails.css';
import axios from 'axios';

function OrderDetails() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 6;

  // Fetch orders data from JSON file
  useEffect(() => {
    setLoading(true);
    axios.get('/order.json')
      .then(res => {
        // Transform the data to match the table structure
        const transformedOrders = res.data.map((order, index) => ({
          id: index + 1,
          orderId: order.orderId,
          date: order.date,
          customerName: order.customer,
          customerPhone: order.phone,
          marketer: order.company || 'N/A', // Using company name as marketer since marketer field doesn't exist
          itemQuantity: order.quantity,
          price: `$${order.price}`,
          paymentStatus: order.paymentStatus,
          orderStatus: order.status
        }));
        setOrders(transformedOrders);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load orders data');
        setLoading(false);
      });
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter and sort orders
  const processedOrders = useMemo(() => {
    let filteredItems = orders.filter(order =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.marketer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.includes(searchTerm)
    );

    if (sortConfig.key) {
      filteredItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (sortConfig.key === 'date') {
          const dateA = new Date(aValue);
          const dateB = new Date(bValue);
          return sortConfig.direction === 'ascending' ? dateA - dateB : dateB - dateA;
        }

        if (sortConfig.key === 'price') {
          const numA = parseFloat(String(aValue).replace(/[^0-9.-]+/g, ""));
          const numB = parseFloat(String(bValue).replace(/[^0-9.-]+/g, ""));
          if (!isNaN(numA) && !isNaN(numB)) {
            return sortConfig.direction === 'ascending' ? numA - numB : numB - numA;
          }
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
        }

        const stringA = String(aValue).toLowerCase();
        const stringB = String(bValue).toLowerCase();

        if (stringA < stringB) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (stringA > stringB) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredItems;
  }, [orders, searchTerm, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(processedOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = processedOrders.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'status-delivered';
      case 'pending': return 'status-pending';
      case 'cancelled': return 'status-cancelled';
      case 'paid': return 'status-paid';
      default: return '';
    }
  };

  const handleExport = () => {
    console.log('Export functionality to be implemented');
  };

  const handleFilter = () => {
    console.log('Filter functionality to be implemented');
  };

  const handleView = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handlePrint = (orderId) => {
    console.log(`Print order ${orderId}`);
  };

  return (
    <div className="order-details">
      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <span className="loader"></span> Loading orders...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{ color: 'red', textAlign: 'center', padding: '40px 0' }}>
          {error}
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Header Controls */}
          <div className="order-details-header">
        <div className="search-section">
          <div className="search-input-container">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7416 10.3333L15.0833 13.6666L13.6666 15.0833L10.3333 11.7416C9.2 12.6666 7.73331 13.1666 6.16665 13.1666C2.96665 13.1666 0.333313 10.5333 0.333313 7.33331C0.333313 4.13331 2.96665 1.49998 6.16665 1.49998C9.36665 1.49998 12 4.13331 12 7.33331C12 8.89998 11.5 10.3666 10.575 11.4999M6.16665 11.5C8.46665 11.5 10.3333 9.63331 10.3333 7.33331C10.3333 5.03331 8.46665 3.16665 6.16665 3.16665C3.86665 3.16665 2 5.03331 2 7.33331C2 9.63331 3.86665 11.5 6.16665 11.5Z" fill="#999999" />
            </svg>
            <input
              type="text"
              placeholder="Ex:10001"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-inputtt"
            />
          </div>
        </div>
        <div className="action-buttons">
          <button className="export-btn" onClick={handleExport}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M0.5 15.8929H13.5V14.0357H0.5M13.5 5.67861H9.78571V0.107178H4.21429V5.67861H0.5L7 12.1786L13.5 5.67861Z" fill="#319F43" />
            </svg>
            <span>Export</span>
            <svg width="12" height="12" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.13804 10.62L2.82804 5.04705C2.73939 4.95406 2.68994 4.83052 2.68994 4.70205C2.68994 4.57358 2.73939 4.45003 2.82804 4.35705L2.83404 4.35105C2.87701 4.30581 2.92874 4.26979 2.98607 4.24518C3.0434 4.22056 3.10514 4.20787 3.16754 4.20787C3.22993 4.20787 3.29167 4.22056 3.349 4.24518C3.40634 4.26979 3.45806 4.30581 3.50104 4.35105L8.50104 9.59905L13.499 4.35105C13.542 4.30581 13.5937 4.26979 13.6511 4.24518C13.7084 4.22056 13.7701 4.20787 13.8325 4.20787C13.8949 4.20787 13.9567 4.22056 14.014 4.24518C14.0713 4.26979 14.1231 4.30581 14.166 4.35105L14.172 4.35705C14.2607 4.45003 14.3101 4.57358 14.3101 4.70205C14.3101 4.83052 14.2607 4.95406 14.172 5.04705L8.86204 10.62C8.81534 10.6691 8.75918 10.7081 8.69695 10.7347C8.63472 10.7614 8.56773 10.7751 8.50004 10.7751C8.43234 10.7751 8.36535 10.7614 8.30312 10.7347C8.2409 10.7081 8.18473 10.6691 8.13804 10.62Z" fill="#009BB3" />
            </svg>
          </button>
          <button className="filter-btn" onClick={handleFilter}>
            <span>Filter</span>
            <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.032 4.75H13.968C14.425 4.75 14.822 4.75 15.133 4.78C15.44 4.808 15.818 4.875 16.126 5.128C16.523 5.454 16.747 5.942 16.75 6.45C16.752 6.84 16.578 7.176 16.41 7.442C16.242 7.712 15.999 8.032 15.715 8.406L13.119 11.828C12.867 12.16 12.804 12.248 12.76 12.338C12.7142 12.4323 12.6809 12.5321 12.661 12.635C12.641 12.735 12.638 12.847 12.638 13.269V17.512C12.638 17.72 12.638 17.924 12.624 18.09C12.609 18.254 12.572 18.517 12.4 18.753C12.19 19.04 11.863 19.226 11.5 19.248C11.198 19.267 10.953 19.145 10.81 19.065C10.6472 18.9682 10.4884 18.8647 10.334 18.755L9.345 18.072L9.297 18.039C9.106 17.908 8.894 17.763 8.735 17.562C8.59682 17.3886 8.49389 17.1899 8.432 16.977C8.361 16.733 8.362 16.477 8.362 16.239V13.269C8.362 12.847 8.358 12.735 8.339 12.635C8.3188 12.5321 8.28518 12.4322 8.239 12.338C8.196 12.248 8.133 12.16 7.881 11.828L5.285 8.406C5.001 8.032 4.758 7.712 4.589 7.442C4.422 7.176 4.249 6.84 4.25 6.45C4.25053 6.19734 4.30672 5.9479 4.41457 5.71941C4.52242 5.49092 4.67928 5.289 4.874 5.128C5.182 4.875 5.56 4.808 5.867 4.779C6.178 4.75 6.574 4.75 7.032 4.75ZM5.808 6.305C5.77434 6.3419 5.75424 6.38916 5.751 6.439C5.757 6.458 5.781 6.52 5.861 6.646C5.989 6.851 6.191 7.118 6.501 7.527L9.076 10.921L9.111 10.967C9.312 11.231 9.472 11.442 9.589 11.682C9.69167 11.8933 9.76567 12.115 9.811 12.347C9.862 12.608 9.861 12.874 9.861 13.211V16.179C9.861 16.337 9.862 16.426 9.866 16.493L9.872 16.555C9.87887 16.5815 9.89113 16.6064 9.908 16.628L9.949 16.662C9.999 16.702 10.069 16.75 10.197 16.838L11.138 17.488V13.21C11.138 12.873 11.138 12.607 11.189 12.346C11.2343 12.1147 11.3083 11.893 11.411 11.681C11.528 11.441 11.688 11.231 11.889 10.966L11.924 10.92L14.499 7.526C14.809 7.116 15.011 6.85 15.139 6.645C15.219 6.519 15.243 6.457 15.249 6.438C15.2458 6.38816 15.2257 6.3409 15.192 6.304C15.1266 6.28659 15.0596 6.27587 14.992 6.272C14.76 6.25 14.436 6.249 13.932 6.249H7.068C6.564 6.249 6.24 6.249 6.008 6.272C5.94043 6.27587 5.87342 6.28759 5.808 6.305ZM16.25 10.5C16.25 10.3011 16.329 10.1103 16.4697 9.96967C16.6103 9.82902 16.8011 9.75 17 9.75H20C20.1989 9.75 20.3897 9.82902 20.5303 9.96967C20.671 10.1103 20.75 10.3011 20.75 10.5C20.75 10.6989 20.671 10.8897 20.5303 11.0303C20.3897 11.171 20.1989 11.25 20 11.25H17C16.8011 11.25 16.6103 11.171 16.4697 11.0303C16.329 10.8897 16.25 10.6989 16.25 10.5ZM14.75 13C14.75 12.8011 14.829 12.6103 14.9697 12.4697C15.1103 12.329 15.3011 12.25 15.5 12.25H20C20.1989 12.25 20.3897 12.329 20.5303 12.4697C20.671 12.6103 20.75 12.8011 20.75 13C20.75 13.1989 20.671 13.3897 20.5303 13.5303C20.3897 13.671 20.1989 13.75 20 13.75H15.5C15.3011 13.75 15.1103 13.671 14.9697 13.5303C14.829 13.3897 14.75 13.1989 14.75 13ZM14.25 15.5C14.25 15.3011 14.329 15.1103 14.4697 14.9697C14.6103 14.829 14.8011 14.75 15 14.75H20C20.1989 14.75 20.3897 14.829 20.5303 14.9697C20.671 15.1103 20.75 15.3011 20.75 15.5C20.75 15.6989 20.671 15.8897 20.5303 16.0303C20.3897 16.171 20.1989 16.25 20 16.25H15C14.8011 16.25 14.6103 16.171 14.4697 16.0303C14.329 15.8897 14.25 15.6989 14.25 15.5ZM14.25 18C14.25 17.8011 14.329 17.6103 14.4697 17.4697C14.6103 17.329 14.8011 17.25 15 17.25H17.5C17.6989 17.25 17.8897 17.329 18.0303 17.4697C18.171 17.6103 18.25 17.8011 18.25 18C18.25 18.1989 18.171 18.3897 18.0303 18.5303C17.8897 18.671 17.6989 18.75 17.5 18.75H15C14.8011 18.75 14.6103 18.671 14.4697 18.5303C14.329 18.3897 14.25 18.1989 14.25 18Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>

      {/* Order Table */}
      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              {[
                { key: 'id', header: 'Sl' },
                { key: 'orderId', header: 'Order Id' },
                { key: 'date', header: 'Date' },
                { key: 'customerName', header: 'Customer' },
                { key: 'marketer', header: 'Marketer' },
                { key: 'itemQuantity', header: 'Item Quantity' },
                { key: 'price', header: 'Price' },
                { key: 'orderStatus', header: 'Order status' },
                { key: 'actions', header: 'Actions', sortable: false },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && requestSort(col.key)}
                  className={col.sortable !== false ? 'sortable-header' : ''}
                >
                  {col.header}
                  {col.sortable !== false && (
                    <span className={`sort-icon ${sortConfig.key === col.key && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                        <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === col.key ? '#18B3F9' : '#ccc'} />
                      </svg>
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.map((order, index) => (
              <tr key={order.id}>
                <td>{startIndex + index + 1}</td>
                <td>{order.orderId}</td>
                <td>{order.date}</td>
                <td>
                  <div className="customer-info">
                    <div className="customer-name">{order.customerName}</div>
                    <div className="customer-phone">{order.customerPhone}</div>
                  </div>
                </td>
                <td>{order.marketer}</td>
                <td>{order.itemQuantity}</td>
                <td>
                  <div className="price-status">
                    <span className="price">{order.price}</span>
                    <span className="payment-status">{order.paymentStatus}</span>
                  </div>
                </td>
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
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
        </>
      )}
    </div>
  );
}

export default OrderDetails;
