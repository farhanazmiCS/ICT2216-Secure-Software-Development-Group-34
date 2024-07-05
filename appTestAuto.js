require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path'); // Ensure path is imported

// Example root route handler
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Export the app for testing
module.exports = app;

// Start the server
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI); // Verify MONGO_URI is loaded correctly
    await connectDB(process.env.MONGO_URI); // Ensure correct reference here
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
