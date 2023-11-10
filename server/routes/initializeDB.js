const express = require('express');
const dbRouter = express.Router();
const axios = require('axios');
const Product = require('../models/Poduct');

dbRouter.get('/initialize-database', async (req, res) => {
    try {
      // Fetch JSON data from the third-party API
      const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
      const jsonData = response.data;
  
      // Insert seed data into the database
      await Product.insertMany(jsonData);
  
      res.status(200).json({ message: 'Database initialized successfully' });
    } catch (error) {
      console.error('Error initializing database:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
    
module.exports = dbRouter;