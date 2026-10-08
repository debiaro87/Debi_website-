import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, BookOpen, Target, ShieldCheck, HeartHandshake, Lightbulb, Users, Building, Laptop, FlaskConical, Quote, GraduationCap } from 'lucide-react';
import principalImg from '../assets/fekede_tadesse.jpg';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
            {t('about.tag')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('about.title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('about.desc')}
          </p>
        </div>

        {/* Leadership Spotlight: Principal Fekede Tadesse */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group">
                <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-500/40 bg-slate-800">
                  <img
                    src={principalImg}
                    alt="Principal Fekede Tadesse"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-emerald-600 text-white px-4 py-1.5 rounded-xl text-xs font-black shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" /> Principal
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Executive Leadership</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Fekede Tadesse
                </h2>
                <p className="text-sm font-semibold text-emerald-400 mt-0.5">
                  School Principal & Executive Director — Shambu Special Secondary School
                </p>
              </div>

              <div className="relative">
                <Quote className="w-8 h-8 text-emerald-500/30 absolute -top-4 -left-3 hidden sm:block" />
                <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed sm:pl-6">
                  "{t('home.principal_quote')}"
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Under the leadership of Mr. Fekede Tadesse, Shambu Special Secondary School has achieved outstanding academic excellence, regional STEM competition titles, state-of-the-art laboratory expansion, and exceptional university entrance pass rates for gifted students from across Horro Guduru Wollega and Oromia.
              </p>
            </div>
          </div>
        </div>

        {/* History & Foundation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t('about.history_title')}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('about.history_p1')}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('about.history_p2')}
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700">
            <img
              src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1000"
              alt="Shambu Special Campus Quadrangle"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mission, Vision & Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('about.mission')}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('about.mission_desc')}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('about.vision')}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t('about.vision_desc')}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('about.values')}</h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <li className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-emerald-500" /> Academic Rigor & Meritocracy</li>
              <li className="flex items-center gap-2"><HeartHandshake className="w-3.5 h-3.5 text-emerald-500" /> Ethical Integrity & Discipline</li>
              <li className="flex items-center gap-2"><Lightbulb className="w-3.5 h-3.5 text-emerald-500" /> Innovation & Practical Research</li>
              <li className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-emerald-500" /> Community & Patriotic Service</li>
            </ul>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{t('about.facilities')}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('about.facilities_sub')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'STEM & Science Labs',
                desc: 'Individual laboratories for Physics, Chemistry, and Biology experiments.',
                icon: FlaskConical,
                image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'ICT & Coding Hub',
                desc: '120 high-speed computers with fiber internet, coding tools, and digital library access.',
                icon: Laptop,
                image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Central Library',
                desc: 'Over 15,000 physical textbooks, academic journals, and study halls.',
                icon: BookOpen,
                image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600'
              },
              {
                title: 'Boarding & Dormitories',
                desc: 'Clean, secure residential quarters with round-the-clock supervision and dining hall.',
                icon: Building,
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=600'
              }
            ].map((facility, idx) => {
              const IconComponent = facility.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video w-full overflow-hidden bg-slate-800">
                    <img src={facility.image} alt={facility.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{facility.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{facility.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
