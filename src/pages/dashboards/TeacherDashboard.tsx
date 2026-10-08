import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StudentRegistration, GradeRecord, Assignment } from '../../types';
import { BookOpen, Plus, Upload, CheckCircle2, Award, FileText, User, ShieldCheck } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { user, role, addToast, openLoginModal } = useAuth();

  const [students, setStudents] = useState<StudentRegistration[]>([]);
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  // Form State for Grade Submission
  const [gradeForm, setGradeForm] = useState({
    studentId: '',
    subject: 'Advanced Physics',
    gradeLevel: 'Grade 12',
    semester: 'Semester 1' as 'Semester 1' | 'Semester 2',
    academicYear: '2025/2026',
    continuousAssessment: 35,
    midtermExam: 18,
    finalExam: 36
  });

  // Form State for Assignment Submission
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    subject: 'Advanced Physics',
    gradeLevel: 'Grade 12',
    description: '',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const fetchData = () => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setStudents(data.filter(s => s.status === 'Approved')))
      .catch(() => {});

    fetch('/api/grades')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setGrades(data))
      .catch(() => {});

    fetch('/api/assignments')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setAssignments(data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (role !== 'teacher' && role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4 max-w-md">
          <BookOpen className="w-12 h-12 text-teal-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Teacher Portal Authentication</h2>
          <p className="text-xs text-slate-500">Please sign in as a teacher to upload grades and coursework.</p>
          <button
            onClick={() => openLoginModal('teacher')}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl transition-all"
          >
            Sign In as Teacher
          </button>
        </div>
      </div>
    );
  }

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeForm.studentId) {
      addToast('Please select a student from the dropdown', 'error');
      return;
    }
    const student = students.find(s => s.id === gradeForm.studentId || s.registrationNumber === gradeForm.studentId);
    const studentName = student ? `${student.firstName} ${student.middleName} ${student.lastName}` : 'Student';

    try {
      const res = await fetch('/api/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...gradeForm,
          studentName,
          teacherName: user?.name || 'Abebe Bikila'
        })
      });
      if (res.ok) {
        addToast(`Grade recorded for ${studentName}!`, 'success');
        fetchData();
      }
    } catch (err) {
      addToast('Error submitting grade record', 'error');
    }
  };

  const handleAssignmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...assignmentForm,
          teacherName: user?.name || 'Abebe Bikila'
        })
      });
      if (res.ok) {
        addToast('Assignment posted for students!', 'success');
        setAssignmentForm({
          title: '',
          subject: 'Advanced Physics',
          gradeLevel: 'Grade 12',
          description: '',
          dueDate: new Date().toISOString().split('T')[0]
        });
        fetchData();
      }
    } catch (err) {
      addToast('Failed to post assignment', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-blue-950 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
              <BookOpen className="w-4 h-4" /> Faculty Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Teacher Academic Gradebook</h1>
            <p className="text-xs text-slate-300">Logged in as {user?.name || 'Abebe Bikila'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Column 1: Submit Student Grades Form */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-bold">Record Student Assessment Grades</h2>
            </div>

            <form onSubmit={handleGradeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Select Student *</label>
                <select
                  required
                  value={gradeForm.studentId}
                  onChange={e => setGradeForm({ ...gradeForm, studentId: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  <option value="">-- Select Student --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.firstName} {s.middleName} {s.lastName} ({s.registrationNumber} - {s.gradeApplyingFor})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Subject</label>
                  <input
                    type="text"
                    value={gradeForm.subject}
                    onChange={e => setGradeForm({ ...gradeForm, subject: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Semester</label>
                  <select
                    value={gradeForm.semester}
                    onChange={e => setGradeForm({ ...gradeForm, semester: e.target.value as any })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Continuous Assmt (Max 40)</label>
                  <input
                    type="number"
                    max={40}
                    value={gradeForm.continuousAssessment}
                    onChange={e => setGradeForm({ ...gradeForm, continuousAssessment: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-bold text-emerald-600"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Midterm Exam (Max 20)</label>
                  <input
                    type="number"
                    max={20}
                    value={gradeForm.midtermExam}
                    onChange={e => setGradeForm({ ...gradeForm, midtermExam: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-bold text-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Final Exam (Max 40)</label>
                  <input
                    type="number"
                    max={40}
                    value={gradeForm.finalExam}
                    onChange={e => setGradeForm({ ...gradeForm, finalExam: Number(e.target.value) })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl font-bold text-purple-600"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex justify-between items-center">
                <span className="font-bold">Calculated Score Total:</span>
                <span className="font-black text-sm text-emerald-600 dark:text-emerald-400">
                  {gradeForm.continuousAssessment + gradeForm.midtermExam + gradeForm.finalExam} / 100
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Save Grade Record
              </button>
            </form>
          </div>

          {/* Column 2: Create Assignment */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-bold">Post New Assignment / Homework</h2>
            </div>

            <form onSubmit={handleAssignmentSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={assignmentForm.title}
                  onChange={e => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                  placeholder="e.g. Electromagnetism Lab Report"
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Subject</label>
                  <input
                    type="text"
                    value={assignmentForm.subject}
                    onChange={e => setAssignmentForm({ ...assignmentForm, subject: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Due Date</label>
                  <input
                    type="date"
                    value={assignmentForm.dueDate}
                    onChange={e => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Instructions / Description</label>
                <textarea
                  rows={3}
                  value={assignmentForm.description}
                  onChange={e => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                  placeholder="Provide instructions or problem numbers..."
                  className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-700 hover:bg-blue-600 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" /> Publish Assignment
              </button>
            </form>
          </div>
        </div>

        {/* Grades History Feed */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Student Grade Entries</h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {grades.map(g => (
              <div key={g.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{g.studentName}</p>
                  <p className="text-[10px] text-slate-500">{g.subject} • {g.semester} ({g.academicYear})</p>
                </div>
                <div className="text-right">
                  <span className="font-black text-sm text-emerald-600">{g.totalScore} / 100 ({g.letterGrade})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
