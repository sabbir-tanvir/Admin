import React, { useEffect, useState } from 'react';
import styles from '../styles/pages/Profile.module.css';
import { toast } from 'react-toastify';
import { getProfile, updateProfile, changePassword } from '../services/api';

const Profile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    latitude: '',
    longitude: ''
  });
  const [original, setOriginal] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState(null);
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showPw, setShowPw] = useState({ old: false, neo: false, confirm: false });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(null);

  // Load profile on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingProfile(true);
      try {
        const { data } = await getProfile();
        console.log({ data });
        
        if (mounted && data) {
          const mapped = {
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            phone_number: data.phone_number || '',
            email: data.email || '',
            latitude: (data.latitude === 0 || data.latitude) ? String(data.latitude) : '',
            longitude: (data.longitude === 0 || data.longitude) ? String(data.longitude) : ''
          };
            setFormData(mapped);
            setOriginal(mapped);
        }
      } catch (e) {
        setProfileMessage({ type: 'error', text: e?.response?.data?.detail || 'Failed to load profile' });
      } finally {
        setLoadingProfile(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const diffObject = (current, base) => {
    const out = {};
    Object.entries(current || {}).forEach(([k, v]) => {
      if (!base || base[k] !== v) {
        if (v !== '' && v !== null && v !== undefined) out[k] = v;
      }
    });
    return out;
  };

  const handleSaveBasicInfo = async () => {
    if (!original) return; // still loading
    const payload = diffObject(formData, original);
    if (Object.keys(payload).length === 0) {
      setProfileMessage({ type: 'info', text: 'No changes to save.' });
      return;
    }
    // Convert latitude/longitude BEFORE sending to API
    if (payload.latitude !== undefined) {
      const n = parseFloat(payload.latitude);
      if (!isNaN(n)) payload.latitude = n; else delete payload.latitude;
    }
    if (payload.longitude !== undefined) {
      const n = parseFloat(payload.longitude);
      if (!isNaN(n)) payload.longitude = n; else delete payload.longitude;
    }
    setSavingProfile(true);
    setProfileMessage(null);
    try {
      const { data } = await updateProfile(payload);
      const updated = {
        first_name: data.first_name || '',
        last_name: data.last_name || '',
        phone_number: data.phone_number || '',
          email: data.email || '',
          latitude: (data.latitude === 0 || data.latitude) ? String(data.latitude) : '',
          longitude: (data.longitude === 0 || data.longitude) ? String(data.longitude) : ''
      };
      setFormData(updated);
      setOriginal(updated);
      setProfileMessage({ type: 'success', text: 'Profile updated successfully.' });
      toast.success('Profile updated successfully');
    } catch (e) {
      const err = e?.response?.data;
      let msg = 'Failed to update profile';
      if (err && typeof err === 'object') {
        msg = Object.entries(err).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(',') : v}`).join(' | ');
      }
      setProfileMessage({ type: 'error', text: msg });
      toast.error(msg);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePassword = async () => {
    setPasswordMessage(null);
    setChangingPassword(true);
    try {
      const { data } = await changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
        confirm_password: passwordData.confirm_password
      });
      const successText = data?.detail || 'Password updated successfully.';
      setPasswordMessage({ type: 'success', text: successText });
      setPasswordData({ old_password: '', new_password: '', confirm_password: '' });
      toast.success(successText);
    } catch (e) {
      const errData = e?.response?.data;
      let backendMsg = '';
      if (typeof errData === 'string') {
        backendMsg = errData;
      } else if (errData?.detail) {
        backendMsg = errData.detail;
      } else if (errData && typeof errData === 'object') {
        backendMsg = Object.entries(errData)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(',') : v}`)
          .join(' | ');
      }
      if (!backendMsg) backendMsg = 'Password change failed';
      setPasswordMessage({ type: 'error', text: backendMsg });
      toast.error(backendMsg);
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
            {/* Top Section - Avatar */}
            <div className={styles.profileTopSection}>
              <div className={styles.profileAvatarSection}>
                <div className={styles.profileAvatarContainer}>
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Admin Profile"
                    className={styles.profileAvatarImage}
                  />
                  <button className={styles.editAvatarBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Middle Section - Basic Information */}
            <div className={styles.profileMiddleSection}>
              <h3 className={styles.sectionTitle}>Basic Information</h3>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Full name</label>
                  <div className={styles.formRowInputs}>
                    <input
                      type="text"
                      name="first_name"
                      placeholder="First name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={loadingProfile || savingProfile}
                    />
                    <input
                      type="text"
                      name="last_name"
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={loadingProfile || savingProfile}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    disabled={loadingProfile || savingProfile}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    disabled={loadingProfile || savingProfile}
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Location (Lat / Long)</label>
                  <div className={styles.formRowInputs}>
                    <input
                      type="number"
                      step="0.000001"
                      name="latitude"
                      placeholder="Latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={loadingProfile || savingProfile}
                    />
                    <input
                      type="number"
                      step="0.000001"
                      name="longitude"
                      placeholder="Longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      disabled={loadingProfile || savingProfile}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button className={styles.saveBtn} onClick={handleSaveBasicInfo} disabled={savingProfile || loadingProfile}>
                  {savingProfile && <span className={styles.spinner} />}
                  {savingProfile ? 'Saving...' : 'Save'}
                </button>
              </div>
              {profileMessage && (
                <div className={[
                  styles.statusMsg,
                  profileMessage.type === 'error' ? styles.statusError :
                  profileMessage.type === 'success' ? styles.statusSuccess : styles.statusInfo
                ].join(' ')}>{profileMessage.text}</div>
              )}
            </div>

            {/* Bottom Section - Password */}
            <div className={styles.profileBottomSection}>
              <h3 className={styles.sectionTitle}>Change Your Password</h3>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Current Password</label>
                  <div className={styles.pwWrapper}>
                    <input
                      type={showPw.old ? 'text' : 'password'}
                      name="old_password"
                      placeholder="Current password"
                      value={passwordData.old_password}
                      onChange={handlePasswordChange}
                      className={styles.formInput}
                      disabled={changingPassword}
                    />
                    <button type="button" aria-label={showPw.old ? 'Hide password' : 'Show password'} className={styles.pwIconBtn} onClick={() => setShowPw(s => ({ ...s, old: !s.old }))} disabled={changingPassword}>
                      {showPw.old ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.83 21.83 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>New Password</label>
                  <div className={styles.pwWrapper}>
                    <input
                      type={showPw.neo ? 'text' : 'password'}
                      name="new_password"
                      placeholder="New password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      className={styles.formInput}
                      disabled={changingPassword}
                    />
                    <button type="button" aria-label={showPw.neo ? 'Hide password' : 'Show password'} className={styles.pwIconBtn} onClick={() => setShowPw(s => ({ ...s, neo: !s.neo }))} disabled={changingPassword}>
                      {showPw.neo ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.83 21.83 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Confirm Password</label>
                  <div className={styles.pwWrapper}>
                    <input
                      type={showPw.confirm ? 'text' : 'password'}
                      name="confirm_password"
                      placeholder="Confirm password"
                      value={passwordData.confirm_password}
                      onChange={handlePasswordChange}
                      className={styles.formInput}
                      disabled={changingPassword}
                    />
                    <button type="button" aria-label={showPw.confirm ? 'Hide password' : 'Show password'} className={styles.pwIconBtn} onClick={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))} disabled={changingPassword}>
                      {showPw.confirm ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-6.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a21.83 21.83 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formActions}>
                <button className={styles.saveBtn} onClick={handleSavePassword} disabled={changingPassword}>
                  {changingPassword && <span className={styles.spinner} />}
                  {changingPassword ? 'Updating...' : 'Save'}
                </button>
              </div>
              {passwordMessage && (
                <div className={[
                  styles.statusMsg,
                  passwordMessage.type === 'error' ? styles.statusError :
                  passwordMessage.type === 'success' ? styles.statusSuccess : styles.statusInfo
                ].join(' ')}>{passwordMessage.text}</div>
              )}
        </div>
      </div>
    </div>
  );
};

export default Profile;