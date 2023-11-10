const express = require('express');
const Product = require('../models/Poduct');
const statisticsRouter = express.Router();

statisticsRouter.get('/statistics/transactions', async (req, res) => {
  const selectedMonth = parseInt(req.query.month); // Assuming month is a number (1 for January, 2 for February, etc.)
  try {
    const transactions = await Product.find({
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)]
      }
    });

    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

statisticsRouter.get('/statistics/totalSaleAmount', async (req, res) => {
    const selectedMonth = req.query.month;
  
    try {
      const totalSaleAmount = await Product.aggregate([
        {
          $match: {
            sold: true,
            $expr: {
                $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)]
            }
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$price' },
          },
        },
      ]);
  
      res.json({ totalSaleAmount: totalSaleAmount[0]?.totalAmount || 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get total number of sold items of selected month
  statisticsRouter.get('/statistics/totalSoldItems', async (req, res) => {
    const selectedMonth = req.query.month;
  
    try {
      const totalSoldItems = await Product.countDocuments({
        sold: true,
        $expr: {
            $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)]
        }
      });
  
      res.json({ totalSoldItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get total number of not sold items of selected month
  statisticsRouter.get('/statistics/totalNotSoldItems', async (req, res) => {
    const selectedMonth = req.query.month;
    try {
      const totalNotSoldItems = await Product.countDocuments({
        sold: false,
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)]
        }
      });
  
      res.json({ totalNotSoldItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Add this route to your existing Express app

// Get bar chart data for the selected month
statisticsRouter.get('/statistics/barChart', async (req, res) => {
    const selectedMonth = req.query.month;
  
    try {
      const barChartData = await Product.aggregate([
        {
          $match: {
              $expr: {
                  $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)]
              }
          }
        },
        {
          $group: {
            _id: {
              $switch: {
                branches: [
                  { case: { $and: [{ $gte: ['$price', 0] }, { $lte: ['$price', 100] }] }, then: '0-100' },
                  { case: { $and: [{ $gt: ['$price', 100] }, { $lte: ['$price', 200] }] }, then: '101-200' },
                  { case: { $and: [{ $gt: ['$price', 200] }, { $lte: ['$price', 300] }] }, then: '201-300' },
                  { case: { $and: [{ $gt: ['$price', 300] }, { $lte: ['$price', 400] }] }, then: '301-400' },
                  { case: { $and: [{ $gt: ['$price', 400] }, { $lte: ['$price', 500] }] }, then: '401-500' },
                  { case: { $and: [{ $gt: ['$price', 500] }, { $lte: ['$price', 600] }] }, then: '501-600' },
                  { case: { $and: [{ $gt: ['$price', 600] }, { $lte: ['$price', 700] }] }, then: '601-700' },
                  { case: { $and: [{ $gt: ['$price', 700] }, { $lte: ['$price', 800] }] }, then: '701-800' },
                  { case: { $and: [{ $gt: ['$price', 800] }, { $lte: ['$price', 900] }] }, then: '801-900' },
                  { case: { $gte: ['$price', 901] }, then: '901-above' },
                ],
              },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            priceRange: '$_id',
            count: 1,
          },
        },
      ]);
  
      res.json(barChartData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  statisticsRouter.get('/statistics/pie-chart-data', async (req, res) => {
    try {
        const selectedMonth = parseInt(req.query.month); // Assuming month is a number (1 for January, 2 for February, etc.)

        // Aggregate pipeline to get unique categories and count of items for the selected month
        const result = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$dateOfSale' }, parseInt(selectedMonth)]
                    }
                }
            },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



  module.exports = statisticsRouter;
  