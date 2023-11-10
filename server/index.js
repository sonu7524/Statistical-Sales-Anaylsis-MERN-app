// Install necessary packages: npm install express mongoose axios
const express = require('express');
const db = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');
const dbRoute = require('./routes/initializeDB');
const searchRoute = require('./routes/search');
const statisticsRoute = require('./routes/statistics');
const combinedStatisticsRoute = require('./routes/combinedStatistics');
const authRoute = require('./routes/auth');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', dbRoute);
app.use('/api/auth', authRoute);
app.use('/api', searchRoute);
app.use('/api', statisticsRoute);
app.use('/api', combinedStatisticsRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
