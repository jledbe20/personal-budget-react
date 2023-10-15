import axios from "axios";

const url = "http://localhost:3001/budget";

export const fetchBudgetData = async () => {
  try {
    const { data } = await axios.get(url);
    console.log("data grabbed! ", data)
    return data;
  } catch (err) {
    console.log(err);
  }
};