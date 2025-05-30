import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder';
import Templates from './pages/Templates';
import Dashboard from './pages/Dashboard';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import OAuthCallback from './pages/Auth/OAuthCallback';
import ATSOptimizer from './components/ATS/ATSOptimizer';
import ATSTips from './components/ATS/ATSTips';
import ResumeTips from './components/Tips/ResumeTips';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CoverLetterBuilder from './pages/CoverLetterBuilder';
import CoverLetterTemplates from './pages/CoverLetterTemplates';
import ResumeTemplateGuide from './pages/ResumeTemplateGuide';
import CreateYourResume from './pages/CreateYourResume';
import ChooseYourTemplate from './pages/ChooseYourTemplate';
import Profile from './pages/Profile';
import PrivateRoute from './components/Auth/PrivateRoute';

// Context
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';

// Styles
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
            <Route path="/ats-optimizer" element={<PrivateRoute><ATSOptimizer /></PrivateRoute>} />
            <Route path="/ats-tips" element={<ATSTips />} />
            <Route path="/resume-tips" element={<ResumeTips />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/cover-letter-templates" element={<CoverLetterTemplates />} />
            <Route path="/cover-letter-builder" element={<PrivateRoute><CoverLetterBuilder /></PrivateRoute>} />
            <Route path="/resume-guide" element={<ResumeTemplateGuide />} />
            <Route path="/create-resume" element={<CreateYourResume />} />
            <Route path="/choose-template" element={<ChooseYourTemplate />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/builder"
                  element={
                    <PrivateRoute>
                      <ResumeBuilder />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/builder/:resumeId"
                  element={
                    <PrivateRoute>
                      <ResumeBuilder />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />

                {/* Redirect unknown routes to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />

            {/* Toast notifications */}
            {/* <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            /> */}
          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
};

export default App;
