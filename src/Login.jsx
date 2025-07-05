// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // --- START: Simulated Authentication Logic ---
    // In a real application, you would send a request to your backend here
    // and receive a token upon successful authentication.

    // For demonstration, let's assume a hardcoded user for successful login.
    if (email === 'test@example.com' && password === 'password123') {
      const simulatedToken = 'fake-jwt-token-12345'; // Replace with a real token from your backend
      localStorage.setItem('token', simulatedToken);
      setIsAuthenticated(true);
      alert('✅ Login successful!');
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } else {
      alert('❌ Invalid credentials. Please try again.');
    }
    // --- END: Simulated Authentication Logic ---
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          value={email}
          style={styles.input}
          autoComplete="off"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
          style={styles.input}
          autoComplete="off"
        />
        <button onClick={handleLogin} style={styles.button}>Login</button>
        <p style={styles.footer}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: 'calc(100vh - 60px)', // Adjust based on navbar height
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '24px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  footer: {
    marginTop: '20px',
    fontSize: '14px',
  }
};

export default Login;