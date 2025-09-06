const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

app.post('/test-post', (req, res) => {
  console.log('Received body:', req.body);
  res.json({ received: req.body });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});