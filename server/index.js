const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api/index');

const app = express();
const port = 3000;

// Use routes
app.use('/api', apiRouter);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
