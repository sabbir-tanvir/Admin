// Home Page: Main landing page with admin dashboard
import React from 'react';
import Layout from '../components/Layout.jsx';
import Dashboard from '../components/dashbord/Dashbord.jsx';
import '../styles/pages/Home.css';

const Home = () => {
  return (
    <Layout userRole="admin">
      <Dashboard />
    </Layout>
  );
};

export default Home;