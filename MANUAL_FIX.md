# 🔧 Manual Fix Guide - Step by Step

## Issues Identified:
1. **Backend Route Error**: Fixed middleware import in auth.js
2. **Frontend Dependency Conflict**: ajv module version mismatch

## 🚀 Quick Fix Commands

### Option 1: Complete Clean Install
```bash
# 1. Clean everything
rmdir /s /q node_modules
del package-lock.json
cd server
rmdir /s /q node_modules
del package-lock.json
cd ..

# 2. Clear npm cache
npm cache clean --force

# 3. Install with specific flags
npm install --legacy-peer-deps --force
cd server && npm install --legacy-peer-deps --force
cd ..

# 4. Start the application
npm run dev
```

### Option 2: Use the Batch Scripts
```bash
# Run the automated fix
fix-and-run.bat

# Or try the quick fix
quick-fix.bat
```

### Option 3: Alternative Package.json (No TypeScript)
```bash
# Backup current package.json
copy package.json package-backup.json

# Use the simplified version
copy package-simple.json package.json

# Clean install
rmdir /s /q node_modules
npm install --legacy-peer-deps --force

# Start the app
npm run dev
```

## 🔍 Specific Fixes Applied

### Backend Route Error (FIXED)
**File**: `server/routes/auth.js`
**Change**: 
```javascript
// Before (WRONG)
const auth = require('../middleware/auth');

// After (CORRECT)
const { auth } = require('../middleware/auth');
```

### Frontend Dependency Issues
**File**: `package.json`
**Changes**:
- Moved TypeScript types to devDependencies
- Added ajv resolution
- Updated dependency versions for compatibility

## 🛠️ If Issues Persist

### 1. Check Node.js Version
```bash
node --version
# Should be 16.x or higher, but not 22.x (too new)
```

### 2. Use Node Version Manager
```bash
# Install nvm-windows from: https://github.com/coreybutler/nvm-windows
nvm install 18.17.0
nvm use 18.17.0
```

### 3. Alternative: Use Yarn
```bash
npm install -g yarn
yarn install
cd server && yarn install
cd ..
yarn start
```

### 4. Check for Port Conflicts
```bash
# Kill processes on ports 3000 and 5000
netstat -ano | findstr :3000
netstat -ano | findstr :5000
# Kill the PID if found
taskkill /PID <PID_NUMBER> /F
```

### 5. MongoDB Setup
```bash
# Option 1: Use MongoDB Atlas (Cloud)
# 1. Go to https://www.mongodb.com/cloud/atlas
# 2. Create free account
# 3. Create cluster
# 4. Get connection string
# 5. Update server/.env

# Option 2: Install MongoDB locally
# Download from: https://www.mongodb.com/try/download/community
```

## 📋 Verification Steps

### 1. Backend Health Check
```bash
# After starting the server, test:
curl http://localhost:5000/health
# Should return: {"status":"OK",...}
```

### 2. Frontend Loading
- Open http://localhost:3000
- Should see Resume Builder homepage
- No console errors in browser

### 3. API Connection
- Check browser Network tab
- API calls should go to localhost:5000
- No CORS errors

## 🆘 Emergency Fallback

If nothing works, try this minimal setup:

### 1. Create New React App
```bash
# In a new folder
npx create-react-app resume-builder-new
cd resume-builder-new

# Copy our source files
xcopy /s ..\Resume-Builder\src .\src\
xcopy /s ..\Resume-Builder\public .\public\

# Install additional dependencies
npm install axios react-router-dom styled-components react-icons react-hook-form react-toastify framer-motion uuid date-fns --legacy-peer-deps

# Start
npm start
```

### 2. Copy Backend
```bash
# Copy the entire server folder
xcopy /s ..\Resume-Builder\server .\server\

# Install backend dependencies
cd server
npm install --legacy-peer-deps
cd ..

# Start both
npm run dev
```

## 📞 Success Indicators

✅ **Backend Working**:
- Server starts without errors
- Health endpoint responds
- No route errors in console

✅ **Frontend Working**:
- React app loads at localhost:3000
- No dependency errors
- Components render correctly

✅ **Integration Working**:
- API calls succeed
- No CORS errors
- Authentication flow works

---

**If you're still having issues, try the emergency fallback method above!**
