import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LeftBar from '../components/Leftbar';
import ProductCard from '../components/Card/ProductCard';
import TopSeller from '../components/sellerDetails/TopSeller';
import SellerDetails from '../components/sellerDetails/SellerDetails';
import TopCustomer from '../components/CustomerDetails/TopCustomer';

const Customer = () => {
 const navigate = useNavigate();
   
   // Sample data for calculations
   const totalProducts = 156;
 
   const handleCardClick = (action) => {
     console.log(`${action} clicked!`);
     // Navigate to seller/user route
     navigate('/seller/user');
   };
 
   return (
     <div className="app">
       <Navbar />
       <div className="main-layout">
         <LeftBar />
         <div className="product-page">
           {/* Product Stats Cards - Only 3 cards */}
           <div className="product-cards-section">
             <div className="card-container-3">
               <ProductCard
                 number={totalProducts}
                 title="Total Customers"
                 size="normal"
                 showRedDot={false}
                 onClick={() => handleCardClick('Total Sellers')}
               />
               
             </div>
           </div>
 
           <div>
             <TopCustomer />
             <div>
 
             </div>
           </div>
 
         {/* Seller details table  */}
         <SellerDetails />
         </div>
       </div>
     </div>
   );
 }
 
export default Customer;