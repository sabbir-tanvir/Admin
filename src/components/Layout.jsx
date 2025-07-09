import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import LeftBar from '../components/Leftbar.jsx';

const Layout = ({ children, userRole = 'admin' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app">
      <Navbar 
        onMobileMenuToggle={toggleMobileMenu} 
        isMobileMenuOpen={isMobileMenuOpen} 
      />
      <div className="main-layout">
        <LeftBar 
          userRole={userRole}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={closeMobileMenu}
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
