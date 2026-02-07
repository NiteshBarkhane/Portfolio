# 🚀 Nitesh Barkhane - Portfolio Website

A modern, full-stack portfolio website built with the MERN stack, featuring a dynamic admin panel for content management.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Admin Panel](#admin-panel)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)

## ✨ Features

### Frontend
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Fast performance with React + Vite
- 🎭 Smooth animations with Framer Motion
- 📱 Mobile-first design
- 🔄 Dynamic content loading from backend
- 📧 Contact form with validation
- 🎯 Project filtering by category
- 🔝 Back to top button
- 🌙 Dark theme with neon accents

### Backend
- 🔐 Secure admin authentication with JWT
- 📊 RESTful API with Express.js
- 💾 MongoDB database with Mongoose
- 🖼️ Image upload with Cloudinary
- 🛡️ Security features (Helmet, XSS protection, sanitization)
- 📨 Email notifications with Nodemailer
- 🔄 CORS enabled for cross-origin requests

### Admin Panel
- ✏️ Edit all website content dynamically
- 📁 Manage projects, services, and categories
- 📬 View contact form inquiries
- 🖼️ Upload and manage images
- 🎨 Custom SVG icon system
- 📊 Organized dashboard

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router DOM** - Routing
- **React Hook Form** - Form handling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image hosting
- **Multer** - File uploads
- **Nodemailer** - Email service

## 📁 Project Structure

```
Nitesh Portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout components
│   │   ├── context/       # React context
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── index.js          # Server entry point
│   ├── seed.js           # Database seeding
│   └── setup-admin.js    # Admin setup script
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/NiteshBarkhane/portfolio.git
cd "Nitesh Portfolio"
```

2. **Install dependencies**

Frontend:
```bash
cd client
npm install
```

Backend:
```bash
cd server
npm install
```

3. **Set up environment variables** (see [Environment Variables](#environment-variables))

4. **Seed the database**
```bash
cd server
npm run seed
```

5. **Create admin account**
```bash
npm run setup-admin
```

6. **Start development servers**

Backend (from server folder):
```bash
npm run dev
```

Frontend (from client folder):
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` and backend on `http://localhost:5000`

## 🔐 Environment Variables

### Server (.env in server folder)

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/portfolio
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# JWT
JWT_SECRET=your_super_secret_jwt_key_here

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=5000
NODE_ENV=development
```

### Client
No environment variables needed for development. For production, update API URLs in the code.

## 📖 Usage

### For Visitors
1. Browse the portfolio sections (Hero, About, Services, Projects, Contact)
2. Filter projects by category
3. Click "See More" to view all projects
4. Submit inquiries through the contact form

### For Admin
1. Navigate to `/login`
2. Enter admin credentials
3. Access the admin panel at `/admin`
4. Manage content through the dashboard

## 🎛️ Admin Panel

### Features
- **CMS**: Edit all website text content (hero, about, services, etc.)
- **Projects**: Add, edit, delete projects with images
- **Services**: Manage service offerings with custom SVG icons
- **Categories**: Create project categories
- **Inquiries**: View contact form submissions

### Adding Custom Icons
The project uses a custom SVG icon system. To add icons:

1. Find an icon from [Heroicons](https://heroicons.com/), [Feather Icons](https://feathericons.com/), or [Lucide](https://lucide.dev/)
2. Copy the SVG path (the `d` attribute from the `<path>` tag)
3. In Admin Panel > Services, paste the path in the "SVG Path" field
4. Preview before saving

Example SVG paths:
- **Code**: `M16 18l6-6-6-6M8 6l-6 6 6 6`
- **Smartphone**: `M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM12 18h.01`
- **Database**: `M12 2C6.5 2 2 3.79 2 6v12c0 2.21 4.5 4 10 4s10-1.79 10-4V6c0-2.21-4.5-4-10-4zM2 12c0 2.21 4.5 4 10 4s10-1.79 10-4`

## 🔌 API Endpoints

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/services` - Get all services
- `GET /api/categories` - Get all categories
- `GET /api/settings` - Get all settings
- `POST /api/contact` - Submit contact form

### Protected Routes (require JWT)
- `POST /api/auth/login` - Admin login
- `PUT /api/settings/:id` - Update setting
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service
- `GET /api/contact` - Get all inquiries
- `DELETE /api/contact/:id` - Delete inquiry

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project:
```bash
cd client
npm run build
```
2. Deploy the `dist` folder
3. Update API URLs to point to your backend

### Backend (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Update `MONGO_URI` in environment variables

### Images (Cloudinary)
1. Create account on [Cloudinary](https://cloudinary.com/)
2. Get API credentials
3. Update environment variables

## 📝 Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with initial data
- `npm run setup-admin` - Create admin account

## 🔒 Security Features
- JWT-based authentication
- Password hashing with bcrypt
- XSS protection
- MongoDB sanitization
- Helmet security headers
- CORS configuration
- Input validation

## 🎨 Customization

### Colors (Tailwind Config)
Edit `client/tailwind.config.js`:
```js
colors: {
  primary: '#0a0a0f',
  secondary: '#1a1a2e',
  accent: '#7c3aed',
  textMain: '#e0e0e0',
  textSecondary: '#a0a0a0',
}
```

### Content
All content is editable through the admin panel without touching code.

## 📧 Contact
- **Email**: niteshbarkhane123@gmail.com
- **LinkedIn**: [Nitesh Barkhane](https://www.linkedin.com/in/nitesh-barkhane-66060b342/)
- **GitHub**: [NiteshBarkhane](https://github.com/NiteshBarkhane)
- **Location**: Indore, India

## 📄 License
This project is open source and available for personal and commercial use.

---

**Built with ❤️ by Nitesh Barkhane**
