const app = require("./src/app");
const fs = require('fs');
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;

// Add morgan middleware for logging
app.use(morgan('combined', {
  stream: fs.createWriteStream('./error.log', { flags: 'a' })
}));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
