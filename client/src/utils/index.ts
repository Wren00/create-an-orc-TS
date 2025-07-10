import axios from "axios";

const ApiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
    headers: {
        "Content-Type": "application/json",
    },
});

export default ApiClient;