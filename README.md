
# Resume Builder - Professional Resume Creation Platform

A modern, full-stack web application for creating professional, ATS-friendly resumes. Built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Core Features
- **Multi-step Resume Builder**: Intuitive form wizard for creating resumes
- **ATS-Friendly Templates**: Professional templates optimized for Applicant Tracking Systems
- **Real-time Preview**: Live preview of resume as you build it
- **Multiple Export Formats**: Export to PDF, DOCX, and JSON
- **User Authentication**: Secure login and registration system
- **Resume Management**: Save, edit, and manage multiple resumes
- **Responsive Design**: Works perfectly on desktop and mobile devices

### Resume Sections
- Personal Information (Contact details, social links)
- Professional Summary/Objective
- Work Experience with achievements
- Education background
- Technical and soft skills
- Projects with technologies used
- Certifications and licenses
- Languages with proficiency levels
- Awards and achievements
- Volunteer experience
- Publications and conferences
- References

### Advanced Features
- **Auto-save**: Automatic saving of resume progress
- **Drag & Drop**: Reorder resume sections
- **Template Customization**: Multiple color schemes and layouts
- **Share Resumes**: Public sharing with unique URLs
- **Analytics**: Track resume views and downloads
- **Subscription Management**: Free and premium tiers

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

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Clone the Repository
```bash
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder
```

### Install Dependencies
```bash
# Install frontend and backend dependencies
npm run install-all
```

### Environment Variables
Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/resume-builder

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d

# Server
PORT=5000
NODE_ENV=development

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000

# Email (optional - for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

Create a `.env` file in the root directory for frontend:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Run the Application

#### Development Mode
```bash
# Run both frontend and backend concurrently
npm run dev
```

#### Production Mode
```bash
# Build frontend
npm run build

# Start production server
npm run server
```

## 📁 Project Structure

```
resume-builder/
├── public/                 # Static files
├── src/                   # Frontend source code
│   ├── components/        # React components
│   │   ├── Auth/         # Authentication components
│   │   ├── Forms/        # Form components
│   │   ├── Layout/       # Layout components
│   │   ├── ResumeBuilder/ # Resume builder components
│   │   └── Templates/    # Resume templates
│   ├── context/          # React context providers
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   └── index.tsx         # Entry point
├── server/               # Backend source code
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── app.js            # Express app setup
├── package.json          # Frontend dependencies
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Resumes
- `GET /api/resumes` - Get user's resumes
- `POST /api/resumes` - Create new resume
- `GET /api/resumes/:id` - Get specific resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume
- `POST /api/resumes/:id/duplicate` - Duplicate resume
- `GET /api/resumes/:id/export/:format` - Export resume
- `PUT /api/resumes/:id/share` - Share resume

### Templates
- `GET /api/templates` - Get available templates
- `GET /api/templates/:id` - Get specific template

## 🎨 Resume Templates

### Available Templates
1. **Modern Classic** - Clean, professional design
2. **ATS Optimized** - Maximum compatibility with ATS systems
3. **Creative** - Modern design with color accents
4. **Minimal** - Simple, elegant layout
5. **Executive** - Professional layout for senior positions

### Template Features
- Responsive design
- Print-optimized layouts
- Customizable color schemes
- Font size and margin controls
- Section reordering

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

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Set environment variables in your hosting dashboard

### Backend (Heroku/Railway/DigitalOcean)
1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables
3. Deploy using your preferred platform

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/resume-builder/issues) page
2. Create a new issue with detailed information
3. Contact support at support@resumebuilder.com

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- All contributors and users of this project

---

**Built with ❤️ for job seekers worldwide**


