import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage, Language } from '../context/LanguageContext';
import {
  GraduationCap,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  UserCheck,
  LogOut,
  ChevronDown,
  ShieldCheck,
  BookOpen,
  PhoneCall,
  Globe
} from 'lucide-react';

export const Header: React.FC = () => {
  const { user, role, logout, openLoginModal, theme, toggleTheme, openSearch } = useAuth();
  const { language, setLanguage, t, languages, currentLanguageOption } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.academics'), path: '/academics' },
    { name: t('nav.admissions'), path: '/admissions' },
    { name: t('nav.registration'), path: '/register', badge: t('nav.apply_badge') },
    { name: t('nav.teachers'), path: '/teachers' },
    { name: t('nav.student_life'), path: '/student-life' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.contact'), path: '/contact' }
  ];

  const getDashboardPath = () => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'teacher') return '/teacher-dashboard';
    if (role === 'student') return '/student-dashboard';
    return '/';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      {/* Top Bar Announcement Ribbon */}
      <div className="bg-gradient-to-r from-blue-900 via-emerald-900 to-blue-900 text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              {t('notice.tag')}
            </span>
            <span>{t('notice.text')}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-emerald-400" /> {t('phone')}
            </span>
            <span>{t('school.location')}</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* School Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-800 via-blue-600 to-emerald-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-blue-700 dark:text-emerald-400" />
              </div>
            </div>
            <div>
              <span className="block text-lg font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {t('school.title').split(' ')[0]} <span className="text-emerald-600 dark:text-emerald-400">{t('school.title').split(' ').slice(1).join(' ')}</span>
              </span>
              <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t('school.subtitle')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-emerald-600 text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Tools */}
          <div className="flex items-center gap-2">
            {/* Language Dropdown Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setUserDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-200/60 dark:border-slate-700/60"
                title={t('lang.select')}
              >
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{currentLanguageOption.flag}</span>
                <span className="uppercase text-[11px] tracking-wide">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    {t('lang.select')}
                  </div>
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as Language);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors ${
                        language === lang.code
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      {language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Global Search Button */}
            <button
              onClick={openSearch}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t('search.title')}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={t('theme.toggle')}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* Portal Login / User Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setUserDropdownOpen(!userDropdownOpen);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">
                        {t('dashboard.role')}: {role}
                      </p>
                    </div>
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      {role === 'admin' ? (
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                      ) : role === 'teacher' ? (
                        <BookOpen className="w-4 h-4 text-teal-600" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                      )}
                      {t('portal.dashboard')}
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="w-4 h-4" />
                      {t('portal.signout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openLoginModal('student')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-emerald-700 hover:from-blue-800 hover:to-emerald-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                {t('portal.signin')}
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          {/* Mobile Language Switcher Bar */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" /> {t('lang.select')}
            </span>
            <div className="flex items-center gap-1">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as Language)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    language === lang.code
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="uppercase text-[10px]">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === link.path
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {!user && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal('student');
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4" /> {t('portal.student')}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openLoginModal('admin');
                }}
                className="w-full py-2.5 rounded-xl bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> {t('portal.admin')}
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

