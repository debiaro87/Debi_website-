import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { LoginModal } from './components/LoginModal';
import { SearchModal } from './components/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { AdmissionsPage } from './pages/AdmissionsPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { TeachersPage } from './pages/TeachersPage';
import { StudentLifePage } from './pages/StudentLifePage';
import { GalleryPage } from './pages/GalleryPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';

// Dashboards
import { AdminDashboard } from './pages/dashboards/AdminDashboard';
import { TeacherDashboard } from './pages/dashboards/TeacherDashboard';
import { StudentDashboard } from './pages/dashboards/StudentDashboard';

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300">
            <Header />
            <Toast />
            <LoginModal />
            <SearchModal />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/academics" element={<AcademicsPage />} />
                <Route path="/admissions" element={<AdmissionsPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/teachers" element={<TeachersPage />} />
                <Route path="/student-life" element={<StudentLifePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Dashboards */}
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}
