# Wedding Moments Studio Freelance Project - Photography Booking Platform

A modern, production-ready React frontend application for a professional photography studio built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Features

### Pages

- **Home Page**: Full-width hero section with parallax effect and call-to-action buttons
- **Services Page**: Grid layout displaying all photography services
- **Service Details Page**: Interactive sub-service selection with day counter and automatic pricing
- **Cart Page**: Complete booking summary with WhatsApp and Gmail integration
- **About Page**: Studio information and contact details

### Functionality

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Global cart state management using React Context API
- ✅ Dynamic pricing calculation
- ✅ WhatsApp booking integration
- ✅ Gmail booking integration
- ✅ Smooth animations and transitions
- ✅ Professional UI/UX design

## 📦 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Router DOM** - Routing
- **Context API** - State management

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ServiceCard.tsx
│   └── HeroSection.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Services.tsx
│   ├── ServiceDetails.tsx
│   ├── Cart.tsx
│   └── About.tsx
├── context/            # React Context
│   └── CartContext.tsx
├── data/               # Static data
│   └── services.ts
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🎨 Services Available

1. **Baby Shoot** - Professional baby photography
2. **Pre-Wedding Shoot** - Romantic pre-wedding sessions
3. **Outdoor Shoot** - Natural location photography
4. **Birthday Shoot** - Birthday celebration coverage
5. **Film Shoot** - Commercial cinematography

Each service includes multiple sub-services:

- Photo Shoot Service
- Videography Service
- Drone Shoot Service
- Additional specialized services

## 🔧 Configuration

### Contact Information

Update contact details in:

- `src/components/Footer.tsx`
- `src/components/Header.tsx`
- `src/pages/Cart.tsx` (WhatsApp number and email)

### Services Data

Modify services in `src/data/services.ts` to add/edit photography packages.

## 📱 Booking Flow

1. Browse services on the Services page
2. Click "View Services" on any service card
3. Select sub-services and choose number of days
4. View automatic price calculation
5. Add to cart
6. Review cart and total price
7. Send booking request via WhatsApp or Gmail

## 🎯 Key Features Explained

### Cart Management

- Add multiple services to cart
- Remove individual services
- Clear entire cart
- Persistent cart state across pages
- Real-time total calculation

### Booking Integration

- **WhatsApp**: Formatted message with all booking details
- **Gmail**: Email with complete service breakdown

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly UI elements

## 🌟 Design Highlights

- Modern glassmorphism effects
- Smooth animations and transitions
- Premium color palette (amber/gold theme)
- Professional typography (Playfair Display + Inter)
- Dark theme optimized for photography showcase

## 📞 Contact

- **Email**: info@weddingmoments.com
- **Phone**: +91 98765 43210
- **WhatsApp**: +91 98765 43210

## 📄 License

© 2026 Wedding Moments Studio. All rights reserved.
