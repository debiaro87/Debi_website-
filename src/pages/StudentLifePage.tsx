import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, Trophy, BookOpen, FlaskConical, Users, HeartHandshake, Sparkles, Compass } from 'lucide-react';

export const StudentLifePage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-bold uppercase tracking-widest">
            {t('student_life.tag')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('student_life.title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            {t('student_life.desc')}
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: 'Robotics & Coding Club',
              desc: 'Hands-on programming with Arduino, Raspberry Pi, Python, and participation in Ethiopian National STEM Olympiads.',
              icon: Cpu,
              color: 'text-emerald-500',
              image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600'
            },
            {
              title: 'Inter-House Sports & Athletics',
              desc: 'Football league, basketball, volleyball, track and field championships held at Shambu Regional Stadium.',
              icon: Trophy,
              color: 'text-amber-500',
              image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=600'
            },
            {
              title: 'Science & Chemistry Society',
              desc: 'Student-led research experiments, environmental chemistry analysis, and water purification projects.',
              icon: FlaskConical,
              color: 'text-blue-500',
              image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=600'
            },
            {
              title: 'Debate & Public Speaking',
              desc: 'Developing articulate expression in Afaan Oromoo and English through regional parliamentary debate competitions.',
              icon: Compass,
              color: 'text-indigo-500',
              image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600'
            },
            {
              title: 'Community Service & Environment',
              desc: 'Tree planting, tutoring local primary students in Shambu, and rural environmental conservation initiatives.',
              icon: HeartHandshake,
              color: 'text-teal-500',
              image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=600'
            },
            {
              title: 'Student Leadership Council',
              desc: 'Elected student prefects advocating for student welfare, campus events, and boarding house management.',
              icon: Users,
              color: 'text-purple-500',
              image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600'
            }
          ].map((club, idx) => {
            const IconComponent = club.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-video w-full overflow-hidden bg-slate-800">
                  <img src={club.image} alt={club.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-5 h-5 ${club.color}`} />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{club.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{club.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
