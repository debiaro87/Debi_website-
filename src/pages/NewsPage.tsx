import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NewsItem, EventItem } from '../types';
import { Newspaper, Calendar, Megaphone, Clock, Tag, X, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NewsPage: React.FC = () => {
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeNews, setActiveNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNews(data);
      })
      .catch(() => {});

    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEvents(data);
      })
      .catch(() => {});
  }, []);

  const categories = ['All', 'News', 'Announcement', 'Exam Schedule', 'Holiday', 'Event'];

  const filteredNews = selectedCategory === 'All'
    ? news
    : news.filter(n => n.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
            {t('news.tag')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('news.title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            {t('news.desc')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {item.imageUrl && (
                  <div className="aspect-video w-full overflow-hidden bg-slate-800">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveNews(item)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upcoming Campus Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map(evt => (
              <div key={evt.id} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-bold uppercase">
                  {evt.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{evt.title}</h3>
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-500" /> {evt.date}</p>
                  <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-blue-500" /> {evt.time}</p>
                  <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-red-500" /> {evt.location}</p>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-200 dark:border-slate-700 leading-relaxed">
                  {evt.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Article Detail Modal */}
        <AnimatePresence>
          {activeNews && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto"
              >
                <button
                  onClick={() => setActiveNews(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                </button>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase">
                    {activeNews.category}
                  </span>
                  <span className="text-xs text-slate-500">{activeNews.date}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{activeNews.title}</h2>

                {activeNews.imageUrl && (
                  <div className="rounded-2xl overflow-hidden aspect-video bg-slate-800">
                    <img src={activeNews.imageUrl} alt={activeNews.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeNews.content}
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
                  <span>Author: {activeNews.author}</span>
                  <span>Shambu Special Secondary School</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
