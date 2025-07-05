import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookManage() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: ''
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.error('🚫 No token found — please log in first.');
      return;
    }

    const authHeaders = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.get('http://localhost:3000/books', authHeaders)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.error('❌ Error fetching books:', err);
        if (err.response) {
          console.error('🔐 Server responded with:', err.response.status, err.response.data);
        }
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.title || !form.author || !form.genre || !form.publishedYear) return;

    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
    axios.post('http://localhost:3000/books', form, authHeaders)
      .then((res) => {
        setBooks([...books, res.data]);
        setForm({ title: '', author: '', genre: '', publishedYear: '' });
      })
      .catch((err) => {
        console.error('❌ Error adding book:', err);
      });
  };

  const handleDelete = (id) => {
    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
    axios.delete(`http://localhost:3000/books/${id}`, authHeaders)
      .then(() => {
        setBooks(books.filter(book => book.id !== id));
      })
      .catch((err) => {
        console.error('❌ Error deleting book:', err);
      });
  };

  const handleEdit = (book) => {
    setForm(book);
    setEditingId(book.id);
  };

  const handleUpdate = () => {
    const authHeaders = { headers: { Authorization: `Bearer ${token}` } };
    axios.put(`http://localhost:3000/books/${editingId}`, form, authHeaders)
      .then((res) => {
        const updated = books.map((book) => (book.id === editingId ? res.data : book));
        setBooks(updated);
        setForm({ title: '', author: '', genre: '', publishedYear: '' });
        setEditingId(null);
      })
      .catch((err) => {
        console.error('❌ Error updating book:', err);
      });
  };

  const genres = [...new Set(books.map(book => book.genre))];

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>📖 Manage Your Books</h2>

      {/* Book Form */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          value={form.author}
          placeholder="Author"
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          value={form.genre}
          placeholder="Genre"
          onChange={handleChange}
        />
        <input
          type="number"
          name="publishedYear"
          value={form.publishedYear}
          placeholder="Year"
          onChange={handleChange}
        />
        {
          editingId ? (
            <button onClick={handleUpdate}>Update</button>
          ) : (
            <button onClick={handleAdd}>Add</button>
          )
        }
      </div>

      {/* Grouped Books by Genre */}
      {genres.map((genre) => (
        <div key={genre} style={{ marginBottom: '30px' }}>
          <h3>📚 Genre: {genre}</h3>
          {books
            .filter(book => book.genre === genre)
            .map(book => (
              <div
                key={book.id}
                style={{
                  border: '1px solid #ccc',
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '5px'
                }}
              >
                <p>
                  <strong>{book.title}</strong> by {book.author} ({book.publishedYear})
                </p>
                <button onClick={() => handleEdit(book)} style={{ marginRight: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(book.id)} style={{ color: 'red' }}>Delete</button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default BookManage;
