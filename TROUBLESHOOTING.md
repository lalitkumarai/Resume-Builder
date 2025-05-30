# 🔧 Troubleshooting Guide

## ✅ Quick Fix for Current Errors

### Issues Fixed:
1. **Backend Route Error**: Fixed middleware order in auth routes
2. **Frontend Dependency Conflicts**: Updated package versions for compatibility
3. **TypeScript Compatibility**: Ensured all versions work together
4. **Environment Variables**: Added default .env files

### 🚀 Quick Start (Windows)

**Option 1: Use the Batch Script**
```bash
# Double-click or run:
fix-and-run.bat
```

**Option 2: Manual Installation**
```bash
# Clean install
npm run clean
npm run install-all

# Start the app
npm run dev
```

**Option 3: Force Installation**
```bash
# Remove existing installations
rmdir /s /q node_modules
del package-lock.json
cd server
rmdir /s /q node_modules
del package-lock.json
cd ..

# Force install with legacy peer deps
npm install --legacy-peer-deps --force
cd server && npm install --legacy-peer-deps --force
cd ..

# Start the application
npm run dev
```

## 🔍 Common Issues & Solutions

### 1. Backend Route Error (FIXED)
**Error**: `Route.get() requires a callback function but got a [object Object]`
**Solution**: Fixed middleware order in auth routes

### 2. Frontend Dependency Conflicts (FIXED)
**Error**: `Cannot find module 'ajv/dist/compile/codegen'`
**Solution**: 
- Updated package versions for compatibility
- Added SKIP_PREFLIGHT_CHECK=true
- Used legacy-peer-deps flag

### 3. TypeScript Version Conflicts (FIXED)
**Error**: `ERESOLVE could not resolve typescript`
**Solution**: Downgraded TypeScript to 4.9.5 (compatible with react-scripts 5.0.1)

### 4. MongoDB Connection Issues
**Error**: `MongooseError: Operation buffering timed out`
**Solutions**:
```bash
# Option 1: Use MongoDB Atlas (Cloud)
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free account and cluster
# 3. Get connection string
# 4. Update server/.env with your connection string

# Option 2: Install MongoDB locally
# Download from: https://www.mongodb.com/try/download/community
# Or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Port Already in Use
**Error**: `EADDRINUSE: address already in use :::3000`
**Solutions**:
```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000 5000

# Or find and kill manually:
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

### 6. CORS Errors
**Error**: `Access to XMLHttpRequest blocked by CORS policy`
**Solutions**:
- Verify CLIENT_URL in server/.env is set to http://localhost:3000
- Check that proxy is set in package.json
- Restart both frontend and backend servers

## 🛠️ Development Setup

### Prerequisites
- Node.js 16+ (Download from: https://nodejs.org/)
- MongoDB (Local or Atlas cloud)
- Git (Download from: https://git-scm.com/)

### Environment Variables

**Frontend (.env)**
```env
SKIP_PREFLIGHT_CHECK=true
REACT_APP_API_URL=http://localhost:5000/api
GENERATE_SOURCEMAP=false
```

**Backend (server/.env)**
```env
MONGODB_URI=mongodb://localhost:27017/resume-builder
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRE=30d
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## 🔄 Alternative Installation Methods

### Using Yarn (if npm fails)
```bash
# Install yarn
npm install -g yarn

# Install dependencies
yarn install
cd server && yarn install
cd ..

# Start application
yarn start
```

### Using Different Node Version
```bash
# Install nvm (Node Version Manager)
# Download from: https://github.com/coreybutler/nvm-windows

# Use Node 16
nvm install 16.20.0
nvm use 16.20.0

# Try installation again
npm run install-all
```

## 📊 Verification Steps

### 1. Check Node.js Version
```bash
node --version  # Should be 16.x or higher
npm --version   # Should be 8.x or higher
```

### 2. Check MongoDB Connection
```bash
# If using local MongoDB
mongosh  # Should connect without errors

# If using MongoDB Atlas
# Test connection string in MongoDB Compass
```

### 3. Check Ports
```bash
# Check if ports are free
netstat -ano | findstr :3000
netstat -ano | findstr :5000
```

### 4. Test Backend API
```bash
# After starting the server, test:
curl http://localhost:5000/health
# Should return: {"status":"OK","timestamp":"..."}
```

## 🆘 Still Having Issues?

### 1. Complete Reset
```bash
# Delete everything and start fresh
rmdir /s /q node_modules
rmdir /s /q server\node_modules
del package-lock.json
del server\package-lock.json
npm cache clean --force

# Reinstall
npm run install-all
```

### 2. Check System Requirements
- Windows 10/11
- Node.js 16.x or higher
- At least 4GB RAM
- 2GB free disk space

### 3. Alternative: Use Docker
```bash
# If all else fails, use Docker
docker-compose up --build
```

### 4. Contact Support
If you're still having issues:
1. Check the GitHub Issues page
2. Create a new issue with:
   - Your operating system
   - Node.js version
   - Complete error message
   - Steps you've tried

## ✅ Success Indicators

When everything is working correctly, you should see:

**Frontend (http://localhost:3000)**
- Resume Builder homepage loads
- No console errors
- Navigation works

**Backend (http://localhost:5000)**
- Server starts without errors
- Health check endpoint responds
- Database connection successful

**Both**
- No CORS errors
- API calls work
- Authentication flow functions

---

**Happy Building! 🎉**
