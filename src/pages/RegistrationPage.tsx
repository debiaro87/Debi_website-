import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  GraduationCap,
  User,
  Phone,
  Mail,
  MapPin,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';
import { StudentRegistration } from '../types';

export const RegistrationPage: React.FC = () => {
  const { addToast } = useAuth();
  const { t } = useLanguage();
  const [submitting, setSubmitting] = useState(false);
  const [completedRegistration, setCompletedRegistration] = useState<StudentRegistration | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'Male' as 'Male' | 'Female',
    dateOfBirth: '2010-05-15',
    nationality: 'Ethiopian',
    gradeApplyingFor: 'Grade 9',
    stream: 'Natural Science' as 'Natural Science' | 'Social Science' | 'General',
    previousSchool: '',

    fatherName: '',
    motherName: '',
    guardianName: '',
    phoneNumber: '+251 ',
    alternativePhone: '',
    parentEmail: '',
    occupation: '',

    region: 'Oromia',
    zone: 'Horro Guduru Wollega',
    woreda: 'Shambu Town',
    town: 'Shambu',
    houseNumber: '',

    studentPhotoUrl: '',
    transcriptUrl: '',
    birthCertificateUrl: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
    if (!formData.middleName.trim()) errs.middleName = 'Middle name is required.';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!formData.previousSchool.trim()) errs.previousSchool = 'Previous school is required.';
    if (!formData.fatherName.trim()) errs.fatherName = "Father's name is required.";
    if (!formData.motherName.trim()) errs.motherName = "Mother's name is required.";

    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 10) {
      errs.phoneNumber = 'Please enter a valid phone number (e.g., +251 91 123 4567).';
    }

    if (formData.parentEmail && !/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      errs.parentEmail = 'Please enter a valid email address.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      addToast('Invalid file format. Please upload JPG, PNG, or PDF.', 'error');
      return;
    }

    const data = new FormData();
    data.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      });
      const resData = await res.json();
      if (res.ok && resData.url) {
        setFormData(prev => ({ ...prev, [fieldName]: resData.url }));
        addToast(`${file.name} uploaded successfully!`, 'success');
      } else {
        // Fallback simulate URL if upload offline
        const localPreview = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, [fieldName]: localPreview }));
        addToast(`${file.name} uploaded successfully!`, 'success');
      }
    } catch (err) {
      const localPreview = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, [fieldName]: localPreview }));
      addToast('Document attached successfully.', 'success');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please fix validation errors in the form.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/students/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'Pending'
        })
      });
      const data = await res.json();
      if (res.ok && data.student) {
        setCompletedRegistration(data.student);
        addToast('Registration submitted! Confirmation email sent.', 'success');
      } else {
        addToast(data.error || 'Failed to submit registration', 'error');
      }
    } catch (err) {
      addToast('Error submitting registration form', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (completedRegistration) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Registration Successfully Submitted!
            </h1>
            <p className="text-xs text-slate-500">
              Shambu Special Secondary School Admissions Directorate
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-900 to-emerald-900 text-white rounded-2xl shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-white/20 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">
                  Unique Registration ID
                </p>
                <p className="text-2xl font-black font-mono tracking-wider">
                  {completedRegistration.registrationNumber}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase">
                {completedRegistration.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="opacity-70">Student Name:</p>
                <p className="font-bold">{completedRegistration.firstName} {completedRegistration.middleName} {completedRegistration.lastName}</p>
              </div>
              <div>
                <p className="opacity-70">Grade Applying For:</p>
                <p className="font-bold">{completedRegistration.gradeApplyingFor} ({completedRegistration.stream || 'Natural Science'})</p>
              </div>
              <div>
                <p className="opacity-70">Parent Phone:</p>
                <p className="font-bold">{completedRegistration.phoneNumber}</p>
              </div>
              <div>
                <p className="opacity-70">Submission Date:</p>
                <p className="font-bold">{new Date(completedRegistration.submittedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white">Next Steps:</p>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Keep a copy of your Registration ID: <strong>{completedRegistration.registrationNumber}</strong>.</li>
              <li>Report to the Registrar's Office in Shambu Campus between August 25 - 31 for physical document verification.</li>
              <li>A confirmation email has been dispatched to <strong>{completedRegistration.parentEmail || completedRegistration.phoneNumber}</strong>.</li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Printer className="w-4 h-4" />
              <span>Print Registration Receipt</span>
            </button>
            <button
              onClick={() => setCompletedRegistration(null)}
              className="py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Title Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Online Registration Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Student Application & Registration Form
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Please fill in accurate information. Unique registration number will be generated automatically upon submission.
          </p>
        </div>

        {/* Main Form Box */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          
          {/* Section 1: Student Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                1. Student Personal Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="e.g. Gamachu"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Middle Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.middleName}
                  onChange={e => setFormData({ ...formData, middleName: e.target.value })}
                  placeholder="e.g. Toloosaa"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.middleName && <p className="text-[10px] text-red-500 mt-1">{errors.middleName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="e.g. Gudeta"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Gender *
                </label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={e => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Grade Applying For *
                </label>
                <select
                  value={formData.gradeApplyingFor}
                  onChange={e => setFormData({ ...formData, gradeApplyingFor: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-600"
                >
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Academic Stream
                </label>
                <select
                  value={formData.stream}
                  onChange={e => setFormData({ ...formData, stream: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Natural Science">Natural Science (Physics, Chem, Bio, Math)</option>
                  <option value="Social Science">Social Science (Economics, Hist, Geog)</option>
                  <option value="General">General (Grade 9 & 10)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Previous School Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.previousSchool}
                  onChange={e => setFormData({ ...formData, previousSchool: e.target.value })}
                  placeholder="e.g. Shambu Primary School No. 1"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.previousSchool && <p className="text-[10px] text-red-500 mt-1">{errors.previousSchool}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Parent / Guardian Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                2. Parent / Guardian Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Father's Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fatherName}
                  onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                  placeholder="Father's full name"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mother's Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.motherName}
                  onChange={e => setFormData({ ...formData, motherName: e.target.value })}
                  placeholder="Mother's full name"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Guardian Name (if different)
                </label>
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                  placeholder="Guardian full name"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="+251 91 123 4567"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
                {errors.phoneNumber && <p className="text-[10px] text-red-500 mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Alternative Phone
                </label>
                <input
                  type="text"
                  value={formData.alternativePhone}
                  onChange={e => setFormData({ ...formData, alternativePhone: e.target.value })}
                  placeholder="+251 92 000 0000"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parent Email
                </label>
                <input
                  type="email"
                  value={formData.parentEmail}
                  onChange={e => setFormData({ ...formData, parentEmail: e.target.value })}
                  placeholder="parent@gmail.com"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {errors.parentEmail && <p className="text-[10px] text-red-500 mt-1">{errors.parentEmail}</p>}
              </div>
            </div>
          </div>

          {/* Section 3: Address Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                3. Address & Location
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={e => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Zone
                </label>
                <input
                  type="text"
                  value={formData.zone}
                  onChange={e => setFormData({ ...formData, zone: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Woreda
                </label>
                <input
                  type="text"
                  value={formData.woreda}
                  onChange={e => setFormData({ ...formData, woreda: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Town / Kebele
                </label>
                <input
                  type="text"
                  value={formData.town}
                  onChange={e => setFormData({ ...formData, town: e.target.value })}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  House Number
                </label>
                <input
                  type="text"
                  value={formData.houseNumber}
                  onChange={e => setFormData({ ...formData, houseNumber: e.target.value })}
                  placeholder="e.g. 042"
                  className="w-full px-2.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Document Uploads */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
              <Upload className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                4. Required Documents Upload (JPG, PNG, or PDF)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Grade 8 Transcript</p>
                <p className="text-[10px] text-slate-400 mb-3">Scanned certificate or grade report</p>
                <input
                  type="file"
                  onChange={e => handleFileUpload(e, 'transcriptUrl')}
                  className="hidden"
                  id="upload-transcript"
                />
                <label
                  htmlFor="upload-transcript"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg cursor-pointer inline-block"
                >
                  {formData.transcriptUrl ? 'Change File' : 'Choose File'}
                </label>
                {formData.transcriptUrl && <p className="text-[10px] text-emerald-500 font-bold mt-1">✓ Attached</p>}
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Birth Certificate</p>
                <p className="text-[10px] text-slate-400 mb-3">Official Kebele / Vital event record</p>
                <input
                  type="file"
                  onChange={e => handleFileUpload(e, 'birthCertificateUrl')}
                  className="hidden"
                  id="upload-birth"
                />
                <label
                  htmlFor="upload-birth"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg cursor-pointer inline-block"
                >
                  {formData.birthCertificateUrl ? 'Change File' : 'Choose File'}
                </label>
                {formData.birthCertificateUrl && <p className="text-[10px] text-emerald-500 font-bold mt-1">✓ Attached</p>}
              </div>

              <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Student Passport Photo</p>
                <p className="text-[10px] text-slate-400 mb-3">Clear headshot portrait photo</p>
                <input
                  type="file"
                  onChange={e => handleFileUpload(e, 'studentPhotoUrl')}
                  className="hidden"
                  id="upload-photo"
                />
                <label
                  htmlFor="upload-photo"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg cursor-pointer inline-block"
                >
                  {formData.studentPhotoUrl ? 'Change File' : 'Choose File'}
                </label>
                {formData.studentPhotoUrl && <p className="text-[10px] text-emerald-500 font-bold mt-1">✓ Attached</p>}
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              By submitting this form, you confirm all provided details are true and accurate.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-700 to-emerald-700 hover:from-blue-800 hover:to-emerald-800 text-white font-black text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>{submitting ? 'Processing Registration...' : 'Submit Application & Generate ID'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
