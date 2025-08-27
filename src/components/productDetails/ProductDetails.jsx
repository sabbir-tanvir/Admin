import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../Table/Table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../../styles/components/ProductDetails.css';
import { getProductRequests } from '../../services/api.js';

function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getProductRequests();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const toStatusText = (item) => {
    if (item?.is_approved === true) return 'Approved';
    if (item?.is_approved === false) return 'Pending';
    if (item?.is_cancelled === true) return 'Rejected';
    return '';
  };

  const safe = (v) => (v === 0 ? '0' : (v ?? ''));

  const getImageSrc = useCallback((item) => {
    return item?.image || item?.main_image || item?.image_url || (Array.isArray(item?.images) && item.images[0]?.url) || null;
  }, []);

  const getMarketerText = useCallback((item) => {
    const u = item?.user ?? item?.marketer ?? null;
    if (!u) return '';
    if (typeof u === 'object') {
      return u.name || u.username || u.email || '';
    }
    return `User #${u}`;
  }, []);

  // Normalize and format ISO timestamps (handles microseconds) to a readable string
  const formatDateTime = useCallback((value) => {
    if (!value) return '';
    try {
      let s = String(value);
      // Trim microseconds to milliseconds for JS Date compatibility
      const m = s.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})(\.\d+)?(Z)?$/);
      if (m) {
        const base = m[1];
        const frac = m[2] ? m[2].slice(0, 4) : ''; // keep .sss
        const z = m[3] ? 'Z' : '';
        s = base + (frac || '') + z;
      }
      const d = new Date(s);
      if (isNaN(d.getTime())) {
        // Fallback: show just the date part if parsing fails
        return s.slice(0, 10);
      }
      return d.toLocaleString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return String(value);
    }
  }, []);

  const handleView = useCallback((product) => {
    if (!product?.id) return;
    navigate(`/product/update/${product.id}`, { state: { product } });
  }, [navigate]);

  const handlePrint = useCallback(async (productId) => {
    if (!productId) return;
    const item = products.find(p => String(p?.id) === String(productId));
    if (!item) return;

  const doc = new jsPDF();

    // Title and meta
    doc.setFontSize(16);
    doc.text(`Product Details Export`, 14, 15);
    doc.setFontSize(10);
    doc.text(`Product ID: ${String(item.id ?? '')}`, 14, 22);
    doc.text(`Export Date: ${new Date().toLocaleString()}`, 14, 28);

  // Headers and row for single export (match main table order, include Image)
    const headers = ['Sl', 'P Id', 'Date', 'Image', 'Product Name', 'Marketer', 'Price'];
    const row = [
      '1',
      safe(item?.id),
      formatDateTime(item?.added_date || item?.created_at || item?.date),
      '', // image placeholder
      safe(item?.name),
      safe(getMarketerText(item)),
      safe(item?.price),
    ];

    // Preload image data URL (if available)
    let imageDataUrl = null;
    try {
      const src = getImageSrc(item);
      if (src) {
        const toAbsolute = (url) => {
          try {
            if (!url) return null;
            if (url.startsWith('data:')) return url;
            const u = new URL(url, window.location.origin);
            return u.href;
          } catch {
            return null;
          }
        };
        const abs = toAbsolute(src);
        if (abs) {
          const res = await fetch(abs, { mode: 'cors' });
          if (res.ok) {
            const blob = await res.blob();
            imageDataUrl = await new Promise((resolve) => {
              const fr = new FileReader();
              fr.onload = () => resolve(fr.result);
              fr.onerror = () => resolve(null);
              fr.readAsDataURL(blob);
            });
          }
        }
      }
    } catch {
      /* ignore preload image errors */
    }

    // Draw table first
    autoTable(doc, {
      head: [headers],
      body: [row],
      startY: 36,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { top: 36 },
      tableWidth: 'auto',
      didDrawCell: (data) => {
        if (data.section === 'body' && data.column.index === 3 && imageDataUrl) {
          const padding = 2;
          const size = Math.min(14, data.cell.height - 4);
          try {
            doc.addImage(imageDataUrl, data.cell.x + padding, data.cell.y + padding, size, size);
          } catch {
            // ignore addImage errors
          }
        }
      }
    });

    doc.save(`product_${String(item.id ?? 'details')}.pdf`);
  }, [products, formatDateTime, getImageSrc, getMarketerText]);

  const columns = useMemo(() => [
    {
      key: 'sl',
      header: 'Sl',
      render: (_item, index) => index + 1,
    },
    {
      key: 'id',
      header: 'P Id',
  sortable: true,
      render: (item) => safe(item?.id),
    },
    {
      key: 'created_at',
      header: 'Date',
      render: (item) => formatDateTime(item?.added_date || item?.created_at || item?.date),
    },
    {
      key: 'image',
      header: 'Image',
      render: (item) => {
        const src = getImageSrc(item);
        return src ? (
          <img src={src} alt={item?.name || 'product'} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />
        ) : (
          <div style={{ width: 40, height: 40, background: '#f4f4f4', border: '1px solid #eee', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 10 }}>N/A</div>
        );
      },
    },
    {
      key: 'name',
      header: 'Product Name',
      render: (item) => safe(item?.name),
    },
    {
      key: 'marketer_name',
      header: 'Marketer',
  render: (item) => safe(getMarketerText(item)),
    },
    {
      key: 'price',
      header: 'Price',
      sortable: true,
      render: (item) => (
        <div className="price-status">
          <span className="price">{safe(item?.price)}</span>
          <span className={`status ${getStatusClass(toStatusText(item))}`}>
            {toStatusText(item)}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="action-icons">
          <button
            className="action-btn view-btn"
            onClick={() => handleView(item)}
            title="View"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#FFAF1A" />
              <path d="M12.5 9C11.7044 9 10.9413 9.31607 10.3787 9.87868C9.81607 10.4413 9.5 11.2044 9.5 12C9.5 12.7956 9.81607 13.5587 10.3787 14.1213C10.9413 14.6839 11.7044 15 12.5 15C13.2956 15 14.0587 14.6839 14.6213 14.1213C15.1839 13.5587 15.5 12.7956 15.5 12C15.5 11.2044 15.1839 10.4413 14.6213 9.87868C14.0587 9.31607 13.2956 9 12.5 9ZM12.5 17C11.1739 17 9.90215 16.4732 8.96447 15.5355C8.02678 14.5979 7.5 13.3261 7.5 12C7.5 10.6739 8.02678 9.40215 8.96447 8.46447C9.90215 7.52678 11.1739 7 12.5 7C13.8261 7 15.0979 7.52678 16.0355 8.46447C16.9732 9.40215 17.5 10.6739 17.5 12C17.5 13.3261 16.9732 14.5979 16.0355 15.5355C15.0979 16.4732 13.8261 17 12.5 17ZM12.5 4.5C7.5 4.5 3.23 7.61 1.5 12C3.23 16.39 7.5 19.5 12.5 19.5C17.5 19.5 21.77 16.39 23.5 12C21.77 7.61 17.5 4.5 12.5 4.5Z" fill="#FFAF1A" />
            </svg>
          </button>
          <button
            className="action-btn print-btn"
            onClick={() => handlePrint(item?.id)}
            title="Print"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
              <rect x="1" y="0.5" width="23" height="23" rx="4.5" stroke="#31DA3D" />
              <path d="M18.5 7H6.5V3H18.5V7ZM18.5 12.5C18.7833 12.5 19.021 12.404 19.213 12.212C19.405 12.02 19.5007 11.7827 19.5 11.5C19.4993 11.2173 19.4033 10.98 19.212 10.788C19.0207 10.596 18.7833 10.5 18.5 10.5C18.2167 10.5 17.9793 10.596 17.788 10.788C17.5967 10.98 17.5007 11.2173 17.5 11.5C17.4993 11.7827 17.5953 12.0203 17.788 12.213C17.9807 12.4057 18.218 12.5013 18.5 12.5ZM16.5 19V15H8.5V19H16.5ZM18.5 21H6.5V17H2.5V11C2.5 10.15 2.79167 9.43767 3.375 8.863C3.95833 8.28833 4.66667 8.00067 5.5 8H19.5C20.35 8 21.0627 8.28767 21.638 8.863C22.2133 9.43833 22.5007 10.1507 22.5 11V17H18.5V21Z" fill="#31DA3D" />
            </svg>
          </button>
        </div>
      ),
    },
  ], [handleView, handlePrint, formatDateTime, getImageSrc, getMarketerText]);

  return (
    <div className="product-details">
      <Table
        columns={columns}
        data={products}
        searchPlaceholder="Search by Product Name, Marketer, or ID"
        searchKeys={['name', 'marketer_name', 'id']}
        itemsPerPage={7}
        className="product-details-table"
      />
      {loading && (
        <div style={{ padding: 12, textAlign: 'center', color: '#666' }}>Loading...</div>
      )}
      {error && (
        <div style={{ padding: 12, textAlign: 'center', color: 'red' }}>{error}</div>
      )}
    </div>
  );
}

export default ProductDetails;