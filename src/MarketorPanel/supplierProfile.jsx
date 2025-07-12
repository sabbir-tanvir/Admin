import React, { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/MarketorPanel/supplierProfile.css';
import UserCardVertical from '../components/Card/UserCardVertical';
import SalesCard from '../components/Card/SalesCard';
import PaymentCard from '../components/Card/PayemntCard';
import Table from '../components/Table/Table';
import BluePagination from '../components/pagination/BluePagination';

const SupplierProfile = () => {
    const { id } = useParams();
    const location = useLocation();
    const supplierData = location.state?.supplierData;

    // Memoize the display data to avoid recreation on each render
    const displayData = useMemo(() => {
        // Default data if no supplier data is passed
        const defaultSupplier = {
            id: id || "N/A",
            name: "Jack Jonson",
            contact: "+880*********74",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
            type: "supplier",
            email: "example@gamail.com",
            status: "Due"
        };
        
        return {
            ...defaultSupplier,
            ...supplierData,
            // Calculate financial data based on status if available
            email: supplierData?.email || defaultSupplier.email
        };
    }, [id, supplierData]);
    
    // Memoize financial data
    const financialData = useMemo(() => ({
        items: 35,
        totalPrice: "$350,000",
        paidAmount: "$270,000",
        dueAmount: "$80,000"
    }), []);

    // Sample table data for orders using useState
    const orderData = [
        {
            sl: 1,
            orderId: "100054",
            date: "25 AUG 2025 17:40",
            productName: "2 x insulators, 4 x pumps",
            quantity: "6",
            marketers: "David",
            totalItems: "10",
            totalPrice: "$60,000",
            status: "Approved"
        },
        {
            sl: 2,
            orderId: "100055",
            date: "24 AUG 2025 14:20",
            productName: "3 x motors, 2 x valves",
            quantity: "5",
            marketers: "Sarah",
            totalItems: "8",
            totalPrice: "$1,000,000",
            status: "Pending"
        },
        {
            sl: 3,
            orderId: "100056",
            date: "23 AUG 2025 09:15",
            productName: "5 x filters, 1 x control unit",
            quantity: "6",
            marketers: "David",
            totalItems: "12",
            totalPrice: "$1,000,000",
            status: "Pending"
        },
        {
            sl: 4,
            orderId: "100057",
            date: "22 AUG 2025 11:30",
            productName: "10 x pipes, 2 x fittings",
            quantity: "12",
            marketers: "Emily",
            totalItems: "15",
            totalPrice: "$250,000",
            status: "Approved"
        },
        {
            sl: 5,
            orderId: "100058",
            date: "21 AUG 2025 14:10",
            productName: "1 x control panel",
            quantity: "1",
            marketers: "John",
            totalItems: "3",
            totalPrice: "$15,000",
            status: "Rejected"
        },
        {
            sl: 6,
            orderId: "100059",
            date: "20 AUG 2025 09:45",
            productName: "5 x sensors, 2 x controllers",
            quantity: "7",
            marketers: "David",
            totalItems: "10",
            totalPrice: "$500,000",
            status: "Pending"
        }
    ];
    
    // We no longer need to update orders based on supplier status
    // as we're displaying the supplier status separately

    // Table columns configuration for orders
    const tableColumns = [
        { key: 'sl', header: 'Sl' },
        { key: 'orderId', header: 'Order Id' },
        { key: 'date', header: 'Date' },
        { 
            key: 'productName', 
            header: 'Product name & quantity',
            render: (item) => (
                <div className="product-name-column">
                    {item.productName}
                </div>
            )
        },
        { key: 'marketers', header: 'Marketers' },
        { key: 'totalItems', header: 'Total Items' },
        { 
            key: 'totalPrice', 
            header: 'Price',
            render: (item) => (
                <div className="price-with-status">
                    <div className="price-amount">{item.totalPrice}</div>
                    {item.status && (
                        <div className={`status-badge-box ${item.status.toLowerCase()}`}>{item.status}</div>
                    )}
                </div>
            )
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (item) => (
                <div className="table-action-icons">
                    <button
                        className="table-action-btn table-view-btn"
                        onClick={() => console.log('View order:', item.orderId)}
                        title="View"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#FFAF1A" />
                            <path d="M12.5 9C11.7044 9 10.9413 9.31607 10.3787 9.87868C9.81607 10.4413 9.5 11.2044 9.5 12C9.5 12.7956 9.81607 13.5587 10.3787 14.1213C10.9413 14.6839 11.7044 15 12.5 15C13.2956 15 14.0587 14.6839 14.6213 14.1213C15.1839 13.5587 15.5 12.7956 15.5 12C15.5 11.2044 15.1839 10.4413 14.6213 9.87868C14.0587 9.31607 13.2956 9 12.5 9ZM12.5 17C11.1739 17 9.90215 16.4732 8.96447 15.5355C8.02678 14.5979 7.5 13.3261 7.5 12C7.5 10.6739 8.02678 9.40215 8.96447 8.46447C9.90215 7.52678 11.1739 7 12.5 7C13.8261 7 15.0979 7.52678 16.0355 8.46447C16.9732 9.40215 17.5 10.6739 17.5 12C17.5 13.3261 16.9732 14.5979 16.0355 15.5355C15.0979 16.4732 13.8261 17 12.5 17ZM12.5 4.5C7.5 4.5 3.23 7.61 1.5 12C3.23 16.39 7.5 19.5 12.5 19.5C17.5 19.5 21.77 16.39 23.5 12C21.77 7.61 17.5 4.5 12.5 4.5Z" fill="#FFAF1A" />
                        </svg>
                    </button>
                    <button
                        className="table-action-btn table-print-btn"
                        onClick={() => console.log('Print order:', item.orderId)}
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
    ];

    return (
        <div className="supplier-profile-page">
            <div className="supplier-profile-header">
                <h2>Suppliers info Dash Board</h2>
                <div className="header-actions">
                    <BluePagination />
                </div>
            </div>

            <div className="supplier-details-container">
                {/* Supplier personal information card */}
                <div className="supplier-card-section">
                    <UserCardVertical
                        id={displayData.id}
                        name={displayData.name}
                        contact={displayData.contact}
                        company={displayData.company}
                        image={displayData.image}
                        type="supplier"
                    />
                </div>
                
                {/* Overview section */}
                <div className="supplier-overview-section">
                    <div className="supplier-data-card">
                        <h3>Overview</h3>
                        <div className="supplier-data-row">
                            <div className="supplier-data-label">
                                <span>📦 Items</span>
                            </div>
                            <div className="supplier-data-value">{financialData.items}</div>
                        </div>
                        <div className="supplier-data-row">
                            <div className="supplier-data-label">
                                <span>💰 Price</span>
                            </div>
                            <div className="supplier-data-value">{financialData.totalPrice}</div>
                        </div>
                    </div>
                </div>
                
                {/* Payment status section */}
                <div className="supplier-payment-section">
                    <div className="supplier-data-card">
                        <h3>Payment status</h3>
                        <div className="supplier-data-row">
                            <div className="supplier-data-label">
                                <span>✅ Paid</span>
                            </div>
                            <div className="supplier-data-value paid">{financialData.paidAmount}</div>
                        </div>
                        <div className="supplier-data-row">
                            <div className="supplier-data-label">
                                <span>🔔 Due</span>
                            </div>
                            <div className="supplier-data-value due">{financialData.dueAmount}</div>
                        </div>
                        <div className="supplier-status-container">
                            <span className={`supplier-status-label ${displayData.status?.toLowerCase()}`}>
                                {displayData.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders table section */}
            <div className="supplier-orders-table">
                <Table
                    columns={tableColumns}
                    data={orderData}
                    searchPlaceholder="Ex:100054"
                    searchKeys={['orderId', 'productName', 'marketers']}
                    itemsPerPage={7}
                    onExport={(data) => console.log('Export orders:', data)}
                    onFilter={() => console.log('Filter orders')}
                    className="supplier-orders-table-component"
                />
            </div>
        </div>
    );
};

export default SupplierProfile;