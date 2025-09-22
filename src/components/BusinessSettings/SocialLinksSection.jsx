import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/LandingPageSettingsSection.module.css';
import { listSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '../../services/api';
import { toast } from 'react-toastify';

const emptyLink = { id:null, name:'', url:'', icon:null, is_active:true };

const SocialLinksSection = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyLink);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);
  const [editingId, setEditingId] = useState(null);

  const loadLinks = async () => {
    setLoading(true);
    try {
      const res = await listSocialLinks();
      setLinks(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error('Failed to load social links');
    } finally { setLoading(false); }
  };

  useEffect(() => { loadLinks(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) { setForm(prev=>({...prev, icon:file})); setPreview(URL.createObjectURL(file)); }
  };

  const resetForm = () => {
    setForm(emptyLink); setPreview(null); setEditingId(null); if (fileRef.current) fileRef.current.value='';
  };

  const handleEdit = (link) => {
    setEditingId(link.id);
    setForm({ id:link.id, name:link.name||'', url:link.url||'', icon:null, is_active:link.is_active });
    setPreview(link.icon || null); if (fileRef.current) fileRef.current.value='';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.name.trim() || !form.url.trim()) { toast.warning('Name & URL required'); return; }
    setSubmitting(true);
    try {
      if (editingId) {
        const payload = { ...form };
        if (!payload.icon) delete payload.icon;
        await updateSocialLink(editingId, payload);
        toast.success('Social link updated');
      } else {
        await createSocialLink(form);
        toast.success('Social link created');
      }
      await loadLinks();
      resetForm();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.detail || 'Save failed';
      toast.error(msg);
    } finally { setSubmitting(false); }
  };

  const handleToggleActive = async (link) => {
    try {
      await updateSocialLink(link.id, { is_active: !link.is_active });
      setLinks(ls => ls.map(l => l.id === link.id ? { ...l, is_active: !l.is_active } : l));
    } catch { toast.error('Toggle failed'); }
  };

  const handleDelete = async (link) => {
    if (!window.confirm('Delete this social link?')) return;
    try { await deleteSocialLink(link.id); setLinks(ls => ls.filter(l => l.id !== link.id)); toast.success('Deleted'); }
    catch { toast.error('Delete failed'); }
  };

  return (
    <div className={styles['social-root']}>
      <div className={styles['social-header']}>
        <h2 className={styles['social-title']}>Social Links</h2>
        {editingId && <button type="button" className={styles['btn-secondary']} onClick={resetForm}>Add New</button>}
      </div>
      <form onSubmit={handleSubmit} className={styles['social-form']}>
        <div className={styles['social-grid']}>
          <div className={styles['form-field']}>
            <label>Name *</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Facebook" />
          </div>
          <div className={styles['form-field']}>
            <label>URL *</label>
            <input name="url" value={form.url} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className={styles['form-field']}>
            <label style={{ fontSize:14, fontWeight:600, color:'#222', marginBottom:6 }}>Active</label>
            <div className={styles['active-inline']}>
              <label className={styles['mini-switch']}>
                <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
                <span className={styles['mini-slider']}></span>
              </label>
            </div>
          </div>
          <div className={styles['form-field']}>
            <label>Icon {editingId ? '(optional)' : ''}</label>
            <input type="file" ref={fileRef} accept="image/*" onChange={handleFile} />
            {preview && <div className={styles['image-preview-wrap']}><img src={preview} alt="icon" className={styles['image-preview']} /></div>}
          </div>
        </div>
        <div className={styles['form-actions']}>
          <button type="button" className={styles['btn-secondary']} onClick={resetForm}>Reset</button>
          <button type="submit" className={styles['btn-primary']} disabled={submitting}>{submitting ? 'Saving...' : (editingId ? 'Update' : 'Create')}</button>
        </div>
      </form>

      <div className={styles['social-list-section']}>
        <div className={styles['list-header']}>
          <h3>Existing Links</h3>
          <span className={styles['count-badge']}>{links.length}</span>
        </div>
        {loading ? <div className={styles['loading']}>Loading...</div> : (
          links.length ? (
            <div className={styles['social-cards-grid']}>
              {links.map(link => (
                <div key={link.id} className={styles['social-card']}>
                  <div className={styles['social-card-icon-wrap']}>
                    {link.icon ? <img src={link.icon} alt={link.name} /> : <div className={styles['placeholder']}>No Icon</div>}
                    <span className={`${styles['status-pill']} ${link.is_active ? styles['active'] : styles['inactive']}`}>{link.is_active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className={styles['social-card-body']}>
                    <h4 className={styles['social-card-title']}>{link.name}</h4>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className={styles['social-url']}>{link.url}</a>
                  </div>
                  <div className={styles['social-card-footer']}>
                    <button type="button" className={styles['btn-small']} onClick={() => handleEdit(link)}>Edit</button>
                    <button type="button" className={styles['btn-small']} onClick={() => handleToggleActive(link)}>{link.is_active ? 'Disable' : 'Enable'}</button>
                    <button type="button" className={styles['btn-small']} style={{ background:'#ff4d4f' }} onClick={() => handleDelete(link)}>Del</button>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className={styles['empty']}>No social links.</div>
        )}
      </div>
    </div>
  );
};

export default SocialLinksSection;
