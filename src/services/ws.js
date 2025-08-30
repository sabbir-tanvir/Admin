import { getAuthToken, getWsBaseUrl } from './chat';

// Simple event emitter
class Emitter {
  constructor() { this.listeners = {}; }
  on(type, cb) { (this.listeners[type] ||= new Set()).add(cb); return () => this.off(type, cb); }
  off(type, cb) { this.listeners[type]?.delete(cb); }
  emit(type, payload) { this.listeners[type]?.forEach(cb => cb(payload)); }
}

// Generic WS client with auto-reconnect
class WSClient {
  constructor(urlBuilder) {
    this.urlBuilder = urlBuilder;
    this.socket = null;
    this.emitter = new Emitter();
    this.reconnectDelay = 2000;
    this.shouldRun = false;
  }

  connect() {
    this.shouldRun = true;
    this._open();
    return this;
  }

  _open() {
    const url = this.urlBuilder();
    if (!url) {
      if (import.meta.env?.DEV) console.debug('[ws] URL not ready, retrying soon');
      if (this.shouldRun) setTimeout(() => this._open(), this.reconnectDelay);
      return;
    }
    try {
      this.socket = new WebSocket(url);
      this.socket.onopen = () => this.emitter.emit('open');
      this.socket.onmessage = (e) => {
        try { this.emitter.emit('message', JSON.parse(e.data)); }
        catch { this.emitter.emit('raw', e.data); }
      };
      this.socket.onclose = () => {
        this.emitter.emit('close');
        if (this.shouldRun) setTimeout(() => this._open(), this.reconnectDelay);
      };
      this.socket.onerror = (err) => { this.emitter.emit('error', err); };
    } catch {
      if (this.shouldRun) setTimeout(() => this._open(), this.reconnectDelay);
    }
  }

  send(obj) {
    try { this.socket?.send(JSON.stringify(obj)); } catch { /* ignore */ }
  }

  close() {
    this.shouldRun = false;
    try { this.socket?.close(); } catch { /* ignore */ }
  }

  on(type, cb) { return this.emitter.on(type, cb); }
}

// Builders
export const buildNotificationsUrl = () => {
  const base = getWsBaseUrl();
  const token = getAuthToken();
  if (!base || !token) return null;
  return `${base}notify/?token=${encodeURIComponent(token)}`;
};

export const buildChatUrl = (sessionId) => {
  const base = getWsBaseUrl();
  const token = getAuthToken();
  if (!base || !token || !sessionId) return null;
  return `${base}chat/${sessionId}/?token=${encodeURIComponent(token)}`;
};

export const createNotificationsSocket = () => new WSClient(buildNotificationsUrl).connect();
export const createChatSocket = (sessionId) => new WSClient(() => buildChatUrl(sessionId)).connect();

export default {
  Emitter,
  WSClient,
  buildNotificationsUrl,
  buildChatUrl,
  createNotificationsSocket,
  createChatSocket,
};
