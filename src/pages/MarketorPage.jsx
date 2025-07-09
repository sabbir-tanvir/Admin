import React from 'react';
import { useNavigate } from 'react-router-dom';
import MarketorDetails from '../components/marketorDetails/MarketorDetails';
import TopMarketor from '../components/marketorDetails/topMarketor';
import TotalCard from '../components/Card/TotalCard';
import BroughtSoldCard from '../components/Card/BroughtSoldCard';
import TotalCommissionCard from '../components/Card/TotalCommisionCard';

import '../styles/marketorDetails/Marketor.css';

function Marketor() {
    const navigate = useNavigate();
    const totalMarketors = 156;

    const handleCardClick = (action) => {
        console.log(`${action} clicked!`);
        // Navigate to all marketors page
        navigate('/marketor/all');
    };
    const customerIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
            <g clip-path="url(#clip0_307_575)">
                <g filter="url(#filter0_d_307_575)">
                    <path d="M28 56C28 56 24 56 24 52C24 48 28 36 44 36C60 36 64 48 64 52C64 56 60 56 60 56H28ZM44 32C47.1826 32 50.2348 30.7357 52.4853 28.4853C54.7357 26.2348 56 23.1826 56 20C56 16.8174 54.7357 13.7652 52.4853 11.5147C50.2348 9.26428 47.1826 8 44 8C40.8174 8 37.7652 9.26428 35.5147 11.5147C33.2643 13.7652 32 16.8174 32 20C32 23.1826 33.2643 26.2348 35.5147 28.4853C37.7652 30.7357 40.8174 32 44 32ZM20.864 56C20.2713 54.7512 19.9756 53.3821 20 52C20 46.58 22.72 41 27.744 37.12C25.2367 36.3457 22.6239 35.9679 20 36C4 36 0 48 0 52C0 56 4 56 4 56H20.864ZM18 32C20.6522 32 23.1957 30.9464 25.0711 29.0711C26.9464 27.1957 28 24.6522 28 22C28 19.3478 26.9464 16.8043 25.0711 14.9289C23.1957 13.0536 20.6522 12 18 12C15.3478 12 12.8043 13.0536 10.9289 14.9289C9.05357 16.8043 8 19.3478 8 22C8 24.6522 9.05357 27.1957 10.9289 29.0711C12.8043 30.9464 15.3478 32 18 32Z" fill="#FFAF1A" />
                </g>
            </g>
            <defs>
                <filter id="filter0_d_307_575" x="0" y="6" width="70" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dx="4" />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.862019 0 0 0 0 0.605769 0 0 0 1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_307_575" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_307_575" result="shape" />
                </filter>
                <clipPath id="clip0_307_575">
                    <rect width="64" height="64" fill="white" />
                </clipPath>
            </defs>
        </svg>

    );

    return (
        <div className="product-page">
            {/* Product Stats Cards - Only 3 cards */}
            <div className="product-cards-section">
                <div className="card-container-2">
                    <TotalCard
                        title="Total Marketors"
                        icon={customerIcon}
                        number="50"
                        showTrend={false}
                        onSeeMoreClick={handleCardClick}
                    />
                    <TotalCommissionCard
                        title="Total sells"
                        totalAmount="$100,000"
                        paidAmount="$70,000"
                        dueAmount="$30,000"
                        onSeeMoreClick={handleCardClick}
                    />

                </div>
            </div>

            <div className="top-seller-section">
                <TopMarketor />
                <BroughtSoldCard
                    title="Total Items Sold"
                    number="5000"
                    onSeeMoreClick={handleCardClick}
                />

            </div>

            {/* Seller details table  */}
            <MarketorDetails />
        </div>
    );
}

export default Marketor;