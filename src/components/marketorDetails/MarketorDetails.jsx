import React, { useState } from 'react';
import Pagination from '../pagination/Pagination';
import '../../styles/components/MarketorDetails.css';

function MarketorDetails() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5;

  // Sample employee/marketer data
  const [employees] = useState([
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "John Smith",
      title: "Marketing Manager",
      items: 25,
      commission: "$2,500",
      salary: "$75,000",
      payment: "Paid"
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Sarah Johnson",
      title: "Sales Representative",
      items: 32,
      commission: "$3,200",
      salary: "$55,000",
      payment: "Pending"
    },
    {
      id: 3,
      employeeId: "EMP003",
      employeeName: "Mike Chen",
      title: "Digital Specialist",
      items: 18,
      commission: "$1,800",
      salary: "$60,000",
      payment: "Paid"
    },
    {
      id: 4,
      employeeId: "EMP004",
      employeeName: "Emily Davis",
      title: "Business Analyst",
      items: 15,
      commission: "$1,500",
      salary: "$50,000",
      payment: "Due"
    },
    {
      id: 5,
      employeeId: "EMP005",
      employeeName: "David Wilson",
      title: "Content Manager",
      items: 28,
      commission: "$2,800",
      salary: "$65,000",
      payment: "Paid"
    },
    {
      id: 6,
      employeeId: "EMP006",
      employeeName: "Lisa Brown",
      title: "Account Manager",
      items: 35,
      commission: "$3,500",
      salary: "$70,000",
      payment: "Paid"
    },
    {
      id: 7,
      employeeId: "EMP007",
      employeeName: "Alex Rodriguez",
      title: "Coordinator",
      items: 12,
      commission: "$1,200",
      salary: "$45,000",
      payment: "Pending"
    }
  ]);

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.includes(searchTerm)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaymentClass = (payment) => {
    switch (payment.toLowerCase()) {
      case 'paid': return 'status-paid';
      case 'pending': return 'status-pending';
      case 'due': return 'status-due';
      default: return '';
    }
  };

  const handleExport = () => {
    console.log('Export functionality to be implemented');
  };

  const handleFilter = () => {
    console.log('Filter functionality to be implemented');
  };

  const handleView = (employeeId) => {
    console.log(`View employee ${employeeId}`);
  };

  const handlePrint = (employeeId) => {
    console.log(`Print employee ${employeeId}`);
  };

  return (
    <div className="seller-details">
      {/* Header Controls */}
      <div className="seller-details-header">
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
              <path d="M7.032 4.75H13.968C14.425 4.75 14.822 4.75 15.133 4.78C15.44 4.808 15.818 4.875 16.126 5.128C16.523 5.454 16.747 5.942 16.75 6.45C16.752 6.84 16.578 7.176 16.41 7.442C16.242 7.712 15.999 8.032 15.715 8.406L13.119 11.828C12.867 12.16 12.804 12.248 12.76 12.338C12.7142 12.4323 12.6809 12.5321 12.661 12.635C12.641 12.735 12.638 12.847 12.638 13.269V17.512C12.638 17.72 12.638 17.924 12.624 18.09C12.609 18.254 12.572 18.517 12.4 18.753C12.19 19.04 11.863 19.226 11.5 19.248C11.198 19.267 10.953 19.145 10.81 19.065C10.6472 18.9682 10.4884 18.8647 10.334 18.755L9.345 18.072L9.297 18.039C9.106 17.908 8.894 17.763 8.735 17.562C8.59682 17.3886 8.49389 17.1899 8.432 16.977C8.361 16.733 8.362 16.477 8.362 16.239V13.269C8.362 12.847 8.358 12.735 8.339 12.635C8.3188 12.5321 8.28518 12.4322 8.239 12.338C8.196 12.248 8.133 12.16 7.881 11.828L5.285 8.406C5.001 8.032 4.758 7.712 4.589 7.442C4.422 7.176 4.249 6.84 4.25 6.45C4.25053 6.19734 4.30672 5.9479 4.41457 5.71941C4.52242 5.49092 4.67928 5.289 4.874 5.128C5.182 4.875 5.56 4.808 5.867 4.779C6.178 4.75 6.574 4.75 7.032 4.75Z" fill="black" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="seller-table">
          <thead>
            <tr>
              <th>Sl</th>
              <th>Employee ID</th>

              <th>Employee Name</th>

              <th>Title</th>
              <th>Items</th>
              <th>Commision</th>
              <th>Salary</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{startIndex + index + 1}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.employeeName}</td>
                <td>{employee.title}</td>
                <td>{employee.items}</td>
                <td className="commission-cell">{employee.commission}</td>
                <td className="salary-cell">{employee.salary}</td>
                <td>
                  <span className={`status ${getPaymentClass(employee.payment)}`}>
                    {employee.payment}
                  </span>
                </td>
                <td>
                  <div className="action-icons">
                    <button
                      className="action-btn view-btn"
                      onClick={() => handleView(employee.employeeId)}
                      title="View"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#FFAF1A" />
                        <path d="M12.5 9C11.7044 9 10.9413 9.31607 10.3787 9.87868C9.81607 10.4413 9.5 11.2044 9.5 12C9.5 12.7956 9.81607 13.5587 10.3787 14.1213C10.9413 14.6839 11.7044 15 12.5 15C13.2956 15 14.0587 14.6839 14.6213 14.1213C15.1839 13.5587 15.5 12.7956 15.5 12C15.5 11.2044 15.1839 10.4413 14.6213 9.87868C14.0587 9.31607 13.2956 9 12.5 9ZM12.5 17C11.1739 17 9.90215 16.4732 8.96447 15.5355C8.02678 14.5979 7.5 13.3261 7.5 12C7.5 10.6739 8.02678 9.40215 8.96447 8.46447C9.90215 7.52678 11.1739 7 12.5 7C13.8261 7 15.0979 7.52678 16.0355 8.46447C16.9732 9.40215 17.5 10.6739 17.5 12C17.5 13.3261 16.9732 14.5979 16.0355 15.5355C15.0979 16.4732 13.8261 17 12.5 17ZM12.5 4.5C7.5 4.5 3.23 7.61 1.5 12C3.23 16.39 7.5 19.5 12.5 19.5C17.5 19.5 21.77 16.39 23.5 12C21.77 7.61 17.5 4.5 12.5 4.5Z" fill="#FFAF1A" />
                      </svg>
                    </button>
                    <button
                      className="action-btn print-btn"
                      onClick={() => handlePrint(employee.employeeId)}
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

export default MarketorDetails;