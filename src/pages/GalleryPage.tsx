import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SchoolPictureStorage } from '../components/SchoolPictureStorage';

export const GalleryPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
            {t('gallery.tag')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('gallery.title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            {t('gallery.desc')}
          </p>
        </div>

        {/* School Picture Storage Repository Component */}
        <SchoolPictureStorage standalone={true} />

      </div>
    </div>
  );
};

