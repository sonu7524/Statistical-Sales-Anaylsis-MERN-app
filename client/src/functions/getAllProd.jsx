import axios from "axios";

export const getAllProd = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/transactions`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}