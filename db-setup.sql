CREATE DATABASE IF NOT EXISTS combinations_db;
USE combinations_db;

CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_name VARCHAR(50) NOT NULL,
  UNIQUE (item_name)
);

CREATE TABLE IF NOT EXISTS responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  request_items JSON NOT NULL,
  combination_length INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS combinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  response_id INT NOT NULL,
  item_combination JSON NOT NULL,
  FOREIGN KEY (response_id) REFERENCES responses(id)
);

CREATE INDEX idx_response_id ON combinations(response_id);