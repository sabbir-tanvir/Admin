import React, { useState } from 'react';
import Pagination from '../pagination/Pagination';
import '../../styles/components/CustomerDetails.css';

function CustomerDetails() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Sample customer data matching the table structure
  const [customers] = useState([
    {
      id: 1,
      companyId: "200054",
      date: "25 AUG 2025 17:40",
      customerName: "Alice",
      companyName: "BlueWave",
      noOfItems: 5,
      description: "2 Bulldozer\n2 Tractor\n1 Bus",
      payment: "$60,000",
      paymentStatus: "Paid"
    },
    {
      id: 2,
      companyId: "200055",
      date: "25 AUG 2025 17:40",
      customerName: "Bob",
      companyName: "GreenTech",
      noOfItems: 3,
      description: "1 Excavator\n2 Truck",
      payment: "$45,000",
      paymentStatus: "Due"
    },
    {
      id: 3,
      companyId: "200056",
      date: "24 AUG 2025 14:20",
      customerName: "Carol",
      companyName: "RedCorp",
      noOfItems: 7,
      description: "3 Bulldozer\n2 Tractor\n2 Crane",
      payment: "$85,000",
      paymentStatus: "Paid"
    },
    {
      id: 4,
      companyId: "200057",
      date: "23 AUG 2025 11:15",
      customerName: "David",
      companyName: "YellowInc",
      noOfItems: 2,
      description: "1 Bus\n1 Truck",
      payment: "$30,000",
      paymentStatus: "Pending"
    },
    {
      id: 5,
      companyId: "200058",
      date: "22 AUG 2025 09:30",
      customerName: "Emma",
      companyName: "PurpleLtd",
      noOfItems: 4,
      description: "2 Excavator\n2 Crane",
      payment: "$70,000",
      paymentStatus: "Due"
    },
    {
      id: 6,
      companyId: "200059",
      date: "21 AUG 2025 16:45",
      customerName: "Frank",
      companyName: "OrangeCo",
      noOfItems: 6,
      description: "3 Tractor\n2 Bus\n1 Truck",
      payment: "$95,000",
      paymentStatus: "Paid"
    },
    {
      id: 7,
      companyId: "200060",
      date: "20 AUG 2025 13:20",
      customerName: "Grace",
      companyName: "SilverGroup",
      noOfItems: 1,
      description: "1 Bulldozer",
      payment: "$25,000",
      paymentStatus: "Paid"
    }
  ]);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.companyId.toString().includes(searchTerm) ||
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'status-paid';
      case 'due': return 'status-due';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const handleExport = () => {
    console.log('Export functionality to be implemented');
  };

  const handleFilter = () => {
    console.log('Filter functionality to be implemented');
  };

  const handleView = (companyId) => {
    console.log(`View customer ${companyId}`);
  };

  const handlePrint = (companyId) => {
    console.log(`Print customer ${companyId}`);
  };

  return (
    <div className="customer-details">
      {/* Header Controls */}
      <div className="customer-details-header">
        <div className="search-section">
          <div className="search-input-container">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.7416 10.3333L15.0833 13.6666L13.6666 15.0833L10.3333 11.7416C9.2 12.6666 7.73331 13.1666 6.16665 13.1666C2.96665 13.1666 0.333313 10.5333 0.333313 7.33331C0.333313 4.13331 2.96665 1.49998 6.16665 1.49998C9.36665 1.49998 12 4.13331 12 7.33331C12 8.89998 11.5 10.3666 10.575 11.4999M6.16665 11.5C8.46665 11.5 10.3333 9.63331 10.3333 7.33331C10.3333 5.03331 8.46665 3.16665 6.16665 3.16665C3.86665 3.16665 2 5.03331 2 7.33331C2 9.63331 3.86665 11.5 6.16665 11.5Z" fill="#999999" />
            </svg>
            <input
              type="text"
              placeholder="Ex:200001"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-inputtt"
            />
          </div>
        </div>
        <div className="action-buttons">
          <button className="export-btn" onClick={handleExport}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 10.5L12 6.5H9V2H7V6.5H4L8 10.5ZM14 11V13H2V11H0V13C0 14.1 0.9 15 2 15H14C15.1 15 16 14.1 16 13V11H14Z" fill="currentColor" />
            </svg>
            Export
          </button>
          <button className="filter-btn" onClick={handleFilter}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 2H15L9.667 8.6V12.667L6.333 14V8.6L1 2Z" fill="currentColor" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="customers-table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Company ID</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Company Name</th>
              <th>No of Items</th>
              <th>Description</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{startIndex + index + 1}</td>
                <td>{customer.companyId}</td>
                <td>{customer.date}</td>
                <td>{customer.customerName}</td>
                <td>{customer.companyName}</td>
                <td>{customer.noOfItems}</td>
                <td className="description-cell">
                  {customer.description.split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </td>
                <td>
                  <div className="price-status">
                    <span className="price">{customer.payment}</span>
                    <span className={`status ${getStatusClass(customer.paymentStatus)}`}>
                      {customer.paymentStatus}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="action-icons">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleView(customer.companyId)}
                      title="View"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#2196F3" />
                        <path d="M12.5 9C11.7044 9 10.9413 9.31607 10.3787 9.87868C9.81607 10.4413 9.5 11.2044 9.5 12C9.5 12.7956 9.81607 13.5587 10.3787 14.1213C10.9413 14.6839 11.7044 15 12.5 15C13.2956 15 14.0587 14.6839 14.6213 14.1213C15.1839 13.5587 15.5 12.7956 15.5 12C15.5 11.2044 15.1839 10.4413 14.6213 9.87868C14.0587 9.31607 13.2956 9 12.5 9ZM12.5 17C11.1739 17 9.90215 16.4732 8.96447 15.5355C8.02678 14.5979 7.5 13.3261 7.5 12C7.5 10.6739 8.02678 9.40215 8.96447 8.46447C9.90215 7.52678 11.1739 7 12.5 7C13.8261 7 15.0979 7.52678 16.0355 8.46447C16.9732 9.40215 17.5 10.6739 17.5 12C17.5 13.3261 16.9732 14.5979 16.0355 15.5355C15.0979 16.4732 13.8261 17 12.5 17ZM12.5 4.5C7.5 4.5 3.23 7.61 1.5 12C3.23 16.39 7.5 19.5 12.5 19.5C17.5 19.5 21.77 16.39 23.5 12C21.77 7.61 17.5 4.5 12.5 4.5Z" fill="#2196F3" />
                      </svg>
                    </button>
                    <button
                      className="action-btn print-btn"
                      onClick={() => handlePrint(customer.companyId)}
                      title="Print"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#31DA3D" />
                        <path d="M18.5 7H6.5V3H18.5V7ZM18.5 12.5C18.7833 12.5 19.021 12.404 19.213 12.212C19.405 12.02 19.5007 11.7827 19.5 11.5C19.4993 11.2173 19.4033 10.98 19.212 10.788C19.0207 10.596 18.7833 10.5 18.5 10.5C18.2167 10.5 17.9793 10.596 17.788 10.788C17.5967 10.98 17.5007 11.2173 17.5 11.5C17.4993 11.7827 17.5953 12.0203 17.788 12.213C17.9807 12.4057 18.218 12.5013 18.5 12.5ZM16.5 19V15H8.5V19H16.5ZM18.5 21H6.5V17H2.5V11C2.5 10.15 2.79167 9.43767 3.375 8.863C3.95833 8.28833 4.66667 8.00067 5.5 8H19.5C20.35 8 21.0627 8.28767 21.638 8.863C22.2133 9.43833 22.5007 10.1507 22.5 11V17H18.5V21Z" fill="#31DA3D" />
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
    </div>
  );
}

export default CustomerDetails;
