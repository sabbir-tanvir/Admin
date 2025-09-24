import React, { useEffect, useState, useCallback } from 'react';
import { listFooterItems, createFooterItem, updateFooterItem, listFooterWidgets, createFooterWidget, updateFooterWidget } from '../../services/api';
import styles from '../../styles/components/footerSetting.module.css';
import { toast } from 'react-toastify';
import { MdCheckCircle, MdRadioButtonUnchecked, MdEdit, MdClose } from 'react-icons/md';
import SocialLinksSection from './SocialLinksSection';

// Footer item shape: { id, left_text, right_text, links, is_active }

const emptyForm = { left_text: '', right_text: '', links: '', is_active: false };

const FooterSetting = () => {
		const [items, setItems] = useState([]); // footer base items
		const [widgets, setWidgets] = useState([]); // footer widget 4 items
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [form, setForm] = useState(emptyForm);
	const [editingId, setEditingId] = useState(null);
	const [error, setError] = useState(null);

		const load = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
				const [footerRes, widgetRes] = await Promise.all([
					listFooterItems(),
					listFooterWidgets().catch(() => ({ data: [] }))
				]);
				setItems(Array.isArray(footerRes.data) ? footerRes.data : []);
				setWidgets(Array.isArray(widgetRes.data) ? widgetRes.data : []);
		} catch (e) {
			console.error('[FooterSetting] fetch error', e);
			setError(e?.response?.data?.detail || 'Failed to load footer items');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => { load(); }, [load]);

	const onChange = (field, value) => {
		setForm(prev => ({ ...prev, [field]: value }));
	};

	const resetForm = () => {
		setForm(emptyForm);
		setEditingId(null);
	};

	const validate = () => {
		if (!form.left_text.trim()) { toast.warning('Left text is required'); return false; }
		if (!form.right_text.trim()) { toast.warning('Right text is required'); return false; }
		if (!form.links.trim()) { toast.warning('Link is required'); return false; }
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		setSubmitting(true);
		try {
			if (editingId) {
				await updateFooterItem(editingId, { ...form });
				toast.success('Footer updated');
			} else {
				await createFooterItem({ ...form, is_active: items.length === 0 ? true : form.is_active });
				toast.success('Footer item created');
			}
			resetForm();
			await load();
		} catch (e) {
			console.error('[FooterSetting] submit error', e);
			toast.error(e?.response?.data?.detail || 'Save failed');
		} finally {
			setSubmitting(false);
		}
	};

	const startEdit = (item) => {
		setEditingId(item.id);
		setForm({ left_text: item.left_text || '', right_text: item.right_text || '', links: item.links || '', is_active: item.is_active });
	};

	const cancelEdit = () => {
		resetForm();
	};

	const activate = async (id) => {
		const currentActive = items.find(i => i.is_active);
		if (currentActive?.id === id) return;
		try {
			setItems(prev => prev.map(i => ({ ...i, is_active: i.id === id })));
			await updateFooterItem(id, { is_active: true });
			// Optionally (if backend does not enforce single active) deactivate others
			const others = items.filter(i => i.id !== id && i.is_active);
			for (const o of others) { try { await updateFooterItem(o.id, { is_active: false }); } catch {/* ignore */} }
			toast.info('Activated');
		} catch (e) {
			console.error('[FooterSetting] activate error', e);
			toast.error('Activation failed');
			load();
		}
	};

		// --- Footer Widget Form State ---
		const [widgetForm, setWidgetForm] = useState({ headline:'', title:'', links:'', is_active:true });
		const [widgetEditingId, setWidgetEditingId] = useState(null);
		const [widgetSubmitting, setWidgetSubmitting] = useState(false);

		const onWidgetChange = (field, value) => setWidgetForm(p => ({ ...p, [field]: value }));
		const resetWidget = () => { setWidgetForm({ headline:'', title:'', links:'', is_active:true }); setWidgetEditingId(null); };
		const submitWidget = async (e) => {
			e.preventDefault();
			if (!widgetForm.headline.trim() || !widgetForm.title.trim() || !widgetForm.links.trim()) { toast.warning('Headline, Title & Link required'); return; }
			setWidgetSubmitting(true);
			try {
				if (widgetEditingId) {
					await updateFooterWidget(widgetEditingId, { ...widgetForm });
					toast.success('Widget updated');
				} else {
					await createFooterWidget(widgetForm);
					toast.success('Widget created');
				}
				resetWidget();
				// reload only widgets
				try {
					const widgetRes = await listFooterWidgets();
					setWidgets(Array.isArray(widgetRes.data) ? widgetRes.data : []);
				} catch {/* ignore */}
			} catch (err) {
				console.error('[FooterWidget] save error', err);
				toast.error(err?.response?.data?.detail || 'Widget save failed');
			} finally { setWidgetSubmitting(false); }
		};
		const editWidget = (w) => { setWidgetEditingId(w.id); setWidgetForm({ headline:w.headline||'', title:w.title||'', links:w.links||'', is_active:w.is_active }); };
		const activateWidget = async (id) => {
			const currentActive = widgets.find(w => w.is_active);
			if (currentActive?.id === id) return;
			try {
				setWidgets(prev => prev.map(w => ({ ...w, is_active: w.id === id })));
				await updateFooterWidget(id, { is_active:true });
				const others = widgets.filter(w => w.id !== id && w.is_active);
				for (const o of others) { try { await updateFooterWidget(o.id, { is_active:false }); } catch {/* ignore */} }
				toast.info('Widget activated');
			} catch { toast.error('Widget activate failed'); }
		};

		return (
			<section className={styles.containerWide}>
			<div className={styles.headerRow}>
				<div>
					<h2 className={styles.heading}>Footer Settings</h2>
					<p className={styles.subheading}>Define footer left & right text plus an optional link (e.g., policy page). Only one configuration can be active.</p>
				</div>
			</div>

			<div className={styles.layoutGrid}>
				<form onSubmit={handleSubmit} className={styles.formCard}>
					<div className={styles.formHeader}>
						<h3 className={styles.formTitle}>{editingId ? 'Edit Footer Item' : 'Create Footer Item'}</h3>
						{editingId && <button type="button" onClick={cancelEdit} className={styles.cancelEditBtn} title="Cancel Edit"><MdClose size={18} /></button>}
					</div>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Left Text<span className={styles.req}>*</span></label>
						<textarea className={styles.textarea} rows={2} value={form.left_text} onChange={e => onChange('left_text', e.target.value)} placeholder="© 2025 Safe Ecommerce" />
					</div>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Right Text<span className={styles.req}>*</span></label>
						<textarea className={styles.textarea} rows={2} value={form.right_text} onChange={e => onChange('right_text', e.target.value)} placeholder="All rights reserved." />
					</div>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Link<span className={styles.req}>*</span></label>
						<input className={styles.input} type="url" value={form.links} onChange={e => onChange('links', e.target.value)} placeholder="https://example.com/policy" />
					</div>
					{!editingId && (
						<div className={styles.inlineCheck}>
							<input id="activeChk" type="checkbox" checked={form.is_active} onChange={e => onChange('is_active', e.target.checked)} />
							<label htmlFor="activeChk">Set active now</label>
						</div>
					)}
					<button type="submit" className={styles.submitBtn} disabled={submitting}>{submitting ? (editingId ? 'Saving...' : 'Creating...') : (editingId ? 'Save Changes' : 'Create')}</button>
				</form>

						<div className={styles.listColumn}>
					{loading && <div className={styles.loading}>Loading footer items...</div>}
					{error && <div className={styles.error}>{error}</div>}
					{!loading && !items.length && <div className={styles.empty}>No footer items yet.</div>}
					<ul className={styles.list}> 
						{items.map(item => (
							<li key={item.id} className={item.is_active ? styles.itemActive : styles.item}> 
								<div className={styles.itemActivateWrap}> 
									<button
										type="button"
										className={styles.activateBtn}
										onClick={() => activate(item.id)}
										title={item.is_active ? 'Active' : 'Set Active'}
									>
										{item.is_active ? <MdCheckCircle size={20} className={styles.iconActive}/> : <MdRadioButtonUnchecked size={20} className={styles.iconInactive} />}
									</button>
								</div>
								<div className={styles.itemContent}> 
									<div className={styles.rowTexts}>
										<div className={styles.block}><span className={styles.key}>Left:</span> {item.left_text}</div>
										<div className={styles.block}><span className={styles.key}>Right:</span> {item.right_text}</div>
									</div>
									<div className={styles.linkLine}><span className={styles.key}>Link:</span> <a href={item.links} target="_blank" rel="noopener noreferrer" className={styles.linkAnchor}>{item.links}</a></div>
								</div>
								<div className={styles.actions}> 
									<button type="button" className={styles.editBtn} onClick={() => startEdit(item)} title="Edit"><MdEdit size={16} /></button>
								</div>
							</li>
						))}
					</ul>
						</div>
			</div>

					{/* Footer Widgets Manager */}
					<div className={styles.widgetsWrapper}>
						<h3 className={styles.widgetsHeading}>Footer Widgets (Section 4)</h3>
						<p className={styles.widgetsSub}>Manage small footer widgets (headline + title + link). Only one can be active.</p>
						<div className={styles.widgetsGrid}>
							<form onSubmit={submitWidget} className={styles.widgetForm}>
								<div className={styles.formHeader}>
									<h4 className={styles.formTitle}>{widgetEditingId ? 'Edit Widget' : 'Create Widget'}</h4>
									{widgetEditingId && <button type="button" onClick={resetWidget} className={styles.cancelEditBtn}><MdClose size={16} /></button>}
								</div>
								<label className={styles.label}>Headline *</label>
								<input className={styles.input} value={widgetForm.headline} onChange={e=>onWidgetChange('headline', e.target.value)} placeholder="Resources" />
								<label className={styles.label}>Title *</label>
								<input className={styles.input} value={widgetForm.title} onChange={e=>onWidgetChange('title', e.target.value)} placeholder="Privacy Policy" />
								<label className={styles.label}>Link *</label>
								<input className={styles.input} type="url" value={widgetForm.links} onChange={e=>onWidgetChange('links', e.target.value)} placeholder="https://example.com/privacy" />
								{!widgetEditingId && (
									<div className={styles.inlineCheck}>
										<input id="widgetActive" type="checkbox" checked={widgetForm.is_active} onChange={e=>onWidgetChange('is_active', e.target.checked)} />
										<label htmlFor="widgetActive">Set active now</label>
									</div>
								)}
								<button type="submit" className={styles.submitBtn} disabled={widgetSubmitting}>{widgetSubmitting ? (widgetEditingId? 'Saving...' : 'Creating...') : (widgetEditingId ? 'Save Widget' : 'Create Widget')}</button>
							</form>
							<div className={styles.widgetListColumn}>
								{!widgets.length && <div className={styles.empty}>No widgets yet.</div>}
								<ul className={styles.widgetList}>
									{widgets.map(w => (
										<li key={w.id} className={w.is_active ? styles.itemActive : styles.item}> 
											<div className={styles.itemActivateWrap}>
												<button type="button" className={styles.activateBtn} onClick={()=>activateWidget(w.id)} title={w.is_active ? 'Active':'Set Active'}>
													{w.is_active ? <MdCheckCircle size={20} className={styles.iconActive}/> : <MdRadioButtonUnchecked size={20} className={styles.iconInactive} />}
												</button>
											</div>
											<div className={styles.itemContent}>
												<div className={styles.block}><span className={styles.key}>Headline:</span> {w.headline}</div>
												<div className={styles.block}><span className={styles.key}>Title:</span> {w.title}</div>
												<div className={styles.linkLine}><span className={styles.key}>Link:</span> <a className={styles.linkAnchor} href={w.links} target="_blank" rel="noopener noreferrer">{w.links}</a></div>
											</div>
											<div className={styles.actions}>
												<button type="button" className={styles.editBtn} onClick={()=>editWidget(w)} title="Edit"><MdEdit size={16} /></button>
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>

					{/* Social Links moved from Landing Page */}
					<div className={styles.socialLinksWrapper}> 
						<h3 className={styles.widgetsHeading}>Social Links</h3>
						<SocialLinksSection />
					</div>
		</section>
	);
};

export default FooterSetting;
