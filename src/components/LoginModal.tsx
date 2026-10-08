import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { UserRole } from '../types';
import { X, Lock, User, ShieldCheck, GraduationCap, BookOpen, KeyRound, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, defaultLoginRole, login, quickLogin, addToast } = useAuth();
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultLoginRole) {
      setSelectedRole(defaultLoginRole);
      setUsername(defaultLoginRole);
      setPassword('password123');
    }
  }, [defaultLoginRole, isLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: selectedRole })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        login(data.token, data.user);
        closeLoginModal();
      } else {
        addToast(data.error || 'Login failed', 'error');
      }
    } catch (err) {
      addToast('Network error during login', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          className="relative w-full max-w-md overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-emerald-800 p-6 text-white relative">
            <button
              onClick={closeLoginModal}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <GraduationCap className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t('login.title')}</h3>
                <p className="text-xs text-blue-100">{t('school.full_name')}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Quick Demo Access Bar */}
            <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Quick Demo Login (1-Click Access):</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => quickLogin('admin')}
                  className="px-2 py-1.5 text-xs font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin('teacher')}
                  className="px-2 py-1.5 text-xs font-medium rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => quickLogin('student')}
                  className="px-2 py-1.5 text-xs font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  Student
                </button>
              </div>
            </div>

            {/* Role Select Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('student');
                  setUsername('student');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'student'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('teacher');
                  setUsername('teacher');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'teacher'
                    ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Teacher
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('admin');
                  setUsername('admin');
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Admin
              </button>
            </div>

            {/* Manual Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Username or Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder={`Enter ${selectedRole} ID or username`}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-700 to-emerald-700 hover:from-blue-800 hover:to-emerald-800 text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <KeyRound className="w-4 h-4" />
                {loading ? 'Authenticating...' : `Sign In as ${selectedRole.toUpperCase()}`}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
