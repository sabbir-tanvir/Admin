import axios from "axios";

// Resolve API base URL from Vite env; fall back to public production host if absent.
// Ensures exactly one trailing slash for clean concatenation.
const rawEnvBase = import.meta.env?.VITE_API_BASE_URL;
let resolvedBase = rawEnvBase && rawEnvBase.trim();
if (!resolvedBase) {
  // Hard fallback so login still hits remote API rather than localhost origin.
  resolvedBase = "http://api.bdsns.com/user/";
  console.warn("[api] VITE_API_BASE_URL missing. Falling back to", resolvedBase);
}
// Guarantee trailing slash
if (!resolvedBase.endsWith('/')) resolvedBase += '/';
export const API_BASE_URL = resolvedBase;
if (import.meta.env.DEV) {
  // Dev-time diagnostics (remove or silence in production build)
  // Shows the final base used so we can confirm no empty string.
  console.info('[api] Using API_BASE_URL =', API_BASE_URL);
}

// Axios instance
const api = axios.create({ baseURL: API_BASE_URL });

// --- Token helpers (simple localStorage based for now) ---
const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export const tokenStore = {
  get access() { return localStorage.getItem(ACCESS_KEY); },
  get refresh() { return localStorage.getItem(REFRESH_KEY); },
  set(access, refresh) {
    if (access) localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  }
};

// Attach Authorization header if access token exists
api.interceptors.request.use((config) => {
  const token = tokenStore.access;
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Basic 401 handling & (placeholder) refresh logic scaffold
let isRefreshing = false;
let queuedRequests = [];

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const original = error.config;
    if (error?.response?.status === 401 && !original._retry && tokenStore.refresh) {
      original._retry = true;
      try {
        if (!isRefreshing) {
          isRefreshing = true;
          // Placeholder refresh endpoint (adjust when backend ready)
      const refreshRes = await axios.post(`${API_BASE_URL}api/token/refresh/`, { refresh: tokenStore.refresh });
      const { access } = refreshRes.data || {};
      if (access) tokenStore.set(access, tokenStore.refresh);
      isRefreshing = false;
      queuedRequests.forEach(cb => cb(access));
          queuedRequests = [];
        }
        return new Promise((resolve) => {
          queuedRequests.push(() => {
            original.headers.Authorization = `Bearer ${tokenStore.access}`;
            resolve(api(original));
          });
        });
    } catch {
        tokenStore.clear();
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

// Existing demo API calls (local JSON fallback)
export const getOrders = () => api.get("/order.json");

// Authentication: backend expected to expose api/token/ returning {refresh, access}
// NOTE: no leading slash so '/user/' segment from base URL is preserved.
export const loginUser = (credentials) => api.post("api/login/", credentials);

// Placeholder / legacy endpoints kept (adjust when real backend available)
// export const signupUser = (userData) => api.post("/auth/signup", userData);
// export const forgotPassword = (emailData) => api.post("/auth/forgot-password", emailData);
// export const resetPassword = (resetData) => api.post("/auth/reset-password", resetData);
// export const socialAuth = (type, role) => api.get(`/auth/oauth/${type}?role=${role}`);

// Marketor: create product request (multipart)
export const createProductRequest = ({ name, description, category, price, image }) => {
  const form = new FormData();
  form.append('name', name);
  form.append('description', description);
  form.append('category', category); // assuming backend expects numeric ID as string ok
  form.append('price', price);
  if (image) form.append('image', image);
  return api.post('api/product-requests/', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

// Admin: list product requests
export const getProductRequests = () => api.get('api/product-requests/');

export default api;


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
