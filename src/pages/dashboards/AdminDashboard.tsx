import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StudentRegistration, Teacher, NewsItem, EventItem, GalleryItem } from '../../types';
import { SchoolPictureStorage } from '../../components/SchoolPictureStorage';
import {
  Users,
  GraduationCap,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Download,
  Plus,
  FileSpreadsheet,
  Printer,
  BarChart3,
  BookOpen,
  Megaphone,
  Image as ImageIcon,
  Calendar,
  X,
  FolderOpen
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { user, role, addToast, openLoginModal } = useAuth();

  const [students, setStudents] = useState<StudentRegistration[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'teachers' | 'content' | 'gallery'>('students');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [editingStudent, setEditingStudent] = useState<StudentRegistration | null>(null);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'STEM & Physics',
    qualification: 'M.Sc. in Physics',
    subjects: ['Physics Grade 11'],
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    assignedGrades: ['Grade 11']
  });

  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [newNews, setNewNews] = useState({
    title: '',
    category: 'News' as const,
    summary: '',
    content: '',
    author: 'Admin Office',
    date: new Date().toISOString().split('T')[0],
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800'
  });

  const fetchAll = () => {
    fetch('/api/students')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setStudents(data))
      .catch(() => {});

    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setTeachers(data))
      .catch(() => {});

    fetch('/api/news')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setNews(data))
      .catch(() => {});
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4 max-w-md">
          <ShieldCheck className="w-12 h-12 text-blue-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Authentication Required</h2>
          <p className="text-xs text-slate-500">Please sign in with administrator credentials to access student management records.</p>
          <button
            onClick={() => openLoginModal('admin')}
            className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-all"
          >
            Sign In as Administrator
          </button>
        </div>
      </div>
    );
  }

  // Action Handlers
  const handleUpdateStatus = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        addToast(`Student application ${newStatus.toLowerCase()} successfully!`, 'success');
        fetchAll();
      }
    } catch (err) {
      addToast('Error updating application status', 'error');
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this student registration record?')) return;
    try {
      const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
      if (res.ok) {
        addToast('Student record deleted', 'info');
        fetchAll();
      }
    } catch (err) {
      addToast('Failed to delete student record', 'error');
    }
  };

  const handleSaveStudentEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    try {
      const res = await fetch(`/api/students/${editingStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingStudent)
      });
      if (res.ok) {
        addToast('Student details updated', 'success');
        setEditingStudent(null);
        fetchAll();
      }
    } catch (err) {
      addToast('Error saving edits', 'error');
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const teacherId = `T-2026-${Math.floor(100 + Math.random() * 900)}`;
      const res = await fetch('/api/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTeacher, teacherId })
      });
      if (res.ok) {
        addToast('New teacher added to faculty directory', 'success');
        setIsAddTeacherOpen(false);
        fetchAll();
      }
    } catch (err) {
      addToast('Failed to add teacher', 'error');
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNews)
      });
      if (res.ok) {
        addToast('Announcement posted to website feed', 'success');
        setIsAddNewsOpen(false);
        fetchAll();
      }
    } catch (err) {
      addToast('Failed to post announcement', 'error');
    }
  };

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = ['Registration Number', 'First Name', 'Middle Name', 'Last Name', 'Grade', 'Stream', 'Phone', 'Status', 'Submitted At'];
    const rows = filteredStudents.map(s => [
      s.registrationNumber,
      s.firstName,
      s.middleName,
      s.lastName,
      s.gradeApplyingFor,
      s.stream || 'Natural Science',
      s.phoneNumber,
      s.status,
      new Date(s.submittedAt).toLocaleDateString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.map(cell => `"${cell}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Shambu_Students_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Student records exported to CSV', 'success');
  };

  const filteredStudents = students.filter(s => {
    const nameStr = `${s.firstName} ${s.middleName} ${s.lastName} ${s.registrationNumber} ${s.phoneNumber}`.toLowerCase();
    const matchesQuery = nameStr.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Title Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-emerald-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" /> Principal & Administrator Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Shambu Special School Command Center</h1>
            <p className="text-xs text-slate-300">Welcome, {user?.name || 'Administrator'}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel / CSV</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border border-white/20"
            >
              <Printer className="w-4 h-4" />
              <span>Print Records</span>
            </button>
          </div>
        </div>

        {/* Overview Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-500">Total Registered</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{students.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Approved Admissions</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {students.filter(s => s.status === 'Approved').length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Pending Review</p>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">
              {students.filter(s => s.status === 'Pending').length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">Faculty Members</p>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{teachers.length}</p>
          </div>
        </div>

        {/* Tab Selector Bar */}
        <div className="flex gap-2 p-1 bg-slate-200/60 dark:bg-slate-900 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'students'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Student Registrations
          </button>
          <button
            onClick={() => setActiveTab('teachers')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'teachers'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Users className="w-4 h-4" /> Manage Faculty
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'content'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Megaphone className="w-4 h-4" /> Website Announcements
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <FolderOpen className="w-4 h-4" /> Picture Storage Repository
          </button>
        </div>

        {/* TAB 1: Student Registrations Table */}
        {activeTab === 'students' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search student by name, reg ID or phone..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500">Status:</span>
                {['All', 'Approved', 'Pending', 'Rejected'].map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                      statusFilter === st
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Reg. Number</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Grade & Stream</th>
                    <th className="p-3">Parent Phone</th>
                    <th className="p-3">Previous School</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        No student registrations match query.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => (
                      <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {student.registrationNumber}
                        </td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">
                          {student.firstName} {student.middleName} {student.lastName}
                        </td>
                        <td className="p-3">
                          <span className="font-semibold">{student.gradeApplyingFor}</span>
                          <span className="text-[10px] text-slate-400 block">{student.stream || 'Natural Science'}</span>
                        </td>
                        <td className="p-3 font-mono">{student.phoneNumber}</td>
                        <td className="p-3">{student.previousSchool}</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              student.status === 'Approved'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                : student.status === 'Rejected'
                                ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => handleUpdateStatus(student.id, 'Approved')}
                            className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100"
                            title="Approve Admission"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(student.id, 'Rejected')}
                            className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 hover:bg-red-100"
                            title="Reject Application"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingStudent(student)}
                            className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100"
                            title="Edit Record"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-600"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Faculty Management */}
        {activeTab === 'teachers' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Faculty Directory & Department Masters</h3>
                <p className="text-xs text-slate-500">Add or modify teaching staff profiles.</p>
              </div>
              <button
                onClick={() => setIsAddTeacherOpen(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Teacher
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teachers.map(t => (
                <div key={t.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center gap-3">
                    <img src={t.photoUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{t.department}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{t.email} • {t.phone}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">{t.qualification}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Announcements */}
        {activeTab === 'content' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Post Campus Announcement / News</h3>
                <p className="text-xs text-slate-500">Articles published here appear on the main website feed.</p>
              </div>
              <button
                onClick={() => setIsAddNewsOpen(true)}
                className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" /> Post New Announcement
              </button>
            </div>

            <div className="space-y-3">
              {news.map(n => (
                <div key={n.id} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold">
                      {n.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">{n.title}</h4>
                    <p className="text-xs text-slate-500">{n.date} • By {n.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Picture Storage Repository */}
        {activeTab === 'gallery' && (
          <SchoolPictureStorage standalone={true} />
        )}

        {/* Edit Student Modal */}
        {editingStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Edit Student Record</h3>
                <button onClick={() => setEditingStudent(null)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={handleSaveStudentEdit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">First Name</label>
                  <input
                    type="text"
                    value={editingStudent.firstName}
                    onChange={e => setEditingStudent({ ...editingStudent, firstName: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editingStudent.lastName}
                    onChange={e => setEditingStudent({ ...editingStudent, lastName: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Grade Applying For</label>
                  <input
                    type="text"
                    value={editingStudent.gradeApplyingFor}
                    onChange={e => setEditingStudent({ ...editingStudent, gradeApplyingFor: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingStudent.phoneNumber}
                    onChange={e => setEditingStudent({ ...editingStudent, phoneNumber: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Teacher Modal */}
        {isAddTeacherOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Add New Teacher</h3>
                <button onClick={() => setIsAddTeacherOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={handleAddTeacher} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Teacher Full Name</label>
                  <input
                    type="text"
                    required
                    value={newTeacher.name}
                    onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newTeacher.email}
                    onChange={e => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={newTeacher.department}
                    onChange={e => setNewTeacher({ ...newTeacher, department: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Qualification</label>
                  <input
                    type="text"
                    required
                    value={newTeacher.qualification}
                    onChange={e => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl">
                  Add Faculty Member
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add News Modal */}
        {isAddNewsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="relative max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Publish Announcement</h3>
                <button onClick={() => setIsAddNewsOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
              </div>

              <form onSubmit={handleAddNews} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newNews.title}
                    onChange={e => setNewNews({ ...newNews, title: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Summary</label>
                  <input
                    type="text"
                    required
                    value={newNews.summary}
                    onChange={e => setNewNews({ ...newNews, summary: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Full Content</label>
                  <textarea
                    required
                    rows={4}
                    value={newNews.content}
                    onChange={e => setNewNews({ ...newNews, content: e.target.value })}
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-blue-700 text-white font-bold rounded-xl">
                  Post to Website
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
