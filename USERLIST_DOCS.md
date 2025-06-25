# UserList Component Documentation

## Overview
The `UserList` is a reusable React component designed for displaying lists of customers and marketers in the admin dashboard. It provides a consistent layout with avatar images, contact information, and performance metrics.

## Features
- ✅ Displays user avatar, name, and contact information
- ✅ Shows performance metrics (orders for customers, sales for marketers)
- ✅ Responsive design with hover effects
- ✅ Scrollable list for handling large datasets
- ✅ Fallback avatar generation for missing images
- ✅ Type-specific metrics display

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `users` | Array | `[]` | Array of user objects to display |
| `type` | string | `'customers'` | Type of users: `'customers'` or `'marketers'` |

## User Object Structure

### For Customers
```javascript
{
  name: "Jack Jonson",
  contact: "+880***********74",
  orders: 60,
  avatar: "https://example.com/avatar.jpg" // Optional
}
```

### For Marketers
```javascript
{
  name: "Sarah Wilson", 
  contact: "+880***********45",
  sales: 85,
  avatar: "https://example.com/avatar.jpg" // Optional
}
```

## Usage Examples

### Customer List
```jsx
import UserList from './components/UserList/UserList';

const customers = [
  {
    name: "Jack Jonson",
    contact: "+880***********74",
    orders: 60,
    avatar: "https://example.com/avatar1.jpg"
  },
  // ... more customers
];

<UserList users={customers} type="customers" />
```

### Marketer List
```jsx
const marketers = [
  {
    name: "Sarah Wilson",
    contact: "+880***********45", 
    sales: 85,
    avatar: "https://example.com/avatar2.jpg"
  },
  // ... more marketers
];

<UserList users={marketers} type="marketers" />
```

## Styling Features

### Layout
- **Flex Column**: Vertical list layout
- **Card Design**: Each user in a rounded card
- **Hover Effects**: Smooth animations on hover
- **Scrollable**: Handles overflow with custom scrollbar

### Avatar Handling
- **Image Fallback**: Generates placeholder if image fails to load
- **Consistent Size**: 60x60px rounded rectangles
- **Border**: Subtle border for definition

### Typography
- **Name**: Bold, dark text for prominence
- **Contact**: Lighter, smaller text for secondary info
- **Metrics**: Highlighted badge for performance data

## Integration with Dashboard

```jsx
import React from 'react';
import UserList from '../UserList/UserList';

function Dashboard() {
  const topCustomers = [
    {
      name: "Jack Jonson",
      contact: "+880***********74",
      orders: 60,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    }
    // ... more data
  ];

  return (
    <div className="item-box">
      <div className="item-box-header">
        <h2>Top Customers</h2>
      </div>
      <div className="item-box-content">
        <UserList users={topCustomers} type="customers" />
      </div>
    </div>
  );
}
```

## Responsive Design

The component adapts to different screen sizes:
- **Desktop**: Horizontal layout with avatar, info, and metrics
- **Mobile**: Stacked vertical layout with centered content
- **Tablet**: Adjusted spacing and font sizes

## Performance Considerations

- **Virtualization**: For very large lists, consider implementing virtual scrolling
- **Image Optimization**: Uses placeholder URLs for missing avatars
- **Smooth Scrolling**: Custom scrollbar styling for better UX

## Customization

### Custom Styling
```css
.user-item {
  /* Override default card styling */
  background: #your-color;
  border: 2px solid #your-border-color;
}

.user-orders {
  /* Customize metrics badge */
  background: #your-badge-color;
  color: #your-text-color;
}
```

### Custom Metrics Display
You can extend the component to show different metrics by modifying the `user-stats` section:

```jsx
<div className="user-stats">
  <div className="user-orders">
    {type === 'customers' 
      ? `Order ${user.orders}` 
      : type === 'marketers'
      ? `Sales ${user.sales}`
      : `Score ${user.score}`
    }
  </div>
</div>
```

## File Structure

```
src/
├── components/
│   └── UserList/
│       └── UserList.jsx       # Component file
└── styles/
    └── components/
        └── UserList.css       # Styling file
```

## Best Practices

1. **Data Validation**: Always validate user data before passing to component
2. **Loading States**: Show loading spinner while fetching user data
3. **Error Handling**: Handle cases where avatar images fail to load
4. **Accessibility**: Ensure proper alt text for images
5. **Performance**: Use React.memo() for large lists that don't change frequently

## Future Enhancements

- Search and filter functionality
- Sorting by different metrics
- Click handlers for individual users
- Status indicators (online/offline)
- Bulk actions (select multiple users)
- Export functionality
