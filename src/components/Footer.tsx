import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: School Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-emerald-500 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white tracking-tight">
                  {t('school.title').split(' ')[0]} <span className="text-emerald-400">{t('school.title').split(' ').slice(1).join(' ')}</span>
                </h3>
                <p className="text-[10px] font-semibold text-slate-400 uppercase">{t('school.subtitle')}</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {t('home.welcome_desc')}
            </p>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                School Motto:
              </p>
              <p className="text-xs italic text-slate-200">
                "Barnoota Qulqulluu fi Muldhata Imala Boriif"
              </p>
              <p className="text-[11px] text-slate-400">
                ({t('footer.motto')})
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: t('nav.about'), path: '/about' },
                { name: t('nav.academics'), path: '/academics' },
                { name: t('nav.admissions'), path: '/admissions' },
                { name: t('nav.registration'), path: '/register' },
                { name: t('nav.teachers'), path: '/teachers' },
                { name: t('nav.student_life'), path: '/student-life' },
                { name: t('nav.gallery'), path: '/gallery' },
                { name: t('nav.news'), path: '/news' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.path}
                    className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Portals & Academics */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
              {t('footer.academic_programs')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-slate-400">
                <BookOpen className="w-4 h-4 text-emerald-400" /> Natural Science Stream (Grades 9-12)
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <BookOpen className="w-4 h-4 text-emerald-400" /> Social Science Stream (Grades 11-12)
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <BookOpen className="w-4 h-4 text-emerald-400" /> ICT & Robotics Innovation Hub
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <BookOpen className="w-4 h-4 text-emerald-400" /> National Exam Coaching Center
              </li>
            </ul>

            <div className="pt-2">
              <h5 className="text-xs font-bold text-white mb-2">Internal Portals</h5>
              <div className="flex flex-col gap-1.5">
                <Link
                  to="/student-dashboard"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5" /> {t('portal.student')}
                </Link>
                <Link
                  to="/teacher-dashboard"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg text-teal-300 transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" /> {t('portal.teacher')}
                </Link>
                <Link
                  to="/admin-dashboard"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg text-blue-300 transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> {t('portal.admin')}
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider text-emerald-400">
              {t('footer.contact_info')}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  {t('school.location')}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('phone')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t('email')}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon - Fri: 8:00 AM - 5:00 PM (EAT)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Campus Safety</Link>
            <Link to="/admissions" className="hover:text-slate-300 transition-colors">Terms of Admission</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

