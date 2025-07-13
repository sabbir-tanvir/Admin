import React, { useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../../styles/CustomerDetails/customerProfile.css';
import UserCardVertical from '../Card/UserCardVertical';
import SalesCard from '../Card/SalesCard';
import PaymentCard from '../Card/PayemntCard';
import Table from '../Table/Table';
import BluePagination from '../pagination/BluePagination';

const CustomerProfile = () => {
    const { id } = useParams();
    const location = useLocation();
    const customerData = location.state?.customerData;

    // Memoize the display data to avoid recreation on each render
    const displayData = useMemo(() => {
        // Default data if no customer data is passed
        const defaultCustomer = {
            id: id || "N/A",
            name: "Jack Jonson",
            contact: "+880*********74",
            address: "123 Main Street, Anytown",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            email: "example@gamail.com",
            status: "Paid"
        };
        
        return {
            ...defaultCustomer,
            ...customerData,
            // Calculate financial data based on status if available
            email: customerData?.email || defaultCustomer.email
        };
    }, [id, customerData]);
    
    // Memoize financial data
    const financialData = useMemo(() => ({
        totalOrders: 35,
        totalSpent: "$350,000",
        lastPurchase: "05 July 2025",
        memberSince: "15 Jan 2024"
    }), []);

    // Sample table data for orders using useMemo
    const orderData = useMemo(() => [
        {
            sl: 1,
            orderId: "100054",
            date: "25 AUG 2025 17:40",
            marketor: "David",
            seller: "Industrial Supplies Co.",
            totalItems: "10",
            totalPrice: "$60,000",
            status: "Paid"
        },
        {
            sl: 2,
            orderId: "100055",
            date: "24 AUG 2025 14:20",
            marketor: "Sarah",
            seller: "Tech Components Ltd",
            totalItems: "8",
            totalPrice: "$1,000,000",
            status: "Due"
        },
        {
            sl: 3,
            orderId: "100056",
            date: "23 AUG 2025 09:15",
            marketor: "David",
            seller: "Global Parts Inc.",
            totalItems: "12",
            totalPrice: "$1,000,000",
            status: "Paid"
        },
        {
            sl: 4,
            orderId: "100057",
            date: "22 AUG 2025 11:30",
            marketor: "Emily",
            seller: "Industrial Supplies Co.",
            totalItems: "15",
            totalPrice: "$250,000",
            status: "Paid"
        },
        {
            sl: 5,
            orderId: "100058",
            date: "21 AUG 2025 14:10",
            marketor: "John",
            seller: "Premium Electronics",
            totalItems: "3",
            totalPrice: "$15,000",
            status: "Due"
        },
        {
            sl: 6,
            orderId: "100059",
            date: "20 AUG 2025 09:45",
            marketor: "David",
            seller: "Global Parts Inc.",
            totalItems: "10",
            totalPrice: "$500,000",
            status: "Due"
        }
    ], []);
    
    // We no longer need to update orders based on supplier status
    // as we're displaying the supplier status separately

    // Table columns configuration for orders
    const tableColumns = [
        { key: 'sl', header: 'Sl', sortable: true },
        { key: 'orderId', header: 'Order Id', sortable: true },
        { key: 'date', header: 'Date', sortable: true },
        { key: 'marketor', header: 'Marketor', sortable: true },
        { key: 'seller', header: 'Seller', sortable: true },
        { key: 'totalItems', header: 'Total Items', sortable: true },
        { 
            key: 'totalPrice', 
            header: 'Total Price',
            sortable: true,
            render: (item) => (
                <div className="price-amount">{item.totalPrice}</div>
            )
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (item) => (
                <div className={`customer-status-badge ${item.status.toLowerCase()}`}>
                    {item.status}
                </div>
            )
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (item) => (
                <div className="customer-table-action-icons">
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
                    <button
                        className="table-action-btn table-delete-btn"
                        onClick={() => console.log('Delete order:', item.orderId)}
                        title="Delete"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#FF3D3D" />
                            <path d="M6.5 19C6.5 19.5304 6.71071 20.0391 7.08579 20.4142C7.46086 20.7893 7.96957 21 8.5 21H16.5C17.0304 21 17.5391 20.7893 17.9142 20.4142C18.2893 20.0391 18.5 19.5304 18.5 19V7H6.5V19ZM8.5 9H16.5V19H8.5V9ZM15.875 4L14.875 3H10.125L9.125 4H5.5V6H19.5V4H15.875Z" fill="#FF3D3D" />
                        </svg>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="customer-profile-page">
            <div className="customer-profile-header">
                <h2>Customer Information Dashboard</h2>
                <div className="header-actions">
                    <BluePagination />
                </div>
            </div>

            <div className="customer-details-container">
                {/* Customer personal information card */}
                <div className="customer-card-section">
                    <UserCardVertical
                        id={displayData.id}
                        name={displayData.name}
                        contact={displayData.contact}
                        address={displayData.address}
                        image={displayData.image}
                        type="customer"
                    />
                </div>
                
                {/* Overview section */}
                <div className="customer-overview-section">
                    <div className="customer-data-card">
                        <h3>Customer Overview</h3>
                        <div className="customer-data-row">
                            <div className="customer-data-label">
                                <span>📊 Total Orders</span>
                            </div>
                            <div className="customer-data-value">{financialData.totalOrders}</div>
                        </div>
                        <div className="customer-data-row">
                            <div className="customer-data-label">
                                <span>💰 Total Spent</span>
                            </div>
                            <div className="customer-data-value">{financialData.totalSpent}</div>
                        </div>
                    </div>
                </div>
                
                {/* Payment status section */}
                <div className="customer-payment-section">
                    <div className="customer-data-card">
                        <h3>Payment Info</h3>
                        <div className="customer-data-row">
                            <div className="customer-data-label">
                                <span>🛍️ Last Purchase</span>
                            </div>
                            <div className="customer-data-value">{financialData.lastPurchase}</div>
                        </div>
                        <div className="customer-data-row">
                            <div className="customer-data-label">
                                <span>📆 Member Since</span>
                            </div>
                            <div className="customer-data-value">{financialData.memberSince}</div>
                        </div>
                        <div className="customer-status-container">
                            <span className={`customer-status-label ${displayData.status?.toLowerCase()}`}>
                                {displayData.status}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders table section */}
            <div className="customer-orders-table">
                <Table
                    columns={tableColumns}
                    data={orderData}
                    searchPlaceholder="Search by Order ID, Marketor or Seller"
                    searchKeys={['orderId', 'marketor', 'seller']}
                    itemsPerPage={7}
                    onExport={(data) => console.log('Export orders:', data)}
                    onFilter={() => console.log('Filter orders')}
                    className="customer-orders-table-component"
                    showFilter={true}
                />
            </div>
        </div>
    );
};

export default CustomerProfile;