# EasyKart.site - Modern eCommerce Platform

A full-stack eCommerce platform for daily essentials with modern design and seamless user experience.

## 🚀 Features

### Frontend (Next.js)
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Product Catalog**: Browse products with filtering and pagination
- **Shopping Cart**: Add/remove items with real-time updates
- **User Authentication**: JWT-based login/register system
- **Order Management**: Place orders and track shipments
- **Admin Panel**: Complete admin dashboard for management
- **SEO**: Dynamic meta tags for better search visibility
- **Accessibility**: Semantic HTML and alt text for images
- **Error Handling**: User-friendly error messages and error boundaries
- **Loading States**: Skeleton loaders for async data

### Backend (Node.js + Express)
- **RESTful API**: Well-structured API endpoints
- **MongoDB Integration**: Efficient data storage with Mongoose
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Order Processing**: Complete order management system
- **Admin Features**: User, product, and order management
- **PayU Integration**: Secure payment processing
- **Rate Limiting**: Prevent brute force attacks on auth endpoints
- **Validation**: All major routes use express-validator
- **Logging**: Winston for error and info logging

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Payment**: PayU India (Sandbox)
- **Deployment**: Vercel (Frontend), Render (Backend)

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- MongoDB Atlas account
- PayU India account (for payments)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up your `.env` file (see `.env.example`):
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/easykart
JWT_SECRET=your-super-secret-jwt-key-here
PAYU_KEY=your-payu-merchant-key
PAYU_SALT=your-payu-salt-key
PAYU_BASE_URL=https://sandboxsecure.payu.in
PORT=5000
```

4. Seed an admin user:
```bash
node seedAdmin.js
```

5. Start backend:
```bash
node server.js
```

### Frontend Setup

1. Navigate to the root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend:
```bash
npm run dev
```

## Deployment
- Frontend: Vercel
- Backend: Render, Railway, or your own server

## Security
- Never commit `.env` files
- Use strong secrets for JWT and database

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Samuel Ralte
- **Email**: samvohlu01@gmail.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database solution
- PayU India for payment processing
- Pexels for stock images

---

**EasyKart.site** - Your trusted partner for daily essentials! 🛒