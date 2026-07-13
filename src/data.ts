import { Course } from './types';

export const SPECIFICATIONS = [
  {
    id: 'study-material',
    title: 'Best Study Material',
    description: 'Up-to-date Syllabus and Practice Question Papers aligned with the latest competitive exam patterns.',
    items: [
      {
        subtitle: 'Up-to-date Syllabus',
        text: 'Material is fully aligned with the latest CBSE guidelines and competitive exam patterns.',
      },
      {
        subtitle: 'Practice Question Papers',
        text: 'A vast, exhaustive question bank for comprehensive, repetitive testing & practice.',
      }
    ],
    iconName: 'BookOpen'
  },
  {
    id: 'results',
    title: 'Proven Results',
    description: 'Consistent high success rate with excellent student performance in elite competitive exams like JEE & NEET.',
    items: [
      {
        subtitle: 'High Success Rate',
        text: 'Consistently high selection percentages with top state & national rankings year over year.',
      }
    ],
    iconName: 'Trophy'
  },
  {
    id: 'attention',
    title: 'Personalized Attention',
    description: 'Ensuring individual focus on every student through customized learning tracks and monitoring.',
    items: [
      {
        subtitle: 'Low Student-Teacher Ratio',
        text: 'Small, manageable batches ensuring that every single student receives personalized guidance.',
      },
      {
        subtitle: 'Progress Monitoring',
        text: 'Regular performance assessments, mock test feedback, and personal counseling sessions.',
      }
    ],
    iconName: 'Users'
  },
  {
    id: 'faculty',
    title: 'Expert Faculty',
    description: 'Specialist teachers and educators with extensive experience from leading national institutions.',
    items: [
      {
        subtitle: 'Experienced Educators',
        text: 'Subject specialists dedicated to decoding complicated scientific and mathematical principles.',
      },
      {
        subtitle: 'Quality Education',
        text: 'A deep focus on conceptual clarity rather than rote memorization to prepare for life-long academic success.',
      }
    ],
    iconName: 'GraduationCap'
  }
];

export const PROGRAMS: Course[] = [
  {
    id: 'jee',
    title: 'Integrated JEE Mains & Advanced',
    subtitle: 'Coaching for Future Engineers',
    description: 'A comprehensive, rigorous preparation track designed to master the physics, chemistry, and mathematics required for India\'s elite engineering institutes.',
    targetClasses: 'Class 11, 12 & Passouts',
    duration: '1 Year / 2 Years Program',
    features: [
      'JEE-focussed rigorous study tracks',
      'Daily Practice Problem (DPP) sheets',
      'Regular full-syllabus mock tests with analytics',
      'Doubt clearance cells with subject mentors',
      'Advanced rank boosters'
    ],
    highlight: true
  },
  {
    id: 'neet',
    title: 'NEET Preparation Program',
    subtitle: 'Coaching for Future Doctors',
    description: 'Focused academic instruction spanning deep Physics, Chemistry, and thorough Botany/Zoology preparation to excel in the medical entrance exam.',
    targetClasses: 'Class 11, 12 & Passouts',
    duration: '1 Year / 2 Years Program',
    features: [
      'NCERT-aligned comprehensive biology sessions',
      'High-yield conceptual physics lectures',
      'Regular test series with detailed performance reports',
      'Anatomy & physiology conceptual models',
      'Speed and accuracy enhancement workshops'
    ],
    highlight: true
  },
  {
    id: 'foundation',
    title: 'Foundation Course (K-12)',
    subtitle: 'Empowering Young Minds',
    description: 'Nurturing logical thinking, mathematical ability, and scientific curiosity for students in all CBSE classes to build an unbeatable academic foundation early.',
    targetClasses: 'CBSE Classes K-12',
    duration: 'Annual Program',
    features: [
      'School-board curriculum synergy',
      'Olympiad & NTSE conceptual preps',
      'Mental ability and logical reasoning modules',
      'Activity-based science learning',
      'Interactive subject worksheets'
    ],
    highlight: false
  },
  {
    id: 'isc',
    title: 'Intermediate of Science (I.Sc)',
    subtitle: 'Board Exam Specialization',
    description: 'Focused board exam preparation for 11th and 12th grade Science, helping students score outstanding percentages in State and National boards.',
    targetClasses: 'Class 11 & 12 (Science)',
    duration: '2 Years Program',
    features: [
      'Board syllabus complete coverage',
      'Detailed laboratory experiment demonstrations',
      'Previous 10-years board paper solving sessions',
      'Answer-writing tactics for maximizing board scores',
      'Regular parent-teacher feedback meetings'
    ],
    highlight: false
  },
  {
    id: 'bsc',
    title: 'Bachelor of Science (B.Sc)',
    subtitle: 'Higher Conceptual Excellence',
    description: 'Advanced collegiate support in specialized subjects like Physics, Mathematics, Chemistry, and more, matching university curricula.',
    targetClasses: 'Undergraduate Science Students',
    duration: 'Semester-wise / Annual',
    features: [
      'University standard comprehensive syllabus lectures',
      'Advanced problem-solving tutorials',
      'Guidance for competitive postgraduate tests (JAM, etc.)',
      'Conceptual seminars and review notes',
      'Flexible batch timings'
    ],
    highlight: false
  }
];

export const CONTACT_INFO = {
  address: 'Adarsh Nagar Sitamarhi (near by SC mishra mathematics classes), Bihar, India',
  phone: '8676965543',
  email: 'admission@stmscholars.in',
  web: 'www.stmscholars.in',
  landmark: 'SC Mishra Mathematics Classes',
  social: {
    linkedin: 'https://linkedin.com/company/stmscholars',
    twitter: 'https://twitter.com/stmscholars',
    facebook: 'https://facebook.com/stmscholars'
  }
};
