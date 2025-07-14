import axios from "axios"

const api = axios.create({
    baseURL: ""
});

// Existing API calls
export const getOrders = () => api.get("/order.json")

// Authentication API calls
export const loginUser = (credentials) => api.post("/auth/login", credentials)
export const signupUser = (userData) => api.post("/auth/signup", userData)
export const forgotPassword = (emailData) => api.post("/auth/forgot-password", emailData)
export const resetPassword = (resetData) => api.post("/auth/reset-password", resetData)
export const socialAuth = (type, role) => api.get(`/auth/oauth/${type}?role=${role}`)

export default api


// New: Fetch order details by orderId
export const getOrderDetails = async (orderId) => {
  const res = await api.get('/orderId.json');
  const orders = res.data;
  const order = Array.isArray(orders)
    ? orders.find(o => o.orderId === orderId)
    : orders;
  return { data: order };
};

// New: Fetch payment history by orderId
export const getPaymentHistory = async (orderId) => {
  const res = await api.get('/payments.json');
  const all = res.data;
  const payment = Array.isArray(all)
    ? all.find(p => p.orderId === orderId)
    : all;
  return { data: payment };
};
