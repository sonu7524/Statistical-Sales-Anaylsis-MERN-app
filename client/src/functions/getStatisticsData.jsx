
import axios from 'axios';
export const getChartData = async (selectedMonth) => {
    const authToken = sessionStorage.getItem('auth_token');
    try {
      // Fetch data from your API
      const response = await axios.get(`http://localhost:5000/api/combined-statistics?month=${selectedMonth}`);
      
      if (response.data) {
        return response.data;
      }
       // Set the data in state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}