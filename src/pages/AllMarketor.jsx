import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LeftBar from '../components/Leftbar';
import UserCard from '../components/Card/UserCard';
import '../styles/pages/AllMarketor.css';
import BluePagination from '../components/pagination/BluePagination';

function AllMarketors() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    
    // Sample marketor data
    const marketors = [
        {
            id: "MKT001",
            name: "Robert Martinez",
            contact: "+1*********11",
            company: "Digital Marketing",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT002",
            name: "Emily Thompson",
            contact: "+1*********22",
            company: "Social Media",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT003",
            name: "James Wilson",
            contact: "+1*********33",
            company: "Content Marketing",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT004",
            name: "Maria Garcia",
            contact: "+1*********44",
            company: "SEO Specialist",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT005",
            name: "Alex Johnson",
            contact: "+1*********55",
            company: "Email Marketing",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT006",
            name: "Sofia Rodriguez",
            contact: "+1*********66",
            company: "Brand Marketing",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT007",
            name: "Daniel Kim",
            contact: "+1*********77",
            company: "Performance Marketing",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT008",
            name: "Isabella Chen",
            contact: "+1*********88",
            company: "Growth Marketing",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT009",
            name: "Michael Brown",
            contact: "+1*********99",
            company: "Affiliate Marketing",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT010",
            name: "Jessica Davis",
            contact: "+1*********00",
            company: "Influencer Marketing",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT011",
            name: "Ryan Wilson",
            contact: "+1*********01",
            company: "Video Marketing",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        },
        {
            id: "MKT012",
            name: "Amanda Taylor",
            contact: "+1*********02",
            company: "Event Marketing",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
            type: "marketor"
        }
    ];

    const handleMarketorClick = (marketor) => {
        console.log('Marketor clicked:', marketor);
        // Navigate to seller details page with marketor data
        navigate(`/marketor/user/${marketor.id}`, { 
            state: { 
                employeeData: marketor 
            } 
        });
    };

    // Calculate pagination
    const totalPages = Math.ceil(marketors.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMarketors = marketors.slice(startIndex, endIndex);

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
                        <h1 className="employ-page-title">All Marketors</h1>
                        <BluePagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    
                    <div className="employees-grid">
                        {currentMarketors.map((marketor) => (
                            <UserCard
                                key={marketor.id}
                                id={marketor.id}
                                name={marketor.name}
                                contact={marketor.contact}
                                company={marketor.company}
                                image={marketor.image}
                                type={marketor.type}
                                onClick={() => handleMarketorClick(marketor)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllMarketors;