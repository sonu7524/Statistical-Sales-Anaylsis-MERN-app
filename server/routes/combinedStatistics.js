const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/combined-statistics', async (req, res) => {
    const selectedMonth = req.query.month;
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    try {
        // Fetch data from each individual statistics endpoint
        const totalSaleAmountResponse = await axios.get(`${baseUrl}/api/statistics/totalSaleAmount?month=${selectedMonth}`);
        const totalSoldItemsResponse = await axios.get(`${baseUrl}/api/statistics/totalSoldItems?month=${selectedMonth}`);
        const totalNotSoldItemsResponse = await axios.get(`${baseUrl}/api/statistics/totalNotSoldItems?month=${selectedMonth}`);
        const barChartDataResponse = await axios.get(`${baseUrl}/api/statistics/barChart?month=${selectedMonth}`);
        const pieChartDataResponse = await axios.get(`${baseUrl}/api/statistics/pie-chart-data?month=${selectedMonth}`);

        // Parse the responses
        const totalSaleAmount = totalSaleAmountResponse.data;
        const totalSoldItems = totalSoldItemsResponse.data;
        const totalNotSoldItems = totalNotSoldItemsResponse.data;
        const barChartData = barChartDataResponse.data;
        const pieChartData = pieChartDataResponse.data;

        // Combine responses into a single JSON
        const combinedResponse = {
            totalSaleAmount,
            totalSoldItems,
            totalNotSoldItems,
            barChartData,
            pieChartData
        };

        res.json(combinedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;