const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',   // তোমার MySQL ইউজার
  password: '',   // তোমার MySQL পাসওয়ার্ড
  database: 'ecommerce_db'
});

// Test DB connection
db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

// API to save order
app.post('/api/orders', (req, res) => {
  const { name, address, paymentMethod, cardNumber, expiry, cvv, bkashNumber, bkashTrx, nagadNumber, nagadTrx, items, total } = req.body;

  // 1. Orders table এ insert
  const orderSql = `INSERT INTO orders (name, address, payment_method, card_number, expiry, cvv, bkash_number, bkash_trx, nagad_number, nagad_trx, total_amount)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(orderSql, [name, address, paymentMethod, cardNumber, expiry, cvv, bkashNumber, bkashTrx, nagadNumber, nagadTrx, total], (err, result) => {
    if (err) {
      console.error("❌ Order insert error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const orderId = result.insertId;

    // 2. Order items table এ insert
    const itemSql = `INSERT INTO order_items (order_id, product_id, title, price, quantity) VALUES ?`;
    const itemValues = items.map(item => [orderId, item.id, item.title, item.price, item.qty || item.quantity]);

    db.query(itemSql, [itemValues], (err2) => {
      if (err2) {
        console.error("❌ Order items insert error:", err2);
        return res.status(500).json({ message: "Items save failed" });
      }

      res.json({ message: "✅ Order placed successfully!", orderId });
    });
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));










// server.js এ আগের কোডের সাথে নিচের অংশ যোগ করো

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)`;

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("❌ Contact save error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json({ message: "✅ Message saved successfully!" });
  });
});

