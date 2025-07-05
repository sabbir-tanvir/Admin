import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/pages/Employ.css'
import Navbar from '../Navbar';
import LeftBar from '../Leftbar';
import BluePagination from '../pagination/BluePagination';
import UserCard from '../Card/UserCard';
import Pagination from '../pagination/Pagination';


function Employ() {
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = React.useState('All');
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);


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
        console.log('Employee clicked:', employee);
        // Navigate to employee details page with employee data
        navigate(`/seller/user/${employee.id}`, {
            state: {
                employeeData: employee
            }
        });
    };

    const handleAddEmployeeClick = () => {
        navigate('/add-employee');
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
        <div className="app">
            <Navbar />
            <LeftBar />
            <div className="main-layout">

                <div className="employ-page">
                    <div className="employ-header">
                        <div className="employ-header-left">
                            <h1 className="employ-page-title">All Sellers</h1>

                            <button
                                className="add-employee-btn"
                                onClick={handleAddEmployeeClick}
                            >
                                <span className="btn-text">Add a seller</span>
                                <span className="btn-icon">+</span>
                            </button>

                            <div className="filter-buttons">
                                <button
                                    className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('All')}
                                >
                                    All
                                </button>
                                <button
                                    className={`filter-btn ${activeFilter === 'Paid' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('Paid')}
                                >
                                    Paid
                                </button>
                                <button
                                    className={`filter-btn ${activeFilter === 'Due' ? 'active' : ''}`}
                                    onClick={() => handleFilterChange('Due')}
                                >
                                    Due
                                </button>
                            </div>
                        </div>

                        <div className="employ-header-right">
                            {filteredEmployees.length > 0 && (
                                <BluePagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    </div>

                    <div className="employees-grid">
                        {currentEmployees.length > 0 ? (
                            currentEmployees.map((employee, index) => (
                                <UserCard
                                    key={`${employee.id}-${index}`}
                                    id={employee.id}
                                    name={employee.name}
                                    contact={employee.contact}
                                    company={employee.company}
                                    image={employee.image}
                                    type={employee.type}
                                    status={employee.status}
                                    onClick={() => handleEmployeeClick(employee)}
                                />
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No sellers found for "{activeFilter}" status.</p>
                            </div>
                        )}
                    </div>

                    {filteredEmployees.length > 0 && (
                        <div className="pagination-container">
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

export default Employ;