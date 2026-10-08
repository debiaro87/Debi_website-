import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { db } from '../db/store';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'shambu_special_secondary_school_secret_2026';

// Setup file storage for uploads
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: JPG, PNG, PDF, DOC'));
    }
  }
});

// Auth Routes
router.post('/auth/login', (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Demo password validation: accepts any non-empty password in demo or 'password123' / 'admin123'
  const user = db.findUser(username);

  if (!user) {
    // If logging in as role and user not explicitly found in seed, create guest or fallback account
    if (role === 'admin' || username.toLowerCase() === 'admin') {
      const adminUser = db.getUsers().find(u => u.role === 'admin')!;
      const token = jwt.sign({ id: adminUser.id, role: adminUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: adminUser });
    }
    if (role === 'teacher' || username.toLowerCase() === 'teacher') {
      const teacherUser = db.getUsers().find(u => u.role === 'teacher')!;
      const token = jwt.sign({ id: teacherUser.id, role: teacherUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: teacherUser });
    }
    if (role === 'student' || username.toLowerCase() === 'student') {
      const studentUser = db.getUsers().find(u => u.role === 'student')!;
      const token = jwt.sign({ id: studentUser.id, role: studentUser.role }, JWT_SECRET, { expiresIn: '7d' });
      return res.json({ token, user: studentUser });
    }
    return res.status(401).json({ error: 'Invalid credentials. Try demo credentials provided on page.' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user });
});

router.get('/auth/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
    const user = db.getUsers().find(u => u.id === decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

// File Upload Handler
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    message: 'File uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname
  });
});

// Students & Registration
router.get('/students', (req: Request, res: Response) => {
  const students = db.getStudents();
  res.json(students);
});

router.get('/students/:id', (req: Request, res: Response) => {
  const student = db.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  const grades = db.getGradesForStudent(student.id);
  res.json({ ...student, grades });
});

router.post('/students/register', (req: Request, res: Response) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.gradeApplyingFor || !data.phoneNumber) {
      return res.status(400).json({ error: 'Missing required student registration fields.' });
    }
    const newStudent = db.addStudent(data);
    res.status(201).json({
      message: 'Registration successful! Registration number generated.',
      student: newStudent,
      emailSent: true
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to complete registration' });
  }
});

router.put('/students/:id', (req: Request, res: Response) => {
  const updated = db.updateStudent(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Student record not found' });
  res.json(updated);
});

router.delete('/students/:id', (req: Request, res: Response) => {
  db.deleteStudent(req.params.id);
  res.json({ message: 'Student record deleted successfully' });
});

// Teachers
router.get('/teachers', (req: Request, res: Response) => {
  res.json(db.getTeachers());
});

router.post('/teachers', (req: Request, res: Response) => {
  const newTeacher = db.addTeacher(req.body);
  res.status(201).json(newTeacher);
});

router.put('/teachers/:id', (req: Request, res: Response) => {
  const updated = db.updateTeacher(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Teacher not found' });
  res.json(updated);
});

router.delete('/teachers/:id', (req: Request, res: Response) => {
  db.deleteTeacher(req.params.id);
  res.json({ message: 'Teacher deleted successfully' });
});

// Grades
router.get('/grades', (req: Request, res: Response) => {
  res.json(db.getGrades());
});

router.post('/grades', (req: Request, res: Response) => {
  const { continuousAssessment, midtermExam, finalExam } = req.body;
  const ca = Number(continuousAssessment) || 0;
  const mid = Number(midtermExam) || 0;
  const fin = Number(finalExam) || 0;
  const total = ca + mid + fin;
  
  let letterGrade = 'F';
  if (total >= 90) letterGrade = 'A+';
  else if (total >= 85) letterGrade = 'A';
  else if (total >= 80) letterGrade = 'A-';
  else if (total >= 75) letterGrade = 'B+';
  else if (total >= 70) letterGrade = 'B';
  else if (total >= 65) letterGrade = 'C+';
  else if (total >= 60) letterGrade = 'C';
  else if (total >= 50) letterGrade = 'D';

  const newGrade = db.addGrade({
    ...req.body,
    continuousAssessment: ca,
    midtermExam: mid,
    finalExam: fin,
    totalScore: total,
    letterGrade
  });
  res.status(201).json(newGrade);
});

// Assignments
router.get('/assignments', (req: Request, res: Response) => {
  res.json(db.getAssignments());
});

router.post('/assignments', (req: Request, res: Response) => {
  const newAssignment = db.addAssignment(req.body);
  res.status(201).json(newAssignment);
});

// News
router.get('/news', (req: Request, res: Response) => {
  res.json(db.getNews());
});

router.post('/news', (req: Request, res: Response) => {
  const item = db.addNews(req.body);
  res.status(201).json(item);
});

router.delete('/news/:id', (req: Request, res: Response) => {
  db.deleteNews(req.params.id);
  res.json({ message: 'News item removed' });
});

// Events
router.get('/events', (req: Request, res: Response) => {
  res.json(db.getEvents());
});

router.post('/events', (req: Request, res: Response) => {
  const event = db.addEvent(req.body);
  res.status(201).json(event);
});

// Gallery
router.get('/gallery', (req: Request, res: Response) => {
  res.json(db.getGallery());
});

router.post('/gallery', (req: Request, res: Response) => {
  const item = db.addGallery(req.body);
  res.status(201).json(item);
});

router.delete('/gallery/:id', (req: Request, res: Response) => {
  db.deleteGallery(req.params.id);
  res.json({ message: 'Gallery item removed' });
});

// Contact submissions
router.get('/contacts', (req: Request, res: Response) => {
  res.json(db.getContacts());
});

router.post('/contacts', (req: Request, res: Response) => {
  const contact = db.addContact(req.body);
  res.status(201).json({ message: 'Thank you! Your message has been received.', contact });
});

// Overall Stats
router.get('/stats', (req: Request, res: Response) => {
  const students = db.getStudents();
  const teachers = db.getTeachers();
  const pendingRegistrations = students.filter(s => s.status === 'Pending').length;
  const approvedStudents = students.filter(s => s.status === 'Approved').length;

  res.json({
    totalStudents: students.length,
    approvedStudents,
    pendingRegistrations,
    totalTeachers: teachers.length,
    universityAcceptanceRate: 98.5,
    establishedYear: 2008,
    laboratories: 12
  });
});

export default router;
