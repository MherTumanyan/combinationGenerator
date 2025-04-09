const express = require('express');
const bodyParser = require('body-parser');
const combinationsRoutes = require('./routes/combinationRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/combinations', combinationsRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;
