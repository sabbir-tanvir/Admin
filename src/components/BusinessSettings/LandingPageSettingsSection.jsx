import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/LandingPageSettingsSection.module.css';
import { listHeroSlides, createHeroSlide, updateHeroSlide } from '../../services/api';
import { toast } from 'react-toastify';

const emptySlide = {
  id: null,
  title: '',
  subtitle: '',
  description: '',
  button_text: '',
  button_url: '',
  is_active: true,
  background_image: null,
};

const LandingPageSettingsSection = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(emptySlide);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);
  const [editingId, setEditingId] = useState(null);

  const loadSlides = async () => {
    setLoading(true);
    try {
      const res = await listHeroSlides();
      setSlides(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error('Failed to load slides');
    } finally { setLoading(false); }
  };

  useEffect(() => { loadSlides(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, background_image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm(emptySlide);
    setPreview(null);
    setEditingId(null);
    if (fileRef.current) fileRef.current.value='';
  };

  const handleEdit = (slide) => {
    setEditingId(slide.id);
    setForm({
      id: slide.id,
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      description: slide.description || '',
      button_text: slide.button_text || '',
      button_url: slide.button_url || '',
      is_active: slide.is_active,
      background_image: null, // new upload optional
    });
    setPreview(slide.background_image || null);
    if (fileRef.current) fileRef.current.value='';
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.title.trim()) { toast.warning('Title required'); return; }
    setSubmitting(true);
    try {
      if (editingId) {
        const payload = { ...form };
        if (!payload.background_image) delete payload.background_image; // don't send empty
        await updateHeroSlide(editingId, payload);
        toast.success('Slide updated');
      } else {
        await createHeroSlide(form);
        toast.success('Slide created');
      }
      await loadSlides();
      resetForm();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.detail || 'Save failed';
      toast.error(msg);
    } finally { setSubmitting(false); }
  };

  return (
    <div className={styles['hero-root']}>
      <div className={styles['hero-header']}>
        <h2 className={styles['hero-title']}>Hero Slider Manager</h2>
        {editingId && (
          <button type="button" className={styles['btn-secondary']} onClick={resetForm}>Add New</button>
        )}
      </div>
      <form onSubmit={onSubmit} className={styles['hero-form']}>
        <div className={styles['form-grid']}>
          <div className={styles['form-field']}>
            <label>Title *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Slide title" />
          </div>
          <div className={styles['form-field']}>
            <label>Subtitle</label>
            <input name="subtitle" value={form.subtitle} onChange={handleChange} placeholder="Subtitle" />
          </div>
          <div className={styles['form-field']}>
            <label>Button Text</label>
            <input name="button_text" value={form.button_text} onChange={handleChange} placeholder="Shop Now" />
          </div>
          <div className={styles['form-field']}>
            <label>Button URL</label>
            <input name="button_url" value={form.button_url} onChange={handleChange} placeholder="https://..." />
          </div>
          <div className={styles['form-field']} style={{ gridColumn: 'span 2' }}>
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Short description" />
          </div>
          <div className={styles['form-field']}>
            <label style={{ fontSize:14, fontWeight:600, color:'#222', marginBottom:4 }}>Active</label>
            <div className={styles['active-inline']}>
              <label className={styles['mini-switch']}>
                <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
                <span className={styles['mini-slider']}></span>
              </label>
              <span style={{ fontSize:12, color:'#555' }}>{form.is_active ? 'Visible in slider' : 'Hidden'}</span>
            </div>
          </div>
          <div className={styles['form-field']}>
            <label>Background Image {editingId ? '(leave empty to keep existing)' : ''}</label>
            <input type="file" ref={fileRef} accept="image/*" onChange={handleFile} />
            {preview && (
              <div className={styles['image-preview-wrap']}>
                <img src={preview} alt="preview" className={styles['image-preview']} />
              </div>
            )}
          </div>
        </div>
        <div className={styles['form-actions']}>
          <button type="button" className={styles['btn-secondary']} onClick={resetForm}>Reset</button>
          <button type="submit" className={styles['btn-primary']} disabled={submitting}>{submitting ? 'Saving...' : (editingId ? 'Update Slide' : 'Create Slide')}</button>
        </div>
      </form>

      <div className={styles['list-section']}>
        <div className={styles['list-header']}>
          <h3>Existing Slides</h3>
          <span className={styles['count-badge']}>{slides.length}</span>
        </div>
        {loading ? <div className={styles['loading']}>Loading...</div> : (
          slides.length ? (
            <div className={styles['cards-grid']}>
              {slides.map(slide => (
                <div key={slide.id} className={styles['slide-card']}>
                  <div className={styles['card-image-wrap']}>
                    {slide.background_image ? <img src={slide.background_image} alt={slide.title} /> : <div className={styles['placeholder']}>No Image</div>}
                    <span className={`${styles['status-pill']} ${slide.is_active ? styles['active'] : styles['inactive']}`}>{slide.is_active ? 'Active':'Inactive'}</span>
                  </div>
                  <div className={styles['card-body']}>
                    <h4 className={styles['card-title']}>{slide.title}</h4>
                    {slide.subtitle && <div className={styles['card-sub']}>{slide.subtitle}</div>}
                    {slide.description && <p className={styles['card-desc']}>{slide.description}</p>}
                    {(slide.button_text || slide.button_url) && (
                      <div className={styles['card-btn-info']}>
                        <span className={styles['btn-label']}>{slide.button_text || 'Button'}</span>
                        {slide.button_url && <a href={slide.button_url} target="_blank" rel="noopener noreferrer" className={styles['btn-url']}>Visit</a>}
                      </div>
                    )}
                  </div>
                  <div className={styles['card-footer']}>
                    <button type="button" className={styles['btn-small']} onClick={() => handleEdit(slide)}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className={styles['empty']}>No slides available.</div>
        )}
      </div>
    </div>
  );
};

export default LandingPageSettingsSection;