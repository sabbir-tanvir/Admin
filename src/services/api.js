import axios from "axios";

const api = axios.create({
    baseURL: ""
});

export const getOrders = () => api.get("/order.json")