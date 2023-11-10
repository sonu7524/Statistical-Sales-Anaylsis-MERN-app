import axios from "axios";

export const searchProd = async (searchInput,page, perPage) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/transactions?page=${page}&perPage=${perPage}&search=${searchInput}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}