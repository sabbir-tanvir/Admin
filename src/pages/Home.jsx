// Home Page: Main landing page with admin dashboard
import React from 'react';
import Navbar from '../components/Navbar.jsx';
import LeftBar from '../components/Leftbar.jsx';
import Dashboard from '../components/dashbord/Dashbord.jsx';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        <LeftBar />
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;