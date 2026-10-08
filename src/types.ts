export type UserRole = 'admin' | 'teacher' | 'student' | 'guest';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentId?: string;
  teacherId?: string;
}

export interface StudentRegistration {
  id: string;
  registrationNumber: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string;
  nationality: string;
  gradeApplyingFor: string; // 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12'
  stream?: 'Natural Science' | 'Social Science' | 'General';
  previousSchool: string;
  studentPhotoUrl?: string;
  
  // Parent/Guardian Info
  fatherName: string;
  motherName: string;
  guardianName: string;
  phoneNumber: string;
  alternativePhone?: string;
  parentEmail: string;
  occupation: string;
  
  // Address
  region: string;
  zone: string;
  woreda: string;
  town: string;
  houseNumber: string;
  
  // Documents
  transcriptUrl?: string;
  birthCertificateUrl?: string;
  passportPhotoUrl?: string;
  
  // Status
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
  notes?: string;
}

export interface StudentProfile extends StudentRegistration {
  studentId: string;
  gpa?: number;
  rank?: number;
  section?: string;
  academicYear: string;
}

export interface Teacher {
  id: string;
  teacherId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  qualification: string;
  subjects: string[];
  photoUrl: string;
  bio?: string;
  assignedGrades: string[];
}

export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  gradeLevel: string;
  subject: string;
  teacherName: string;
  semester: 'Semester 1' | 'Semester 2';
  academicYear: string;
  continuousAssessment: number; // Max 40
  midtermExam: number; // Max 20
  finalExam: number; // Max 40
  totalScore: number; // 0 - 100
  letterGrade: string; // A, B, C, D, F
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  teacherName: string;
  description: string;
  dueDate: string;
  fileUrl?: string;
  postedAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'News' | 'Announcement' | 'Exam Schedule' | 'Holiday' | 'Event';
  summary: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  isImportant?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Campus' | 'Events' | 'Sports' | 'Classrooms' | 'Graduation' | 'Laboratories';
  imageUrl: string;
  description: string;
  date: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  universityAcceptanceRate: number;
  modernLaboratories: number;
  establishedYear: number;
  graduationRate: number;
}
