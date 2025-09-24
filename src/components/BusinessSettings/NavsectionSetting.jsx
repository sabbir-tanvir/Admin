import React, { useEffect, useState, useCallback } from 'react';
import { listTopNavItems, createTopNavItem, updateTopNavItem, deleteTopNavItem } from '../../services/api';
import styles from '../../styles/components/NavsectionSetting.module.css';

// Utility to split links input by newline or comma into trimmed array (backend expects string? Provided spec shows single link field.)
// Here we treat link as single string; keep parser in case of future multi-link support.

const emptyForm = { id: null, title: '', icon_class: '', image_url: '', link: '', position: 'left', is_active: true };

function NavsectionSetting() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all | left | right

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await listTopNavItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.response?.data?.detail || e.message || 'Failed to load nav items');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const resetForm = () => setForm(emptyForm);

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title || '',
      icon_class: item.icon_class || '',
      image_url: item.image_url || '',
      link: item.link || '',
      position: item.position || 'left',
      is_active: !!item.is_active
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!form.title?.trim()) return setError('Title is required');
    if (!form.link?.trim()) return setError('Link is required');
    setSubmitting(true);
    setError(null);
    try {
      if (form.id) {
        await updateTopNavItem(form.id, {
          title: form.title,
          icon_class: form.icon_class,
          image_url: form.image_url,
          link: form.link,
          position: form.position,
          is_active: form.is_active
        });
      } else {
        await createTopNavItem({
          title: form.title,
          icon_class: form.icon_class,
          image_url: form.image_url,
          link: form.link,
          position: form.position,
          is_active: form.is_active
        });
      }
      await fetchItems();
      resetForm();
    } catch (e) {
      setError(e?.response?.data?.detail || e.message || 'Save failed');
    } finally {
      setSubmitting(false);
    }
  };

  const activateItem = async (item) => {
    // Enforce single active per position (left/right) for cleaner navbar logic.
    try {
      if (!item.is_active) {
        // Deactivate others in same position optimistically
        setItems(prev => prev.map(p => p.position === item.position ? { ...p, is_active: p.id === item.id } : p));
        await updateTopNavItem(item.id, { is_active: true });
        // Deactivate others server-side (if backend auto-handles, this is harmless)
        const same = items.filter(p => p.position === item.position && p.id !== item.id && p.is_active);
        await Promise.all(same.map(p => updateTopNavItem(p.id, { is_active: false }).catch(() => {})));
        fetchItems();
      } else {
        // Allow deactivating (optional). If you want always one active, remove this block.
        setItems(prev => prev.map(p => p.id === item.id ? { ...p, is_active: false } : p));
        await updateTopNavItem(item.id, { is_active: false });
      }
    } catch {
      setError('Activation failed');
      fetchItems();
    }
  };

  const removeItem = async (item) => {
    if (!window.confirm('Delete this nav item?')) return;
    try {
      await deleteTopNavItem(item.id);
      setItems(prev => prev.filter(p => p.id !== item.id));
    } catch {
      setError('Delete failed');
    }
  };

  const filtered = items.filter(i => filter === 'all' || i.position === filter);
  const leftActive = items.find(i => i.position === 'left' && i.is_active);
  const rightActive = items.find(i => i.position === 'right' && i.is_active);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Navbar Section Settings</h2>
      <p className={styles.subtitle}>Manage top navigation items. Enforce at most one active per side for clean layout.</p>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={submitForm}>
        <div className={styles.formRow}> 
          <label className={styles.label}>Title *
            <input className={styles.input} value={form.title} onChange={e => handleChange('title', e.target.value)} placeholder="Title" />
          </label>
          <label className={styles.label}>Icon Class
            <input className={styles.input} value={form.icon_class} onChange={e => handleChange('icon_class', e.target.value)} placeholder="e.g. fa-solid fa-star" />
          </label>
        </div>
        <div className={styles.formRow}>
          <label className={styles.label}>Image URL
            <input className={styles.input} value={form.image_url} onChange={e => handleChange('image_url', e.target.value)} placeholder="https://..." />
          </label>
          <label className={styles.label}>Link *
            <input className={styles.input} value={form.link} onChange={e => handleChange('link', e.target.value)} placeholder="https://..." />
          </label>
        </div>
        <div className={styles.formRow}>
          <label className={styles.label}>Position
            <select className={styles.select} value={form.position} onChange={e => handleChange('position', e.target.value)}>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
          <label className={styles.checkboxLabel}>
            <input type="checkbox" checked={form.is_active} onChange={e => handleChange('is_active', e.target.checked)} /> Active
          </label>
        </div>
        <div className={styles.actions}>
          {form.id && <button type="button" className={styles.secondaryBtn} onClick={resetForm}>Cancel Edit</button>}
          <button disabled={submitting} className={styles.primaryBtn}>{submitting ? 'Saving...' : form.id ? 'Update Item' : 'Add Item'}</button>
        </div>
      </form>

      <div className={styles.filterBar}>
        <div className={styles.filterButtons}>
          {['all','left','right'].map(f => (
            <button key={f} className={filter === f ? styles.filterActive : styles.filterBtn} onClick={() => setFilter(f)} type="button">{f.charAt(0).toUpperCase()+f.slice(1)}</button>
          ))}
        </div>
        <div className={styles.activeSummary}>
          <span>Left Active: {leftActive ? leftActive.title : 'None'}</span>
          <span>Right Active: {rightActive ? rightActive.title : 'None'}</span>
        </div>
      </div>

      {loading ? <div className={styles.loading}>Loading...</div> : (
        <div className={styles.grid}>
          {filtered.length === 0 && <div className={styles.empty}>No items</div>}
          {filtered.map(item => (
            <div key={item.id} className={styles.card + ' ' + (item.is_active ? styles.active : '')}>
              <div className={styles.cardHead}>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <span className={styles.badge}>{item.position}</span>
              </div>
              {item.icon_class && <div className={styles.metaRow}><strong>Icon:</strong> <code>{item.icon_class}</code></div>}
              {item.image_url && <div className={styles.metaRow}><strong>Image URL:</strong> <a href={item.image_url} target="_blank" rel="noreferrer">open</a></div>}
              <div className={styles.metaRow}><strong>Link:</strong> <a href={item.link} target="_blank" rel="noreferrer">{item.link}</a></div>
              <div className={styles.metaRow}><strong>Status:</strong> {item.is_active ? 'Active' : 'Inactive'}</div>
              <div className={styles.cardActions}>
                <button type="button" className={styles.smallBtn} onClick={() => handleEdit(item)}>Edit</button>
                <button type="button" className={styles.smallBtn} onClick={() => activateItem(item)}>{item.is_active ? 'Deactivate' : 'Activate'}</button>
                <button type="button" className={styles.dangerBtn} onClick={() => removeItem(item)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NavsectionSetting;