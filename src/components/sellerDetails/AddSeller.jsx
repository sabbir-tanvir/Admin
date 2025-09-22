import React, { useState } from 'react';
import styles from '../../styles/sellerDetails/AddSeller.module.css';
import { registerUser } from '../../services/api';
import { toast } from 'react-toastify';

function AddSeller() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    latitude: '',
    longitude: '',
    profileImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setForm(prev => ({ ...prev, profileImage: file }));
  };

  const reset = () => setForm({ username:'', email:'', password:'', phone_number:'', latitude:'', longitude:'', profileImage:null });

  const handleSubmit = async () => {
    if (submitting) return;
    if (!form.username.trim() || !form.email.trim() || !form.password.trim() || !form.phone_number.trim()) {
      toast.warning('Username, Email, Password & Phone are required');
      return;
    }
    const payload = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      role: 'seller',
      phone_number: form.phone_number.trim(),
      latitude: form.latitude === '' ? null : parseFloat(form.latitude),
      longitude: form.longitude === '' ? null : parseFloat(form.longitude),
    };
    setSubmitting(true);
    try {
      await registerUser(payload);
      toast.success('Seller created');
      reset();
    } catch (err) {
      console.error('Register seller failed', err);
      let msg = err.response?.data?.detail;
      if (!msg && err.response?.data) {
        const data = err.response.data;
        const firstKey = Object.keys(data)[0];
        const firstVal = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
        msg = `${firstKey}: ${firstVal}`;
      }
      toast.error(msg || 'Failed to create seller');
    } finally { setSubmitting(false); }
  };

  return (
    <div className={styles['add-seller-page']}>
      <div className={styles['add-seller-container']}>
        <h1 className={styles['page-title']}>Add a Seller</h1>
        <div className={styles['form-content']}>
          <div className={styles['form-left']}>
            <div className={styles['image-upload-section']}>
              <div className={styles['image-preview']}>
                {form.profileImage ? (
                  <img src={URL.createObjectURL(form.profileImage)} alt="Profile preview" className={styles['preview-image']} />
                ) : (
                  <div className={styles['placeholder-image']}>
                    <img src="/api/placeholder/200/250" alt="Default profile" className={styles['default-image']} />
                  </div>
                )}
              </div>
              <label htmlFor="image-upload" className={styles['upload-button']}>
                Add a picture
                <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} style={{ display:'none' }} />
              </label>
            </div>
          </div>
          <div className={styles['form-right']}>
            <div className={styles['form-section']}>
              <h3 className={styles['section-title']}>Account</h3>
              <div className={styles['input-row']}>
                <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className={styles['form-input']} />
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className={styles['form-input']} />
              </div>
            </div>
            <div className={styles['form-section']}>
              <div className={styles['input-row']}>
                <div style={{ position:'relative' }}>
                  <input type={showPassword ? 'text':'password'} name="password" value={form.password} onChange={handleChange} placeholder="Password" className={styles['form-input']} />
                  <button type="button" onClick={()=>setShowPassword(s=>!s)} className={styles['pw-toggle']}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone" className={styles['form-input']} />
              </div>
            </div>
            <div className={styles['form-section']}>
              <div className={styles['input-row']}>
                <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude" className={styles['form-input']} />
                <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude" className={styles['form-input']} />
              </div>
            </div>
            <div className={styles['form-actions']}>
              <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} disabled={submitting} onClick={handleSubmit}>{submitting ? 'Creating...' : 'Add'}</button>
              <button type="button" className={`${styles.btn} ${styles['btn-secondary']}`} onClick={reset}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSeller;
