const db = require('./src/config/db');
const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await db.initialize();
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.log('Failed to start server:', err);
    process.exit(1);
  }
});
