const db = require('../config/db');
const { saveItems } = require('./item');

async function saveResponse(itemCounts, length, itemNames, combinations) {
  const connection = await db.pool.getConnection();

  try {
    await connection.beginTransaction();

    const [responseResult] = await connection.query(
      'INSERT INTO responses (request_items, combination_length) VALUES (?, ?)',
      [JSON.stringify(itemCounts), length],
    );

    const responseId = responseResult.insertId;

    await saveItems(connection, itemNames);    
    for (const combo of combinations) {
      await connection.query(
        'INSERT INTO combinations (response_id, item_combination) VALUES (?, ?)',
        [responseId, JSON.stringify(combo)],
      );
    }
    await connection.commit();

    return responseId;
  } catch (err) {
    await connection.rollback();
    console.error('Transaction failed:', err);
    throw new Error('Database error');
  } finally {
    connection.release();
  }
}

async function getResponseById(id) {
  try {
    const [rows] = await db.pool.query('SELECT * FROM responses WHERE id = ?', [
      id,
    ]);

    return rows[0] || null;
  } catch (err) {
    console.error('Error fetching response:', err);
    throw new Error('Database error');
  }
}

module.exports = {
  saveResponse,
  getResponseById,
};
