import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Newspaper, Calendar, Award, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch } = useAuth();
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  if (!isSearchOpen) return null;

  const SEARCH_INDEX = [
    { title: t('nav.registration'), path: '/register', category: 'Admissions', icon: GraduationCap },
    { title: t('nav.admissions'), path: '/admissions', category: 'Admissions', icon: BookOpen },
    { title: t('nav.academics'), path: '/academics', category: 'Academics', icon: Award },
    { title: t('nav.teachers'), path: '/teachers', category: 'Directory', icon: BookOpen },
    { title: t('nav.news'), path: '/news', category: 'Updates', icon: Newspaper },
    { title: t('nav.student_life'), path: '/student-life', category: 'Student Life', icon: GraduationCap },
    { title: t('nav.gallery'), path: '/gallery', category: 'Campus', icon: BookOpen },
    { title: t('nav.contact'), path: '/contact', category: 'General', icon: BookOpen },
    { title: t('nav.about'), path: '/about', category: 'General', icon: BookOpen }
  ];

  const results = query.trim()
    ? SEARCH_INDEX.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : SEARCH_INDEX.slice(0, 6);

  const handleSelect = (path: string) => {
    navigate(path);
    closeSearch();
    setQuery('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t('search.placeholder')}
              className="w-full bg-transparent text-sm focus:outline-none dark:text-white"
            />
            <button onClick={closeSearch} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          <div className="p-2 max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-center py-8 text-xs text-slate-500">{t('search.no_results')}</p>
            ) : (
              results.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(item.path)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.title}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
                      {item.category}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

