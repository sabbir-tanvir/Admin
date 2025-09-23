import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/SellerPanel/sellerProductDetails.module.css';
import { getProductRequests } from '../services/api';

// NOTE: No dedicated single-product endpoint provided; we fetch list then find by id.
// If backend later supplies /dashboard/api/request-product/{id}/ switch to that.

const SellerProductDetails = () => {
	const { productId } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [product, setProduct] = useState(null);

	useEffect(() => {
		let mounted = true;
		const load = async () => {
			setLoading(true);
			try {
				const res = await getProductRequests();
				if (!mounted) return;
				const list = Array.isArray(res.data) ? res.data : (res.data?.results || []);
				const found = list.find(p => String(p.id) === String(productId));
				if (!found) {
					setError('Product not found');
				} else {
					setProduct(found);
				}
			} catch (e) {
				if (mounted) setError(e.message || 'Failed to load product');
			} finally { if (mounted) setLoading(false); }
		};
		load();
		return () => { mounted = false; };
	}, [productId]);

	const gallery = useMemo(() => (Array.isArray(product?.gallery_images) ? product.gallery_images : []), [product]);

	const [activeImage, setActiveImage] = useState(null);
	useEffect(() => { if (product) setActiveImage(product.main_image || (gallery[0]?.image || null)); }, [product, gallery]);

	if (loading) return <div className={styles['loading-block']}>Loading product...</div>;
	if (error) return <div className={styles['error-block']}>{error}</div>;
	if (!product) return null;

	const {
		name,
		sku,
		price,
		stock,
		category,
		tags = [],
		main_image,
		is_imported,
		imported_from,
		rating,
		description,
		description_two,
		is_approved
	} = product;

	const status = stock === 0 ? 'Out of Stock' : (is_approved ? 'Approved' : 'Pending');
	const statusClass = stock === 0 ? 'status-out' : (is_approved ? 'status-approved' : 'status-pending');

	// Build star representation (simple 5-star static; rating expected numeric)
	const stars = Array.from({ length: 5 }).map((_, i) => (i < Math.round(rating || 0) ? '★' : '☆'));

	return (
		<div className={styles['seller-product-details-page']}>
			<div className={styles['details-header']}>
				<button type="button" className={styles['back-btn']} onClick={() => navigate(-1)}>
					← Back
				</button>
				<div className={styles['title-wrap']}>
					<h1 className={styles['product-name']}>{name}</h1>
					<div className={styles['inline-badges']}>
						<span className={`${styles['status-chip']} ${styles[statusClass]}`}>{status}</span>
						{is_imported && <span className={`${styles.badge} ${styles['badge-imported']}`}>Imported{imported_from ? ` • ${imported_from}` : ''}</span>}
						{category?.name && <span className={styles.badge}>{category.name}</span>}
					</div>
					<span className={styles['product-sku']}>SKU: {sku}</span>
				</div>
			</div>
			<div className={styles['content-layout']}>
				<div className={styles['media-panel']}>
					<div className={styles['main-image-wrap']}>
						{activeImage ? (<img src={activeImage} alt={name} className={styles['main-image']} />) : (<div className={styles['no-image']}>No Image</div>)}
					</div>
					{gallery.length > 0 && (
						<div className={styles['gallery-strip']}>
							{(main_image ? [{ id: 'main', image: main_image, alt_text: 'Main' }] : []).concat(gallery).map(g => (
								<button key={g.id} type="button" className={`${styles.thumb} ${activeImage === g.image ? styles.active : ''}`} onClick={() => setActiveImage(g.image)}>
									<img src={g.image} alt={g.alt_text || 'image'} />
									{g.alt_text && <span className={styles['icon-badge']}>{g.alt_text}</span>}
								</button>
							))}
						</div>
					)}
				</div>
				<div className={styles['info-panel']}>
					<div className={styles['meta-grid']}>
						<div className={styles['meta-item']}>
							<span className={styles['meta-label']}>Price</span>
							<span className={styles['meta-value']}>{price}</span>
						</div>
						<div className={styles['meta-item']}>
							<span className={styles['meta-label']}>Stock</span>
							<span className={styles['meta-value']}>{stock}</span>
						</div>
						<div className={styles['meta-item']}>
							<span className={styles['meta-label']}>Rating</span>
							<span className={styles['meta-value']}>
								<span className={styles['rating-row']}>
									<span className={styles.stars}>{stars.join('')}</span> {Number(rating || 0).toFixed(1)}
								</span>
							</span>
						</div>
						<div className={styles['meta-item']}>
							<span className={styles['meta-label']}>Imported From</span>
							<span className={styles['meta-value']}>{is_imported ? (imported_from || '—') : 'Local'}</span>
						</div>
						<div className={styles['meta-item']}>
							<span className={styles['meta-label']}>Category</span>
							<span className={styles['meta-value']}>{category?.name || '—'}</span>
						</div>
						<div className={styles['meta-item']}>
							<span className={styles['meta-label']}>Tags</span>
							<span className={styles['meta-value']}>{tags.length}</span>
						</div>
					</div>
					{tags.length > 0 && (
						<div className={styles['tags-wrap']}>
							{tags.map(t => <span key={t.id || t.name} className={styles['tag-pill']}>{t.name}</span>)}
						</div>
					)}
					<div className={styles['desc-section']}>
						<h3 className={styles['section-title']}>Description</h3>
						<div className={styles['description-text']}>{description || 'No description provided.'}</div>
						{description_two && <div className={styles['secondary-desc']}>{description_two}</div>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SellerProductDetails;
