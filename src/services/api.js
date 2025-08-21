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
  // Ensure numeric fields are sent as canonical string versions
  const normalizedCategory = category === undefined || category === null || category === '' ? '' : String(parseInt(category, 10));
  const normalizedPrice = price === undefined || price === null || price === '' ? '' : String(price);
  form.append('category', normalizedCategory);
  form.append('price', normalizedPrice);
  if (image) form.append('image', image);
  // Always log outgoing multipart payload (without dumping binary) so you can see it even in prod build.
  try {
    console.log('[createProductRequest] Payload start');
    const summary = {};
    for (const [k, v] of form.entries()) {
      if (typeof File !== 'undefined' && v instanceof File) {
        console.log(`  field ${k} -> File`, { name: v.name, type: v.type, size: v.size });
        summary[k] = `File(name=${v.name}, size=${v.size})`;
      } else if (v && typeof v === 'object' && 'name' in v && 'size' in v) {
        console.log(`  field ${k} -> FileLike`, v);
        summary[k] = `FileLike(name=${v.name}, size=${v.size})`;
      } else {
        console.log(`  field ${k} ->`, v);
        summary[k] = v;
      }
    }
    console.log('[createProductRequest] Summary object:', summary);
  } catch (e) {
    console.log('[createProductRequest] logging failed', e);
  }
  // Explicitly include Authorization header in case interceptor order changes
  const auth = tokenStore.access ? { Authorization: `Bearer ${tokenStore.access}` } : {};
  // IMPORTANT: Do NOT manually set 'Content-Type' for FormData; letting axios/browser
  // set it ensures the correct boundary is used. Setting it ourselves can cause 400.
  return api.post('api/product-requests/', form, { headers: { ...auth } });
};

// Admin: list product requests
export const getProductRequests = () => api.get('api/product-requests/');

// Admin/Owner: approve a product request
// Approve product request: some backends expose this action as POST (common for DRF @action) while
// earlier spec mentioned PATCH. We'll try POST first; if method not allowed (405) fall back to PATCH.
export const approveProductRequest = async (id) => {
  try {
    return await api.post(`api/product-requests/${id}/approve/`, { is_approved: true });
  } catch (err) {
    if (err.response?.status === 405 || err.response?.data?.detail?.includes('Method "POST" not allowed')) {
      return api.patch(`api/product-requests/${id}/approve/`, { is_approved: true });
    }
    throw err;
  }
};

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
