import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, FileText, Calendar, ArrowRight, GraduationCap } from 'lucide-react';
import { FAQSection } from '../components/FAQSection';

export const AdmissionsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
            {t('admissions.tag')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('admissions.title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('admissions.desc')}
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition-all"
            >
              <GraduationCap className="w-5 h-5" />
              <span>{t('btn.register')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Requirements & Process Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Admission Requirements</h3>
                <p className="text-xs text-slate-500">Eligibility Criteria for 2026/2027 Intake</p>
              </div>
            </div>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Completion of Grade 8 with top regional percentile standing in Oromia.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Passing mark in Shambu Special Secondary School Entrance Examination (Mathematics & Natural Science focus).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Recommendation letter from previous primary school director.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Official Ethiopian citizenship verification or local Kebele residency certificate.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Important Registration Dates</h3>
                <p className="text-xs text-slate-500">Academic Year Schedule</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Online Registration Opens:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">July 15, 2026</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Registration Deadline:</span>
                <span className="font-bold text-red-600 dark:text-red-400">August 30, 2026</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Document Verification at Campus:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">August 25 - 31, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Translated FAQ Component */}
        <FAQSection />
      </div>
    </div>
  );
};

