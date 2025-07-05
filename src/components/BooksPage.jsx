import React, { useState, useEffect } from 'react';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Load books from localStorage on mount
  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Save books to localStorage whenever books state changes
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddOrUpdate = () => {
    if (!title || !author || !category) return alert("All fields are required.");

    const newBook = { title, author, category };

    if (editIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = newBook;
      setBooks(updatedBooks);
      setEditIndex(null);
    } else {
      setBooks([...books, newBook]);
    }

    // Clear form
    setTitle('');
    setAuthor('');
    setCategory('');
  };

  const handleEdit = (index) => {
    const book = books[index];
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
    setEditIndex(null);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h2>📚 Book Management</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <input
          type="text"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="">Select Category</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Biography">Biography</option>
        </select>
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? 'Update Book' : 'Add Book'}
        </button>
      </div>

      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map((book, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
              <strong>{book.title}</strong> by {book.author} — <em>{book.category}</em>
              <button onClick={() => handleEdit(index)} style={{ marginLeft: '10px' }}>Edit</button>
              <button onClick={() => handleDelete(index)} style={{ marginLeft: '5px', color: 'red' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BooksPage;
