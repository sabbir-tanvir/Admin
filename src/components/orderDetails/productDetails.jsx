import React, { useState, useMemo } from 'react';
import Pagination from '../pagination/Pagination';
import '../../styles/components/CustomerDetails.css';
import Table from '../Table/Table'; // Import the reusable Table component

function CustomerDetails() {
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

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'status-paid';
      case 'due': return 'status-due';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const handleView = (companyId) => {
    console.log(`View customer ${companyId}`);
  };

  const handlePrint = (companyId) => {
    console.log(`Print customer ${companyId}`);
  };

  const columns = [
    { key: 'id', header: 'SL' },
    { key: 'companyId', header: 'Company ID' },
    { key: 'date', header: 'Date' },
    { key: 'customerName', header: 'Customer Name' },
    { key: 'companyName', header: 'Company Name' },
    { key: 'noOfItems', header: 'No of Items' },
    { 
      key: 'description', 
      header: 'Description',
      render: (item) => (
        <td className="description-cell">
          {item.description.split('\n').map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </td>
      )
    },
    { 
      key: 'payment', 
      header: 'Payment',
      sortable: true,
      render: (item) => (
        <td>
          <div className="price-status">
            <span className="price">{item.payment}</span>
            <span className={`status ${getStatusClass(item.paymentStatus)}`}>
              {item.paymentStatus}
            </span>
          </div>
        </td>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <td>
          <div className="action-icons">
            <button
              className="action-btn view-btn"
              onClick={() => handleView(item.companyId)}
              title="View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#2196F3" />
                <path d="M12.5 9C11.7044 9 10.9413 9.31607 10.3787 9.87868C9.81607 10.4413 9.5 11.2044 9.5 12C9.5 12.7956 9.81607 13.5587 10.3787 14.1213C10.9413 14.6839 11.7044 15 12.5 15C13.2956 15 14.0587 14.6839 14.6213 14.1213C15.1839 13.5587 15.5 12.7956 15.5 12C15.5 11.2044 15.1839 10.4413 14.6213 9.87868C14.0587 9.31607 13.2956 9 12.5 9ZM12.5 17C11.1739 17 9.90215 16.4732 8.96447 15.5355C8.02678 14.5979 7.5 13.3261 7.5 12C7.5 10.6739 8.02678 9.40215 8.96447 8.46447C9.90215 7.52678 11.1739 7 12.5 7C13.8261 7 15.0979 7.52678 16.0355 8.46447C16.9732 9.40215 17.5 10.6739 17.5 12C17.5 13.3261 16.9732 14.5979 16.0355 15.5355C15.0979 16.4732 13.8261 17 12.5 17ZM12.5 4.5C7.5 4.5 3.23 7.61 1.5 12C3.23 16.39 7.5 19.5 12.5 19.5C17.5 19.5 21.77 16.39 23.5 12C21.77 7.61 17.5 4.5 12.5 4.5Z" fill="#2196F3" />
              </svg>
            </button>
            <button
              className="action-btn print-btn"
              onClick={() => handlePrint(item.companyId)}
              title="Print"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#31DA3D" />
                <path d="M18.5 7H6.5V3H18.5V7ZM18.5 12.5C18.7833 12.5 19.021 12.404 19.213 12.212C19.405 12.02 19.5007 11.7827 19.5 11.5C19.4993 11.2173 19.4033 10.98 19.212 10.788C19.0207 10.596 18.7833 10.5 18.5 10.5C18.2167 10.5 17.9793 10.596 17.788 10.788C17.5967 10.98 17.5007 11.2173 17.5 11.5C17.4993 11.7827 17.5953 12.0203 17.788 12.213C17.9807 12.4057 18.218 12.5013 18.5 12.5ZM16.5 19V15H8.5V19H16.5ZM18.5 21H6.5V17H2.5V11C2.5 10.15 2.79167 9.43767 3.375 8.863C3.95833 8.28833 4.66667 8.00067 5.5 8H19.5C20.35 8 21.0627 8.28767 21.638 8.863C22.2133 9.43833 22.5007 10.1507 22.5 11V17H18.5V21Z" fill="#31DA3D" />
              </svg>
            </button>
          </div>
        </td>
      )
    }
  ];

  return (
    <div className="customer-details">
      <Table
        columns={columns}
        data={customers}
        searchPlaceholder="Search by Company ID, Customer, or Company Name"
        searchKeys={['companyId', 'customerName', 'companyName']}
        itemsPerPage={5}
        onExport={() => console.log('Exporting...')}
        onFilter={() => console.log('Filtering...')}
        className="customer-details-table"
      />
    </div>
  );
}

export default CustomerDetails;
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
              <th onClick={() => requestSort('payment')} className="sortable-header">
                Payment
                <span className={`sort-icon ${sortConfig.key === 'payment' && sortConfig.direction === 'descending' ? 'rotate-icon' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
                    <path d="M1.24894 6.9996H8.74894C8.82487 6.99936 8.8993 6.97842 8.96422 6.93902C9.02913 6.89963 9.08208 6.84328 9.11735 6.77603C9.15262 6.70879 9.16889 6.6332 9.1644 6.5574C9.1599 6.48159 9.13482 6.40845 9.09185 6.34585L5.34185 0.92918C5.18644 0.704596 4.81227 0.704596 4.65644 0.92918L0.906437 6.34585C0.863031 6.40832 0.837576 6.4815 0.832839 6.55743C0.828102 6.63336 0.844264 6.70913 0.879568 6.77652C0.914872 6.8439 0.967969 6.90033 1.03309 6.93966C1.09821 6.97899 1.17286 6.99972 1.24894 6.9996Z" fill={sortConfig.key === 'payment' ? '#18B3F9' : '#ccc'} />
                  </svg>
                </span>
              </th>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default CustomerDetails;
