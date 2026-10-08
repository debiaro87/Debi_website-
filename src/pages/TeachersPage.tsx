import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Teacher } from '../types';
import { Search, Mail, Phone, BookOpen, Award, GraduationCap, Filter } from 'lucide-react';

export const TeachersPage: React.FC = () => {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  useEffect(() => {
    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTeachers(data);
      })
      .catch(() => {});
  }, []);

  const departments = ['All', ...Array.from(new Set(teachers.map(t => t.department)))];

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const matchesDept = selectedDept === 'All' || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
            {t('teachers.tag')}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t('teachers.title')}
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400">
            {t('teachers.desc')}
          </p>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search teacher by name or subject..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="text-xs font-bold text-slate-500 shrink-0">Filter Dept:</span>
            {departments.map((dept, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDept === dept
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeachers.map(teacher => (
            <div
              key={teacher.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden">
                  <img
                    src={teacher.photoUrl}
                    alt={teacher.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-bold tracking-wider uppercase border border-white/10">
                    {teacher.teacherId}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {teacher.department}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                      {teacher.name}
                    </h3>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                    <p className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{teacher.qualification}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                      <span>{teacher.email}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-teal-500 shrink-0" />
                      <span>{teacher.phone}</span>
                    </p>
                  </div>

                  {teacher.bio && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      "{teacher.bio}"
                    </p>
                  )}

                  <div>
                    <p className="text-[11px] font-bold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                      Assigned Subjects:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {teacher.subjects.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-medium"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
