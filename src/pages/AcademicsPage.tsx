import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BookOpen, Award, Calendar, CheckCircle2, FileText, ChevronRight, GraduationCap, Cpu, Layers } from 'lucide-react';

export const AcademicsPage: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'grades' | 'departments' | 'calendar' | 'rules'>('grades');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-widest">
            {t('academics.tag')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('academics.title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('academics.desc')}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-2 p-1 bg-slate-200/60 dark:bg-slate-900 rounded-2xl">
            <button
              onClick={() => setActiveTab('grades')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'grades'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              Grade Levels & Streams
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'departments'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Academic Departments
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'calendar'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Academic Calendar
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'rules'
                  ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Exams & Promotion Rules
            </button>
          </div>
        </div>

        {/* Tab Content 1: Grade Levels */}
        {activeTab === 'grades' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  General Foundation Phase
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Grade 9 & Grade 10</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Focuses on building strong fundamentals across mathematics, physics, chemistry, biology, ICT, Afaan Oromoo, Amharic, English, history, geography, and civics.
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">Key Subjects:</p>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Mathematics</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Physics & Lab Work</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Chemistry & Lab Work</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Biology & Ecology</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> ICT & Programming Basics</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> English & Literature</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold">
                  Specialized Stream Phase
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Grade 11 & Grade 12</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Students specialize into Natural Science or Social Science streams with intensive preparation for the Ethiopian Secondary Education Certificate Examination (ESECE).
                </p>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">Natural Science Stream Highlights:</p>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Advanced Calculus</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Electromagnetism & Modern Physics</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Organic Chemistry</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Genetics & Molecular Biology</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Python Data Structures</li>
                    <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Research Project</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 2: Departments */}
        {activeTab === 'departments' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'STEM & Physics Department', lead: 'Abebe Bikila', desc: 'Mechanics, Electromagnetism, Quantum Concepts and Practical Physics Labs.' },
              { name: 'Chemistry & Biology Department', lead: 'Dr. Chaltu Tadesse', desc: 'Organic Chemistry, Chemical Analysis, Cellular Biology, and Biotechnology.' },
              { name: 'Mathematics & Computer Science', lead: 'Dawit Hailu', desc: 'Calculus, Applied Statistics, Software Engineering and Robotics.' },
              { name: 'Languages & Literature', lead: 'Hawine Megersa', desc: 'Afaan Oromoo, Amharic, English Communication, Creative Writing and Essay Analysis.' },
              { name: 'Social Sciences & Civics', lead: 'Kassahun Bekele', desc: 'Ethiopian History, African Studies, Civics Ethics and Global Economics.' },
              { name: 'Physical Education & Athletics', lead: 'Bekele Desta', desc: 'Fitness, Athletics, Football, Volleyball and Sports Psychology.' }
            ].map((dept, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{dept.name}</h4>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Head of Department: {dept.lead}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{dept.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content 3: Calendar */}
        {activeTab === 'calendar' && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Academic Calendar (2026/2027 Academic Year)</h3>
            <div className="space-y-4">
              {[
                { date: 'September 1, 2026', event: 'First Semester Classes Begin & New Student Orientation' },
                { date: 'November 10 - 15, 2026', event: 'First Semester Midterm Examinations' },
                { date: 'January 20 - 28, 2027', event: 'First Semester Final Examinations & Break' },
                { date: 'February 10, 2027', event: 'Second Semester Classes Resume' },
                { date: 'April 12 - 18, 2027', event: 'Annual STEM & Innovation Fair Showcase' },
                { date: 'June 15 - 25, 2027', event: 'Grade 12 National Mock & Final Examinations' }
              ].map((cal, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{cal.event}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800">
                    {cal.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 4: Rules */}
        {activeTab === 'rules' && (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Examination & Promotion Policy</h3>
            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Continuous Assessment Breakdown (100 Marks Total):</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Continuous Assessment (Quizzes, Homework, Lab Reports): 40%</li>
                  <li>Midterm Examination: 20%</li>
                  <li>Final Semester Examination: 40%</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Promotion Criteria in Special School:</h4>
                <p>
                  Due to the rigorous standards of Shambu Special Secondary School, students are required to maintain a minimum average score of 75% in all major subjects. Students maintaining top academic performance receive full merit scholarships and boarding accommodations.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
