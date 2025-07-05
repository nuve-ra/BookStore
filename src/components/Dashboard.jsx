import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard({ setIsAuthenticated }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get('http://localhost:3000/books', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setBooks(res.data.slice(0, 5)))
      .catch((err) => {
        console.error('Failed to load books:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <img src="/assets/book.webp" alt="logo" style={{ height: '60px' }} />
        <div>
          <input
            type="text"
            placeholder="Search books..."
            style={{
              marginRight: '10px',
              width: '300px',
              padding: '8px 12px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              outline: 'none'
            }}
          />
          <Link to="/" style={{ marginLeft: '10px', textDecoration: 'none', color: 'blue' }}>
            Logout
          </Link>
        </div>
      </div>

      <h2 style={{ marginTop: '30px' }}>📚 Recent Books</h2>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: '#f9f9f9'
              }}
            >
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Category:</strong> {book.category}</p>
            </div>
          ))}
        </div>
      )}

      {/* ➕ Add Book Floating Button */}
      <div
        onClick={() => navigate('/manage-books')}
        title="Add Book"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#28a745',
          color: 'white',
          fontSize: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
      >
        +
      </div>
    </div>
  );
}

export default Dashboard;
