import axios from "axios";

const url = "/budget";

export const fetchBudgetData = async () => {
    try {
        const response = await axios.get(url);
        console.log("data grabbed! ", response.data)
        return response.data; // Assuming this is the array of budget items.
    } catch (error) {
        console.error("Error fetching budget data: ", error);
        return []; // Return an empty array in case of an error.
    }
};
