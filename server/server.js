const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory store for messages
let messages = [];

// GET all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// POST a new message
app.post('/messages', (req, res) => {
  const { username, text, timestamp } = req.body;
  if (!username || !text) {
    return res.status(400).json({ error: 'Missing username or text' });
  }
  const message = { id: messages.length + 1, username, text, timestamp };
  messages.push(message);
  res.status(201).json(message);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});