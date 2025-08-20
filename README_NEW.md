# MachineryHub Shop - Frontend Admin Panel

A comprehensive React-based admin panel for managing machinery shop operations, including sellers, marketors, customers, products, orders, and business settings.

## 🚀 Features

### Dashboard & Analytics
- **Admin Dashboard**: Overview of key metrics and analytics
- **Seller Analytics**: Performance tracking for sellers
- **Marketor Analytics**: Marketing performance insights
- **Real-time Charts**: Interactive data visualization using Recharts

### User Management
- **Multi-role Authentication**: Admin, Seller, and Marketor roles
- **Employee Management**: Add, edit, and track employee details
- **Customer Management**: Customer profiles and interaction history
- **Seller Management**: Seller registration and performance tracking
- **Marketor Management**: Marketing team coordination

### Product & Inventory
- **Product Catalog**: Complete product management system
- **Inventory Tracking**: Stock levels and availability
- **Product Categories**: Organized product hierarchy
- **Bulk Operations**: Import/export functionality with CSV support

### Order Management
- **Order Processing**: Complete order lifecycle management
- **Payment Tracking**: Payment history and transaction records
- **Order Status**: Real-time order status updates
- **Order Analytics**: Performance metrics and insights

### Business Settings
- **General Settings**: Basic business configuration
- **Business Rules**: Custom business logic setup
- **Payment Settings**: Payment gateway configuration
- **Shipping Settings**: Delivery and shipping options
- **Customer Settings**: Customer interaction preferences
- **Landing Page Settings**: Custom landing page configuration
- **Language Settings**: Multi-language support
- **Automated Messages**: System message configuration

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Routing**: React Router DOM 7.6.2
- **UI Components**: Custom CSS with responsive design
- **Icons**: React Icons 5.5.0
- **Charts**: Recharts 3.1.0
- **HTTP Client**: Axios 1.10.0
- **File Processing**: 
  - Papa Parse 5.5.3 (CSV handling)
  - jsPDF 3.0.1 (PDF generation)
  - File Saver 2.0.5 (File downloads)
- **Build Tool**: Vite 6.3.5
- **Code Quality**: ESLint with React plugins

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/genzsoft/machineryhub-shop-FE.git
   cd machineryhub-shop-FE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🚀 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── BusinessSettings/    # Business configuration components
│   ├── Charts/             # Data visualization components
│   ├── CustomerDetails/    # Customer management
│   ├── employDetails/      # Employee management
│   ├── marketorDetails/    # Marketor management
│   ├── OrderTable/         # Order processing components
│   ├── productDetails/     # Product management
│   ├── sellerDetails/      # Seller management
│   └── ...
├── pages/              # Main application pages
│   ├── Authentication/     # Login/signup pages
│   ├── BusinessSettings.jsx
│   ├── Home.jsx
│   ├── Product.jsx
│   ├── Order.jsx
│   └── ...
├── MarketorPanel/      # Marketor-specific components
├── SellerPanel/        # Seller-specific components
├── styles/             # CSS styling
├── services/           # API services
└── utils/              # Utility functions
```

## 🔐 Authentication & Roles

The application supports three user roles:

1. **Admin**: Full system access and management
2. **Seller**: Product and order management
3. **Marketor**: Marketing and supplier management

### Route Structure
- `/` - Authentication pages
- `/admin/*` - Admin panel routes
- `/seller-panel/*` - Seller dashboard routes
- `/marketor-panel/*` - Marketor dashboard routes

## 📊 Key Features

### Admin Panel
- Dashboard with key metrics
- User management (employees, sellers, marketors, customers)
- Product catalog management
- Order processing and tracking
- Business settings configuration
- Analytics and reporting

### Seller Panel
- Personal dashboard
- Product management
- Order processing
- Performance analytics
- Order approval workflow

### Marketor Panel
- Marketing dashboard
- Supplier management
- Product status tracking
- Order status monitoring
- Marketing analytics

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and intuitive interface
- **Dark/Light Themes**: Theme support (if implemented)
- **Interactive Charts**: Real-time data visualization
- **Form Validation**: Comprehensive input validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Smooth loading experiences

## 📈 Business Settings

Comprehensive business configuration including:
- General business information
- Payment gateway setup
- Shipping and delivery options
- Customer interaction settings
- Automated message templates
- Multi-language support
- Custom landing pages
- WebSocket configuration

## 🔧 Configuration

### Environment Variables
```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=MachineryHub Shop
```

### Build Configuration
The project uses Vite for fast development and optimized production builds with:
- Hot Module Replacement (HMR)
- Optimized bundling
- Code splitting
- Asset optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Code Quality

The project maintains high code quality through:
- ESLint configuration
- React best practices
- Consistent code formatting
- Component-based architecture
- Proper error boundaries

## 🐛 Known Issues

- Authentication components need proper integration with backend API
- Some placeholder data needs to be replaced with real API calls
- Mobile responsiveness may need refinement in some components

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Bulk operations for data management
- [ ] Enhanced mobile experience
- [ ] Integration with external services
- [ ] Advanced analytics dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React.js specialists
- **UI/UX Design**: Modern interface design
- **Backend Integration**: API integration specialists

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in `/docs` (if available)

---

**Built with ❤️ for efficient machinery shop management**
