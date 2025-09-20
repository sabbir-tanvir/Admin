import api, { API_BASE_URL, tokenStore } from './api';

// REST endpoints (relative to API_BASE_URL which ends with trailing slash)
// Base expected: https://safeapi.genzsoft.top/ (so 'api/...')
const ROOT = 'user/api/';

// Chat Request APIs
export const createChatRequest = (productId) => api.post(`${ROOT}chat-requests/`, { product: productId });
export const getChatRequest = (id) => api.get(`${ROOT}chat-requests/${id}/`);
export const acceptChatRequest = (id) => api.post(`${ROOT}chat-requests/${id}/accept/`, {});
export const declineChatRequest = (id) => api.post(`${ROOT}chat-requests/${id}/decline/`, {});

// Sessions & Messages
export const listChatSessions = (params = {}) => api.get(`${ROOT}chat-sessions/`, { params });
export const getChatSession = (id) => api.get(`${ROOT}chat-sessions/${id}/`);
export const getMessages = (sessionId, params = {}) => api.get(`${ROOT}chat-messages/`, { params: { session_id: sessionId, ...params } });
export const sendMessage = (sessionId, content) => api.post(`${ROOT}chat-messages/`, { session_id: sessionId, text: content });
export const closeSession = (sessionId) => api.post(`${ROOT}chat-sessions/${sessionId}/close/`, {});

// Notifications polling (fallback when WS unavailable)
export const getNotifications = (params = {}) => api.get(`${ROOT}notifications/`, { params });

// Utilities
export const getWsBaseUrl = () => {
  try {
    let base = API_BASE_URL; // 
    if (!base) return null;
    // strip trailing slash
    if (base.endsWith('/')) base = base.slice(0, -1);
    const isSecure = base.startsWith('https://');
    const scheme = isSecure ? 'wss://' : 'ws://';
    const host = base.replace(/^https?:\/\//, '');
  return `${scheme}${host}/ws/`;
  } catch {
    return null;
  }
};

export const getAuthToken = () => tokenStore.access;

export default {
  createChatRequest,
  getChatRequest,
  acceptChatRequest,
  declineChatRequest,
  listChatSessions,
  getChatSession,
  getMessages,
  sendMessage,
  closeSession,
  getNotifications,
  getWsBaseUrl,
  getAuthToken,
};
