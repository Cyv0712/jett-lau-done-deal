# Katingin Bikes - Premium Bigbike Platform

A high-performance, cinematic web platform designed for premium motorcycle enthusiasts in the Philippines. This site features a "Dark Showroom" aesthetic, immersive scroll animations, and a transparent inventory management system.

![Project Preview](https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1470&auto=format&fit=crop)

## 🏍️ Features

- **Inventory Showcase:** Real-time motorcycle inventory with high-resolution imagery and "Honest Notes" transparency.
- **Cinematic Experience:** Premium scroll-triggered animations and a "Void Black" design system.
- **Buyer Community:** Dedicated testimonials portal featuring cinematic "Happy Buyer" stories.
- **Direct Conversion:** Optimized for the Philippine market with integrated **WhatsApp**, **Viber**, and **Messenger** direct-action buttons.
- **Admin Dashboard:** Custom-built management system for inventory rotation, sold status toggling, and image uploads.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, React-Bootstrap, Lucide Icons, React Router 7.
- **Backend:** Node.js, Express, MongoDB Atlas.
- **Media:** Cloudinary for optimized image delivery.
- **Styling:** Vanilla CSS with a global CSS Variable theme system and Intersection Observer animations.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account (Optional for local storage)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Cyv0712/katingin-bikes.git

# Install Frontend dependencies
cd frontend
npm install

# Install Backend dependencies
cd ../backend
npm install
```

### 3. Environment Setup
Create a `.env` file in the `/backend` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5174
CLOUDINARY_FOLDER=katingin-bikes/bikes
```

### 4. Run Locally
```bash
# Start Backend (from /backend)
node server.js

# Start Frontend (from /frontend)
npm run dev
```

---

## 🎨 Branding & Customization

The site's identity is centralized for easy updates:

1.  **Identity:** Edit `frontend/src/data/brandConfig.js` to update the Seller Name, Slogan, and "About" narrative.
2.  **Design System:** Modify `frontend/src/index.css` to update the `--accent-primary` (Katingin Gold: `#D4AF37`) and `--bg-void` colors.
3.  **Contact Info:** Edit `frontend/src/data/contactInfo.js` with the active social links and mobile numbers.

---

## 📄 License
Custom license for Katingin Bikes. All rights reserved.
