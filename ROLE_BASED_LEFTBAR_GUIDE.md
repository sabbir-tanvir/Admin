# Role-Based Leftbar Implementation Guide

## Overview
The Leftbar component now supports role-based rendering to show different menu options based on user roles (admin vs seller).

## Usage

### Admin Role (Default)
```jsx
import LeftBar from '../components/Leftbar.jsx';

// Shows full admin menu with all options
<LeftBar />
// or explicitly
<LeftBar userRole="admin" />
```

### Seller Role
```jsx
import LeftBar from '../components/Leftbar.jsx';

// Shows only 4 menu options: Dashboard, Product, Orders, Customer
<LeftBar userRole="seller" />
```

## Menu Structure

### Admin Menu (Full Access)
1. **Dashboard** - Main dashboard
2. **Product** (dropdown)
   - Add Product
   - All Products
3. **Seller** (dropdown)
   - Add a Seller
   - All Sellers
4. **Orders** (dropdown)
   - New Orders
   - All Orders
5. **Marketers** (dropdown)
   - Add a Marketer
   - All Marketers
6. **Customer** (dropdown)
   - Add Customer
   - All Customers
7. **Admin Analytics** - Analytics page
8. **Logout** - Logout option

### Seller Menu (Limited Access)
1. **Dashboard** - Main dashboard
2. **Product** (dropdown)
   - Add Product
   - All Products
3. **Seller Dashboard** - Simple link to seller dashboard
4. **Orders** (dropdown)
   - New Orders
   - All Orders
5. **Customer** (dropdown)
   - Add Customer
   - All Customers
6. **Logout** - Logout option

## Implementation Details

### Header
- Admin: "Admin Panel"
- Seller: "Seller Panel"

### Conditional Rendering
- Uses React conditional rendering with `{userRole === 'admin' && (...)}`
- Seller-specific menu items are wrapped in `{userRole === 'seller' && (...)}`
- Shared items (Dashboard, Product, Orders, Customer, Logout) are visible to both roles

### Styling
- Uses existing CSS classes from `Leftbar.css`
- No style changes needed - same visual appearance
- Dropdown functionality works the same for both roles

## Example Implementation

### Seller Dashboard Page
```jsx
function SellerDashboard() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        <LeftBar userRole="seller" />
        <div className="product-page">
          {/* 3 cards layout */}
          <div className="product-cards-section">
            <div className="card-container-3">
              {/* 3 cards here */}
            </div>
          </div>
          {/* Rest of content */}
        </div>
      </div>
    </div>
  );
}
```

### Admin Page
```jsx
function AdminPage() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-layout">
        <LeftBar /> {/* Defaults to admin */}
        <div className="page-content">
          {/* Admin content */}
        </div>
      </div>
    </div>
  );
}
```

## Card Container Classes

### For 3 Cards (Seller Dashboard)
```css
.card-container-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
}
```

### For 2 Cards
```css
.card-container-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
}
```

## Benefits

1. **Single Source of Truth** - One Leftbar component handles both roles
2. **Maintainable** - Easy to add new roles or modify existing ones
3. **Consistent Styling** - Same look and feel across roles
4. **Performance** - No duplicate components or CSS
5. **Scalable** - Easy to add more roles (customer, marketer, etc.)

## Migration from Separate Components

If you were previously using separate leftbar components:

1. Replace `<SellerLeftbar />` with `<LeftBar userRole="seller" />`
2. Replace `<AdminLeftbar />` with `<LeftBar />` or `<LeftBar userRole="admin" />`
3. Remove the old separate leftbar component files
4. Update imports to use the single `Leftbar.jsx`

## Future Enhancements

- Add more roles (customer, marketer, etc.)
- Add permission-based menu item visibility
- Add dynamic menu loading from API
- Add role-based theming
