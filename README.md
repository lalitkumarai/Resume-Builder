
# 📄 Resume Builder - Professional Resume Creation Platform

A modern, full-stack web application for creating professional, ATS-friendly resumes. Built with React 18, TypeScript, Node.js, Express, and MongoDB.

![Resume Builder](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)

## 🚀 Features

### ✨ Core Features
- **🎯 Multi-step Resume Builder**: Intuitive form wizard for creating resumes
- **🤖 ATS-Friendly Templates**: Professional templates optimized for Applicant Tracking Systems
- **👀 Real-time Preview**: Live preview of resume as you build it
- **📄 Multiple Export Formats**: Export to PDF, DOCX, and JSON
- **🔐 User Authentication**: Secure login and registration system
- **📁 Resume Management**: Save, edit, and manage multiple resumes
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **🎨 Template Customization**: Multiple color schemes and layouts

### 📋 Resume Sections
- ✅ Personal Information (Contact details, social links)
- ✅ Professional Summary/Objective
- ✅ Work Experience with achievements
- ✅ Education background
- ✅ Technical and soft skills
- ✅ Projects with technologies used
- ✅ Certifications and licenses
- ✅ Languages with proficiency levels
- ✅ Awards and achievements
- ✅ Volunteer experience
- ✅ Publications and conferences
- ✅ References

### 🔥 Advanced Features
- **💾 Auto-save**: Automatic saving of resume progress every 30 seconds
- **🔄 Drag & Drop**: Reorder resume sections
- **🎨 Template Customization**: Multiple color schemes and layouts
- **🔗 Share Resumes**: Public sharing with unique URLs
- **📊 Analytics**: Track resume views and downloads
- **⭐ ATS Optimization**: Built-in ATS score checker and suggestions

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **React Hook Form** for form management
- **Styled Components** for styling
- **Framer Motion** for animations
- **Axios** for API calls
- **React Icons** for iconography

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **Rate limiting** for API protection

### Development Tools
- **TypeScript** for type safety
- **Concurrently** for running dev servers
- **Nodemon** for backend development
- **ESLint** and **Prettier** for code quality

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or cloud instance) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager
- **Git** for cloning the repository

### 📥 Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

#### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install-all

# OR install separately
npm install                    # Frontend dependencies
cd server && npm install      # Backend dependencies
```

## ⚙️ Configuration

### 🔧 Backend Configuration

#### 1. Create Backend Environment File
Create a `.env` file in the `server` directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/resume-builder

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=30d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000

# Email Configuration (Optional - for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # Max requests per window
```

#### 2. MongoDB Setup Options

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Windows: Download from https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Ubuntu: sudo apt install mongodb

# Start MongoDB service
# Windows: Start MongoDB service from Services
# macOS/Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
```bash
# 1. Create account at https://www.mongodb.com/atlas
# 2. Create a cluster
# 3. Get connection string
# 4. Update MONGODB_URI in .env file
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/resume-builder
```

### 🎨 Frontend Configuration

#### 1. Create Frontend Environment File
Create a `.env` file in the **root directory**:

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_NAME=Resume Builder
REACT_APP_VERSION=1.0.0

# Feature Flags (Optional)
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_SOCIAL_LOGIN=true
```

## 🔧 Detailed Setup Instructions

### 🖥️ Backend Setup (Node.js + Express + MongoDB)

#### Step 1: Backend Dependencies Installation
```bash
# Navigate to server directory
cd server

# Install backend dependencies
npm install

# Verify installation
npm list --depth=0
```

#### Step 2: Database Setup
**Local MongoDB Setup:**
```bash
# Windows (using MongoDB Community Edition)
# 1. Download from https://www.mongodb.com/try/download/community
# 2. Install with default settings
# 3. Start MongoDB service:
net start MongoDB

# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt update
sudo apt install mongodb
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
mongosh
# Should connect without errors
```

**MongoDB Atlas (Cloud) Setup:**
```bash
# 1. Go to https://www.mongodb.com/atlas
# 2. Create free account
# 3. Create cluster (free tier available)
# 4. Create database user
# 5. Whitelist IP addresses (0.0.0.0/0 for development)
# 6. Get connection string
# 7. Update .env file with connection string
```

#### Step 3: Backend Environment Configuration
```bash
# Create .env file in server directory
cd server
touch .env  # Linux/macOS
# OR
echo. > .env  # Windows

# Add the following content to server/.env:
```

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/resume-builder
# OR for Atlas: mongodb+srv://username:password@cluster.mongodb.net/resume-builder

# JWT Configuration (IMPORTANT: Use a strong secret in production)
JWT_SECRET=your-super-secret-jwt-key-should-be-at-least-32-characters-long
JWT_EXPIRE=30d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # Max requests per window

# Email Configuration (Optional - for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password  # Use app-specific password for Gmail

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_PATH=./uploads

# Security Configuration
BCRYPT_ROUNDS=12
SESSION_SECRET=another-super-secret-key-for-sessions
```

#### Step 4: Start Backend Server
```bash
# From server directory
cd server

# Development mode (with auto-restart)
npm run dev

# OR production mode
npm start

# Verify server is running
curl http://localhost:5000/health
# Should return: {"status":"OK","timestamp":"...","uptime":...}
```

### 🎨 Frontend Setup (React + TypeScript)

#### Step 1: Frontend Dependencies Installation
```bash
# Navigate to root directory (where package.json is located)
cd ..  # if you're in server directory

# Install frontend dependencies
npm install

# Verify installation
npm list --depth=0
```

#### Step 2: Frontend Environment Configuration
```bash
# Create .env file in root directory
touch .env  # Linux/macOS
# OR
echo. > .env  # Windows

# Add the following content to .env:
```

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_NAME=Resume Builder
REACT_APP_VERSION=1.0.0
REACT_APP_DESCRIPTION=Professional Resume Builder

# Feature Flags
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_SOCIAL_LOGIN=true
REACT_APP_ENABLE_DARK_MODE=true

# Development Configuration
REACT_APP_DEBUG=true
GENERATE_SOURCEMAP=true

# Build Configuration
REACT_APP_BUILD_DATE=$npm_config_build_date
PUBLIC_URL=/

# Optional: Google Analytics (if you have it)
REACT_APP_GA_TRACKING_ID=GA_MEASUREMENT_ID

# Optional: Social Login Configuration
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_FACEBOOK_APP_ID=your-facebook-app-id
REACT_APP_LINKEDIN_CLIENT_ID=your-linkedin-client-id
```

#### Step 3: Start Frontend Development Server
```bash
# From root directory
npm start

# The development server will start on http://localhost:3000
# Browser should automatically open
# Hot reloading is enabled - changes will reflect immediately
```

#### Step 4: Verify Frontend Setup
```bash
# Check if frontend can communicate with backend
# Open browser console and check for any CORS errors
# Navigate to http://localhost:3000
# Try registering a new user to test full stack integration
```

## 🏃‍♂️ Running the Application

### 🔄 Development Mode (Recommended)

#### Method 1: Run Both Frontend and Backend Together
```bash
# From the root directory
npm run dev
```
This command will:
- Start the backend server on `http://localhost:5000`
- Start the frontend development server on `http://localhost:3000`
- Enable hot reloading for both frontend and backend

#### Method 2: Run Frontend and Backend Separately

**Terminal 1 - Backend Server:**
```bash
cd server
npm start
# OR for development with auto-restart
npm run dev
```

**Terminal 2 - Frontend Development Server:**
```bash
# From root directory
npm start
```

### 🚀 Production Mode

#### Build and Run
```bash
# Build the frontend
npm run build

# Start the production server
cd server
npm start
```

#### Using PM2 (Recommended for production)
```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server/app.js --name "resume-builder"

# Monitor the application
pm2 monit

# Stop the application
pm2 stop resume-builder
```

### 🐳 Docker Deployment

#### Using Docker Compose
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d --build

# Stop the containers
docker-compose down
```

#### Manual Docker Build
```bash
# Build the frontend
npm run build

# Build Docker image
docker build -t resume-builder .

# Run the container
docker run -p 5000:5000 --env-file server/.env resume-builder
```

### 🔍 Verification Steps

After starting the application, verify everything is working:

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"status":"OK","timestamp":"...","uptime":...}`

2. **Frontend Access:**
   - Open `http://localhost:3000` in your browser
   - You should see the Resume Builder homepage

3. **Database Connection:**
   - Check the backend terminal for "MongoDB Connected" message
   - No database connection errors should appear

### 🛠️ Troubleshooting

#### Common Issues and Solutions

**Issue: "ECONNREFUSED" errors**
```bash
# Solution: Make sure MongoDB is running
# Windows: Check Services for MongoDB
# macOS/Linux: sudo systemctl status mongod
```

**Issue: "Port already in use"**
```bash
# Find and kill process using the port
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

**Issue: TypeScript compilation errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear TypeScript cache
npx tsc --build --clean
```

**Issue: MongoDB connection failed**
```bash
# Check MongoDB status
# Local: mongosh (should connect without errors)
# Atlas: Verify connection string and network access
```

## 📁 Project Structure

```
resume-builder/
├── 📁 public/                    # Static files and assets
│   ├── index.html               # Main HTML template
│   ├── favicon.ico              # App favicon
│   └── manifest.json            # PWA manifest
├── 📁 src/                      # Frontend source code (React + TypeScript)
│   ├── 📁 components/           # Reusable React components
│   │   ├── 📁 Auth/            # Authentication components
│   │   │   ├── Login.tsx       # Login form component
│   │   │   ├── Register.tsx    # Registration form
│   │   │   ├── PrivateRoute.tsx # Protected route wrapper
│   │   │   └── SocialLoginButtons.tsx # Social login buttons
│   │   ├── 📁 Forms/           # Form components for resume sections
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── WorkExperienceForm.tsx
│   │   │   ├── EducationForm.tsx
│   │   │   ├── SkillsForm.tsx
│   │   │   └── ProjectsForm.tsx
│   │   ├── 📁 Layout/          # Layout components
│   │   │   ├── Header.tsx      # App header with navigation
│   │   │   ├── Footer.tsx      # App footer
│   │   │   └── Sidebar.tsx     # Navigation sidebar
│   │   ├── 📁 ResumeBuilder/   # Resume builder specific components
│   │   │   ├── StepNavigation.tsx
│   │   │   ├── ResumePreview.tsx
│   │   │   ├── SaveIndicator.tsx
│   │   │   └── DetailedResumeBuilder.tsx
│   │   ├── 📁 Templates/       # Resume template components
│   │   │   ├── TemplatePreviewModal.tsx
│   │   │   └── 📁 templates/   # Individual template designs
│   │   │       ├── ClassicElegantTemplate.tsx
│   │   │       ├── ModernProfessionalTemplate.tsx
│   │   │       ├── CreativeDesignerTemplate.tsx
│   │   │       └── MinimalistCleanTemplate.tsx
│   │   ├── 📁 ATS/             # ATS optimization components
│   │   │   ├── ATSOptimizer.tsx
│   │   │   └── ATSTips.tsx
│   │   └── 📁 Tips/            # Help and tips components
│   │       └── ResumeTips.tsx
│   ├── 📁 context/             # React Context providers
│   │   ├── AuthContext.tsx     # Authentication state management
│   │   └── ResumeContext.tsx   # Resume data state management
│   ├── 📁 pages/               # Page components (routes)
│   │   ├── Home.tsx            # Landing page
│   │   ├── Dashboard.tsx       # User dashboard
│   │   ├── ResumeBuilder.tsx   # Resume builder page
│   │   ├── Templates.tsx       # Template selection page
│   │   ├── Profile.tsx         # User profile page
│   │   ├── Blog.tsx            # Blog listing page
│   │   ├── BlogPost.tsx        # Individual blog post
│   │   └── 📁 Auth/           # Authentication pages
│   │       ├── Login.tsx
│   │       ├── Register.tsx
│   │       └── OAuthCallback.tsx
│   ├── 📁 services/            # API service functions
│   │   ├── api.ts              # Main API client
│   │   └── atsOptimization.ts  # ATS optimization service
│   ├── 📁 types/               # TypeScript type definitions
│   │   ├── resume.ts           # Resume-related types
│   │   ├── templates.ts        # Template types
│   │   └── coverLetter.ts      # Cover letter types
│   ├── 📁 data/                # Static data and configurations
│   │   ├── templates.ts        # Template configurations
│   │   ├── blogPosts.ts        # Blog post data
│   │   └── resumeTemplateGuide.ts
│   ├── 📁 config/              # App configuration
│   │   └── socialProviders.ts  # Social login providers config
│   ├── App.tsx                 # Main App component
│   ├── App.css                 # Global styles
│   ├── index.tsx               # React app entry point
│   └── react-app-env.d.ts      # React TypeScript declarations
├── 📁 server/                  # Backend source code (Node.js + Express)
│   ├── 📁 controllers/         # Route controllers (business logic)
│   │   ├── authController.js   # Authentication logic
│   │   ├── resumeController.js # Resume CRUD operations
│   │   ├── templateController.js # Template management
│   │   └── userController.js   # User management
│   ├── 📁 middleware/          # Express middleware
│   │   ├── auth.js             # JWT authentication middleware
│   │   ├── errorHandler.js     # Global error handling
│   │   ├── notFound.js         # 404 handler
│   │   └── validation.js       # Input validation middleware
│   ├── 📁 models/              # MongoDB models (Mongoose schemas)
│   │   ├── User.js             # User model
│   │   ├── Resume.js           # Resume model
│   │   ├── Template.js         # Template model
│   │   └── Subscription.js     # Subscription model
│   ├── 📁 routes/              # API route definitions
│   │   ├── auth.js             # Authentication routes
│   │   ├── resumes.js          # Resume routes
│   │   ├── templates.js        # Template routes
│   │   └── users.js            # User routes
│   ├── 📁 utils/               # Utility functions
│   │   ├── generatePDF.js      # PDF generation utility
│   │   ├── emailService.js     # Email sending service
│   │   └── validators.js       # Custom validation functions
│   ├── app.js                  # Express app setup and configuration
│   ├── package.json            # Backend dependencies
│   └── .env                    # Backend environment variables
├── 📁 docker/                  # Docker configuration files
│   ├── Dockerfile              # Docker image definition
│   └── docker-compose.yml      # Multi-container setup
├── 📁 docs/                    # Documentation files
│   ├── API.md                  # API documentation
│   ├── DEPLOYMENT.md           # Deployment guide
│   └── CONTRIBUTING.md         # Contribution guidelines
├── package.json                # Frontend dependencies and scripts
├── package-lock.json           # Dependency lock file
├── tsconfig.json               # TypeScript configuration
├── .gitignore                  # Git ignore rules
├── .env                        # Frontend environment variables
└── README.md                   # This file
```

## 🔧 API Documentation

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register new user | ❌ |
| `POST` | `/api/auth/login` | Login user | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ |
| `PUT` | `/api/auth/profile` | Update user profile | ✅ |
| `PUT` | `/api/auth/change-password` | Change user password | ✅ |
| `POST` | `/api/auth/forgot-password` | Request password reset | ❌ |
| `POST` | `/api/auth/reset-password` | Reset password with token | ❌ |
| `POST` | `/api/auth/logout` | Logout user | ✅ |

### 📄 Resume Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/resumes` | Get user's resumes | ✅ |
| `POST` | `/api/resumes` | Create new resume | ✅ |
| `GET` | `/api/resumes/:id` | Get specific resume | ✅ |
| `PUT` | `/api/resumes/:id` | Update resume | ✅ |
| `DELETE` | `/api/resumes/:id` | Delete resume | ✅ |
| `POST` | `/api/resumes/:id/duplicate` | Duplicate resume | ✅ |
| `GET` | `/api/resumes/:id/export/:format` | Export resume (PDF/DOCX) | ✅ |
| `PUT` | `/api/resumes/:id/share` | Toggle resume sharing | ✅ |
| `GET` | `/api/resumes/:id/analytics` | Get resume analytics | ✅ |

### 🎨 Template Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/templates` | Get available templates | ❌ |
| `GET` | `/api/templates/:id` | Get specific template | ❌ |
| `GET` | `/api/templates/categories` | Get template categories | ❌ |

### 👤 User Management Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/users/profile` | Get user profile | ✅ |
| `PUT` | `/api/users/profile` | Update user profile | ✅ |
| `DELETE` | `/api/users/account` | Delete user account | ✅ |
| `GET` | `/api/users/subscription` | Get subscription status | ✅ |

### 🔍 Health Check

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/health` | Server health check | ❌ |

## 🎨 Resume Templates

### 📋 Available Templates

| Template | Description | Best For | ATS Score |
|----------|-------------|----------|-----------|
| **🏛️ Classic Elegant** | Clean, professional design with traditional layout | Corporate roles, traditional industries | ⭐⭐⭐⭐⭐ |
| **🚀 Modern Professional** | Contemporary design with subtle colors | Tech roles, modern companies | ⭐⭐⭐⭐⭐ |
| **🎨 Creative Designer** | Unique layout with creative elements | Design roles, creative industries | ⭐⭐⭐ |
| **✨ Minimalist Clean** | Simple, distraction-free layout | Any industry, clean aesthetic | ⭐⭐⭐⭐⭐ |

### 🎯 Template Features
- ✅ **Responsive Design**: Perfect on all devices
- ✅ **Print-Optimized**: Professional printing layouts
- ✅ **ATS-Friendly**: Optimized for Applicant Tracking Systems
- ✅ **Customizable Colors**: Multiple color scheme options
- ✅ **Font Controls**: Adjustable font sizes and families
- ✅ **Section Reordering**: Drag and drop section arrangement
- ✅ **Export Options**: PDF, DOCX, and JSON formats
- ✅ **Real-time Preview**: See changes instantly

### 🎨 Customization Options
- **Color Schemes**: 12+ professional color combinations
- **Typography**: 8+ professional font families
- **Layout**: Adjustable margins and spacing
- **Sections**: Show/hide optional sections
- **Order**: Rearrange sections to fit your needs

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers
- MongoDB injection protection

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🚀 Deployment Guide

### 🌐 Frontend Deployment

#### Netlify Deployment
```bash
# 1. Build the project
npm run build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy to Netlify
netlify deploy --prod --dir=build
```

#### Vercel Deployment
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy (from root directory)
vercel --prod
```

#### Manual Deployment
```bash
# 1. Build the project
npm run build

# 2. Upload the 'build' folder to your hosting service
# 3. Configure environment variables:
#    - REACT_APP_API_URL=https://your-backend-url.com/api
```

### 🖥️ Backend Deployment

#### Heroku Deployment
```bash
# 1. Install Heroku CLI
# 2. Login to Heroku
heroku login

# 3. Create Heroku app
heroku create your-app-name

# 4. Set environment variables
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set NODE_ENV=production

# 5. Deploy
git subtree push --prefix server heroku main
```

#### Railway Deployment
```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login and deploy
railway login
railway deploy
```

#### DigitalOcean App Platform
```bash
# 1. Connect your GitHub repository
# 2. Configure build settings:
#    - Build Command: cd server && npm install
#    - Run Command: cd server && npm start
# 3. Set environment variables in the dashboard
```

### 🐳 Docker Deployment

#### Production Docker Setup
```bash
# 1. Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up --build -d

# 2. Check logs
docker-compose logs -f

# 3. Stop containers
docker-compose down
```

#### Custom Docker Build
```bash
# 1. Build frontend
npm run build

# 2. Build Docker image
docker build -t resume-builder:latest .

# 3. Run container
docker run -d \
  --name resume-builder \
  -p 5000:5000 \
  --env-file server/.env \
  resume-builder:latest
```

## 📊 Performance & Monitoring

### 🔍 Application Monitoring
```bash
# Backend health check
curl http://localhost:5000/health

# Frontend build analysis
npm run build
npx serve -s build

# Performance testing
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### 📈 Database Monitoring
```bash
# MongoDB connection check
mongosh mongodb://localhost:27017/resume-builder

# Check database size
db.stats()

# Monitor collections
db.resumes.countDocuments()
db.users.countDocuments()
```

## 🧪 Testing

### Frontend Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- PersonalInfoForm.test.tsx
```

### Backend Testing
```bash
cd server

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

### End-to-End Testing
```bash
# Install Cypress
npm install -g cypress

# Run E2E tests
cypress open
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

### 🔧 Development Setup
1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/resume-builder.git
   cd resume-builder
   ```
3. **Install dependencies:**
   ```bash
   npm run install-all
   ```
4. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
5. **Make your changes and test thoroughly**
6. **Commit your changes:**
   ```bash
   git commit -m 'Add amazing feature'
   ```
7. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Submit a Pull Request**

### 📝 Contribution Guidelines
- Follow the existing code style
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Use meaningful commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Help

### 🐛 Found a Bug?
1. Check [existing issues](https://github.com/yourusername/resume-builder/issues)
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node.js version)

### 💡 Feature Requests
1. Check if the feature already exists or is planned
2. Create a feature request issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

### 📧 Contact
- **Email**: support@resumebuilder.com
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/resume-builder/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/resume-builder/wiki)

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **MongoDB Team** - For the robust database solution
- **Express.js Team** - For the excellent web framework
- **TypeScript Team** - For bringing type safety to JavaScript
- **All Contributors** - Thank you for making this project better!

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/resume-builder)
![GitHub forks](https://img.shields.io/github/forks/yourusername/resume-builder)
![GitHub issues](https://img.shields.io/github/issues/yourusername/resume-builder)
![GitHub license](https://img.shields.io/github/license/yourusername/resume-builder)

---

**🎯 Built with ❤️ for job seekers worldwide**

*Helping professionals create outstanding resumes that get noticed by employers and pass through ATS systems.*


