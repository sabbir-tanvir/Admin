import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/CustomerDetails/AllCustomer.css';
import BluePagination from '../pagination/BluePagination';
import UserCard from '../Card/UserCard';
import Pagination from '../pagination/Pagination';


function AllCustomer() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = React.useState('All');
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);


    // Sample customer data
    const customers = [
        {
            id: "12001",
            name: "Sarah Johnson",
            contact: "+880*********01",
            company: "Tech Solutions Inc",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            status: "Active"
        },
        {
            id: "12002",
            name: "Michael Chen",
            contact: "+880*********02",
            company: "Digital Innovations",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            status: "Inactive"
        },
        {
            id: "12003",
            name: "Emily Davis",
            contact: "+880*********03",
            company: "Creative Agency",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            status: "Active"
        },
        {
            id: "12004",
            name: "Robert Wilson",
            contact: "+880*********04",
            company: "Business Corp",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            status: "Inactive"
        },
        {
            id: "12005",
            name: "Jessica Brown",
            contact: "+880*********05",
            company: "Marketing Pro",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            status: "Active"
        },
        {
            id: "12006",
            name: "David Miller",
            contact: "+880*********06",
            company: "Finance Plus",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            status: "Inactive"
        },
        {
            id: "12007",
            name: "Amanda Taylor",
            contact: "+880*********07",
            company: "Design Studio",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            status: "Active"
        },
        {
            id: "12008",
            name: "James Anderson",
            contact: "+880*********08",
            company: "Consulting Group",
            image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face",
            type: "customer",
            status: "Inactive"
        }
    ];

    // Filter customers based on active filter
    const filteredCustomers = customers.filter(customer => {
        if (activeFilter === 'All') return true;
        return customer.status === activeFilter;
    });

    const handleCustomerClick = (customer) => {
        console.log('Customer clicked:', customer);
        // Navigate to customer details page with customer data
        navigate(`/customer/user/${customer.id}`, {
            state: {
                customerData: customer
            }
        });
    };

    const handleAddCustomerClick = () => {
        navigate('/add-customer');
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Calculate pagination
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    // Ensure current page doesn't exceed total pages
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredCustomers.length, currentPage, totalPages]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className="app">
  

            <div className="main-layout">

                <div className="customer-page">
                    <div className="customer-header">
                        <div className="customer-header-left">
                            <h1 className="customer-page-title">All Customers</h1>

                            <button
                                className="add-customer-btn"
                                onClick={handleAddCustomerClick}
                            >
                                <span className="btn-text">Add a customer</span>
                                <span className="btn-icon">+</span>
                            </button>

                            <div className="customer-filter-buttons">
                                <button
                                    className={`customer-filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('All')}
                                >
                                    All
                                </button>
                                <button
                                    className={`customer-filter-btn ${activeFilter === 'Active' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('Active')}
                                >
                                    Active
                                </button>
                                <button
                                    className={`customer-filter-btn ${activeFilter === 'Inactive' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('Inactive')}
                                >
                                    Inactive
                                </button>
                            </div>
                        </div>

                        <div className="customer-header-right">
                            {filteredCustomers.length > 0 && (
                                <BluePagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    </div>

                    <div className="customers-grid">
                        {currentCustomers.length > 0 ? (
                            currentCustomers.map((customer, index) => (
                                <UserCard
                                    key={`${customer.id}-${index}`}
                                    id={customer.id}
                                    name={customer.name}
                                    contact={customer.contact}
                                    company={customer.company}
                                    image={customer.image}
                                    type={customer.type}
                                    status={customer.status}
                                    onClick={() => handleCustomerClick(customer)}
                                />
                            ))
                        ) : (
                            <div className="customer-empty-state">
                                <p>No customers found for "{activeFilter}" status.</p>
                            </div>
                        )}
                    </div>

                    {filteredCustomers.length > 0 && (
                        <div className="customer-pagination-container">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllCustomer;
