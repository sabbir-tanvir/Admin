# ProductCard Component Documentation

## Overview
The `ProductCard` is a reusable React component designed for creating consistent, interactive dashboard cards. It supports various configurations including icons, numbers, different sizes, and customizable styling.

## Features
- ✅ Flexible content (numbers or icons)
- ✅ Two size variants (normal and large)
- ✅ Optional red notification dot
- ✅ Customizable link text
- ✅ Click handlers
- ✅ Disabled state
- ✅ Custom styling options
- ✅ Responsive design
- ✅ Hover effects
- ✅ Accessibility considerations

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `number` | string\|number | - | Number to display in the circle (when no icon) |
| `title` | string | - | Title text to display |
| `icon` | JSX.Element | - | SVG icon component to display instead of number |
| `showRedDot` | boolean | `true` | Whether to show the red notification dot |
| `size` | string | `'normal'` | Size variant: `'normal'` or `'large'` |
| `onClick` | function | - | Click handler function |
| `className` | string | `''` | Additional CSS classes |
| `hideCircle` | boolean | `false` | Whether to hide the circular element completely |
| `linkText` | string | `'see more →'` | Custom text for the "see more" link |
| `customColor` | string | - | Custom background color for the card |
| `disabled` | boolean | `false` | Whether the card is disabled/non-interactive |

## Usage Examples

### Basic Card with Number
```jsx
import ProductCard from './components/Card/ProductCard';

<ProductCard
  number="50"
  title="Products"
  onClick={() => console.log('Products clicked')}
/>
```

### Card with Icon
```jsx
import ProductCard from './components/Card/ProductCard';
import { CustomerIcon } from './components/Card/Icons';

<ProductCard
  icon={<CustomerIcon />}
  title="Customers"
  showRedDot={true}
  onClick={() => handleCustomerClick()}
/>
```

### Large Card without Circle
```jsx
<ProductCard
  title="Sales Overview"
  size="large"
  hideCircle={true}
  showRedDot={false}
  linkText="view details →"
  onClick={() => navigateToSales()}
/>
```

### Custom Styled Card
```jsx
<ProductCard
  number="25"
  title="Special Offers"
  customColor="#f0f8ff"
  linkText="explore offers →"
  className="special-card"
/>
```

### Disabled Card
```jsx
<ProductCard
  number="--"
  title="Coming Soon"
  disabled={true}
  showRedDot={false}
  linkText="coming soon"
/>
```

## Layout Containers

The component works with predefined CSS grid containers:

### 5-Card Row (Responsive)
```jsx
<div className="card-container card-container-5">
  <ProductCard ... />
  <ProductCard ... />
  <ProductCard ... />
  <ProductCard ... />
  <ProductCard ... />
</div>
```

### 2-Card Row (Large + Normal)
```jsx
<div className="card-container card-container-2">
  <ProductCard size="large" ... />
  <ProductCard size="normal" ... />
</div>
```

## Responsive Breakpoints

The cards automatically adjust based on screen size:
- **Desktop (1400px+)**: 5 cards per row
- **Large Tablet (1200px+)**: 4 cards per row
- **Tablet (900px+)**: 3 cards per row
- **Small Tablet (600px+)**: 2 cards per row
- **Mobile (<600px)**: 1 card per row

## Icon System

Icons are organized in a separate `Icons.jsx` file for better maintainability:

```jsx
// Available icons
import { 
  CustomerIcon, 
  CartIcon, 
  CompanyIcon, 
  MarketingIcon,
  AnalyticsIcon 
} from './components/Card/Icons';
```

## Styling Guidelines

### CSS Classes
- `.product-card`: Base card styling
- `.product-card-large`: Large size variant
- `.card-circle`: Circular icon/number container
- `.card-circle-large`: Large circle variant
- `.red-dot`: Notification dot
- `.disabled`: Disabled state styling

### Custom Styling
You can extend the component with custom CSS:

```css
.product-card.special-card {
  border: 2px solid #007bff;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.product-card.special-card h2 {
  color: white;
}
```

## Best Practices

1. **Consistent Sizing**: Use the same size for cards in the same row
2. **Icon Consistency**: Maintain consistent icon sizes and styles
3. **Accessibility**: Always provide meaningful titles and click handlers
4. **Performance**: Import only the icons you need
5. **Responsive**: Test cards across different screen sizes
6. **User Feedback**: Use hover effects and click handlers for better UX

## Integration with Dashboard

```jsx
import React from 'react';
import ProductCard from '../Card/ProductCard';
import { CustomerIcon, CartIcon } from '../Card/Icons';

function Dashboard() {
  const handleCardClick = (cardName) => {
    // Handle navigation or actions
    console.log(`${cardName} clicked`);
  };

  return (
    <div className="dashboard">
      <div className="card-container card-container-5">
        <ProductCard
          number="150"
          title="Total Products"
          onClick={() => handleCardClick('Products')}
        />
        <ProductCard
          icon={<CustomerIcon />}
          title="Active Customers"
          showRedDot={true}
          onClick={() => handleCardClick('Customers')}
        />
        {/* More cards... */}
      </div>
    </div>
  );
}
```

## Future Enhancements

- Animation variants
- Dark mode support
- Loading states
- Badge system
- Chart integration
- Drag & drop support
