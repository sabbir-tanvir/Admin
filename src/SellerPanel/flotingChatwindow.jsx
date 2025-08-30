import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/SellerPanel/flotingChatWindow.module.css';
import { createChatSocket } from '../services/ws';

const FloatingChatWindow = ({ visible, onClose, customerName = 'Customer', sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const endRef = useRef(null);
  const socketRef = useRef(null);
  const messageIdsRef = useRef(new Set());
  const { user } = useAuth();
  const myUserId = user?.userId ?? user?.user_id ?? null;

  const send = () => {
    const val = input.trim();
    if (!val) return;

    const tempId = `local-${Date.now()}`;
    const pending = { id: tempId, from: 'me', text: val, pending: true, ts: new Date().toISOString() };
    setMessages(prev => [...prev, pending]);

    try {
      socketRef.current?.send({ action: 'send_message', message: val, client_id: tempId });
    } catch (err) {
      if (import.meta.env?.DEV) console.debug('[chat.ws.send] error', err);
    }
    setInput('');
  };

  // Always scroll to bottom when messages change or when chat becomes visible
  useEffect(() => {
    if (!visible) return;
    const el = bodyRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, visible]);

  // Load live socket updates
  useEffect(() => {
    let unsub = () => {};
    let timer;

    const load = async () => {
      if (!visible || !sessionId) return;

      timer = setTimeout(() => {
        const socket = createChatSocket(sessionId);
        socketRef.current = socket;

        const off = socket.on('message', (evt) => {
          if (import.meta.env?.DEV) console.debug('[chat.ws] message', evt);

          const { type } = evt || {};
          if (type === 'chat_message' || type === 'chat.message') {
            const content = evt.message || evt.text || '';
            let senderId = evt.sender ?? evt.from ?? null;
            if (typeof senderId === 'string' && senderId.trim() === '') senderId = null;
            const senderIsMe = senderId != null && myUserId != null && Number(senderId) === Number(myUserId);

            const normalized = {
              id: evt.id ?? evt.client_id ?? `srv-${Date.now()}`,
              from: senderIsMe ? 'me' : 'customer',
              text: content,
              ts: evt.timestamp || evt.created_at || new Date().toISOString(),
            };

            // Already seen → skip
            if (normalized.id && messageIdsRef.current.has(normalized.id)) {
              return;
            }

            setMessages(prev => {
              const copy = [...prev];

              // If server gave us client_id → replace pending
              if (evt.client_id) {
                const idx = copy.findIndex(m => m.id === evt.client_id);
                if (idx !== -1) {
                  copy[idx] = { ...normalized };
                  messageIdsRef.current.add(normalized.id);
                  return copy;
                }
              }

              // If no client_id but it's my message → try matching by text
              if (!evt.client_id && normalized.from === 'me') {
                const idx = copy.findIndex(m => m.from === 'me' && m.pending && m.text === normalized.text);
                if (idx !== -1) {
                  copy[idx] = { ...normalized };
                  messageIdsRef.current.add(normalized.id);
                  return copy;
                }
              }

              // Otherwise append normally
              copy.push(normalized);
              if (normalized.id) messageIdsRef.current.add(normalized.id);
              return copy;
            });
          }

          if (type === 'session_closed') {
            onClose?.();
          }
        });

        unsub = () => { off?.(); socket.close(); };
      }, 0);
    };

    load();
    return () => { clearTimeout(timer); unsub?.(); };
  }, [visible, sessionId, onClose, myUserId]);

  if (!visible) return null;

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <span>Chat with {customerName}</span>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
      </div>
      <div className={styles.body} ref={bodyRef}>
        {messages.map((m) => (
          <div key={m.id} className={m.from === 'me' ? styles.msgMe : styles.msgOther}>
            {m.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
        />
        <button className={styles.sendBtn} onClick={send}>Send</button>
      </div>
    </div>
  );
};

export default FloatingChatWindow;
