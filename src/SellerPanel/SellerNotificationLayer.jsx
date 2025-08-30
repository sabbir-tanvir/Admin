import React, { useEffect, useMemo, useState } from 'react';
import PopUpNotification from './popUpNotification.jsx';
import FloatingChatWindow from './flotingChatwindow.jsx';
import { acceptChatRequest, declineChatRequest } from '../services/chat';
import { createNotificationsSocket } from '../services/ws';

// Real-time seller notification layer: listens for WS notifications and shows popup; accept opens chat.
const SellerNotificationLayer = () => {
  const [incoming, setIncoming] = useState(null); // {request_id, customer, product}
  const [sessionId, setSessionId] = useState(null);
  const [customerName, setCustomerName] = useState('Customer');

  // WebSocket: notifications
  useEffect(() => {
    let socket;
  let offMsg = null;
  let offRaw = null;
    const start = () => {
      socket = createNotificationsSocket();
      if (import.meta.env?.DEV) console.debug('[notify] connecting');
      socket.on('open', () => { if (import.meta.env?.DEV) console.debug('[notify] open'); });
      socket.on('close', () => { if (import.meta.env?.DEV) console.debug('[notify] close'); });
      socket.on('error', (e) => { if (import.meta.env?.DEV) console.debug('[notify] error', e); });
  offRaw = socket.on('raw', (txt) => { if (import.meta.env?.DEV) console.debug('[notify] raw', txt); });
  offMsg = socket.on('message', (evt) => {
        if (import.meta.env?.DEV) console.debug('[notify] message', evt);
        // Some backends wrap payloads, normalize a few common shapes
        const payload = evt?.event || evt?.payload || evt || {};
        const t = payload.type || evt?.type;
        const isInvite = t === 'chat_invite' || t === 'new_chat_request' ||
          // heuristic: presence of req_id + customer_name suggests invite
          (payload.req_id && (payload.customer_name || payload.product_name));
        if (isInvite) {
          const reqId = payload.req_id || payload.request_id || payload.id;
          setIncoming({
            requestId: reqId,
            productId: payload.product_id || payload.product,
            customerName: payload.customer_name || payload.customer || 'Customer',
            productName: payload.product_name || payload.product_title,
            message: payload.message || `Customer ${payload.customer_name || ''} wants to talk to you...`.trim(),
          });
          if (payload.customer_name) setCustomerName(String(payload.customer_name));
        }
        if (t === 'assigned') {
          // Backend sends: { type: 'assigned', request_id, session: { id, ... } }
          const sess = payload.session || evt.session;
          if (sess?.id) {
            setSessionId(sess.id);
            setIncoming(null); // Clear any pending invite since it's assigned
          }
        }
        if (t === 'session_closed') {
          setSessionId(null);
        }
      });
    };
    // Defer to survive StrictMode mount/unmount
    const timer = setTimeout(start, 0);
    return () => {
      clearTimeout(timer);
      offMsg?.();
      offRaw?.();
      socket?.close();
    };
  }, []);

  // No polling fallback: rely on WebSocket notifications only.

  const showPopup = useMemo(() => Boolean(incoming), [incoming]);

  const handleAccept = async () => {
    if (!incoming?.requestId) return;
    try {
      const res = await acceptChatRequest(incoming.requestId);
      const created = res?.data;
  if (created?.id || created?.session_id) setSessionId(created.id ?? created.session_id);
    } catch (err) {
      if (import.meta.env?.DEV) console.debug('[chat.accept] error', err);
    } finally {
      setIncoming(null);
    }
  };

  const handleReject = async () => {
    if (!incoming?.requestId) return setIncoming(null);
    try { await declineChatRequest(incoming.requestId); }
  catch (err) { if (import.meta.env?.DEV) console.debug('[chat.decline] error', err); }
    setIncoming(null);
  };

  const handleCloseChat = () => setSessionId(null);

  return (
    <>
      <PopUpNotification
        visible={showPopup}
  message={incoming?.message || `${customerName ? `Customer ${customerName}` : 'A customer'} wants to talk to you...`}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      <FloatingChatWindow
        visible={Boolean(sessionId)}
        onClose={handleCloseChat}
        customerName={customerName || 'Customer'}
        sessionId={sessionId}
      />
    </>
  );
};

export default SellerNotificationLayer;
