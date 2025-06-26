import React from 'react';
import Navbar from '../components/Navbar';
import LeftBar from '../components/Leftbar';
import UserCard from '../components/Card/UserCard';
import '../styles/pages/Employ.css';
import Pagination from '../components/pagination/Pagination';

function Employ() {
    // Sample employee data
    const employees = [
        {
            id: "EMP001",
            name: "John Smith",
            contact: "+1*********23",
            company: "TechCorp",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
            type: "employee"
        },
        {
            id: "EMP002",
            name: "Alice Johnson",
            contact: "+1*********45",
            company: "Design Studio",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
            type: "employee"
        },
        {
            id: "EMP003",
            name: "Mike Chen",
            contact: "+1*********67",
            company: "Marketing Dept",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            type: "employee"
        },
        {
            id: "EMP004",
            name: "Sarah Wilson",
            contact: "+1*********89",
            company: "Sales Team",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
            type: "employee"
        },
        {
            id: "EMP005",
            name: "David Brown",
            contact: "+1*********12",
            company: "IT Department",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            type: "employee"
        },
        {
            id: "EMP006",
            name: "Lisa Davis",
            contact: "+1*********34",
            company: "HR Department",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            type: "employee"
        }
    ];

    const handleEmployeeClick = (employee) => {
        console.log('Employee clicked:', employee);
    };

    return (
        <div className="app">
            <Navbar />
            <div className="main-layout">
                <LeftBar />
                <div className="employ-page">
                    <div className="employ-header">
                        <h1 className="employ-page-title">All Employees</h1>
                        <Pagination />
                    </div>
                    
                    <div className="employees-grid">
                        {employees.map((employee) => (
                            <UserCard
                                key={employee.id}
                                id={employee.id}
                                name={employee.name}
                                contact={employee.contact}
                                company={employee.company}
                                image={employee.image}
                                type={employee.type}
                                onClick={() => handleEmployeeClick(employee)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employ;