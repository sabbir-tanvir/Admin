// Example usage of the reusable ProductImgCard component
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/TotalProduct.css';
import ProductImgCard from '../components/Card/ProductImgCard';
import { getProductRequests } from '../services/api.js';

function ProductsList() {
    const navigate = useNavigate();

    // State
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); setError(null);
            try {
                const { data } = await getProductRequests();
                setProducts(Array.isArray(data) ? data : []);
                console.log(data);

            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    // Resolve absolute URL for images, preferring API base URL when given
    const resolveUrl = (url) => {
        try {
            if (!url) return undefined;
            if (typeof url !== 'string') return undefined;
            if (url.startsWith('http') || url.startsWith('data:')) return url;
            const base = import.meta.env.VITE_API_BASE_URL || window.location.origin;
            return new URL(url, base).href;
        } catch {
            return undefined;
        }
    };

    // Get best-effort image source from varying backend shapes
    const getImageSrc = (p) => {
        const src = p?.image || p?.main_image || p?.image_url || (Array.isArray(p?.images) && (p.images[0]?.url || p.images[0])) || undefined;
        return resolveUrl(src);
    };

    // Filter button: toggle between showing all and the currently selected status filter
    const handleFilter = () => {
        setActiveFilter(prev => prev === 'all' ? 'Approved' : 'all');
    };

    // Derived filtered list
    const filteredProducts = products
        .filter(p => {
            if (activeFilter === 'all') return true;
            if (activeFilter === 'Approved') return p.is_approved === true;
            if (activeFilter === 'Pending') return p.is_approved === false;
            if (activeFilter === 'Cancelled') return p.is_cancelled === true; // future field
            return true;
        })
        .filter(p => (searchTerm ? p.name?.toLowerCase().includes(searchTerm.toLowerCase()) : true));

    const handleProductClick = (product) => {
        // Pass full product object through navigation state to avoid refetch
        navigate(`/product/update/${product.id}`, { state: { product } });
    };

    return (
        <div className="product-page">
            {/* Header Section */}
            <div className="product-header">
                <h1>Total Product {products.length}</h1>
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <div className="status-filters">
                    <button
                        className={`status-btn ${activeFilter === 'Approved' ? 'status-approved active' : ''}`}
                        onClick={() => handleFilterChange('Approved')}
                    >
                        Approved
                    </button>
                    <button
                        className={`status-btn ${activeFilter === 'Pending' ? 'status-pending active' : ''}`}
                        onClick={() => handleFilterChange('Pending')}
                    >
                        Pending
                    </button>
                    <button
                        className={`status-btn ${activeFilter === 'Cancelled' ? 'status-rejected active' : ''}`}
                        onClick={() => handleFilterChange('Cancelled')}
                    >
                        Cancelled
                    </button>
                </div>
            </div>

            {/* Search and Category Section - styled like ProductDetails */}
            <div className="search-category-section">
                <div className="category-dropdown">
                    <button className="product-filter-btn">
                        Category
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M12 6L8 10L4 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="product-controls">
                    {/* Search styled like ProductDetails */}
                    <div className="search-input-container">
                        <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.7416 10.3333L15.0833 13.6666L13.6666 15.0833L10.3333 11.7416C9.2 12.6666 7.73331 13.1666 6.16665 13.1666C2.96665 13.1666 0.333313 10.5333 0.333313 7.33331C0.333313 4.13331 2.96665 1.49998 6.16665 1.49998C9.36665 1.49998 12 4.13331 12 7.33331C12 8.89998 11.5 10.3666 10.575 11.4999M6.16665 11.5C8.46665 11.5 10.3333 9.63331 10.3333 7.33331C10.3333 5.03331 8.46665 3.16665 6.16665 3.16665C3.86665 3.16665 2 5.03331 2 7.33331C2 9.63331 3.86665 11.5 6.16665 11.5Z" fill="#999999" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Ex.10001"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-inputtt"
                        />
                    </div>

                    {/* Filter Button */}
                    <button className="filter-btn" onClick={handleFilter}>
                        <span>Filter</span>
                        <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.032 4.75H13.968C14.425 4.75 14.822 4.75 15.133 4.78C15.44 4.808 15.818 4.875 16.126 5.128C16.523 5.454 16.747 5.942 16.75 6.45C16.752 6.84 16.578 7.176 16.41 7.442C16.242 7.712 15.999 8.032 15.715 8.406L13.119 11.828C12.867 12.16 12.804 12.248 12.76 12.338C12.7142 12.4323 12.6809 12.5321 12.661 12.635C12.641 12.735 12.638 12.847 12.638 13.269V17.512C12.638 17.72 12.638 17.924 12.624 18.09C12.609 18.254 12.572 18.517 12.4 18.753C12.19 19.04 11.863 19.226 11.5 19.248C11.198 19.267 10.953 19.145 10.81 19.065C10.6472 18.9682 10.4884 18.8647 10.334 18.755L9.345 18.072L9.297 18.039C9.106 17.908 8.894 17.763 8.735 17.562C8.59682 17.3886 8.49389 17.1899 8.432 16.977C8.361 16.733 8.362 16.477 8.362 16.239V13.269C8.362 12.847 8.358 12.735 8.339 12.635C8.3188 12.5321 8.28518 12.4322 8.239 12.338C8.196 12.248 8.133 12.16 7.881 11.828L5.285 8.406C5.001 8.032 4.758 7.712 4.589 7.442C4.422 7.176 4.249 6.84 4.25 6.45C4.25053 6.19734 4.30672 5.9479 4.41457 5.71941C4.52242 5.49092 4.67928 5.289 4.874 5.128C5.182 4.875 5.56 4.808 5.867 4.779C6.178 4.75 6.574 4.75 7.032 4.75ZM5.808 6.305C5.77434 6.3419 5.75424 6.38916 5.751 6.439C5.757 6.458 5.781 6.52 5.861 6.646C5.989 6.851 6.191 7.118 6.501 7.527L9.076 10.921L9.111 10.967C9.312 11.231 9.472 11.442 9.589 11.682C9.69167 11.8933 9.76567 12.115 9.811 12.347C9.862 12.608 9.861 12.874 9.861 13.211V16.179C9.861 16.337 9.862 16.426 9.866 16.493L9.872 16.555C9.87887 16.5815 9.89113 16.6064 9.908 16.628L9.949 16.662C9.999 16.702 10.069 16.75 10.197 16.838L11.138 17.488V13.21C11.138 12.873 11.138 12.607 11.189 12.346C11.2343 12.1147 11.3083 11.893 11.411 11.681C11.528 11.441 11.688 11.231 11.889 10.966L11.924 10.92L14.499 7.526C14.809 7.116 15.011 6.85 15.139 6.645C15.219 6.519 15.243 6.457 15.249 6.438C15.2458 6.38816 15.2257 6.3409 15.192 6.304C15.1266 6.28659 15.0596 6.27587 14.992 6.272C14.76 6.25 14.436 6.249 13.932 6.249H7.068C6.564 6.249 6.24 6.249 6.008 6.272C5.94043 6.27587 5.87342 6.28759 5.808 6.305ZM16.25 10.5C16.25 10.3011 16.329 10.1103 16.4697 9.96967C16.6103 9.82902 16.8011 9.75 17 9.75H20C20.1989 9.75 20.3897 9.82902 20.5303 9.96967C20.671 10.1103 20.75 10.3011 20.75 10.5C20.75 10.6989 20.671 10.8897 20.5303 11.0303C20.3897 11.171 20.1989 11.25 20 11.25H17C16.8011 11.25 16.6103 11.171 16.4697 11.0303C16.329 10.8897 16.25 10.6989 16.25 10.5ZM14.75 13C14.75 12.8011 14.829 12.6103 14.9697 12.4697C15.1103 12.329 15.3011 12.25 15.5 12.25H20C20.1989 12.25 20.3897 12.329 20.5303 12.4697C20.671 12.6103 20.75 12.8011 20.75 13C20.75 13.1989 20.671 13.3897 20.5303 13.5303C20.3897 13.671 20.1989 13.75 20 13.75H15.5C15.3011 13.75 15.1103 13.671 14.9697 13.5303C14.829 13.3897 14.75 13.1989 14.75 13ZM14.25 15.5C14.25 15.3011 14.329 15.1103 14.4697 14.9697C14.6103 14.829 14.8011 14.75 15 14.75H20C20.1989 14.75 20.3897 14.829 20.5303 14.9697C20.671 15.1103 20.75 15.3011 20.75 15.5C20.75 15.6989 20.671 15.8897 20.5303 16.0303C20.3897 16.171 20.1989 16.25 20 16.25H15C14.8011 16.25 14.6103 16.171 14.4697 16.0303C14.329 15.8897 14.25 15.6989 14.25 15.5ZM14.25 18C14.25 17.8011 14.329 17.6103 14.4697 17.4697C14.6103 17.329 14.8011 17.25 15 17.25H17.5C17.6989 17.25 17.8897 17.329 18.0303 17.4697C18.171 17.6103 18.25 17.8011 18.25 18C18.25 18.1989 18.171 18.3897 18.0303 18.5303C17.8897 18.671 17.6989 18.75 17.5 18.75H15C14.8011 18.75 14.6103 18.671 14.4697 18.5303C14.329 18.3897 14.25 18.1989 14.25 18Z" fill="black" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Products Grid Section */}
            {loading && <div style={{ padding: 20 }}>Loading...</div>}
            {error && <div style={{ color: 'red', padding: 20 }}>{error}</div>}
            {!loading && !error && (
                <div className="products-grid">
                    {filteredProducts.map(p => (
                            <ProductImgCard
                                key={p.id}
                                imageUrl={getImageSrc(p)}
                                title={p.name}
                                cost={p.price}
                                sell={p.price}
                                min={p.price}
                                status={p.is_approved === true ? 'approved' : 'pending'}
                                onClick={() => handleProductClick(p)}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}

export default ProductsList;