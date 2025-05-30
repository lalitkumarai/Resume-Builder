# OAuth Setup Guide for Resume Builder

This guide explains how to set up real Google and LinkedIn OAuth authentication for your Resume Builder application.

## 🔧 Current Implementation

The application is now configured to redirect to real OAuth providers when users click the Google or LinkedIn buttons. However, you need to set up OAuth applications with each provider to get the required client IDs.

## 🔵 Google OAuth Setup

### Step 1: Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API and Google OAuth2 API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application Type to "Web application"
6. Add Authorized Redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

### Step 2: Configure Environment Variables

```bash
REACT_APP_GOOGLE_CLIENT_ID=your-actual-google-client-id
```

### Step 3: Required Scopes

The application requests these Google scopes:
- `openid` - Basic authentication
- `profile` - User's basic profile info
- `email` - User's email address

## 🔷 LinkedIn OAuth Setup

### Step 1: Create LinkedIn OAuth Application

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Fill in app details and verify your company page
4. Go to "Auth" tab
5. Add Authorized Redirect URLs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://yourdomain.com/auth/callback` (production)

### Step 2: Configure Environment Variables

```bash
REACT_APP_LINKEDIN_CLIENT_ID=your-actual-linkedin-client-id
```

### Step 3: Required Scopes

The application requests these LinkedIn scopes:
- `r_liteprofile` - Basic profile information
- `r_emailaddress` - Email address

## 🔧 Backend Implementation Required

To complete the OAuth flow, you need to implement backend endpoints:

### Required Backend Endpoints

1. **Token Exchange Endpoint**
   ```
   POST /auth/oauth/callback
   ```
   - Receives authorization code from frontend
   - Exchanges code for access token with OAuth provider
   - Gets user profile from OAuth provider
   - Creates/updates user in your database
   - Returns JWT token for your application

2. **User Profile Endpoints**
   ```
   GET /auth/google/profile
   GET /auth/linkedin/profile
   ```
   - Fetch additional user data if needed
   - Update user profile with OAuth data

### Sample Backend Flow (Node.js/Express)

```javascript
// Handle OAuth callback
app.post('/auth/oauth/callback', async (req, res) => {
  const { code, provider, state } = req.body;
  
  try {
    // Exchange code for access token
    const tokenResponse = await exchangeCodeForToken(provider, code);
    
    // Get user profile from OAuth provider
    const userProfile = await getUserProfile(provider, tokenResponse.access_token);
    
    // Create or update user in your database
    const user = await createOrUpdateUser(userProfile, provider);
    
    // Generate JWT token for your app
    const jwtToken = generateJWT(user);
    
    res.json({ success: true, token: jwtToken, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
```

## 🚀 Testing the Implementation

### With Demo Client IDs (Current State)

- Buttons will redirect to OAuth providers
- OAuth providers will show error (invalid client_id)
- Users will see the OAuth flow but can't complete it

### With Real Client IDs

- Buttons redirect to real OAuth login pages
- Users can complete authentication
- Backend receives authorization code
- Users get logged into your application

## 🔒 Security Considerations

1. **Client Secrets**: Never expose client secrets in frontend code
2. **HTTPS**: Use HTTPS in production for OAuth redirects
3. **State Parameter**: Validate state parameter to prevent CSRF attacks
4. **Token Storage**: Store JWT tokens securely (httpOnly cookies recommended)
5. **Scope Limitation**: Only request necessary OAuth scopes

## 📱 Current User Experience

1. User clicks Google/LinkedIn button
2. Browser redirects to OAuth provider login page
3. User logs in with their Google/LinkedIn account
4. OAuth provider redirects back to `/auth/callback`
5. Callback page processes the authentication
6. User is logged into Resume Builder

## 🛠️ Development vs Production

### Development Setup
- Use `http://localhost:3000/auth/callback` as redirect URI
- Test with demo accounts
- Use development OAuth applications

### Production Setup
- Use `https://yourdomain.com/auth/callback` as redirect URI
- Configure production OAuth applications
- Implement proper error handling and logging

## 📋 Next Steps

1. Set up Google OAuth application and get real client ID
2. Set up LinkedIn OAuth application and get real client ID
3. Update environment variables with real client IDs
4. Implement backend OAuth endpoints
5. Test the complete OAuth flow
6. Deploy to production with HTTPS

The frontend OAuth integration is complete and ready to work with real OAuth applications!
