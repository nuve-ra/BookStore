import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '50px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <img
        src="/assets/images.png" 
        alt="404 Not Found"
        style={{
          maxWidth: '400px',
          width: '100%',
          height: 'auto',
          marginBottom: '30px'
        }}
      />
      <br />
      <Link to="/dashboard" style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
