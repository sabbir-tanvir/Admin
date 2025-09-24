import React, { useEffect, useRef, useState } from 'react';
import styles from '../../styles/components/LandingPageSettingsSection.module.css';
import { listHeroSlides, createHeroSlide, updateHeroSlide, listWhyChooseUs, createWhyChooseUs, updateWhyChooseUs } from '../../services/api';
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
  // Why Choose Us state
  const [whyItems, setWhyItems] = useState([]);
  const [whyLoading, setWhyLoading] = useState(false);
  const [whySubmitting, setWhySubmitting] = useState(false);
  const [whyForm, setWhyForm] = useState({ id:null, title:'', Big_image:null, preview:null, is_active:true });
  const whyFileRef = useRef(null);
  const [whyEditingId, setWhyEditingId] = useState(null);

  const loadSlides = async () => {
    setLoading(true);
    try {
      const res = await listHeroSlides();
      setSlides(Array.isArray(res.data) ? res.data : []);
    } catch {
      toast.error('Failed to load slides');
    } finally { setLoading(false); }
  };

  const loadWhy = async () => {
    setWhyLoading(true);
    try {
      const res = await listWhyChooseUs();
      setWhyItems(Array.isArray(res.data) ? res.data : []);
    } catch { /* silent */ }
    finally { setWhyLoading(false); }
  };

  useEffect(() => { loadSlides(); loadWhy(); }, []);

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

  // Why Choose Us handlers
  const resetWhyForm = () => {
    setWhyForm({ id:null, title:'', Big_image:null, preview:null, is_active:true });
    setWhyEditingId(null);
    if (whyFileRef.current) whyFileRef.current.value='';
  };

  const handleWhyFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setWhyForm(p => ({ ...p, Big_image:f, preview:URL.createObjectURL(f) }));
  };

  const handleWhyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWhyForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const editWhy = (item) => {
    setWhyEditingId(item.id);
    setWhyForm({ id:item.id, title:item.title||'', Big_image:null, preview:item.Big_image||null, is_active:item.is_active });
    if (whyFileRef.current) whyFileRef.current.value='';
  };

  const submitWhy = async (e) => {
    e.preventDefault();
    if (!whyForm.title.trim()) { toast.warning('Title required'); return; }
    setWhySubmitting(true);
    try {
      if (whyEditingId) {
        const payload = { title:whyForm.title, is_active:whyForm.is_active };
        if (whyForm.Big_image) payload.Big_image = whyForm.Big_image;
        await updateWhyChooseUs(whyEditingId, payload);
        toast.success('Why item updated');
      } else {
        await createWhyChooseUs({ title:whyForm.title, Big_image:whyForm.Big_image, is_active:whyForm.is_active });
        toast.success('Why item created');
      }
      await loadWhy();
      resetWhyForm();
    } catch (err) { toast.error(err?.response?.data?.detail || 'Save failed'); }
    finally { setWhySubmitting(false); }
  };

  const activateWhy = async (id) => {
    const current = whyItems.find(w => w.is_active);
    if (current?.id === id) return;
    try {
      setWhyItems(prev => prev.map(w => ({ ...w, is_active: w.id === id })));
      await updateWhyChooseUs(id, { is_active:true });
      const others = whyItems.filter(w => w.id !== id && w.is_active);
      for (const o of others) { try { await updateWhyChooseUs(o.id, { is_active:false }); } catch {/* ignore */} }
      toast.info('Activated');
    } catch { toast.error('Activate failed'); loadWhy(); }
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
      {/* Why Choose Us Manager */}
      <div className={styles['list-section']}> 
        <div className={styles['list-header']} style={{ marginBottom:20 }}>
          <h3 style={{ margin:0 }}>Why Choose Us</h3>
          <span className={styles['count-badge']}>{whyItems.length}</span>
        </div>
        <form onSubmit={submitWhy} className={styles['hero-form']} style={{ marginBottom:24, padding:16 }}>
          <div style={{ display:'grid', gap:18, gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))' }}>
            <div className={styles['form-field']}> 
              <label>Title *</label>
              <input name="title" value={whyForm.title} onChange={handleWhyChange} placeholder="Fast Delivery" />
            </div>
            <div className={styles['form-field']}> 
              <label style={{ fontSize:14, fontWeight:600, color:'#222', marginBottom:6 }}>Active</label>
              <div className={styles['active-inline']}> 
                <label className={styles['mini-switch']}>
                  <input type="checkbox" name="is_active" checked={whyForm.is_active} onChange={handleWhyChange} />
                  <span className={styles['mini-slider']}></span>
                </label>
              </div>
            </div>
            <div className={styles['form-field']}> 
              <label>Image {whyEditingId ? '(optional)' : '(required)'} </label>
              <input type="file" ref={whyFileRef} accept="image/*" onChange={handleWhyFile} />
              {whyForm.preview && <div className={styles['image-preview-wrap']}><img src={whyForm.preview} alt="why" className={styles['image-preview']} /></div>}
            </div>
          </div>
          <div className={styles['form-actions']} style={{ marginTop:12 }}> 
            {whyEditingId && <button type="button" className={styles['btn-secondary']} onClick={resetWhyForm}>Add New</button>}
            <button type="submit" className={styles['btn-primary']} disabled={whySubmitting}>{whySubmitting ? 'Saving...' : (whyEditingId ? 'Update' : 'Create')}</button>
          </div>
        </form>
        {whyLoading ? <div className={styles['loading']}>Loading...</div> : (
          whyItems.length ? (
            <div className={styles['cards-grid']}>
              {whyItems.map(item => (
                <div key={item.id} className={styles['slide-card']}> 
                  <div className={styles['card-image-wrap']} style={{ height:140 }}>
                    {item.Big_image ? <img src={item.Big_image} alt={item.title} /> : <div className={styles['placeholder']}>No Image</div>}
                    <span className={`${styles['status-pill']} ${item.is_active ? styles['active'] : styles['inactive']}`}>{item.is_active ? 'Active' : 'Inactive'}</span>
                  </div>
                  <div className={styles['card-body']}> 
                    <h4 className={styles['card-title']}>{item.title}</h4>
                  </div>
                  <div className={styles['card-footer']} style={{ display:'flex', gap:8 }}> 
                    <button type="button" className={styles['btn-small']} onClick={() => editWhy(item)}>Edit</button>
                    <button type="button" className={styles['btn-small']} style={{ background:item.is_active ? '#9ca3af' : '#6c63ff' }} onClick={() => activateWhy(item.id)}>{item.is_active ? 'Active' : 'Activate'}</button>
                  </div>
                </div>
              ))}
            </div>
          ) : <div className={styles['empty']}>No entries yet.</div>
        )}
      </div>
    </div>
  );
};

export default LandingPageSettingsSection;