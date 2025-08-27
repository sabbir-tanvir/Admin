import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminPanel/ApprovePending.module.css';
import ProductImgCard from '../components/Card/ProductImgCard';
import { getProductRequests } from '../services/api.js';

const ApprovePending = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      setError(null);
      try {
        const { data } = await getProductRequests();
        const list = Array.isArray(data) ? data : [];
        const pendingProducts = list.filter(p => p?.is_approved === false);
        setProducts(pendingProducts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product/update/${product.id}`, { state: { product } });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Approval Pending</h1>
        <span className={styles.count}>
          {loading ? '...' : products.length}
        </span>
      </div>

      {loading && (
        <div className={styles.status}>
          <div style={{ marginBottom: '8px' }}>🔄</div>
          Loading pending products...
        </div>
      )}
      
      {error && (
        <div className={styles.error}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className={styles.empty}>
              <div style={{ marginBottom: '12px', fontSize: '24px' }}>📋</div>
              <div>No products pending approval</div>
              <div style={{ fontSize: '14px', marginTop: '8px', color: '#aaa' }}>
                All products have been reviewed
              </div>
            </div>
          ) : (
            <div className={styles.grid}>
              {products.map(p => (
                <ProductImgCard
                  key={p.id}
                  imageUrl={p.main_image}
                  title={p.name}
                  cost={p.price}
                  sell={p.price}
                  min={p.price}
                  status={'pending'}
                  onClick={() => handleProductClick(p)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ApprovePending;
