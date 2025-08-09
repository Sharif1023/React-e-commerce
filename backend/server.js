const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // or your actual root password
  database: 'contact_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database.');
    connection.release();
  }
});

// API route to receive contact form data
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill all fields.' });
  }

  const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  pool.query(sql, [name, email, message], (err, results) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json({ message: 'Message received successfully.' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
