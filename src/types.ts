export interface AdmissionApplication {
  id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  address: string;
  courseSelected: string;
  previousClass: string;
  previousMarks: number; // percentage
  boardName: string;
  modeOfStudy: 'Online' | 'Offline' | 'Hybrid';
  scholarshipOptIn: boolean;
  status: 'Pending' | 'Approved' | 'Reviewing';
  createdAt: string;
  referenceNumber: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  targetClasses: string;
  features: string[];
  duration: string;
  highlight?: boolean;
}
