import axios from "axios";

// Resolve API base URL from Vite env; fall back to public production host if absent.
// Ensures exactly one trailing slash for clean concatenation.
const rawEnvBase = import.meta.env?.VITE_API_BASE_URL;
let resolvedBase = rawEnvBase && rawEnvBase.trim();
if (!resolvedBase) {
  // Hard fallback so login still hits remote API rather than localhost origin.
  resolvedBase = "http://13.50.4.128:8000/";
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
      const refreshRes = await axios.post(`${API_BASE_URL}user/api/token/refresh/`, { refresh: tokenStore.refresh });
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
// IMPORTANT: Use plain axios for local public assets so we hit the app origin, not the remote API base URL.
export const getOrders = () => axios.get("/order.json");

// Authentication: backend expected to expose api/token/ returning {refresh, access}
// NOTE: no leading slash so '/user/' segment from base URL is preserved.
export const loginUser = (credentials) => api.post("user/api/login/", credentials);


// Marketor: create product request (multipart form-data)
// Send only the minimal fields currently required by backend: name, sku, description, category, price, main_image
export const createProductRequest = ({ name, sku, description, category, price, image, stock, imported_from }) => {
  const form = new FormData();
  form.append('name', name);
  form.append('sku', sku);
  form.append('description', description);
  form.append('category', String(parseInt(category, 10)));
  form.append('price', String(price));
  if (image) form.append('main_image', image);
  if (stock !== undefined && stock !== null && String(stock) !== '') {
    const n = parseInt(stock, 10);
    if (!Number.isNaN(n)) form.append('stock', String(n));
  }
  if (imported_from !== undefined && imported_from !== null && String(imported_from) !== '') {
    form.append('imported_from', String(imported_from));
  }

  try {
    const summary = {};
  for (const [k, v] of form.entries()) {
      summary[k] = (typeof File !== 'undefined' && v instanceof File) ? `File(${v.name}, ${v.size})` : v;
    }
    console.log('[createProductRequest] multipart summary', summary);
  } catch {
    // ignore logging issues
  }

  const auth = tokenStore.access ? { Authorization: `Bearer ${tokenStore.access}` } : {};
  return api.post('dashboard/api/request-product/', form, { headers: { ...auth } });
};

// Admin: list product requests
export const getProductRequests = () => api.get('dashboard/api/request-product/');

// Admin/Owner: approve a product request
// Approve product request: some backends expose this action as POST (common for DRF @action) while
// earlier spec mentioned PATCH. We'll try POST first; if method not allowed (405) fall back to PATCH.
// export const approveProductRequest = async (id) => {
//   try {
//     return await api.post(`user/api/product-requests/${id}/approve/`, { is_approved: true });
//   } catch (err) {
//     if (err.response?.status === 405 || err.response?.data?.detail?.includes('Method "POST" not allowed')) {
//       return api.patch(`user/api/product-requests/${id}/approve/`, { is_approved: true });
//     }
//     throw err;
//   }
// };

// Update product request (PATCH) — stable user endpoint
export const updateProductRequest = (id, updates) => {
  // Backend consolidates approve + update into one PUT endpoint
  // PUT /dashboard/api/approve-product/{id}/
  const payload = buildNonEmptyPayload(updates);
  const auth = tokenStore.access ? { Authorization: `Bearer ${tokenStore.access}` } : {};
  return api.put(`dashboard/api/approve-product/${id}/`, payload, { headers: { ...auth } });
};

// Delete product request (DELETE)
// Backend endpoint: /dashboard/api/request-product/<id>/ [DELETE]
export const deleteProductRequest = (id) => api.delete(`dashboard/api/request-product/${id}/`);

// Utility: build payload excluding empty string/null/undefined values
export const buildNonEmptyPayload = (obj) => {
  const out = {};
  Object.entries(obj || {}).forEach(([k, v]) => {
    if (v === '' || v === null || v === undefined) return; // skip empties
    out[k] = v;
  });
  return out;
};

export default api;

// Dashboard metrics
export const getDashboardMetrics = () => api.get('dashboard/api/metrics/');

// Dashboard: Top Customers
export const getTopCustomers = () => api.get('dashboard/api/top-customers/');

// Dashboard: Top Marketers
export const getTopMarketers = () => api.get('dashboard/api/top-marketers/');

// Dashboard: Top Products
export const getTopProducts = () => api.get('dashboard/api/top-products/');

// --- Profile Endpoints ---
// Get logged-in user profile
export const getProfile = () => api.get('dashboard/api/profile/');

// Update logged-in user profile (partial update)
export const updateProfile = (partial) => api.patch('dashboard/api/profile/', partial);

// Change password
export const changePassword = (payload) => api.patch('dashboard/api/profile/change-password/', payload);


// New: Fetch order details by orderId
export const getOrderDetails = async (orderId) => {
  // Fetch from the app's public folder (same origin)
  const res = await axios.get('/orderId.json');
  const orders = res.data;
  const order = Array.isArray(orders)
    ? orders.find(o => String(o.orderId) === String(orderId))
    : orders;
  return { data: order };
};

// New: Fetch payment history by orderId
export const getPaymentHistory = async (orderId) => {
  // Fetch from the app's public folder (same origin)
  const res = await axios.get('/payments.json');
  const all = res.data;
  const payment = Array.isArray(all)
    ? all.find(p => String(p.orderId) === String(orderId))
    : all;
  return { data: payment };
};
