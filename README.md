# MachineryHub Shop - Frontend

A comprehensive React.js-based admin dashboard for managing machinery business operations including orders, products, sellers, marketors, and customers.

## 🚀 Features

### Admin Panel
- **Dashboard Analytics**: Real-time business metrics and performance tracking
- **Order Management**: Complete order lifecycle management with payment tracking
- **Product Management**: Add, edit, and manage product catalog
- **User Management**: Manage sellers, marketors, customers, and employees
- **Business Settings**: Comprehensive configuration for business operations
- **Payment History**: Track and monitor all payment transactions

### Multi-Role Support
- **Admin Panel**: Full access to all features and settings
- **Seller Panel**: Product and order management for sellers
- **Marketor Panel**: Supplier management and order tracking

### Business Settings
- General Settings & Business Rules
- Payment & Shipping Configuration
- Customer Settings & Priority Setup
- Language & Landing Page Settings
- Automated Messages & Notifications
- Free Delivery & Additional Charges

## 🛠️ Technology Stack

- **Frontend**: React.js 18+
- **Routing**: React Router DOM
- **Styling**: CSS3 with modular component-based architecture
- **Icons**: React Icons
- **Build Tool**: Vite
- **State Management**: React useState/useContext
- **HTTP Client**: Fetch API

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BusinessSettings/ # Business configuration components
│   ├── CustomerDetails/  # Customer management components
│   ├── OrderTable/      # Order and payment components
│   ├── sellerDetails/   # Seller management components
│   ├── marketorDetails/ # Marketor management components
│   └── employDetails/   # Employee management components
├── pages/              # Main page components
├── MarketorPanel/      # Marketor-specific components
├── SellerPanel/        # Seller-specific components
├── services/           # API services
├── styles/             # CSS stylesheets
├── utils/              # Utility functions
└── assets/             # Images and static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/genzsoft/machineryhub-shop-FE.git
cd machineryhub-shop-FE
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_NAME=MachineryHub Shop
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and supports:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔐 Authentication Routes

- `/` - Login choice page
- `/login` - User login
- `/signup` - User registration
- `/signup-select` - Registration type selection
- `/forgot-password` - Password recovery

## 📊 Admin Routes

- `/admin` - Admin dashboard
- `/admin/product` - Product management
- `/admin/order` - Order management
- `/admin/seller` - Seller management
- `/admin/marketor` - Marketor management
- `/admin/customer` - Customer management
- `/admin/business-settings` - Business configuration

## 👥 User Roles

### Admin
- Full system access
- User management
- Business configuration
- Analytics and reporting

### Seller
- Product management
- Order processing
- Sales analytics
- Profile management

### Marketor
- Supplier management
- Order tracking
- Product status monitoring
- Analytics dashboard

## 🎨 UI Components

### Reusable Components
- **Cards**: Information display containers
- **Tables**: Data presentation with sorting and filtering
- **Forms**: Input validation and submission
- **Buttons**: Various action buttons with states
- **Modals**: Dialog boxes for user interactions
- **Charts**: Data visualization components

### Custom Styling
- Modular CSS architecture
- Component-scoped styles
- Responsive design patterns
- Consistent color scheme and typography

## 🔧 Development Guidelines

### Code Structure
- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices
- Maintain consistent file naming

### Styling Guidelines
- Use CSS modules or component-scoped CSS
- Follow BEM methodology for class naming
- Implement responsive design first
- Use CSS custom properties for theming

### Component Guidelines
- Keep components small and focused
- Use proper prop validation
- Implement loading and error states
- Follow accessibility best practices

## 🚀 Deployment

The application can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting service

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React.js, CSS3, Responsive Design
- **Backend Integration**: API integration and data management
- **UI/UX Design**: User interface and experience design

## 🐛 Known Issues

- [ ] Authentication redirect needs backend integration
- [ ] Some API endpoints need implementation
- [ ] Mobile navigation could be improved

## 🔄 Recent Updates

- ✅ Fixed routing issues for authentication pages
- ✅ Streamlined business settings navigation
- ✅ Updated form styling with dedicated CSS classes
- ✅ Fixed order details and payment history navigation
- ✅ Improved responsive design for all components

## 📞 Support

For support, email support@machineryhub.com or create an issue in the GitHub repository.

---

Built with ❤️ by the MachineryHub Team
