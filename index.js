require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({ ok: true });
});

// Only start the server when not running tests
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
}

module.exports = app;
