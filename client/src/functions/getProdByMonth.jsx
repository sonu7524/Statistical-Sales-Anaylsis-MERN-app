import axios from "axios";

export const getProdByMonth = async (month) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/statistics/transactions?month=${month}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}