const express = require('express');
const Product = require('../models/Poduct');
const searchRouter = express.Router();

searchRouter.get('/transactions', async (req, res) => {
     
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const search = req.query.search || '';

        let query = {};
        if (search && typeof search === 'string') {
            query = {
                $or: [
                    { title: { $regex: search } },
                    { description: { $regex: search } },
                    { price: !isNaN(search) ? parseFloat(search) : "" }
                ]
            };
        }
        const pageOptions = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
          };
          
          const transactions = await Product.find(query)
            .skip((pageOptions.page - 1) * pageOptions.limit)
            .limit(pageOptions.limit);
          
    
        res.json(transactions);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
});


module.exports = searchRouter;