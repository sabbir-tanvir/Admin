import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../../styles/components/SellerId.css'
import Navbar from '../Navbar';
import LeftBar from '../Leftbar';
import UserCardVertical from '../Card/UserCardVertical';

import SalesCard from '../Card/SalesCard';
import PaymentCard from '../Card/PayemntCard';
import Table from '../Table/Table';
import BluePagination from '../pagination/BluePagination';

const SellerID = () => {
    const { id } = useParams();
    const location = useLocation();
    const employeeData = location.state?.employeeData;

    // Default data if no employee data is passed
    const defaultEmployee = {
        id: id || "N/A",
        name: "Unknown Employee",
        contact: "N/A",
        company: "N/A",
        image: "https://via.placeholder.com/150x150/cccccc/666666?text=User",
        type: "employee"
    };

    const displayData = employeeData || defaultEmployee;

    // Sample table data for orders
    const orderData = [
        {
            sl: 1,
            orderId: "100054",
            date: "25 AUG 2025 17:40",
            marketers: "David",
            companyName: "Okla",
            totalItems: 10,
            totalPrice: "$60,000"
        },
        {
            sl: 2,
            orderId: "100055",
            date: "24 AUG 2025 14:20",
            marketers: "Sarah",
            companyName: "TechCorp",
            totalItems: 15,
            totalPrice: "$125,000"
        },
        {
            sl: 3,
            orderId: "100056",
            date: "23 AUG 2025 09:15",
            marketers: "Mike",
            companyName: "MakerSpace",
            totalItems: 5,
            totalPrice: "$35,000"
        }
    ];

    // Table columns configuration
    const tableColumns = [
        { key: 'sl', header: 'Sl' },
        { key: 'orderId', header: 'Order Id' },
        { key: 'date', header: 'Date' },
        { key: 'marketers', header: 'Marketers' },
        { key: 'companyName', header: 'Company Name' },
        { key: 'totalItems', header: 'Total Items' },
        { key: 'totalPrice', header: 'Total Price' },
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
        <div className="app">
            <Navbar />
            <LeftBar />
            <div className="seller-id-page">
                <div className="seller-id-header">
                    <h2>Customer Dashbord {displayData.id}</h2>
                    <BluePagination />
                </div>

                <div className="seller-details-container">
                    <div className="seller-card-section">
                        <UserCardVertical
                            id={displayData.id}
                            name={displayData.name}
                            contact={displayData.contact}
                            company={displayData.company}
                            image={displayData.image}
                            type={displayData.type}
                        />
                    </div>
                    <div className="seller-card-sections">
                        <div className="seller-card-section">
                            <SalesCard
                                number="50"
                                title="Sales  amount"
                                value="$350,000"
                                showRedDot={true}
                                onClick={() => console.log('Sales amount clicked')}
                            />
                        </div>
                        <div className="seller-card-section">
                            <SalesCard
                                number="50"
                                title="Total Sales"
                                value="10"
                                showRedDot={true}
                                onClick={() => console.log('Total sales clicked')}
                            />
                        </div>
                    </div>
                    <div className="seller-card-section">
                        <PaymentCard
                            type="payment"
                            paidAmount="$274,000"
                            dueAmount="$"
                            onClick={() => console.log('Payment status clicked')}
                        />
                    </div>




                    {/* <div className="seller-info-section">
                    <h3>Additional Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Employee ID:</span>
                            <span className="info-value">{displayData.id}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Full Name:</span>
                            <span className="info-value">{displayData.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Contact Number:</span>
                            <span className="info-value">{displayData.contact}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Company/Department:</span>
                            <span className="info-value">{displayData.company}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Employee Type:</span>
                            <span className="info-value">{displayData.type}</span>
                        </div>
                    </div>
                </div> */}



                </div>

                <Table
                    columns={tableColumns}
                    data={orderData}
                    searchPlaceholder="Ex:10001"
                    searchKeys={['orderId', 'marketers', 'companyName']}
                    itemsPerPage={7}
                    onExport={(data) => console.log('Export orders:', data)}
                    onFilter={() => console.log('Filter orders')}
                />


            </div>
        </div>
    );
};

export default SellerID;