import React, { useState, useMemo } from 'react';
import Table from '../Table/Table';
import '../../styles/components/ProductDetails.css';

function ProductDetails() {
  // Sample product data matching the table structure from the image
  const [products] = useState([
    {
      id: 1,
      productId: "100054",
      date: "25 AUG 2025 17:40",
      productName: "Monstor Tractor",
      companyName: "Okla",
      price: "$60,000",
      status: "Approved"
    },
    {
      id: 2,
      productId: "100054",
      date: "25 AUG 2025 17:40",
      productName: "Lithography Machine",
      companyName: "Mechtek",
      price: "$1,000,000",
      status: "Pending"
    },
    {
      id: 3,
      productId: "100054",
      date: "25 AUG 2025 17:40",
      productName: "Lithography Machine",
      companyName: "Mechtek",
      price: "$1,000,000",
      status: "Pending"
    },
    {
      id: 4,
      productId: "100055",
      date: "24 AUG 2025 14:20",
      productName: "Industrial Robot",
      companyName: "TechCorp",
      price: "$250,000",
      status: "Approved"
    },
    {
      id: 5,
      productId: "100056",
      date: "23 AUG 2025 09:15",
      productName: "3D Printer Pro",
      companyName: "MakerSpace",
      price: "$15,000",
      status: "Rejected"
    },
    {
      id: 6,
      productId: "100057",
      date: "22 AUG 2025 16:30",
      productName: "Smart Warehouse System",
      companyName: "LogiTech",
      price: "$500,000",
      status: "Pending"
    },
    {
      id: 7,
      productId: "100058",
      date: "21 AUG 2025 11:45",
      productName: "Automated Assembly Line",
      companyName: "AutoMation Inc",
      price: "$2,500,000",
      status: "Approved"
    },
    {
      id: 8,
      productId: "100059",
      date: "20 AUG 2025 13:20",
      productName: "Quality Control Scanner",
      companyName: "QualityFirst",
      price: "$75,000",
      status: "Pending"
    },
    {
      id: 6,
      productId: "100057",
      date: "22 AUG 2025 16:30",
      productName: "Smart Warehouse System",
      companyName: "LogiTech",
      price: "$500,000",
      status: "Pending"
    },
    {
      id: 7,
      productId: "100058",
      date: "21 AUG 2025 11:45",
      productName: "Automated Assembly Line",
      companyName: "AutoMation Inc",
      price: "$2,500,000",
      status: "Approved"
    },
    {
      id: 8,
      productId: "100059",
      date: "20 AUG 2025 13:20",
      productName: "Quality Control Scanner",
      companyName: "QualityFirst",
      price: "$75,000",
      status: "Pending"
    },
    {
      id: 6,
      productId: "100057",
      date: "22 AUG 2025 16:30",
      productName: "Smart Warehouse System",
      companyName: "LogiTech",
      price: "$500,000",
      status: "Pending"
    },
    {
      id: 7,
      productId: "100058",
      date: "21 AUG 2025 11:45",
      productName: "Automated Assembly Line",
      companyName: "AutoMation Inc",
      price: "$2,500,000",
      status: "Approved"
    },
    {
      id: 8,
      productId: "100059",
      date: "20 AUG 2025 13:20",
      productName: "Quality Control Scanner",
      companyName: "QualityFirst",
      price: "$75,000",
      status: "Pending"
    }
  ]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const handleView = (productId) => {
    console.log(`View product ${productId}`);
  };

  const handlePrint = (productId) => {
    console.log(`Print product ${productId}`);
  };

  const columns = useMemo(() => [
    { 
      key: 'sl', 
      header: 'Sl',
      render: (item, index) => index + 1
    },
    { key: 'productId', header: 'Product Id' },
    { key: 'date', header: 'Date' },
    { key: 'productName', header: 'Product Name' },
    { key: 'companyName', header: 'Company Name' },
    { 
      key: 'price', 
      header: 'Price',
      sortable: true,
      render: (item) => (
        <div className="price-status">
          <span className="price">{item.price}</span>
          <span className={`status ${getStatusClass(item.status)}`}>
            {item.status}
          </span>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="action-icons">
          <button
            className="action-btn view-btn"
            onClick={() => handleView(item.productId)}
            title="View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#FFAF1A" />
              <path d="M12.5 9C11.7044 9 10.9413 9.31607 10.3787 9.87868C9.81607 10.4413 9.5 11.2044 9.5 12C9.5 12.7956 9.81607 13.5587 10.3787 14.1213C10.9413 14.6839 11.7044 15 12.5 15C13.2956 15 14.0587 14.6839 14.6213 14.1213C15.1839 13.5587 15.5 12.7956 15.5 12C15.5 11.2044 15.1839 10.4413 14.6213 9.87868C14.0587 9.31607 13.2956 9 12.5 9ZM12.5 17C11.1739 17 9.90215 16.4732 8.96447 15.5355C8.02678 14.5979 7.5 13.3261 7.5 12C7.5 10.6739 8.02678 9.40215 8.96447 8.46447C9.90215 7.52678 11.1739 7 12.5 7C13.8261 7 15.0979 7.52678 16.0355 8.46447C16.9732 9.40215 17.5 10.6739 17.5 12C17.5 13.3261 16.9732 14.5979 16.0355 15.5355C15.0979 16.4732 13.8261 17 12.5 17ZM12.5 4.5C7.5 4.5 3.23 7.61 1.5 12C3.23 16.39 7.5 19.5 12.5 19.5C17.5 19.5 21.77 16.39 23.5 12C21.77 7.61 17.5 4.5 12.5 4.5Z" fill="#FFAF1A" />
            </svg>
          </button>
          <button
            className="action-btn print-btn"
            onClick={() => handlePrint(item.productId)}
            title="Print"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#31DA3D" />
              <path d="M18.5 7H6.5V3H18.5V7ZM18.5 12.5C18.7833 12.5 19.021 12.404 19.213 12.212C19.405 12.02 19.5007 11.7827 19.5 11.5C19.4993 11.2173 19.4033 10.98 19.212 10.788C19.0207 10.596 18.7833 10.5 18.5 10.5C18.2167 10.5 17.9793 10.596 17.788 10.788C17.5967 10.98 17.5007 11.2173 17.5 11.5C17.4993 11.7827 17.5953 12.0203 17.788 12.213C17.9807 12.4057 18.218 12.5013 18.5 12.5ZM16.5 19V15H8.5V19H16.5ZM18.5 21H6.5V17H2.5V11C2.5 10.15 2.79167 9.43767 3.375 8.863C3.95833 8.28833 4.66667 8.00067 5.5 8H19.5C20.35 8 21.0627 8.28767 21.638 8.863C22.2133 9.43833 22.5007 10.1507 22.5 11V17H18.5V21Z" fill="#31DA3D" />
            </svg>
          </button>
        </div>
      )
    }
  ], []);

  return (
    <div className="product-details">
      <Table
        columns={columns}
        data={products}
        searchPlaceholder="Search by Product Name, Company, or ID"
        searchKeys={['productName', 'companyName', 'productId']}
        itemsPerPage={7}
        onExport={() => console.log('Exporting...')}
        onFilter={() => console.log('Filtering...')}
        className="product-details-table"
      />
    </div>
  );
}

export default ProductDetails;