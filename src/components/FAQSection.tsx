import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  ChevronDown,
  Search,
  GraduationCap,
  Home,
  BookOpen,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface FAQItem {
  id: string;
  category: 'admissions' | 'student_life' | 'academics';
  questionKey: string;
  answerKey: string;
  icon: React.ElementType;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'admissions',
    questionKey: 'faq.q1',
    answerKey: 'faq.a1',
    icon: GraduationCap
  },
  {
    id: 'faq-2',
    category: 'admissions',
    questionKey: 'faq.q2',
    answerKey: 'faq.a2',
    icon: GraduationCap
  },
  {
    id: 'faq-3',
    category: 'admissions',
    questionKey: 'faq.q3',
    answerKey: 'faq.a3',
    icon: GraduationCap
  },
  {
    id: 'faq-4',
    category: 'student_life',
    questionKey: 'faq.q4',
    answerKey: 'faq.a4',
    icon: Home
  },
  {
    id: 'faq-5',
    category: 'student_life',
    questionKey: 'faq.q5',
    answerKey: 'faq.a5',
    icon: Home
  },
  {
    id: 'faq-6',
    category: 'academics',
    questionKey: 'faq.q6',
    answerKey: 'faq.a6',
    icon: BookOpen
  },
  {
    id: 'faq-7',
    category: 'academics',
    questionKey: 'faq.q7',
    answerKey: 'faq.a7',
    icon: BookOpen
  }
];

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleAccordion = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', label: t('faq.all_categories'), icon: Filter },
    { id: 'admissions', label: t('faq.cat_admissions'), icon: GraduationCap },
    { id: 'student_life', label: t('faq.cat_student_life'), icon: Home },
    { id: 'academics', label: t('faq.cat_academics'), icon: BookOpen }
  ];

  const filteredItems = FAQ_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const questionText = t(item.questionKey).toLowerCase();
    const answerText = t(item.answerKey).toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    const matchesSearch = !query || questionText.includes(query) || answerText.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50 transition-colors border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest border border-emerald-200 dark:border-emerald-800/50">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('faq.tag')}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('faq.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Filter Controls: Category Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('faq.search_placeholder')}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-900/80 text-xs sm:text-sm text-slate-900 dark:text-slate-100 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {t('search.no_results')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredItems.map(item => {
              const isOpen = openIds.includes(item.id);
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-slate-800/90 rounded-2xl border transition-all overflow-hidden ${
                    isOpen
                      ? 'border-emerald-500/50 dark:border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4 focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-colors ${
                        isOpen
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-slate-100 text-slate-500 dark:bg-slate-700/50 dark:text-slate-400'
                      }`}>
                        <ItemIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {t(item.questionKey)}
                      </h3>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 mt-1">
                          <p>{t(item.answerKey)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Banner - Still Have Questions */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>{t('faq.still_have_questions')}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl">
              {t('faq.contact_prompt')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl backdrop-blur-sm transition-all flex items-center gap-2 border border-white/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('nav.contact')}</span>
            </Link>
            <Link
              to="/register"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2"
            >
              <span>{t('nav.registration')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
