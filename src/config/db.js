const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};
const pool = mysql.createPool(dbConfig);

const initialize = async () => {
  const connection = await pool.getConnection();

  try {
    console.log('CReating database tables...');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        item_name VARCHAR(50) NOT NULL,
        UNIQUE (item_name)
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS combinations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        response_id INT NOT NULL,
        item_combination JSON NOT NULL
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS responses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        request_items JSON NOT NULL,
        combination_length INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables created');
  } catch (err) {
    console.error('Database setup failed:', err);
    throw err;
  } finally {
    connection.release();
  }
};

module.exports = {
  pool,
  initialize,
};
