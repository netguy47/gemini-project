require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true });
});

app.post('/stories/:id/feedback', (req, res) => {
  const { rating } = req.body;
  const numericRating = Number(rating);
  if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
    return res.status(400).json({ error: 'Invalid rating' });
  }
  res.status(200).json({ ok: true });
});

// Only start the server when not running tests
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));
}

module.exports = app;
