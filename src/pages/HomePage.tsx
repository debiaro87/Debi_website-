import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { FAQSection } from '../components/FAQSection';
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  FlaskConical,
  Laptop,
  Trophy,
  Megaphone
} from 'lucide-react';
import { motion } from 'motion/react';
import { NewsItem, EventItem } from '../types';
import principalPhoto from '../assets/fekede_tadesse.jpg';

export const HomePage: React.FC = () => {
  const { openLoginModal } = useAuth();
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNews(data.slice(0, 3));
      })
      .catch(() => {});

    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setEvents(data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950 text-white overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('hero.badge')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                {t('hero.title')}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                {t('hero.desc')}
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-xl">
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
                  Motto / Mul'ata
                </p>
                <p className="text-sm font-serif italic text-white">
                  "Barnoota Qulqulluu fi Muldhata Imala Boriif" — {t('footer.motto')}
                </p>
              </div>

              {/* Call-to-action buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/register"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-900/30 transition-all flex items-center gap-2 group"
                >
                  <span>{t('hero.apply_btn')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  onClick={() => openLoginModal('student')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{t('portal.signin')}</span>
                </button>

                <Link
                  to="/academics"
                  className="px-5 py-3.5 rounded-xl text-slate-300 hover:text-white text-sm font-semibold transition-colors flex items-center gap-1"
                >
                  {t('hero.academics_btn')}
                </Link>
              </div>
            </motion.div>

            {/* Right Card Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-3xl p-2 bg-gradient-to-b from-emerald-500/30 to-blue-600/30 border border-white/20 shadow-2xl backdrop-blur-xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
                    alt="Shambu Special Secondary School Students"
                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10">
                    <p className="text-xs font-bold text-emerald-400">STEM Exhibition 2026</p>
                    <p className="text-xs text-slate-200">National Science Olympiad Winners from Shambu Campus</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Banner */}
      <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-2">
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">850+</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('stat.students')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">98.5%</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('stat.pass_rate')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 shrink-0">
              <FlaskConical className="w-7 h-7" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">12</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('stat.labs')}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-2">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">48</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{t('stat.teachers')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            {t('home.welcome_title')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t('home.welcome_desc')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: t('nav.academics'),
              desc: t('home.stem_desc'),
              path: '/academics',
              icon: BookOpen,
              color: 'from-blue-600 to-indigo-600'
            },
            {
              title: t('nav.registration'),
              desc: t('reg.subtitle'),
              path: '/register',
              icon: GraduationCap,
              color: 'from-emerald-600 to-teal-600'
            },
            {
              title: t('nav.teachers'),
              desc: t('teachers.desc'),
              path: '/teachers',
              icon: Users,
              color: 'from-teal-600 to-cyan-600'
            },
            {
              title: t('nav.student_life'),
              desc: t('student_life.desc'),
              path: '/student-life',
              icon: Trophy,
              color: 'from-indigo-600 to-blue-700'
            }
          ].map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <Link
                key={idx}
                to={card.path}
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {card.desc}
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 gap-1 group-hover:gap-2 transition-all">
                  <span>{t('btn.learn_more')}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Principal Welcome Message */}
      <section className="py-16 bg-gradient-to-b from-slate-100 to-white dark:from-slate-900 dark:to-slate-950 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-[4/5] bg-slate-800">
                <img
                  src={principalPhoto}
                  alt="Principal Fekede Tadesse"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-4 rounded-2xl shadow-xl hidden sm:block max-w-xs">
                <p className="text-xs font-bold uppercase tracking-wider">{t('home.principal_title')}</p>
                <p className="text-sm font-extrabold">{t('home.principal_name')}</p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold">
                <Award className="w-3.5 h-3.5" /> {t('home.principal_title')}
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {t('home.principal_quote')}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('home.welcome_desc')}
              </p>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <p className="text-base font-bold text-slate-900 dark:text-white">{t('home.principal_name')}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{t('school.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic News & Announcements Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">
              <Megaphone className="w-4 h-4" /> {t('news.tag')}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t('home.news_section_title')}
            </h2>
          </div>
          <Link
            to="/news"
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>{t('btn.view_all')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between"
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
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  to="/news"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Read full announcement</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Registration Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-emerald-900 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Join Shambu Special Secondary School?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Online student registration is now open for Grade 9 through 12 entrance exam qualifiers. Complete your registration form today.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl transition-all"
            >
              Start Online Registration
            </Link>
            <Link
              to="/admissions"
              className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm transition-all"
            >
              View Admission Guidelines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
