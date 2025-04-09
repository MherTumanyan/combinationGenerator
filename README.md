# Combination Generator API

A RESTful API that generates combinations from items following specific rules.

## Overview

This API takes an array of item counts and generates all valid combinations where items with the same starting letter cannot be combined together.

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database:
   ```
   mysql -u username -p < db-setup.sql
   ```
   or
   ```
   npm run migrate
   ```
4. Update database connection in `src/config/db.js`
5. Start the server:
   ```
   npm run start
   ```

## API Usage

**Generate Combinations**

- **URL:** `POST /api/combinations/generate`
- **Body:**
  ```json
  {
    "items": [1, 2, 1],
    "length": 2
  }
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "combination": [
      ["A1", "B1"],
      ["A1", "B2"],
      ["A1", "C1"],
      ["B1", "C1"],
      ["B2", "C1"]
    ]
  }
  ```