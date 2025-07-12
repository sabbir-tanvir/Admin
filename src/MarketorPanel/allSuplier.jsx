import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SellerPanel/allSuplier.css';
import UserCard from '../components/Card/UserCard';
import BluePagination from '../components/pagination/BluePagination';

function AllSuppliers() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = React.useState('All');
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [maxVisiblePages, setMaxVisiblePages] = useState(3);

    // Update max visible pages based on screen size
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 400) {
                setMaxVisiblePages(1);
            } else if (window.innerWidth < 576) {
                setMaxVisiblePages(2);
            } else {
                setMaxVisiblePages(3);
            }
        }
        
        // Set initial value
        handleResize();
        
        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Clean up
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    // Sample employee data
    const employees = [
        {
            id: "11054",
            name: "Jack jason",
            contact: "+880*********54",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
            type: "employee",
            status: "Paid"
        },
        {
            id: "11054",
            name: "Jack jason",
            contact: "+880*********54",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
            type: "employee",
            status: "Due"
        },
        {
            id: "11054",
            name: "Jack jason",
            contact: "+880*********54",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            type: "employee",
            status: "Paid"
        },
        {
            id: "11054",
            name: "Jack jason",
            contact: "+880*********54",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
            type: "employee",
            status: "Due"
        },
        {
            id: "11054",
            name: "Jack jason",
            contact: "+880*********54",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            type: "employee",
            status: "Paid"
        },
        {
            id: "11054",
            name: "Jack jason",
            contact: "+880*********54",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            type: "employee",
            status: "Due"
        },
        {
            id: "11054",
            name: "Jack jason",
            contact: "+880*********54",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            type: "employee",
            status: "Paid"
        },
        {
            id: "11054",
            name: "Jack jason",
            contact: "+880*********54",
            company: "Company Name",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            type: "employee",
            status: "Due"
        }
    ];

    // Filter employees based on active filter
    const filteredEmployees = employees.filter(employee => {
        if (activeFilter === 'All') return true;
        return employee.status === activeFilter;
    });

    const handleEmployeeClick = (employee) => {
        console.log('Supplier clicked:', employee);
        // Navigate to supplier profile page with supplier data
        navigate(`/marketor-panel/supplier/${employee.id}`, {
            state: {
                supplierData: employee
            }
        });
    };

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    // Calculate pagination
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

    // Ensure current page doesn't exceed total pages
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [filteredEmployees.length, currentPage, totalPages]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className="supplier-page">
            <div className="supplier-header">
                <div className="supplier-header-left">
                    <h1 className="supplier-page-title-unique">All Suppliers</h1>

                    <div className="filter-buttonss">
                        <button
                            className={`filter-btn-unique ${activeFilter === 'All' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('All')}
                            data-filter="All"
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn-unique ${activeFilter === 'Paid' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('Paid')}
                            data-filter="Paid"
                        >
                            Paid
                        </button>
                        <button
                            className={`filter-btn-unique ${activeFilter === 'Due' ? 'active' : ''}`}
                            onClick={() => handleFilterChange('Due')}
                            data-filter="Due"
                        >
                            Due
                        </button>
                    </div>
                </div>

                <div className="supplier-header-right">
                    {filteredEmployees.length > 0 ? (
                        <BluePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            maxVisiblePages={maxVisiblePages}
                        />
                    ) : (
                        <div className="pagination-placeholder"></div> /* Empty placeholder to maintain layout */
                    )}
                </div>
            </div>

            <div className="suppliers-grid">
                {currentEmployees.length > 0 ? (
                    currentEmployees.map((employee, index) => (
                        <UserCard
                            key={`${employee.id}-${index}`}
                            id={employee.id}
                            name={employee.name}
                            contact={employee.contact}
                            company={employee.company}
                            image={employee.image}
                            type="supplier"
                            status={employee.status}
                            onClick={() => handleEmployeeClick(employee)}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No suppliers found for "{activeFilter}" status.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default AllSuppliers;