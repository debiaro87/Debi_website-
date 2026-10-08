import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StudentRegistration, GradeRecord, Assignment } from '../../types';
import { GraduationCap, Award, BookOpen, Download, Printer, Edit2, CheckCircle2, User, FileText, Sparkles, MapPin, Phone, Mail } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { user, role, addToast, openLoginModal } = useAuth();

  const [student, setStudent] = useState<StudentRegistration | null>(null);
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  const [editingPhone, setEditingPhone] = useState('');
  const [editingEmail, setEditingEmail] = useState('');
  const [isEditingContact, setIsEditingContact] = useState(false);

  useEffect(() => {
    // Default to student s1 or user's student ID
    const studentId = user?.studentId || 's1';
    fetch(`/api/students/${studentId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.id) {
          setStudent(data);
          setEditingPhone(data.phoneNumber || '');
          setEditingEmail(data.parentEmail || '');
          if (Array.isArray(data.grades)) setGrades(data.grades);
        }
      })
      .catch(() => {});

    fetch('/api/assignments')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setAssignments(data))
      .catch(() => {});
  }, [user]);

  if (role !== 'student' && role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4 max-w-md">
          <GraduationCap className="w-12 h-12 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Student Portal Access</h2>
          <p className="text-xs text-slate-500">Sign in to view your report card, semester grades, and homework assignments.</p>
          <button
            onClick={() => openLoginModal('student')}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all"
          >
            Sign In as Student
          </button>
        </div>
      </div>
    );
  }

  // Calculate Cumulative GPA
  const calculateGPA = () => {
    if (grades.length === 0) return 4.0;
    const total = grades.reduce((acc, curr) => {
      if (curr.totalScore >= 90) return acc + 4.0;
      if (curr.totalScore >= 80) return acc + 3.7;
      if (curr.totalScore >= 70) return acc + 3.0;
      if (curr.totalScore >= 60) return acc + 2.0;
      return acc + 1.0;
    }, 0);
    return (total / grades.length).toFixed(2);
  };

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;
    try {
      const res = await fetch(`/api/students/${student.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: editingPhone, parentEmail: editingEmail })
      });
      if (res.ok) {
        addToast('Contact details updated!', 'success');
        setIsEditingContact(false);
        setStudent(prev => prev ? { ...prev, phoneNumber: editingPhone, parentEmail: editingEmail } : null);
      }
    } catch (err) {
      addToast('Error updating details', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Profile Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student?.studentPhotoUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'}
              alt={student?.firstName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase">
                  Active Student
                </span>
                <span className="text-xs font-mono text-emerald-300">{student?.registrationNumber || 'SSSS/2026/0101'}</span>
              </div>
              <h1 className="text-2xl font-black mt-1">
                {student?.firstName || 'Gamachu'} {student?.middleName} {student?.lastName || 'Gudeta'}
              </h1>
              <p className="text-xs text-slate-300">
                {student?.gradeApplyingFor || 'Grade 12'} • {student?.stream || 'Natural Science Stream'}
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-300">Cumulative GPA</p>
              <p className="text-2xl font-black">{calculateGPA()} / 4.0</p>
            </div>
            <div className="border-l border-white/20 pl-4">
              <p className="text-[10px] uppercase font-bold text-emerald-300">Academic Rank</p>
              <p className="text-2xl font-black">#1 in Grade 12</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Academic Performance Report Card (2025/2026)</span>
          </div>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Report Card</span>
          </button>
        </div>

        {/* Official Report Card Format Table */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Official Grades Breakdown</h2>
              <p className="text-xs text-slate-500">Continuous Assessment (40%) + Midterm (20%) + Final Exam (40%)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Instructor</th>
                  <th className="p-3 text-center">Continuous Assmt (40)</th>
                  <th className="p-3 text-center">Midterm Exam (20)</th>
                  <th className="p-3 text-center">Final Exam (40)</th>
                  <th className="p-3 text-center">Total Score (100)</th>
                  <th className="p-3 text-center">Letter Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {grades.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-slate-500">
                      No grades published for current semester yet.
                    </td>
                  </tr>
                ) : (
                  grades.map(g => (
                    <tr key={g.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{g.subject}</td>
                      <td className="p-3 text-slate-500">{g.teacherName}</td>
                      <td className="p-3 text-center font-semibold text-emerald-600">{g.continuousAssessment}</td>
                      <td className="p-3 text-center font-semibold text-blue-600">{g.midtermExam}</td>
                      <td className="p-3 text-center font-semibold text-purple-600">{g.finalExam}</td>
                      <td className="p-3 text-center font-black text-sm text-slate-900 dark:text-white">{g.totalScore}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black text-xs">
                          {g.letterGrade}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Assigned Homework & Coursework */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Assignments & Coursework</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assignments.map(a => (
              <div key={a.id} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span className="font-bold text-blue-600 dark:text-blue-400 uppercase">{a.subject}</span>
                  <span>Due: {a.dueDate}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{a.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{a.description}</p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 flex justify-between">
                  <span>Posted by: {a.teacherName}</span>
                  <span className="text-emerald-600 font-bold">Grade 12</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editable Profile & Address */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Student Contact Information</h3>
            <button
              onClick={() => setIsEditingContact(!isEditingContact)}
              className="text-xs text-emerald-600 font-bold hover:underline flex items-center gap-1"
            >
              <Edit2 className="w-3.5 h-3.5" />
              {isEditingContact ? 'Cancel' : 'Edit Contact Details'}
            </button>
          </div>

          {isEditingContact ? (
            <form onSubmit={handleUpdateContact} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingPhone}
                    onChange={e => setEditingPhone(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Parent Email</label>
                  <input
                    type="email"
                    value={editingEmail}
                    onChange={e => setEditingEmail(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>
              <button type="submit" className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs">
                Save Contact Updates
              </button>
            </form>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <p className="text-slate-400">Phone Number:</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{student?.phoneNumber || '+251 91 111 2233'}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <p className="text-slate-400">Parent Email:</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">{student?.parentEmail || 'toloosaa.g@gmail.com'}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <p className="text-slate-400">Address Location:</p>
                <p className="font-bold text-slate-900 dark:text-white mt-1">
                  {student?.town || 'Shambu'}, {student?.zone || 'Horro Guduru Wollega'}
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
