import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div style={{padding:'60px 24px', textAlign:'center'}}>
      <h1 style={{fontSize:32, marginBottom:8}}>Access Denied</h1>
      <p style={{color:'#666', marginBottom:24}}>You don't have permission to view this page with your current role.</p>
      <Link to="/login" style={{color:'#2563eb', textDecoration:'underline'}}>Return to Login</Link>
    </div>
  );
}
