const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce_db',
  multipleStatements: true
});

const migrationQueries = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  name VARCHAR(255),
  address VARCHAR(500),
  payment_method VARCHAR(50),
  card_number VARCHAR(50),
  expiry VARCHAR(10),
  cvv VARCHAR(10),
  bkash_number VARCHAR(20),
  bkash_trx VARCHAR(100),
  nagad_number VARCHAR(20),
  nagad_trx VARCHAR(100),
  total_amount DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  title VARCHAR(255),
  price DECIMAL(10,2),
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
`;

db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err);
    return;
  }

  console.log("✅ DB Connected!");

  const queries = migrationQueries.split(";").filter(q => q.trim() !== "");

  (async () => {
    for (let q of queries) {
      await new Promise((resolve, reject) => {
        db.query(q, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
    console.log("🎉 Migration complete!");
    db.end();
  })().catch(err => {
    console.error("❌ Migration error:", err);
    db.end();
  });
});






// the "node migrate.js"
// toholei database e sob table insart hoye jabe.