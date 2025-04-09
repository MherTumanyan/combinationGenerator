async function saveItems(connection, itemNames) {
  try {
    for (const item of itemNames) {
      await connection.query(
        'INSERT IGNORE INTO items (item_name) VALUES (?)',
        [item],
      );
    }
  } catch (err) {
    console.error('Error saving items:', err);
    throw err;
  }
}
module.exports = {
  saveItems,
};
