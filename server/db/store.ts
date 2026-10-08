import fs from 'fs';
import path from 'path';
import {
  StudentRegistration,
  Teacher,
  GradeRecord,
  Assignment,
  NewsItem,
  EventItem,
  GalleryItem,
  ContactSubmission,
  User
} from '../../src/types';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_GRADES,
  INITIAL_ASSIGNMENTS,
  INITIAL_NEWS,
  INITIAL_EVENTS,
  INITIAL_GALLERY
} from '../../src/data/initialData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface Schema {
  users: User[];
  students: StudentRegistration[];
  teachers: Teacher[];
  grades: GradeRecord[];
  assignments: Assignment[];
  news: NewsItem[];
  events: EventItem[];
  gallery: GalleryItem[];
  contacts: ContactSubmission[];
}

const DEFAULT_USERS: User[] = [
  {
    id: 'u-admin',
    username: 'admin',
    name: 'Mr. Fekede Tadesse (Principal)',
    email: 'principal@shambuspecial.edu.et',
    role: 'admin',
    avatar: '/fekede_tadesse.jpg'
  },
  {
    id: 'u-teacher1',
    username: 'teacher',
    name: 'Abebe Bikila',
    email: 'abebe.b@shambuspecial.edu.et',
    role: 'teacher',
    teacherId: 'T-2024-001',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'u-student1',
    username: 'student',
    name: 'Gamachu Toloosaa Gudeta',
    email: 'student@shambuspecial.edu.et',
    role: 'student',
    studentId: 's1',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'
  }
];

class Database {
  private data: Schema;

  constructor() {
    this.data = {
      users: DEFAULT_USERS,
      students: INITIAL_STUDENTS,
      teachers: INITIAL_TEACHERS,
      grades: INITIAL_GRADES,
      assignments: INITIAL_ASSIGNMENTS,
      news: INITIAL_NEWS,
      events: INITIAL_EVENTS,
      gallery: INITIAL_GALLERY,
      contacts: []
    };
    this.init();
  }

  private init() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = {
          users: parsed.users || DEFAULT_USERS,
          students: parsed.students || INITIAL_STUDENTS,
          teachers: parsed.teachers || INITIAL_TEACHERS,
          grades: parsed.grades || INITIAL_GRADES,
          assignments: parsed.assignments || INITIAL_ASSIGNMENTS,
          news: parsed.news || INITIAL_NEWS,
          events: parsed.events || INITIAL_EVENTS,
          gallery: parsed.gallery || INITIAL_GALLERY,
          contacts: parsed.contacts || []
        };
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error initializing DB file, using fallback in-memory state:', err);
    }
  }

  private save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to DB file:', err);
    }
  }

  // Users
  getUsers() {
    return this.data.users;
  }

  findUser(identifier: string) {
    const idLower = identifier.toLowerCase().trim();
    return this.data.users.find(
      u => u.username.toLowerCase() === idLower || u.email.toLowerCase() === idLower
    );
  }

  // Students
  getStudents() {
    return this.data.students;
  }

  getStudentById(id: string) {
    return this.data.students.find(s => s.id === id || s.registrationNumber === id);
  }

  addStudent(student: Omit<StudentRegistration, 'id' | 'registrationNumber' | 'submittedAt'>) {
    const nextNum = (this.data.students.length + 101).toString().padStart(4, '0');
    const registrationNumber = `SSSS/2026/${nextNum}`;
    const newStudent: StudentRegistration = {
      ...student,
      id: `s_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      registrationNumber,
      submittedAt: new Date().toISOString()
    };
    this.data.students.unshift(newStudent);
    this.save();
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<StudentRegistration>) {
    const idx = this.data.students.findIndex(s => s.id === id || s.registrationNumber === id);
    if (idx !== -1) {
      this.data.students[idx] = { ...this.data.students[idx], ...updates };
      this.save();
      return this.data.students[idx];
    }
    return null;
  }

  deleteStudent(id: string) {
    this.data.students = this.data.students.filter(s => s.id !== id && s.registrationNumber !== id);
    this.save();
    return true;
  }

  // Teachers
  getTeachers() {
    return this.data.teachers;
  }

  addTeacher(teacher: Omit<Teacher, 'id'>) {
    const newTeacher: Teacher = {
      ...teacher,
      id: `t_${Date.now()}`
    };
    this.data.teachers.unshift(newTeacher);
    this.save();
    return newTeacher;
  }

  updateTeacher(id: string, updates: Partial<Teacher>) {
    const idx = this.data.teachers.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.data.teachers[idx] = { ...this.data.teachers[idx], ...updates };
      this.save();
      return this.data.teachers[idx];
    }
    return null;
  }

  deleteTeacher(id: string) {
    this.data.teachers = this.data.teachers.filter(t => t.id !== id);
    this.save();
    return true;
  }

  // Grades
  getGrades() {
    return this.data.grades;
  }

  getGradesForStudent(studentId: string) {
    return this.data.grades.filter(g => g.studentId === studentId);
  }

  addGrade(grade: Omit<GradeRecord, 'id'>) {
    const newGrade: GradeRecord = {
      ...grade,
      id: `g_${Date.now()}`
    };
    this.data.grades.unshift(newGrade);
    this.save();
    return newGrade;
  }

  // Assignments
  getAssignments() {
    return this.data.assignments;
  }

  addAssignment(assignment: Omit<Assignment, 'id' | 'postedAt'>) {
    const newAssignment: Assignment = {
      ...assignment,
      id: `a_${Date.now()}`,
      postedAt: new Date().toISOString().split('T')[0]
    };
    this.data.assignments.unshift(newAssignment);
    this.save();
    return newAssignment;
  }

  // News
  getNews() {
    return this.data.news;
  }

  addNews(news: Omit<NewsItem, 'id'>) {
    const newItem: NewsItem = {
      ...news,
      id: `n_${Date.now()}`
    };
    this.data.news.unshift(newItem);
    this.save();
    return newItem;
  }

  deleteNews(id: string) {
    this.data.news = this.data.news.filter(n => n.id !== id);
    this.save();
    return true;
  }

  // Events
  getEvents() {
    return this.data.events;
  }

  addEvent(event: Omit<EventItem, 'id'>) {
    const newItem: EventItem = {
      ...event,
      id: `e_${Date.now()}`
    };
    this.data.events.unshift(newItem);
    this.save();
    return newItem;
  }

  // Gallery
  getGallery() {
    return this.data.gallery;
  }

  addGallery(item: Omit<GalleryItem, 'id'>) {
    const newItem: GalleryItem = {
      ...item,
      id: `gal_${Date.now()}`
    };
    this.data.gallery.unshift(newItem);
    this.save();
    return newItem;
  }

  deleteGallery(id: string) {
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    this.save();
    return true;
  }

  // Contacts
  getContacts() {
    return this.data.contacts;
  }

  addContact(contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'read'>) {
    const newContact: ContactSubmission = {
      ...contact,
      id: `c_${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };
    this.data.contacts.unshift(newContact);
    this.save();
    return newContact;
  }
}

export const db = new Database();
