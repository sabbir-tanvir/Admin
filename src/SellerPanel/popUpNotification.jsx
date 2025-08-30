import React from 'react';
import styles from '../styles/SellerPanel/popUpNotification.module.css';

/**
 * Popup notification shown to sellers when a customer wants to chat.
 * Props:
 * - visible: boolean
 * - message: string
 * - onAccept: () => void
 * - onReject: () => void
 */
const PopUpNotification = ({ visible, message, onAccept, onReject }) => {
	if (!visible) return null;

	return (
		<div className={styles.overlay} role="dialog" aria-modal="true">
			<div className={styles.modal}>
				<div className={styles.content}>
					<h3 className={styles.title}>New Chat Request</h3>
					<p className={styles.text}>{message}</p>
				</div>
				<div className={styles.actions}>
					<button className={styles.rejectBtn} onClick={onReject}>
						Reject
					</button>
					<button className={styles.acceptBtn} onClick={onAccept}>
						Accept
					</button>
				</div>
			</div>
		</div>
	);
};

export default PopUpNotification;

