import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'om' | 'am';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'om', name: 'Afaan Oromoo', nativeName: 'Afaan Oromoo', flag: '🌳' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
];

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Header
    'school.title': 'SHAMBU SPECIAL',
    'school.subtitle': 'Secondary School',
    'school.full_name': 'Shambu Special Secondary School',
    'school.location': 'Shambu Town, Horro Guduru Wollega, Oromia, Ethiopia',
    'notice.tag': 'NOTICE',
    'notice.text': 'Grade 9-12 Special Registration for 2026/2027 Academic Year is now open.',
    'phone': '+251 57 665 0123',
    'email': 'info@shambuspecial.edu.et',

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.academics': 'Academics',
    'nav.admissions': 'Admissions',
    'nav.registration': 'Registration',
    'nav.teachers': 'Teachers & Faculty',
    'nav.student_life': 'Student Life',
    'nav.gallery': 'Photo Gallery',
    'nav.news': 'News & Events',
    'nav.contact': 'Contact Us',
    'nav.apply_badge': 'Apply Now',

    // Actions & Portals
    'portal.signin': 'Portal Sign In',
    'portal.student': 'Student Portal',
    'portal.teacher': 'Teacher Portal',
    'portal.admin': 'Admin / Staff Portal',
    'portal.dashboard': 'My Dashboard',
    'portal.signout': 'Sign Out',
    'search.title': 'Search Website',
    'search.placeholder': 'Search courses, teachers, news, registration details...',
    'theme.toggle': 'Toggle Light/Dark Theme',
    'lang.select': 'Select Language',

    // Hero Section
    'hero.badge': 'Premier Center of Academic Excellence in Ethiopia',
    'hero.title': 'Shaping Tomorrow’s STEM & Leadership Visionaries',
    'hero.desc': 'Empowering top-performing high school students across Horro Guduru, Oromia, and Ethiopia with rigorous STEM curriculum, advanced laboratories, expert educators, and holistic leadership development.',
    'hero.apply_btn': 'Apply for Admission',
    'hero.academics_btn': 'Explore Curriculum',
    'hero.portal_btn': 'Access Student Portal',

    // Hero Stats
    'stat.students': 'Selected STEM Scholars',
    'stat.pass_rate': 'University Entrance Pass Rate',
    'stat.teachers': 'Master & PhD Educators',
    'stat.labs': 'Advanced STEM & Computer Labs',

    // Home Page Sections
    'home.welcome_title': 'Welcome to Shambu Special Secondary School',
    'home.welcome_desc': 'Founded to nurture the brightest young minds in Ethiopia, Shambu Special Secondary School provides a world-class education rooted in innovation, discipline, and community service.',
    'home.stem_focus': 'STEM Focused Education',
    'home.stem_desc': 'Comprehensive courses in Physics, Chemistry, Biology, Mathematics, Robotics, and ICT with hands-on practical experiments.',
    'home.boarding_focus': 'Modern Boarding Facilities',
    'home.boarding_desc': 'Safe, supportive, and comfortable dormitory life with nutrition-balanced meals, study halls, and health care.',
    'home.character_focus': 'Leadership & Ethics',
    'home.character_desc': 'Cultivating patriotic, visionary, and ethical leaders who contribute to the development of Oromia and Ethiopia.',
    'home.news_section_title': 'Latest News & Events',
    'home.news_section_subtitle': 'Stay updated with academic achievements, competitions, and campus events.',
    'home.principal_title': 'Message from the Principal',
    'home.principal_name': 'Mr. Fekede Tadesse',
    'home.principal_quote': 'Our commitment at Shambu Special Secondary School is to foster an environment where intellectual curiosity meets unwavering discipline. We build leaders for tomorrow’s Ethiopia.',

    // Common Buttons & Labels
    'btn.learn_more': 'Learn More',
    'btn.submit': 'Submit Application',
    'btn.contact_us': 'Contact Us Today',
    'btn.view_all': 'View All',
    'btn.read_more': 'Read Full Article',
    'btn.close': 'Close',
    'btn.login': 'Log In',
    'btn.register': 'Register Now',

    // About Page
    'about.tag': 'About Our Institution',
    'about.title': 'Shambu Special Secondary School',
    'about.desc': 'Located in Shambu Town, Horro Guduru Wollega Zone, Oromia Region, Ethiopia — dedicated to cultivating high-ability scholars, scientific innovators, and patriotic leaders.',
    'about.history_title': 'Our History & Growth',
    'about.history_p1': 'Established as part of Oromia’s special regional education initiative, Shambu Special Secondary School addresses the need for advanced secondary education tailored to top-performing students.',
    'about.history_p2': 'Our campus features specialized physics, chemistry, biology, robotics, and ICT laboratories, a modern library, boarding facilities, and a vibrant extracurricular ecosystem.',
    'about.mission': 'Our Mission',
    'about.mission_desc': 'To provide top-tier secondary education in STEM and humanities to gifted students, fostering critical reasoning, practical scientific competence, ethical integrity, and civic responsibility.',
    'about.vision': 'Our Vision',
    'about.vision_desc': 'To be recognized as Ethiopia’s foremost center of secondary academic excellence, producing visionary innovators and leaders who transform national development.',
    'about.values': 'Core Values',
    'about.facilities': 'Campus Facilities',
    'about.facilities_sub': 'Purpose-built environment designed for immersive learning and residential comfort.',

    // Academics Page
    'academics.tag': 'Academic Curriculum & Excellence',
    'academics.title': 'Rigorous STEM & Comprehensive High School Program',
    'academics.desc': 'Designed to challenge gifted learners with practical science, advanced mathematics, coding, and holistic humanities.',
    'academics.grade9_10': 'Grade 9 & 10 Foundational Excellence',
    'academics.grade11_12': 'Grade 11 & 12 Advanced University Preparation',
    'academics.stem_streams': 'Specialized STEM Streams',

    // Admissions Page
    'admissions.tag': 'Admission Guidelines & Criteria',
    'admissions.title': 'Joining Shambu Special Secondary School',
    'admissions.desc': 'Admission is highly competitive based on Grade 8 Ministry Exam scores, entrance assessments, and regional merit quotas.',
    'admissions.criteria_title': 'Eligibility & Criteria',
    'admissions.step1': 'Regional Entrance Exam',
    'admissions.step2': 'Document Verification',
    'admissions.step3': 'Boarding Placement & Enrollment',

    // Registration Page
    'reg.title': 'Online Admission & Registration',
    'reg.subtitle': 'Fill out the form below to submit your application for Shambu Special Secondary School Grade 9-12 admission.',
    'reg.full_name': 'Full Name (Student)',
    'reg.grade': 'Applying for Grade',
    'reg.prev_school': 'Previous School Name',
    'reg.region': 'Region / Zone',
    'reg.exam_score': 'Ministry Exam Score / GPA',
    'reg.parent_name': 'Parent / Guardian Name',
    'reg.parent_phone': 'Parent Phone Number',
    'reg.submitting': 'Submitting Application...',
    'reg.success': 'Your application has been submitted successfully!',

    // Teachers Page
    'teachers.tag': 'Our Distinguished Faculty',
    'teachers.title': 'Dedicated STEM & Humanities Educators',
    'teachers.desc': 'Meet the master educators, department heads, and mentors guiding Ethiopia’s next generation of innovators.',

    // Student Life Page
    'student_life.tag': 'Campus & Residential Life',
    'student_life.title': 'Holistic Student Experience in Shambu',
    'student_life.desc': 'Life at Shambu Special extends beyond classrooms — encompassing robotics clubs, sports tournaments, debating societies, and community outreach.',

    // Gallery Page
    'gallery.tag': 'Visual Highlights',
    'gallery.title': 'Life Inside Shambu Special Secondary School',
    'gallery.desc': 'Explore moments from science fairs, sports days, graduation ceremonies, and daily campus activities.',

    // News Page
    'news.tag': 'School News & Updates',
    'news.title': 'Latest Happenings at Shambu Special',
    'news.desc': 'Discover academic announcements, exam results, sports triumphs, and upcoming events.',

    // Contact Page
    'contact.tag': 'Get In Touch',
    'contact.title': 'We’d Love to Hear From You',
    'contact.desc': 'Have questions about admissions, campus visits, or student records? Reach out to our administrative team.',
    'contact.address': 'School Address',
    'contact.phone_email': 'Phone & Email',
    'contact.hours': 'Working Hours',
    'contact.hours_val': 'Monday - Friday: 8:00 AM - 5:00 PM',
    'contact.send_msg': 'Send us a Message',
    'contact.your_name': 'Your Name',
    'contact.your_email': 'Your Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send_btn': 'Send Message',

    // Login Modal
    'login.title': 'Portal Sign In',
    'login.subtitle': 'Select your role and enter credentials to access your dashboard',
    'login.email': 'Email Address or Student ID',
    'login.password': 'Password',
    'login.select_role': 'Select Portal Role',
    'login.demo_btn': 'Quick Demo Sign In',

    // Footer
    'footer.quick_links': 'Quick Links',
    'footer.academic_programs': 'Academic Programs',
    'footer.contact_info': 'Contact Info',
    'footer.copyright': 'All rights reserved. Shambu Special Secondary School, Ethiopia.',
    'footer.motto': 'Excellence, Integrity & Innovation for Ethiopia’s Future',

    // Dashboards & Search
    'dashboard.welcome': 'Welcome back',
    'dashboard.role': 'Account Role',
    'dashboard.notifications': 'System Announcements',
    'dashboard.recent_activity': 'Recent Activity',
    'search.heading': 'Search Shambu Special Secondary School',
    'search.no_results': 'No matching results found.',

    // FAQ Section
    'faq.tag': 'Frequently Asked Questions',
    'faq.title': 'Common Questions About Admissions & Student Life',
    'faq.subtitle': 'Find quick answers regarding eligibility, registration, STEM curriculum, dormitory boarding, and campus life at Shambu Special Secondary School.',
    'faq.search_placeholder': 'Search questions by keyword...',
    'faq.all_categories': 'All Questions',
    'faq.cat_admissions': 'Admissions & Entry',
    'faq.cat_student_life': 'Student Life & Boarding',
    'faq.cat_academics': 'Academics & STEM',
    'faq.still_have_questions': 'Still Have Questions?',
    'faq.contact_prompt': 'If you couldn’t find the answer to your question, our admissions team is ready to assist you.',
    'faq.q1': 'What are the eligibility criteria for Grade 9 admission?',
    'faq.a1': 'Applicants must achieve a top-tier score in the Grade 8 Ministry Exam, pass the regional Special Secondary School Entrance Assessment, and rank among top students in Horro Guduru Wollega or Oromia Region merit quotas.',
    'faq.q2': 'How can I register online for the upcoming academic year?',
    'faq.a2': 'Click on "Registration" in the top navigation menu, fill out the student personal details, previous school name, Ministry Exam score, parent contact, and submit your application to receive an instant tracking ID.',
    'faq.q3': 'Is there any tuition or registration fee for admitted students?',
    'faq.a3': 'No. Shambu Special Secondary School is a fully government-funded center of excellence. Education, textbooks, advanced laboratory access, and dormitory boarding are provided 100% tuition-free to selected scholars.',
    'faq.q4': 'What are the dormitory and boarding facilities like?',
    'faq.a4': 'We offer modern, secure dormitories separated for male and female students, dining halls providing three balanced meals daily, study halls with high-speed internet, and on-campus health clinics.',
    'faq.q5': 'What clubs and extracurricular activities are available?',
    'faq.a5': 'Students can join the Robotics & Coding Club, Science & Innovation Society, English Debate Forum, Athletics & Football Teams, Cultural Performance Troupes, and Environmental Protection Club.',
    'faq.q6': 'What subjects and specialization streams are offered?',
    'faq.a6': 'We focus heavily on Natural Sciences (Physics, Chemistry, Biology, Advanced Mathematics, ICT, and Robotics) while maintaining strong Humanities (English, Afaan Oromoo, Amharic, History, and Geography).',
    'faq.q7': 'How does the school prepare students for National Entrance Exams?',
    'faq.a7': 'Through continuous assessment, weekend mock examinations, practical laboratory research, and university preparatory coaching led by Master’s and PhD faculty members.',

    // School Picture Storage
    'storage.tag': 'School Picture Storage',
    'storage.title': 'Store & Manage School Pictures',
    'storage.subtitle': 'Store, upload, organize, and archive high-resolution photographs of Shambu Special Secondary School campus, laboratories, events, and facilities.',
    'storage.upload_btn': 'Store New Picture',
    'storage.drag_drop_title': 'Upload School Photograph',
    'storage.drag_drop_desc': 'Drag and drop an image file here, or click to browse from device',
    'storage.or_url': 'Or enter direct picture URL',
    'storage.pic_title': 'Picture Title',
    'storage.pic_category': 'Picture Category',
    'storage.pic_desc': 'Description / Caption',
    'storage.pic_date': 'Date Captured',
    'storage.save_pic': 'Save Picture to Storage',
    'storage.uploading': 'Uploading file...',
    'storage.success': 'Picture successfully stored in school repository!',
    'storage.delete_confirm': 'Are you sure you want to remove this picture from school storage?',
    'storage.total_pics': 'Stored Pictures',
    'storage.copy_url': 'Copy Picture URL',
    'storage.download': 'Download Picture',
    'storage.link_copied': 'Picture URL copied to clipboard!'
  },

  om: {
    // Top Bar & Header
    'school.title': 'SHAMBUU ADDAA',
    'school.subtitle': 'Mana Barumsaa Qophaa’ina',
    'school.full_name': 'Mana Barumsaa Qophaa’ina Addaa Shambuu',
    'school.location': 'Magaalaa Shambuu, Horo Guduru Wallaggaa, Oromiyaa, Itoophiyaa',
    'notice.tag': 'BEEKSISA',
    'notice.text': 'Galmeen addaa Kutaa 9-12 bara 2018/2019 banameera.',
    'phone': '+251 57 665 0123',
    'email': 'info@shambuspecial.edu.et',

    // Navigation
    'nav.home': 'Fuula Duraa',
    'nav.about': 'Waa’ee Keenya',
    'nav.academics': 'Barnoota',
    'nav.admissions': 'Seensa Barattootaa',
    'nav.registration': 'Galmee Onlaayinii',
    'nav.teachers': 'Barsiisota & Wajjira',
    'nav.student_life': 'Jireenya Barattootaa',
    'nav.gallery': 'Suuraalee',
    'nav.news': 'Oduu & Qophiilee',
    'nav.contact': 'Nu Quunnamaa',
    'nav.apply_badge': 'Iyyadhu',

    // Actions & Portals
    'portal.signin': 'Seensa Poortaali',
    'portal.student': 'Poortaalii Barataa',
    'portal.teacher': 'Poortaalii Barsiisaa',
    'portal.admin': 'Poortaalii Bulchiinsaa',
    'portal.dashboard': 'Daashboordii Kooru',
    'portal.signout': 'Ba’i',
    'search.title': 'Marsariitii Barbaadi',
    'search.placeholder': 'Koorsii, barsiisota, beeksisa, galmee barbaadi...',
    'theme.toggle': 'Jijjiirraa Mogaa Ifaa/Dukkanaa',
    'lang.select': 'Afaan Filadhu',

    // Hero Section
    'hero.badge': 'Giddu-gala Barnoota Addaa fi Cimaa Itoophiyaa',
    'hero.title': 'Mul’ata Saayinsii fi Geggeessummaa Boruu Uumuura',
    'hero.desc': 'Barattoota qabxii olaanaa Horro Guduru, Oromiyaa fi Itoophiyaa guutuurraa filataman barnoota STEM, laaboraatoorii ammayyaa, barsiisota muuxannoo qabaniin bocuuf kan hojjetu.',
    'hero.apply_btn': 'Galmeef Iyyadhu',
    'hero.academics_btn': 'Silabaasii Ilaali',
    'hero.portal_btn': 'Poortaalii Barataatti Galii',

    // Hero Stats
    'stat.students': 'Barattoota STEM Cimaa',
    'stat.pass_rate': 'Qabxii Seensa Yuunivarsiitii',
    'stat.teachers': 'Barsiisota Digrii 2ffaa & 3ffaa',
    'stat.labs': 'Laaboraatoorii Ammayyaa STEM',

    // Home Page Sections
    'home.welcome_title': 'Baga Nagaan Gara Mana Barumsaa Qophaa’ina Addaa Shambuu Dhuftan',
    'home.welcome_desc': 'Barattoota sammuu qartuu Oromiyaa fi Itoophiyaa leenjisuuf kan hundaa’e, Mana Barumsaa Addaa Shambuu barnoota qulqullina ol’aanaa qabu kenna.',
    'home.stem_focus': 'Barnoota STEM Irratti Xiyyeeffate',
    'home.stem_desc': 'Fiiziksii, Keemistrii, Biyaaloojii, Herrega, Roobootiksii fi ICT shaakala laaboraatooriitiin deeggarame.',
    'home.boarding_focus': 'Mooraa Bultii Ammayyaa',
    'home.boarding_desc': 'Jireenya mooraa nageenya qabu, nyaata madaalawaa, hallii qayyabannaa fi tajaajila fayyaa wajjin.',
    'home.character_focus': 'Geggeessummaa fi Naamusaa',
    'home.character_desc': 'Geggeessitoota mul’ata qaban, biyya isaaniif quuqaman fi naamusa gaarii qaban bocuu.',
    'home.news_section_title': 'Oduu fi Qophiilee Dhiyeenyaa',
    'home.news_section_subtitle': 'Oduu milkaa’ina barnootaa, dorgoommii fi beeksisa mooraa keenyaa hordofaa.',
    'home.principal_title': 'Ergaa Dura-bu’aa Mana Barumsaa',
    'home.principal_name': 'Obbo Fakadaa Taaddasaa (Fekede Tadesse)',
    'home.principal_quote': 'Kutannoon keenya Mana Barumsaa Addaa Shambuu keessatti barattoota dandeettii ol’aanaa qaban beekumsi fi naamusa cimsaaniin geggeessitoota boruu gochuudha.',

    // Common Buttons & Labels
    'btn.learn_more': 'Calaatti Baradhu',
    'btn.submit': 'Iyyata Galchu',
    'btn.contact_us': 'Nu Quunnamaa',
    'btn.view_all': 'Hunda Ilaali',
    'btn.read_more': 'Guutuu Dubbisi',
    'btn.close': 'Cufi',
    'btn.login': 'Gali',
    'btn.register': 'Amma Galmaa’i',

    // About Page
    'about.tag': 'Waa’ee Dhaabbata Keenyaa',
    'about.title': 'Mana Barumsaa Qophaa’ina Addaa Shambuu',
    'about.desc': 'Magaalaa Shambuu, Godina Horro Guduru Wallaggaa, Oromiyaa, Itoophiyaa keessatti kan argamu — barattoota beekumsa fi leenjii saayinsiitiin guddusuuf kan hundaa’e.',
    'about.history_title': 'Seenaa fi Guddina Keenya',
    'about.history_p1': 'Akka qaama sagantaa barnoota addaa Oromiyaatetti hundaa’ee, barattoota qabxii ol’aanaa fiduuf leenjii saayinsii fi teeknooloojii kennaa jira.',
    'about.history_p2': 'Mooraan keenya laaboraatoorii ammayyaa fiiziksii, keemistrii, biyaaloojii, roobootiksii fi ICT, mana dubbisaa fi mooraa bultii qaba.',
    'about.mission': 'Ergama Keenya',
    'about.mission_desc': 'Barattoota sammuu qartuuf barnoota STEM fi saayinsii hawaasaa qulqullina qabu kennuun, geggeessitoota naamusa qaban uumuu.',
    'about.vision': 'Mul’ata Keenya',
    'about.vision_desc': 'Itoophiyaa keessatti giddu-gala barnoota addaa beekamaa fi bu’a-qabeessa ta’ee argamuu.',
    'about.values': 'Duudhaalee Ijoo',
    'about.facilities': 'Mijatoolii Mooraa',
    'about.facilities_sub': 'Naannoo barumsaa fi mooraa bultii barattootaaf mijataa ta’e.',

    // Academics Page
    'academics.tag': 'Koorii Barnootaa fi Qulqullina',
    'academics.title': 'Barnoota STEM fi Qophaa’ina Cimaa',
    'academics.desc': 'Barattoota sammuu qartuu leenjisuuf saayinsii, herrega, koodingii fi saayinsii hawaasaatiin boce.',
    'academics.grade9_10': 'Kutaa 9 fi 10 Hundee Barnootaa Cimaa',
    'academics.grade11_12': 'Kutaa 11 fi 12 Qophaa’ina Yuunivarsiitii',
    'academics.stem_streams': 'Tajaajila Barnoota STEM Addaa',

    // Admissions Page
    'admissions.tag': 'Ulaagaa fi Qajeelfama Seensaa',
    'admissions.title': 'Gara Mana Barumsaa Addaa Shambuu Seenuu',
    'admissions.desc': 'Seensi qabxii qormaata kutaa 8ffaa, qormaata seensaa fi dorgommii qabxii irratti hundaa’a.',
    'admissions.criteria_title': 'Ulaagaa Seensaa',
    'admissions.step1': 'Qormaata Seensaa Naannoo',
    'admissions.step2': 'Mirkaneessa Ragaa Barnootaa',
    'admissions.step3': 'Galmee Mooraa Bultii',

    // Registration Page
    'reg.title': 'Iyyata Galmee Onlaayinii',
    'reg.subtitle': 'Formii kana guutuun galmee Mana Barumsaa Qophaa’ina Addaa Shambuu kutaa 9-12 f iyyadhu.',
    'reg.full_name': 'Maqaa Guutuu (Barataa)',
    'reg.grade': 'Kutaa Galmaa’uuf Dhihaate',
    'reg.prev_school': 'Maqaa Mana Barumsaa Kanaan Duraa',
    'reg.region': 'Godina / Naannoo',
    'reg.exam_score': 'Qabxii Qormaata Biyoolessaa / GPA',
    'reg.parent_name': 'Maqaa Maatii / Guddistuu',
    'reg.parent_phone': 'Lakkoofsa Bilbila Maatii',
    'reg.submitting': 'Iyyata Ergaa Jira...',
    'reg.success': 'Iyyanni keessan milkaa’inaan ergameera!',

    // Teachers Page
    'teachers.tag': 'Barsiisota Keenya Kabajamoo',
    'teachers.title': 'Barsiisota Barnoota STEM fi Hawaasaa',
    'teachers.desc': 'Barsiisota digrii 2ffaa fi 3ffaa qaban kan barattoota keenya leenjisan.',

    // Student Life Page
    'student_life.tag': 'Jireenya Mooraa fi Klabaatota',
    'student_life.title': 'Muuxannoo Jireenya Barataa',
    'student_life.desc': 'Jireenyi mooraa Shambuu barnoota qofa osoo hin taane, kilaboota roobootiksii, ispoortii, falmii fi tajaajila hawaasaa of keessatti qabata.',

    // Gallery Page
    'gallery.tag': 'Suuraalee Mooraa Keenyaa',
    'gallery.title': 'Muuxannoo Mooraa Suuraan',
    'gallery.desc': 'Suuraalee agarsiisa saayinsii, guyyaa ispoortii, eebba fi sochiilee mooraa keenyaa ilaalaa.',

    // News Page
    'news.tag': 'Oduu fi Beeksisa',
    'news.title': 'Oduu fi Qophiilee Dhiyeenyaa',
    'news.desc': 'Beeksisa barnootaa, firii qormaataa, mo’icha ispoortii fi qophiilee dhufan hordofaa.',

    // Contact Page
    'contact.tag': 'Nu Quunnamaa',
    'contact.title': 'Nu Quunnamaa Yaada Keessan Nuuf Ergaa',
    'contact.desc': 'Waa’ee seensaa, daawwanna mooraa fi galmeef nu quunnamaa.',
    'contact.address': 'Teessoo Mana Barumsaa',
    'contact.phone_email': 'Bilbila fi Eemeelii',
    'contact.hours': 'Sa’aatii Hojii',
    'contact.hours_val': 'Wiitata - Jimaata: Sa’aatii 2:00 - 11:00',
    'contact.send_msg': 'Ergaa Nuuf Ergaa',
    'contact.your_name': 'Maqaa Keessan',
    'contact.your_email': 'Eemeelii Keessan',
    'contact.subject': 'Mata Duree',
    'contact.message': 'Ergaa Keessan',
    'contact.send_btn': 'Ergaa Ergi',

    // Login Modal
    'login.title': 'Seensa Poortaali',
    'login.subtitle': 'Gooftaa kee filachuun galii poortaalii keetti galii',
    'login.email': 'Eemeelii ykn Lakk. Barataa',
    'login.password': 'Jecha Cufaa',
    'login.select_role': 'Gahee Poortaalii Filadhu',
    'login.demo_btn': 'Seensa Ariifachiisaa (Demo)',

    // Footer
    'footer.quick_links': 'Liinkii Ariifachiisaa',
    'footer.academic_programs': 'Sagantaa Barnootaa',
    'footer.contact_info': 'Teessoo Keenya',
    'footer.copyright': 'Mirgi hundaa kan eegame. Mana Barumsaa Qophaa’ina Addaa Shambuu, Itoophiyaa.',
    'footer.motto': 'Qulqullina, Naamusa fi Muxannoo Cimaa Guddina Itoophiyaaf',

    // Dashboards & Search
    'dashboard.welcome': 'Baga nagaan deebitan',
    'dashboard.role': 'Gahee Lakkoofsaa',
    'dashboard.notifications': 'Beeksisa Miriitii',
    'dashboard.recent_activity': 'Gochoota Dhiyeenyaa',
    'search.heading': 'Mana Barumsaa Addaa Shambuu Barbaadi',
    'search.no_results': 'Firii wajjin walsimatu hin argamne.',

    // FAQ Section
    'faq.tag': 'Gaaffilee Yeroo Baay’ee Gaafataman',
    'faq.title': 'Gaaffilee Seensa Barattootaa fi Jireenya Mooraa',
    'faq.subtitle': 'Waa’ee ulaagaa seensaa, galmee, koorsii STEM, mooraa bultii fi jireenya barattootaa deebii ariifachiisaa argadhaa.',
    'faq.search_placeholder': 'Gaaffilee jecha qabaan barbaadi...',
    'faq.all_categories': 'Gaaffilee Hunda',
    'faq.cat_admissions': 'Seensa & Galmee',
    'faq.cat_student_life': 'Jireenya Mooraa & Bultii',
    'faq.cat_academics': 'Barnoota & STEM',
    'faq.still_have_questions': 'Gaaffii Dabalataa Qabduu?',
    'faq.contact_prompt': 'Gaaffii keessaniif deebii yoo hin arganne, gareen seensa keenya isin gargaaruuf qophiidha.',
    'faq.q1': 'Ulaagaaleen seensa kutaa 9ffaa maal fa’i?',
    'faq.a1': 'Iyyattoonis qabxii ol’aanaa qormaata kutaa 8ffaa fiduu, qormaata seensaa M/B Addaa darbuu fi dorgommii qabxii irratti Horro Guduru Wallaggaa ykn Naannoo Oromiyaa keessatti sadarkaa ol’aanaa qabaachuu qabu.',
    'faq.q2': 'Bara barnoota dhufuuf akkamitti onlaayiniin galmaa’uu danda’a?',
    'faq.a2': 'Cura "Galmee Onlaayinii" cuqaasuun, odeeffannoo dhuunfaa barataa, maqaa mana barumsaa kanaan duraa, qabxii qormaataa guutuun iyyata keessan ergaa.',
    'faq.q3': 'Barattoota galmaa’aniif kaffaltiin barnootaa ykn galmee ni jiraa?',
    'faq.a3': 'Lakkii. M/Barumsaa Addaa Shambuu guutummaatti mootummaadhaan kan baajatamuudha. Barnootni, kitaba, meeshaan laaboraatoorii fi tajaajili mooraa bultii barattoota filatamanif tola kennama.',
    'faq.q4': 'Mooraan bultii fi tajaajili jireenyaa akkamii?',
    'faq.a4': 'Mooraa bultii ammayyaa fi dhiiraa/dubaraaf addaan ba’e, galma nyaataa madaalawaa tajaajilu, kellaa qayyabannaa intarneetii qabu fi kilinika fayyaa ni dhiyeessina.',
    'faq.q5': 'Kilabootni fi sochiileen barnootaan alaa maalfaa argamu?',
    'faq.a5': 'Barattootni Kilaba Roobootiksii & Koodingii, Hawaasa Saayinsii & Kalaqaa, Falmii & Ingiliffaa, Garee Ispoortii, Aadaa fi Eegumsa Naannoo keessatti hirmaachuu danda’u.',
    'faq.q6': 'Gosa barnootaa fi saayinsii kamfaatu kennama?',
    'faq.a6': 'Sookkeessaan Saayinsii Uumamaa (Fiiziksii, Keemistrii, Biyaaloojii, Herrega Cimaa, ICT, Roobootiksii) irratti xiyyeeffachuun barnoota hawaasaas ni kennina.',
    'faq.q7': 'Mani barumsaa barattoota qormaata seensa yuunivarsiitiif akkamitti qopheessa?',
    'faq.a7': 'Shaakala qormaataa yeroo yeroon, qormaata fakkeessaa dhuma torbee, qorannoo laaboraatoorii fi leenjii addaa barsiisota digrii 2ffaa fi 3ffaa qabaniin geggeeffamuun.'
  },

  am: {
    // Top Bar & Header
    'school.title': 'ሻምቡ ልዩ',
    'school.subtitle': 'ሁለተኛ ደረጃ ትምህርት ቤት',
    'school.full_name': 'ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት',
    'school.location': 'ሻምቡ ከተማ፣ ሆሮ ጉዱሩ ወለጋ፣ ኦሮሚያ፣ ኢትዮጵያ',
    'notice.tag': 'ማስታወቂያ',
    'notice.text': 'የ2018/2019 የ9ኛ-12ኛ ክፍል ልዩ ምዝገባ ተከፍቷል።',
    'phone': '+251 57 665 0123',
    'email': 'info@shambuspecial.edu.et',

    // Navigation
    'nav.home': 'ዋና ገጽ',
    'nav.about': 'ስለ እኛ',
    'nav.academics': 'ትምህርት',
    'nav.admissions': 'የቅበላ ሁኔታ',
    'nav.registration': 'ኦንላይን ምዝገባ',
    'nav.teachers': 'መምህራን እና ሰራተኞች',
    'nav.student_life': 'የተማሪዎች ሕይወት',
    'nav.gallery': 'የፎቶ ማዕከል',
    'nav.news': 'ዜና እና ሁነቶች',
    'nav.contact': 'ያግኙን',
    'nav.apply_badge': 'ያመልክቱ',

    // Actions & Portals
    'portal.signin': 'ወደ ፖርታል ግባ',
    'portal.student': 'የተማሪ ፖርታል',
    'portal.teacher': 'የመምህር ፖርታል',
    'portal.admin': 'የአስተዳደር ፖርታል',
    'portal.dashboard': 'የኔ ዳሽቦርድ',
    'portal.signout': 'ውጣ',
    'search.title': 'ድረ-ገጹን ይፈልጉ',
    'search.placeholder': 'ትምህርቶችን፣ መምህራንን፣ ዜናዎችን፣ የ ምዝገባ መረጃ ይፈልጉ...',
    'theme.toggle': 'ገጽታ ቀይር (ብርሃን/ጨለማ)',
    'lang.select': 'ቋንቋ ይምረጡ',

    // Hero Section
    'hero.badge': 'በኢትዮጵያ የላቀ የSTEM እና የትምህርት ማዕከል',
    'hero.title': 'የነገውን የሳይንስ እና አመራር ባለራዕዮች ማነጽ',
    'hero.desc': 'በሆሮ ጉዱሩ፣ በኦሮሚያ እና በኢትዮጵያ ውስጥ ያሉ የላቁ ተማሪዎችን በSTEM ትምህርት፣ በዘመናዊ ላቦራቶሪዎች፣ በባለሙያ መምህራን እና በስነ-ምግባር ኮትኩቶ የሚያሳድግ።',
    'hero.apply_btn': 'አሁን ያመልክቱ',
    'hero.academics_btn': 'የትምህርት ፕሮግራሞች',
    'hero.portal_btn': 'ወደ ተማሪ ፖርታል',

    // Hero Stats
    'stat.students': 'የተመረጡ የSTEM ተማሪዎች',
    'stat.pass_rate': 'የዩኒቨርሲቲ ማለፊያ ውጤት',
    'stat.teachers': 'የሁለተኛ እና ሶስተኛ ዲግሪ መምህራን',
    'stat.labs': 'ዘመናዊ የSTEM ላቦራቶሪዎች',

    // Home Page Sections
    'home.welcome_title': 'እንኳን ወደ ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት በደህና መጡ',
    'home.welcome_desc': 'የኢትዮጵያን የበቁና ብሩህ ተማሪዎችን ለማፍራት የተቋቋመው ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት በሳይንስና ፈጠራ ላይ የተመሰረተ ጥራት ያለው ትምህርት ይሰጣል።',
    'home.stem_focus': 'በSTEM ላይ ያተኮረ ትምህርት',
    'home.stem_desc': 'ፊዚክስ፣ ኬሚስትሪ፣ ባዮሎጂ፣ ሂሳብ፣ ሮቦቲክስ እና አይሲቲ በተግባራዊ የላቦራቶሪ ልምምድ የታገዘ።',
    'home.boarding_focus': 'ዘመናዊ አዳሪ ትምህርት ቤት',
    'home.boarding_desc': 'አስተማማኝ፣ ምቹ የመኝታ ክፍሎች፣ የተመጣጠነ ምግብ፣ የጥናት አዳራሽ እና የጤና አገልግሎት ያለው።',
    'home.character_focus': 'አመራር እና ስነ-ምግባር',
    'home.character_desc': 'ሀገራቸውን የሚወዱ፣ ባለራዕይ እና ለኦሮሚያና ለኢትዮጵያ እድገት አስተዋጽኦ የሚያደርጉ መሪዎችን ማፍራት።',
    'home.news_section_title': 'የቅርብ ጊዜ ዜናዎች እና ሁነቶች',
    'home.news_section_subtitle': 'የትምህርት ስኬቶችን፣ ውድድሮችን እና የመማሪያ ማዕከሉን ሁነቶች ይከታተሉ።',
    'home.principal_title': 'የርዕሰ-መምህሩ መልእክት',
    'home.principal_name': 'አቶ ፈቀደ ታደሰ (Fekede Tadesse)',
    'home.principal_quote': 'በሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት አላማችን ከፍተኛ ብቃት ያላቸውን ተማሪዎች በእውቀትና በስነ-ምግባር ኮትኩተን ለነገይቱ ኢትዮጵያ መሪ ማድረግ ነው።',

    // Common Buttons & Labels
    'btn.learn_more': 'ተጨማሪ ያንብቡ',
    'btn.submit': 'ማመልከቻ ያስገቡ',
    'btn.contact_us': 'ዛሬውኑ ያግኙን',
    'btn.view_all': 'ሁሉንም ይመልከቱ',
    'btn.read_more': 'ሙሉውን ያንብቡ',
    'btn.close': 'ዝጋ',
    'btn.login': 'ግቡ',
    'btn.register': 'አሁን ይመዝገቡ',

    // About Page
    'about.tag': 'ስለ ተቋማችን',
    'about.title': 'ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት',
    'about.desc': 'በሻምቡ ከተማ፣ ሆሮ ጉዱሩ ወለጋ ዞን፣ ኦሮሚያ፣ ኢትዮጵያ የሚገኝ — ከፍተኛ ብቃት ያላቸውን ተማሪዎች በሳይንስና በፈጠራ ለማነጽ የተቋቋመ።',
    'about.history_title': 'ታሪካችን እና እድገታችን',
    'about.history_p1': 'በኦሮሚያ ልዩ የትምህርት ፕሮግራም አካል ሆኖ የተቋቋመው ትምህርት ቤታችን ከፍተኛ ውጤት ላመጡ ተማሪዎች የላቀ የሁለተኛ ደረጃ ትምህርት ይሰጣል።',
    'about.history_p2': 'ትምህርት ቤቱ ዘመናዊ የፊዚክስ፣ ኬሚስትሪ፣ ባዮሎጂ፣ ሮቦቲክስ እና አይሲቲ ላቦራቶሪዎችን፣ ቤተ-መጻሕፍት እና የመኝታ አገልግሎት ያካተተ ነው።',
    'about.mission': 'ተልዕኳችን',
    'about.mission_desc': 'ለበቁ ተማሪዎች በSTEM እና በማህበራዊ ሳይንስ የላቀ ትምህርት መስጠት፣ የፈጠራ አቅማቸውንና ስነ-ምግባራቸውን ማጎልበት።',
    'about.vision': 'ራዕያችን',
    'about.vision_desc': 'በኢትዮጵያ ውስጥ ግንባር ቀደም የሁለተኛ ደረጃ ትምህርት ማዕከል ሆኖ መገኘት።',
    'about.values': 'መሰረታዊ እሴቶች',
    'about.facilities': 'የትምህርት ቤቱ መሰረተ ልማቶች',
    'about.facilities_sub': 'ለተማሪዎች የመማር እና የመኖሪያ ምቹ ሁኔታ ተዘጋጅቷል።',

    // Academics Page
    'academics.tag': 'የትምህርት መርሃ-ግብር እና የላቀ ውጤት',
    'academics.title': 'የላቀ የSTEM እና የሁለተኛ ደረጃ ትምህርት ፕሮግራም',
    'academics.desc': 'የበቁ ተማሪዎችን በተግባራዊ ሳይንስ፣ በከፍተኛ ሂሳብ፣ በኮዲንግ እና በማህበራዊ ሳይንስ ለማነጽ የተዘጋጀ።',
    'academics.grade9_10': 'ከ9ኛ-10ኛ ክፍል መሰረታዊ ትምህርት',
    'academics.grade11_12': 'ከ11ኛ-12ኛ ክፍል የዩኒቨርሲቲ ዝግጅት',
    'academics.stem_streams': 'የSTEM ልዩ ትምህርቶች',

    // Admissions Page
    'admissions.tag': 'የቅበላ መስፈርቶች እና መመሪያዎች',
    'admissions.title': 'ወደ ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት መቀላቀል',
    'admissions.desc': 'ቅበላ በ8ኛ ክፍል ሚኒስቴር ፈተና ውጤት እና በመግቢያ ፈተና ውድድር ላይ የተመሰረተ ነው።',
    'admissions.criteria_title': 'የቅበላ መስፈርቶች',
    'admissions.step1': 'የክልል መግቢያ ፈተና',
    'admissions.step2': 'የሰነዶች ማረጋገጫ',
    'admissions.step3': 'የአዳሪ ምደባ እና ምዝገባ',

    // Registration Page
    'reg.title': 'የኦንላይን ምዝገባ ማመልከቻ',
    'reg.subtitle': 'ወደ ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት ከ9ኛ-12ኛ ክፍል ለማመልከት እባክዎ የሚከተለውን ቅጽ ይሙሉ::',
    'reg.full_name': 'ሙሉ ስም (የተማሪው)',
    'reg.grade': 'የሚያመልክቱበት ክፍል',
    'reg.prev_school': 'የቀደመው ትምህርት ቤት ስም',
    'reg.region': 'ዞን / ክልል',
    'reg.exam_score': 'የሚኒስቴር ፈተና ውጤት / GPA',
    'reg.parent_name': 'የወላጅ / የአሳዳጊ ስም',
    'reg.parent_phone': 'የወላጅ ስልክ ቁጥር',
    'reg.submitting': 'ማመልከቻው እየተላከ ነው...',
    'reg.success': 'ማመልከቻዎ በተሳካ ሁኔታ ተልኳል!',

    // Teachers Page
    'teachers.tag': 'የተከበሩ መምህራኖቻችን',
    'teachers.title': 'በSTEM እና በማህበራዊ ሳይንስ የተካኑ መምህራን',
    'teachers.desc': 'ተማሪዎቻችንን ለከፍተኛ ስኬት የሚያበቁ የሁለተኛ እና የሶስተኛ ዲግሪ መምህራን።',

    // Student Life Page
    'student_life.tag': 'የተማሪዎች አዳሪ ሕይወት እና ክለቦች',
    'student_life.title': 'በሻምቡ የላቀ የተማሪዎች ሕይወት',
    'student_life.desc': 'የሻምቡ ልዩ ተማሪዎች ከትምህርት ባሻገር በሮቦቲክስ፣ በስፖርት፣ በክርክር እና በማህበረሰብ አገልግሎት ይሳተፋሉ።',

    // Gallery Page
    'gallery.tag': 'የፎቶ ማዕከል',
    'gallery.title': 'የሻምቡ ልዩ ትምህርት ቤት ገጽታዎች',
    'gallery.desc': 'ከሳይንስ ኤግዚቢሽን፣ የስፖርት ቀን፣ የምረቃ ስነ-ስርዓት የተነሱ ፎቶዎችን ይመልከቱ።',

    // News Page
    'news.tag': 'ትምህርት ቤት ዜና እና ማስታወቂያዎች',
    'news.title': 'በሻምቡ ልዩ ትምህርት ቤት የቅርብ ጊዜ ሁነቶች',
    'news.desc': 'የትምህርት ቤት ማስታወቂያዎችን፣ የፈተና ውጤቶችን እና የስፖርት ዜናዎችን ይከታተሉ።',

    // Contact Page
    'contact.tag': 'ያግኙን',
    'contact.title': 'አስተያየትዎን እና ጥያቄዎን ይላኩልን',
    'contact.desc': 'ስለ ቅበላ፣ ትምህርት ቤት ጉብኝት ጥያቄ ካለዎት ከአስተዳደራችን ጋር ይገናኙ።',
    'contact.address': 'የትምህርት ቤቱ አድራሻ',
    'contact.phone_email': 'ስልክ እና ኢሜይል',
    'contact.hours': 'የስራ ሰዓት',
    'contact.hours_val': 'ሰኞ - አርብ: ከእሁድ 2:00 - 11:00 ሰዓት',
    'contact.send_msg': 'መልእክት ይላኩ',
    'contact.your_name': 'ስምዎ',
    'contact.your_email': 'ኢሜይልዎ',
    'contact.subject': 'ርዕስ',
    'contact.message': 'መልእክት',
    'contact.send_btn': 'መልእክት ላክ',

    // Login Modal
    'login.title': 'ወደ ፖርታል ግባ',
    'login.subtitle': 'የአካውንት አይነትዎን በመምረጥ ወደ ፖርታል ይግቡ',
    'login.email': 'ኢሜይል ወይም የተማሪ መታወቂያ',
    'login.password': 'የይለፍ ቃል',
    'login.select_role': 'የፖርታል ሚና ይምረጡ',
    'login.demo_btn': 'በሞካሪ አካውንት ግባ (Demo)',

    // Footer
    'footer.quick_links': 'ፈጣን ማስፈንጠሪያዎች',
    'footer.academic_programs': 'የትምህርት ፕሮግራሞች',
    'footer.contact_info': 'የመገናኛ አድራሻ',
    'footer.copyright': 'መብቱ በህግ የተጠበቀ ነው። ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት፣ ኢትዮጵያ።',
    'footer.motto': 'ለኢትዮጵያ ብሩህ ተስፋ ጥራት፣ ታማኝነት እና ፈጠራ',

    // Dashboards & Search
    'dashboard.welcome': 'እንኳን በደህና ተመለሱ',
    'dashboard.role': 'የአካውንት ሚና',
    'dashboard.notifications': 'የስርዓት ማስታወቂያዎች',
    'dashboard.recent_activity': 'የቅርብ ጊዜ እንቅስቃሴዎች',
    'search.heading': 'ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤትን ይፈልጉ',
    'search.no_results': 'ምንም ተዛማጅ ውጤት አልተገኘም።',

    // FAQ Section
    'faq.tag': 'ተደጋግመው የሚጠየቁ ጥያቄዎች',
    'faq.title': 'ስለ ቅበላ እና የተማሪዎች ሕይወት ተደጋግመው የሚጠየቁ ጥያቄዎች',
    'faq.subtitle': 'ስለ መስፈርቶች፣ ምዝገባ፣ የSTEM ትምህርት፣ አዳሪ ቤት እና የተማሪዎች ሕይወት ፈጣን መልሶችን ያግኙ።',
    'faq.search_placeholder': 'ጥያቄዎችን በቁልፍ ቃል ይፈልጉ...',
    'faq.all_categories': 'ሁሉም ጥያቄዎች',
    'faq.cat_admissions': 'ቅበላ እና ምዝገባ',
    'faq.cat_student_life': 'የተማሪዎች ሕይወት እና አዳሪ ቤት',
    'faq.cat_academics': 'ትምህርት እና STEM',
    'faq.still_have_questions': 'ሌላ ጥያቄ አለዎት?',
    'faq.contact_prompt': 'ለጥያቄዎ መልስ ካላገኙ የመግቢያ አስተዳደር ቡድናችን ልታግዝዎት ዝግጁ ነው።',
    'faq.q1': 'ለ9ኛ ክፍል ቅበላ የሚያስፈልጉ መስፈርቶች ምንድን ናቸው?',
    'faq.a1': 'አመልካቾች በ8ኛ ክፍል ሚኒስቴር ፈተና ከፍተኛ ውጤት ማምጣት፣ የክልሉን የልዩ ሁለተኛ ደረጃ ትምህርት ቤት መግቢያ ፈተና ማለፍ እና በሆሮ ጉዱሩ ወለጋ ወይም በኦሮሚያ ክልል ኮታ በከፍተኛ ደረጃ ተወዳዳሪ መሆን አለባቸው።',
    'faq.q2': 'ለሚመጣው የትምህርት ዘመን በኦንላይን እንዴት መመዝገብ እችላለሁ?',
    'faq.a2': 'ከላይ ባለው ማውጫ ላይ "ኦንላይን ምዝገባ" የሚለውን በመጫን፣ የተማሪውን የግል መረጃ፣ የቀደመው ትምህርት ቤት ስም፣ የሚኒስቴር ፈተና ውጤት በመሙላት ማመልከቻዎን ያስገቡ።',
    'faq.q3': 'ለተቀበሏቸው ተማሪዎች የትምህርት ወይም የምዝገባ ክፍያ አለ?',
    'faq.a3': 'የለም። ሻምቡ ልዩ ሁለተኛ ደረጃ ትምህርት ቤት ሙሉ በሙሉ በመንግስት የሚደገፍ የልህቀት ማዕከል ነው። ትምህርት፣ መጻሕፍት፣ የላቦራቶሪ ቁሳቁሶች እና የአዳሪ ቤት አገልግሎት ለተመረጡ ተማሪዎች በነጻ ይዘጋጃል።',
    'faq.q4': 'የመኝታ ክፍል እና የአዳሪ ትምህርት ቤት ሁኔታ ምን ይመስላል?',
    'faq.a4': 'ወንዶች እና ሴቶች ተማሪዎች የተለያዩበት ዘመናዊና ደህንነቱ የተጠበቀ መኝታ ቤት፣ በቀን ሶስት ጊዜ የተመጣጠነ ምግብ፣ የኢንተርኔት አገልግሎት ያለው የጥናት አዳራሽ እና የጤና ክሊኒክ እናቀርባለን።',
    'faq.q5': 'ምን አይነት ክለቦች እና ከትምህርት ውጪ እንቅስቃሴዎች አሉ?',
    'faq.a5': 'ተማሪዎች በሮቦቲክስ እና ኮዲንግ ክለብ፣ በሳይንስና ፈጠራ ማህበር፣ በእንግሊዝኛና ክርክር መድረክ፣ በስፖርት ቡድኖች፣ በባህል እና በአካባቢ ጥበቃ ክለቦች መሳተፍ ይችላሉ።',
    'faq.q6': 'ምን አይነት የትምህርት አይነቶች እና የSTEM ዘርፎች ይሰጣሉ?',
    'faq.a6': 'በተፈጥሮ ሳይንስ (ፊዚክስ፣ ኬሚስትሪ፣ ባዮሎጂ፣ ሂሳብ፣ አይሲቲ፣ ሮቦቲክስ) ላይ በስፋት በማተኮር ማህበራዊ ሳይንሶችንም በጥራት እንሰጣለን።',
    'faq.q7': 'ትምህርት ቤቱ ተማሪዎችን ለብሔራዊ የዩኒቨርሲቲ መግቢያ ፈተና እንዴት ያዘጋጃል?',
    'faq.a7': 'በተከታታይ ምዘና፣ በሳምንት እረፍት የሙከራ ፈተናዎች፣ በተግባራዊ የላቦራቶሪ ምርምሮች እና በሁለተኛና ሶስተኛ ዲግሪ መምህራን በሚሰጡ የማጠናከሪያ ትምህርቶች።'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageOption[];
  currentLanguageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('shambu_language');
    if (saved && (saved === 'en' || saved === 'om' || saved === 'am')) {
      return saved as Language;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('shambu_language', lang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  const currentLanguageOption = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: LANGUAGES,
        currentLanguageOption
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
