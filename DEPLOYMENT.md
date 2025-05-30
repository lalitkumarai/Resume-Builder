# Deployment Guide

This guide covers how to deploy the Resume Builder application to various platforms.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB database (local or cloud)
- Git repository

### Environment Setup

1. **Backend Environment Variables**
   Create `server/.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=30d
   PORT=5000
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-domain.com
   ```

2. **Frontend Environment Variables**
   Create `.env` file in root:
   ```env
   REACT_APP_API_URL=https://your-backend-domain.com/api
   ```

## 🌐 Platform-Specific Deployments

### 1. Heroku Deployment

#### Backend (API)
```bash
# Create Heroku app
heroku create your-app-name-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix server heroku main
```

#### Frontend
```bash
# Create separate Heroku app for frontend
heroku create your-app-name-frontend

# Set build pack
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set REACT_APP_API_URL=https://your-app-name-api.herokuapp.com/api

# Deploy
git push heroku main
```

### 2. Vercel Deployment

#### Frontend
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# REACT_APP_API_URL=https://your-backend-domain.com/api
```

#### Backend (Vercel Functions)
Create `vercel.json` in server directory:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.js"
    }
  ]
}
```

### 3. Netlify Deployment

#### Frontend
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'build' folder to Netlify
# Or connect your Git repository
```

Set environment variables in Netlify dashboard:
- `REACT_APP_API_URL`: Your backend API URL

### 4. Railway Deployment

#### Backend
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Frontend
Similar to backend, or deploy to Vercel/Netlify

### 5. DigitalOcean App Platform

Create `app.yaml`:
```yaml
name: resume-builder
services:
- name: api
  source_dir: /server
  github:
    repo: your-username/resume-builder
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: MONGODB_URI
    value: your_mongodb_uri
  - key: JWT_SECRET
    value: your_jwt_secret
  - key: NODE_ENV
    value: production
  http_port: 5000

- name: web
  source_dir: /
  github:
    repo: your-username/resume-builder
    branch: main
  build_command: npm run build
  run_command: npx serve -s build -l 3000
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: REACT_APP_API_URL
    value: ${api.PUBLIC_URL}/api
  http_port: 3000
```

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string
6. Replace `<password>` and `<dbname>` in connection string

### Local MongoDB
```bash
# Install MongoDB
# macOS
brew install mongodb-community

# Ubuntu
sudo apt-get install mongodb

# Start MongoDB
mongod

# Connection string
MONGODB_URI=mongodb://localhost:27017/resume-builder
```

## 🔧 Production Optimizations

### 1. Frontend Optimizations
```bash
# Build with optimizations
npm run build

# Analyze bundle size
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

### 2. Backend Optimizations
- Enable compression middleware
- Set up proper CORS
- Use helmet for security headers
- Implement rate limiting
- Set up logging (Winston)
- Use PM2 for process management

### 3. Database Optimizations
- Create proper indexes
- Set up database monitoring
- Configure connection pooling
- Set up automated backups

## 🔒 Security Checklist

### Environment Variables
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] API keys are not exposed in frontend
- [ ] CORS is properly configured

### Backend Security
- [ ] Helmet middleware enabled
- [ ] Rate limiting implemented
- [ ] Input validation on all routes
- [ ] SQL injection protection
- [ ] XSS protection

### Frontend Security
- [ ] No sensitive data in localStorage
- [ ] HTTPS enforced
- [ ] Content Security Policy headers
- [ ] Secure cookie settings

## 📊 Monitoring & Analytics

### Application Monitoring
- Set up error tracking (Sentry)
- Monitor performance (New Relic)
- Set up uptime monitoring
- Configure log aggregation

### Analytics
- Google Analytics
- User behavior tracking
- Performance metrics
- Error rate monitoring

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install dependencies
      run: |
        npm install
        cd server && npm install
        
    - name: Run tests
      run: npm test
      
    - name: Build frontend
      run: npm run build
      
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "your-app-name"
        heroku_email: "your-email@example.com"
```

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CLIENT_URL in backend .env
   - Verify CORS middleware configuration

2. **Database Connection Issues**
   - Verify MongoDB URI
   - Check network access in MongoDB Atlas
   - Ensure database user has proper permissions

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

4. **Environment Variables Not Loading**
   - Verify .env file location
   - Check variable names (no spaces)
   - Restart application after changes

### Performance Issues
- Enable compression
- Optimize images
- Implement caching
- Use CDN for static assets
- Monitor database queries

## 📞 Support

If you encounter issues during deployment:
1. Check the logs for error messages
2. Verify all environment variables are set
3. Test locally before deploying
4. Check platform-specific documentation
5. Create an issue in the GitHub repository

---

**Happy Deploying! 🚀**
