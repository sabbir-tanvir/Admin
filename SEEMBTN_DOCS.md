# SeeMBtn Component Documentation

## Overview
The `SeeMBtn` is a reusable React button component designed for consistent action buttons across the admin dashboard. It provides a unified styling and behavior for "See More", "View All", and similar action buttons.

## Features
- ✅ Customizable button text
- ✅ Click handlers support
- ✅ Disabled state
- ✅ Hover and active animations
- ✅ Consistent styling across the app
- ✅ Additional CSS class support
- ✅ Responsive design

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | `"See More"` | Text to display on the button |
| `onClick` | function | - | Click handler function |
| `className` | string | `""` | Additional CSS classes |
| `disabled` | boolean | `false` | Whether the button is disabled |

## Usage Examples

### Basic Usage
```jsx
import SeeMBtn from './components/button/SeemoreBtn';

<SeeMBtn />
```

### Custom Text
```jsx
<SeeMBtn text="View All" />
```

### With Click Handler
```jsx
<SeeMBtn 
  text="View Details"
  onClick={() => console.log('Button clicked!')}
/>
```

### With Custom Styling
```jsx
<SeeMBtn 
  text="Custom Action"
  className="custom-button"
  onClick={handleCustomAction}
/>
```

### Disabled State
```jsx
<SeeMBtn 
  text="Coming Soon"
  disabled={true}
/>
```

## Styling

The component uses the following CSS classes:
- `.seemore-btn`: Base button styling
- `.seemore-btn:hover`: Hover state with animation
- `.seemore-btn:active`: Active state styling
- `.seemore-btn:disabled`: Disabled state styling

### Default Styling Features
- **Background**: Light blue (#7ADAE8)
- **Hover Effect**: Darker blue with upward animation
- **Shadow**: Drop shadow with enhanced shadow on hover
- **Border Radius**: 8px rounded corners
- **Transitions**: Smooth 0.3s animations
- **Size**: 150px width, auto height

## Implementation in Dashboard

The SeeMBtn component is used throughout the dashboard for consistent action buttons:

```jsx
// In item boxes
<SeeMBtn 
  text="View All"
  onClick={() => handleViewAll('Top Selling Product')}
/>

<SeeMBtn 
  text="See More"
  onClick={() => handleViewAll('Most Popular Company')}
/>
```

## Customization

You can extend the button styling by adding custom CSS classes:

```css
.custom-button {
  background: #e74c3c;
  width: 200px;
}

.custom-button:hover {
  background: #c0392b;
}
```

## Best Practices

1. **Consistent Text**: Use standard text like "View All", "See More", "View Details"
2. **Click Handlers**: Always provide meaningful click handlers
3. **Loading States**: Consider disabling the button during async operations
4. **Accessibility**: Button text should be descriptive
5. **Responsive**: Test on different screen sizes

## Integration Example

```jsx
import React from 'react';
import SeeMBtn from '../button/SeemoreBtn';

function ItemBox({ title, onViewAll }) {
  return (
    <div className="item-box">
      <div className="item-box-header">
        <h2>{title}</h2>
      </div>
      <div className="item-box-content">
        {/* Content goes here */}
      </div>
      <SeeMBtn 
        text="View All"
        onClick={() => onViewAll(title)}
      />
    </div>
  );
}
```

## File Structure

```
src/
├── components/
│   └── button/
│       └── SeemoreBtn.jsx    # Component file
└── styles/
    └── components/
        └── SeeMBrn.css       # Styling file
```
