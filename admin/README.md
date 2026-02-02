# 🎨 Wedding Moments Studio - Admin Dashboard

A comprehensive, production-ready admin dashboard for managing photography services built with **React**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Features

### ✅ **Core Functionality**

- **Service Management (CRUD)**
  - ✅ Create new photography services
  - ✅ Edit existing services
  - ✅ Delete services with confirmation
  - ✅ Enable/Disable services
  - ✅ Search and filter services
- **Pricing Management**
  - ✅ Centralized price control
  - ✅ Batch price editing
  - ✅ Price statistics and summaries
  - ✅ Real-time calculations
- **Analytics & Insights**
  - ✅ Service performance metrics
  - ✅ Price distribution charts
  - ✅ Top services ranking
  - ✅ Detailed statistics table

- **Settings & Data Management**
  - ✅ Export services to JSON
  - ✅ Import services from JSON
  - ✅ Reset to default data
  - ✅ Storage information

- **Dashboard Overview**
  - ✅ Key performance indicators
  - ✅ Recent services list
  - ✅ Quick action cards
  - ✅ Visual statistics

---

## 🎯 Tech Stack

- **React 19** - Latest version
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Modern styling
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Vite** - Lightning-fast dev server
- **LocalStorage** - Data persistence (backend-ready)

---

## 📁 Project Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   ├── Header.tsx          # Top header with search
│   │   ├── StatsCard.tsx       # Dashboard stat cards
│   │   └── ServiceModal.tsx    # Add/Edit service modal
│   ├── pages/
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── Services.tsx        # Service management
│   │   ├── Pricing.tsx         # Price management
│   │   ├── Analytics.tsx       # Analytics & insights
│   │   └── Settings.tsx        # Settings & data export
│   ├── context/
│   │   └── AdminContext.tsx    # Global state management
│   ├── data/
│   │   └── services.ts         # Initial service data
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── utils/
│   │   └── localStorage.ts     # Storage utilities
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── package.json
└── README.md
```

---

## ⚡ Quick Start

### **1. Install Dependencies**

```bash
npm install
```

### **2. Run Development Server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### **3. Build for Production**

```bash
npm run build
```

### **4. Preview Production Build**

```bash
npm run preview
```

---

## 🎨 Key Pages

### **1. Dashboard** (`/`)

- Key statistics overview
- Recent services table
- Quick action cards
- Price range metrics

### **2. Services** (`/services`)

- Grid view of all services
- Add new services
- Edit existing services
- Delete services
- Enable/Disable toggle
- Search and filter

### **3. Pricing** (`/pricing`)

- Centralized price editing
- Service-wise pricing tables
- Batch save functionality
- Price statistics

### **4. Analytics** (`/analytics`)

- Performance metrics
- Top services ranking
- Price distribution charts
- Detailed service table

### **5. Settings** (`/settings`)

- Export data to JSON
- Import data from JSON
- Reset to defaults
- Storage information

---

## 💾 Data Management

### **LocalStorage**

All data is automatically saved to browser LocalStorage:

- ✅ Auto-save on every change
- ✅ Persistent across sessions
- ✅ Easy migration to backend

---

## 🔧 State Management

### **AdminContext**

Global state management using React Context API:

```typescript
const {
  services, // All services
  addService, // Add new service
  updateService, // Update existing service
  deleteService, // Delete service
  toggleServiceStatus, // Enable/Disable service
  getServiceStats, // Get statistics
  resetServices, // Reset to defaults
} = useAdmin();
```

---

## 📊 Service Data Structure

```typescript
interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  subServices: SubService[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface SubService {
  id: string;
  name: string;
  pricePerDay: number;
}
```

---

## 🎯 Features in Detail

### **Service Management**

**Add Service:**

1. Click "Add Service" button
2. Fill in service details
3. Add sub-services with pricing
4. Set active status
5. Save

**Edit Service:**

1. Click edit button on service card
2. Modify details
3. Save changes

**Delete Service:**

1. Click delete button
2. Confirm deletion
3. Service removed

**Toggle Status:**

1. Click power button
2. Service enabled/disabled instantly

### **Pricing Management**

**Update Prices:**

1. Navigate to Pricing page
2. Edit prices directly in table
3. Click "Save All Changes"
4. All prices updated

**Reset Changes:**

1. Click "Reset" button
2. Changes discarded

### **Analytics**

**View Statistics:**

- Total services count
- Active vs inactive
- Average pricing
- Price range
- Top performing services
- Distribution charts

---

## 🚀 Deployment

### **Vercel (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### **Netlify**

```bash
npm run build
# Drag & drop 'dist' folder to Netlify
```

### **Other Platforms**

Build the project and upload the `dist` folder to any static hosting service.

---

## 🔒 Security Considerations

### **Current State (Frontend Only)**

- ✅ No sensitive data exposed
- ✅ LocalStorage only
- ✅ No authentication required
- ⚠️ All data visible in browser

### **Backend Ready**

The admin dashboard is designed to easily integrate with a backend:

1. **Replace LocalStorage** with API calls
2. **Add Authentication** (JWT, OAuth)
3. **Role-based Access** Control
4. **Secure API** endpoints
5. **Database** integration

---

## 🎨 Design System

### **Colors**

- **Primary**: Amber (#f59e0b, #f97316)
- **Background**: Black (#000000, #0a0a0a)
- **Surface**: Gray-900 (#111827)
- **Text**: White (#ffffff)
- **Muted**: Gray-400 (#9ca3af)

### **Typography**

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Code**: Monospace

### **Components**

- **Glassmorphism** effects
- **Smooth animations**
- **Hover states**
- **Responsive design**
- **Accessibility** features

---

## 📱 Responsive Design

### **Breakpoints**

```css
sm:   ≥ 640px   (Tablet)
md:   ≥ 768px   (Desktop)
lg:   ≥ 1024px  (Large Desktop)
xl:   ≥ 1280px  (Extra Large)
```

### **Mobile Optimization**

- ✅ Touch-friendly buttons
- ✅ Responsive sidebar
- ✅ Optimized tables
- ✅ Smooth scrolling

---

## 🔧 Customization

### **Add New Pages**

1. Create page in `src/pages/`
2. Add route in `App.tsx`
3. Add menu item in `Sidebar.tsx`

### **Modify Theme**

1. Update colors in `index.css`
2. Modify Tailwind classes
3. Customize components

### **Add Features**

1. Extend AdminContext
2. Create new components
3. Update types

---

## 🐛 Troubleshooting

### **Data Not Persisting**

- Check browser LocalStorage is enabled
- Clear cache and reload
- Check browser console for errors

### **Build Errors**

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Type Errors**

- Ensure TypeScript is up to date
- Check type definitions in `src/types/`
- Run `npm run build` to see all errors

---

## 📚 Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

---

## 🎯 Roadmap

### **Future Enhancements**

- [ ] Backend API integration
- [ ] User authentication
- [ ] Role-based permissions
- [ ] Image upload functionality
- [ ] Advanced analytics
- [ ] Email notifications
- [ ] PDF export
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Booking management

---

## 🤝 Integration with Client App

The admin dashboard manages the same service data that the client-facing app uses:

- **Shared Data Structure**: Both apps use identical TypeScript types
- **Easy Sync**: Export from admin → Import to client
- **Backend Ready**: Both prepared for API integration

---

## 📝 Notes

### **Current Limitations**

- ⚠️ Frontend-only (no backend yet)
- ⚠️ No authentication
- ⚠️ LocalStorage only
- ⚠️ Single admin user

### **Production Recommendations**

1. **Add Backend** API
2. **Implement Auth** (JWT recommended)
3. **Use Database** (PostgreSQL, MongoDB)
4. **Add Logging** and monitoring
5. **Implement Backup** system
6. **Add Rate Limiting**
7. **Enable HTTPS**

---

## 🎉 Features Complete

✅ **Service Management** - Full CRUD operations  
✅ **Pricing Control** - Centralized management  
✅ **Analytics** - Performance insights  
✅ **Data Export/Import** - JSON format  
✅ **Responsive Design** - Mobile-first  
✅ **Type-Safe** - 100% TypeScript  
✅ **Production Ready** - Optimized build

---

## 📧 Support

For issues or questions, refer to:

- Project documentation
- TypeScript docs
- React docs
- Tailwind CSS docs

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
