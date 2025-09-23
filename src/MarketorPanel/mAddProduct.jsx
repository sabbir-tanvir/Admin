import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MarketorPanel/mAddProduct.module.css';
import { createProductRequest, listBrands, createBrand, listCategories, createCategory } from '../services/api.js';
import { toast } from 'react-toastify';

const MarketorProductAdd = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        description: '',
        category: '', // category id
        price: '',
        sku: '',
        brand: '', // brand id
        imported_from: '',
        stock: '',
        is_imported: false,
        rating: '',
    });
    // Dynamic tag input list (each element is a tag string). Start with one empty input for UX.
    const [tagInputs, setTagInputs] = useState(['']);
    const [brands, setBrands] = useState([]); // {id,name}
    const [categories, setCategories] = useState([]); // {id,name}
    // Tags now handled as raw names only (backend auto-creates / associates)
    const [creatingBrand, setCreatingBrand] = useState(false);
    const [newBrandName, setNewBrandName] = useState('');
    const [creatingCategory, setCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategorySlug, setNewCategorySlug] = useState('');
    const [newCategoryImage, setNewCategoryImage] = useState(null);
    const [newCategoryImagePreview, setNewCategoryImagePreview] = useState(null);
    const [newCategoryPopular, setNewCategoryPopular] = useState(false);

    const [newBrandSlug, setNewBrandSlug] = useState('');
    const [newBrandImage, setNewBrandImage] = useState(null);
    const [newBrandImagePreview, setNewBrandImagePreview] = useState(null);
    const [preview, setPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [galleryFiles, setGalleryFiles] = useState([]); // actual File objects
    const [dragMain, setDragMain] = useState(false);
    const [dragGallery, setDragGallery] = useState(false);
    const mainInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    // Tag input handlers
    const handleTagChange = (idx, value) => {
        setTagInputs(prev => prev.map((t, i) => i === idx ? value : t));
    };
    const addTagField = () => {
        setTagInputs(prev => [...prev, '']);
    };
    const removeTagField = (idx) => {
        setTagInputs(prev => prev.filter((_, i) => i !== idx));
        if (tagInputs.length === 1) setTagInputs(['']);
    };

    const handleImage = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        } else setPreview(null);
    };

    const handleGallery = (e) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        const urls = files.map(f => URL.createObjectURL(f));
        setGalleryPreviews(prev => [...prev, ...urls]);
        setGalleryFiles(prev => [...prev, ...files]);
    };

    // Drag and drop handlers
    const onDropMain = (e) => {
        e.preventDefault();
        setDragMain(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setPreview(URL.createObjectURL(file));
        }
    };
    const onDropGallery = (e) => {
        e.preventDefault();
        setDragGallery(false);
        const files = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('image/'));
        if (files.length) {
            setGalleryPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
            setGalleryFiles(prev => [...prev, ...files]);
        }
    };
    const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleRemoveGallery = (idx) => {
        setGalleryPreviews(prev => prev.filter((_, i) => i !== idx));
        setGalleryFiles(prev => prev.filter((_, i) => i !== idx));
    };
    const clearGallery = () => { setGalleryPreviews([]); setGalleryFiles([]); };
    const clearMain = () => { setPreview(null); };

    // Initial fetch for brands, categories, tags
    useEffect(() => {
        const load = async () => {
            try {
                const [bRes, cRes] = await Promise.all([
                    listBrands().catch(() => ({ data: [] })),
                    listCategories().catch(() => ({ data: [] })),
                ]);
                const norm = (res) => Array.isArray(res.data) ? res.data : (res.data?.results || []);
                setBrands(norm(bRes));
                setCategories(norm(cRes));
            } catch {
                console.warn('Failed to load lists');
            }
        };
        load();
    }, []);

    const handleCreateBrand = async () => {
        if (!newBrandName.trim()) return;
        try {
            const res = await createBrand({ name: newBrandName.trim(), slug: (newBrandSlug.trim() || newBrandName.trim().toLowerCase().replace(/\s+/g,'-')), image: newBrandImage, is_active: true });
            const created = res.data;
            setBrands(prev => [...prev, created]);
            setForm(f => ({ ...f, brand: String(created.id) }));
            setNewBrandName(''); setNewBrandSlug(''); setNewBrandImage(null); setNewBrandImagePreview(null);
            setCreatingBrand(false);
            toast.success('Brand created');
        } catch {
            toast.error('Failed to create brand');
        }
    };
    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            const payload = { name: newCategoryName.trim(), slug: newCategorySlug.trim() || newCategoryName.trim().toLowerCase().replace(/\s+/g,'-'), image: newCategoryImage, is_popular: newCategoryPopular };
            const res = await createCategory(payload);
            const created = res.data;
            setCategories(prev => [...prev, created]);
            setForm(f => ({ ...f, category: String(created.id) }));
            setNewCategoryName(''); setNewCategorySlug(''); setNewCategoryImage(null); setNewCategoryImagePreview(null); setNewCategoryPopular(false);
            setCreatingCategory(false);
            toast.success('Category created');
        } catch {
            toast.error('Failed to create category');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting) return;
        // Minimal required validation for JSON endpoint
        if (!form.name || !form.description || !form.category || !form.price || !form.sku || !preview) {
            toast.warning('Name, Category, Price, SKU, Description and Main Image are required');
            return;
        }
        setSubmitting(true);
        try {
            const fileFromInput = mainInputRef.current?.files?.[0] || null;
            // Collect tag names from dynamic inputs (backend handles creation/association)
            const tagNames = tagInputs.map(t => t.trim()).filter(Boolean);
            const submission = {
                name: form.name,
                sku: form.sku,
                description: form.description,
                category: form.category,
                price: form.price,
                image: fileFromInput,
                stock: form.stock,
                imported_from: form.imported_from,
                brand: form.brand || undefined,
                tags: tagNames,
                galleryImages: galleryFiles,
                rating: form.rating || undefined,
                is_imported: form.is_imported,
            };
            await createProductRequest(submission);
            toast.success('Product request submitted');
            navigate('/marketor-panel/product');
        } catch (err) {
            if (err.response) {
                console.error('Create product 400 payload:', err.response.data);
            } else {
                console.error('Create product error (no response):', err);
            }
            const data = err.response?.data;
            let msg = data?.message || data?.detail;
            if (!msg && typeof data === 'object' && data) {
                const firstKey = Object.keys(data)[0];
                const firstVal = Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey];
                msg = `${firstKey}: ${firstVal}`;
            }
            toast.error(msg || 'Failed to submit');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => navigate('/marketor-panel/product');

    return (
        <div className={styles['product-update-page']}>
            <div className={styles['product-update-wrapper']}>
                <div className={styles['product-update-header']}>
                    <h1>Add Product</h1>
                    <div className={styles['action-buttons']}>
                        <button type="button" className={styles['update-btn']} onClick={handleSubmit} disabled={submitting}>{submitting ? 'Submitting...' : 'Add'}</button>
                        <button type="button" className={styles['cancel-btn']} onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
                <form className={styles['product-update-content']} onSubmit={handleSubmit}>
                    <div className={styles['product-image-column']}>
                        <div
                            className={`${styles.uploader} ${dragMain ? styles.dragover : ''}`}
                            onDragEnter={(e) => { prevent(e); setDragMain(true); }}
                            onDragOver={prevent}
                            onDragLeave={() => setDragMain(false)}
                            onDrop={onDropMain}
                            onClick={() => mainInputRef.current?.click()}
                        >
                            {preview ? (
                                <img src={preview} alt={form.name || 'preview'} className={styles['product-image']} />
                            ) : (
                                <div className={styles['uploader-placeholder']}>Drop main image here or click to choose</div>
                            )}
                            {preview && (
                                <button type="button" className={styles['btn-clear']} onClick={(e) => { e.stopPropagation(); clearMain(); }}>Remove</button>
                            )}
                            <input ref={mainInputRef} type="file" accept="image/*" onChange={handleImage} hidden />
                        </div>

                        <div className={styles['gallery-block']}>
                            <div className={styles['gallery-header']}>
                                <span>Gallery Images</span>
                                {galleryPreviews.length > 0 && (
                                    <button type="button" className={styles['btn-link']} onClick={clearGallery}>Clear all</button>
                                )}
                            </div>
                            <div
                                className={`${styles.uploader} ${styles.small} ${dragGallery ? styles.dragover : ''}`}
                                onDragEnter={(e) => { prevent(e); setDragGallery(true); }}
                                onDragOver={prevent}
                                onDragLeave={() => setDragGallery(false)}
                                onDrop={onDropGallery}
                                onClick={() => galleryInputRef.current?.click()}
                            >
                                <div className={styles['uploader-placeholder']}>Drop multiple images or click to select</div>
                                <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGallery} hidden />
                            </div>
                            {galleryPreviews?.length > 0 && (
                                <div className={styles['thumb-grid']}>
                                    {galleryPreviews.map((src, idx) => (
                                        <div key={idx} className={styles.thumb}>
                                            <img src={src} alt={`gallery-${idx}`} />
                                            <button type="button" className={styles['thumb-remove']} onClick={() => handleRemoveGallery(idx)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles['product-form-column']}>
                        <div className={`${styles['fields-grid']} ${styles['fields-grid-3']}`}>
                            <div className={styles['form-field']}>
                                <label className={styles['name-label']}>Name</label>
                                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter product name" />
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['category-label']}>Category</label>
                                {!creatingCategory ? (
                                    <div>
                                        <select name="category" value={form.category} onChange={handleChange}>
                                            <option value="">Select category</option>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                        <button type="button" className={styles['btn-link']} style={{ marginTop: 6 }} onClick={() => setCreatingCategory(true)}>+ New Category</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        <input value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="Category name" />
                                        <input value={newCategorySlug} onChange={e => setNewCategorySlug(e.target.value)} placeholder="Slug (optional)" />
                                        <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                                            <input type="checkbox" id="cat-popular" checked={newCategoryPopular} onChange={e=>setNewCategoryPopular(e.target.checked)} />
                                            <label htmlFor="cat-popular" style={{ fontSize:12 }}>Popular</label>
                                        </div>
                                        <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                                            <input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]; setNewCategoryImage(f||null); setNewCategoryImagePreview(f?URL.createObjectURL(f):null); }} />
                                            {newCategoryImagePreview && <img src={newCategoryImagePreview} alt="cat-prev" style={{ width:70, height:70, objectFit:'cover', borderRadius:4, border:'1px solid #ddd' }} />}
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button type="button" className={styles['update-btn']} disabled={!newCategoryName.trim()} onClick={handleCreateCategory}>Create</button>
                                            <button type="button" className={styles['cancel-btn']} onClick={() => { setCreatingCategory(false); setNewCategoryName(''); setNewCategorySlug(''); setNewCategoryImage(null); setNewCategoryImagePreview(null); setNewCategoryPopular(false); }}>Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['info-label']}>Imported?</label>
                                <div style={{ display:'flex', alignItems:'center', height:'100%' }}>
                                    <input type="checkbox" name="is_imported" checked={form.is_imported} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['fields-grid']} ${styles['fields-grid-3']}`}>
                            <div className={styles['form-field']}>
                                <label className={styles['cost-label']}>Price</label>
                                <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" placeholder="e.g. 1990.00" />
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['shop-label']}>SKU</label>
                                <input name="sku" value={form.sku} onChange={handleChange} placeholder="Unique SKU" />
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['min-price-label']}>Stock</label>
                                <input name="stock" value={form.stock} onChange={handleChange} type="number" min="0" placeholder="Quantity" />
                            </div>
                        </div>
                        <div className={`${styles['fields-grid']} ${styles['fields-grid-3']}`}>
                            <div className={styles['form-field']}>
                                <label className={styles['shop-label']}>Brand</label>
                                {!creatingBrand ? (
                                    <div>
                                        <select name="brand" value={form.brand} onChange={handleChange}>
                                            <option value="">Select brand</option>
                                            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                        </select>
                                        <button type="button" className={styles['btn-link']} style={{ marginTop: 6 }} onClick={() => setCreatingBrand(true)}>+ New Brand</button>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                        <input value={newBrandName} onChange={e => setNewBrandName(e.target.value)} placeholder="Brand name" />
                                        <input value={newBrandSlug} onChange={e => setNewBrandSlug(e.target.value)} placeholder="Slug (optional)" />
                                        <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                                            <input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]; setNewBrandImage(f||null); setNewBrandImagePreview(f?URL.createObjectURL(f):null); }} />
                                            {newBrandImagePreview && <img src={newBrandImagePreview} alt="brand-prev" style={{ width:70, height:70, objectFit:'cover', borderRadius:4, border:'1px solid #ddd' }} />}
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button type="button" className={styles['update-btn']} disabled={!newBrandName.trim()} onClick={handleCreateBrand}>Create</button>
                                            <button type="button" className={styles['cancel-btn']} onClick={() => { setCreatingBrand(false); setNewBrandName(''); setNewBrandSlug(''); setNewBrandImage(null); setNewBrandImagePreview(null); }}>Cancel</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={styles['form-field']}>
                                <label className={styles['address-label']}>Imported From</label>
                                <input name="imported_from" value={form.imported_from} onChange={handleChange} placeholder="Country of origin" />
                            </div>
                            <div className={styles['form-field']} >
                                <label className={styles['info-label']}>Tags</label>
                                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                                    {tagInputs.map((val, idx) => (
                                        <div key={idx} style={{ display:'flex', gap:6 }}>
                                            <input
                                                value={val}
                                                onChange={e => handleTagChange(idx, e.target.value)}
                                                placeholder={`Tag ${idx+1}`}
                                                style={{ flex:1 }}
                                            />
                                            {tagInputs.length > 1 && (
                                                <button type="button" onClick={() => removeTagField(idx)} style={{padding:'0 10px'}} className={styles['cancel-btn']}>-</button>
                                            )}
                                            {idx === tagInputs.length -1 && (
                                                <button type="button" onClick={addTagField} style={{padding:'0 10px'}} className={styles['update-btn']}>+</button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <small style={{ color:'#555' }}>Add one tag per field. Use + to add more.</small>
                            </div>
                        </div>
                        <div className={styles['price-info-container']}>
                            <div className={styles['info-section']} style={{ width: '100%' }}>
                                <div className={styles['form-field']}>
                                    <label className={styles['info-label']}>Description</label>
                                    <textarea name="description" value={form.description} onChange={handleChange} rows="4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MarketorProductAdd;

