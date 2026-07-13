import React, { useState, useEffect, useRef } from 'react';
import { AdmissionApplication } from '../types';
import { Check, ClipboardList, Award, MapPin, Printer, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface AdmissionFormProps {
  selectedCourseId: string;
  onFormSubmitted: (application: AdmissionApplication) => void;
}

const COURSES = [
  { id: 'jee', name: 'Integrated JEE Mains & Advanced' },
  { id: 'neet', name: 'NEET Preparation Program' },
  { id: 'foundation', name: 'Foundation Course (K-12)' },
  { id: 'isc', name: 'Intermediate of Science (I.Sc)' },
  { id: 'bsc', name: 'Bachelor of Science (B.Sc)' },
];

export default function AdmissionForm({ selectedCourseId, onFormSubmitted }: AdmissionFormProps) {
  // Form State
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('Sitamarhi, Bihar');
  const [courseSelected, setCourseSelected] = useState('jee');
  const [previousClass, setPreviousClass] = useState('10th Standard');
  const [previousMarks, setPreviousMarks] = useState<string>('');
  const [boardName, setBoardName] = useState('CBSE');
  const [modeOfStudy, setModeOfStudy] = useState<'Online' | 'Offline' | 'Hybrid'>('Offline');
  const [scholarshipOptIn, setScholarshipOptIn] = useState(true);

  // Status & Success state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep state updated if course selected from programs list
  useEffect(() => {
    if (selectedCourseId) {
      setCourseSelected(selectedCourseId);
      // Scroll to form automatically
      const element = document.getElementById('admission-form');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedCourseId]);

  // Scholarship Level Calculator based on marks input
  const marksNum = parseFloat(previousMarks) || 0;
  let estimatedScholarship = '0%';
  let scholarshipMessage = '';

  if (marksNum >= 95) {
    estimatedScholarship = '90%';
    scholarshipMessage = '🌟 Elite President Scholarship eligible!';
  } else if (marksNum >= 90) {
    estimatedScholarship = '50%';
    scholarshipMessage = '✨ Super 30 Rankers Scholarship eligible!';
  } else if (marksNum >= 80) {
    estimatedScholarship = '25%';
    scholarshipMessage = '🎉 Star Achiever Scholarship eligible!';
  } else if (marksNum >= 70) {
    estimatedScholarship = '10%';
    scholarshipMessage = 'Concept builder scholarship eligible.';
  }

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!studentName.trim()) tempErrors.studentName = 'Student name is required.';
    if (!parentName.trim()) tempErrors.parentName = 'Parent/Guardian name is required.';
    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required.';
    } else if (!/^[0-9]{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      tempErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address.';
    }
    const marksValue = parseFloat(previousMarks);
    if (previousMarks && (isNaN(marksValue) || marksValue < 0 || marksValue > 100)) {
      tempErrors.previousMarks = 'Percentage must be a number between 0 and 100.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate delay for high-end feel
    setTimeout(() => {
      const refNumber = 'STM-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 90000);
      const appData: AdmissionApplication = {
        id: Math.random().toString(36).substring(2, 11),
        studentName,
        parentName,
        email: email || 'N/A',
        phone,
        address,
        courseSelected: COURSES.find(c => c.id === courseSelected)?.name || courseSelected,
        previousClass,
        previousMarks: marksNum,
        boardName,
        modeOfStudy,
        scholarshipOptIn,
        status: 'Pending',
        createdAt: new Date().toLocaleString('en-US', { hour12: true }),
        referenceNumber: refNumber
      };

      // Save to localstorage for persistence
      const existing = localStorage.getItem('stm_scholars_applications');
      const apps = existing ? JSON.parse(existing) : [];
      apps.unshift(appData);
      localStorage.setItem('stm_scholars_applications', JSON.stringify(apps));

      setSubmittedApp(appData);
      setIsSubmitting(false);
      onFormSubmitted(appData);

      // Scroll to receipt view
      setTimeout(() => {
        const receipt = document.getElementById('receipt-view');
        if (receipt) {
          receipt.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setStudentName('');
    setParentName('');
    setEmail('');
    setPhone('');
    setAddress('Sitamarhi, Bihar');
    setPreviousMarks('');
    setSubmittedApp(null);
  };

  return (
    <section id="admission-form" className="py-20 bg-brand-blue-dark relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-gold font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            Admission Portal 2026-27
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
            Register for <span className="gold-gradient-text">Elite Batch Entry</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson mx-auto mt-6" />
          <p className="text-gray-300 mt-6 font-sans text-sm sm:text-base">
            Take your first step towards academic brilliance. Complete the form below to secure your online application reference and lock in your scholarship slot.
          </p>
        </div>

        {/* Dynamic Panel: Form vs Success Receipt */}
        <div className="max-w-4xl mx-auto">
          {!submittedApp ? (
            <div className="bg-brand-blue-light/10 border border-brand-gold/20 rounded-2xl shadow-2xl p-6 sm:p-10 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-brand-gold/15">
                <ClipboardList className="text-brand-gold" size={24} />
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">Online Enrollment Form</h3>
                  <p className="text-xs text-gray-300">Complete all required fields marked with *</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" id="registration-form">
                {/* Grid for Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Student Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g., Amit Kumar"
                      className={`bg-brand-blue-dark/80 border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 transition-all ${
                        errors.studentName ? 'border-brand-crimson focus:ring-brand-crimson' : 'border-brand-gold/30 focus:border-brand-gold focus:ring-brand-gold'
                      }`}
                    />
                    {errors.studentName && <span className="text-xs text-brand-crimson-light mt-1 font-sans">{errors.studentName}</span>}
                  </div>

                  {/* Parent Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Father's / Guardian's Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g., Rajendra Prasad"
                      className={`bg-brand-blue-dark/80 border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 transition-all ${
                        errors.parentName ? 'border-brand-crimson focus:ring-brand-crimson' : 'border-brand-gold/30 focus:border-brand-gold focus:ring-brand-gold'
                      }`}
                    />
                    {errors.parentName && <span className="text-xs text-brand-crimson-light mt-1 font-sans">{errors.parentName}</span>}
                  </div>
                </div>

                {/* Grid for Contacts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile Number */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Mobile / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={15}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., 8676965543"
                      className={`bg-brand-blue-dark/80 border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 transition-all ${
                        errors.phone ? 'border-brand-crimson focus:ring-brand-crimson' : 'border-brand-gold/30 focus:border-brand-gold focus:ring-brand-gold'
                      }`}
                    />
                    {errors.phone && <span className="text-xs text-brand-crimson-light mt-1 font-sans">{errors.phone}</span>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., student@example.com"
                      className={`bg-brand-blue-dark/80 border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 transition-all ${
                        errors.email ? 'border-brand-crimson focus:ring-brand-crimson' : 'border-brand-gold/30 focus:border-brand-gold focus:ring-brand-gold'
                      }`}
                    />
                    {errors.email && <span className="text-xs text-brand-crimson-light mt-1 font-sans">{errors.email}</span>}
                  </div>
                </div>

                {/* Address Selection */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                    Postal Address / Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g., Adarsh Nagar, Sitamarhi"
                      className="w-full bg-brand-blue-dark/80 border border-brand-gold/30 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold"
                    />
                    <div className="absolute right-3 top-3.5 flex items-center gap-1 text-brand-gold text-[10px] uppercase font-bold tracking-wider select-none bg-brand-blue-light/50 px-2 py-0.5 rounded border border-brand-gold/15">
                      <MapPin size={10} /> Sitamarhi Base
                    </div>
                  </div>
                </div>

                {/* Grid for Academic Choice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Select Course */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Program Seeking Admission
                    </label>
                    <select
                      value={courseSelected}
                      onChange={(e) => setCourseSelected(e.target.value)}
                      className="bg-brand-blue-dark/80 border border-brand-gold/30 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23D4AF37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 16px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
                    >
                      {COURSES.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#070F25] text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mode of study */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Preferred Study Format
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Offline', 'Online', 'Hybrid'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setModeOfStudy(mode)}
                          className={`py-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                            modeOfStudy === mode
                              ? 'bg-brand-gold text-brand-blue-dark border-brand-gold shadow-[0_4px_12px_rgba(212,175,55,0.2)]'
                              : 'bg-brand-blue-dark/40 text-gray-300 border-brand-gold/20 hover:bg-brand-blue-light/20'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Grid for Scores and Board */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Prior Class */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Last Class Completed
                    </label>
                    <select
                      value={previousClass}
                      onChange={(e) => setPreviousClass(e.target.value)}
                      className="bg-brand-blue-dark/80 border border-brand-gold/30 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23D4AF37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 16px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
                    >
                      <option className="bg-[#070F25]" value="9th Standard">9th Standard</option>
                      <option className="bg-[#070F25]" value="10th Standard">10th Standard (Matric)</option>
                      <option className="bg-[#070F25]" value="11th Standard">11th Standard</option>
                      <option className="bg-[#070F25]" value="12th Standard">12th Standard (I.Sc)</option>
                      <option className="bg-[#070F25]" value="Graduate / B.Sc">Graduate / B.Sc</option>
                    </select>
                  </div>

                  {/* Previous Marks Percentage */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Previous Score (%) *
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        required
                        min="0"
                        max="100"
                        step="0.1"
                        value={previousMarks}
                        onChange={(e) => setPreviousMarks(e.target.value)}
                        placeholder="e.g., 92.5"
                        className={`w-full bg-brand-blue-dark/80 border text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:ring-1 transition-all ${
                          errors.previousMarks ? 'border-brand-crimson focus:ring-brand-crimson' : 'border-brand-gold/30 focus:border-brand-gold focus:ring-brand-gold'
                        }`}
                      />
                      <span className="absolute right-4 top-3.5 text-xs text-gray-400 font-bold">%</span>
                    </div>
                    {errors.previousMarks && <span className="text-xs text-brand-crimson-light mt-1 font-sans">{errors.previousMarks}</span>}
                  </div>

                  {/* Affiliated Board */}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-[#F6E294] uppercase tracking-wide mb-1.5">
                      Affiliated Board
                    </label>
                    <select
                      value={boardName}
                      onChange={(e) => setBoardName(e.target.value)}
                      className="bg-brand-blue-dark/80 border border-brand-gold/30 text-white text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23D4AF37\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundPosition: 'right 16px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
                    >
                      <option className="bg-[#070F25]" value="CBSE">CBSE Board</option>
                      <option className="bg-[#070F25]" value="BSEB">Bihar School Examination Board (BSEB)</option>
                      <option className="bg-[#070F25]" value="ICSE">ICSE / ISC Board</option>
                      <option className="bg-[#070F25]" value="Other">Other State Board</option>
                    </select>
                  </div>
                </div>

                {/* Dynamic Scholarship Estimator Badge */}
                {marksNum > 0 && (
                  <div className="bg-brand-blue-light/30 border border-brand-gold/15 p-4 rounded-xl flex items-center justify-between gap-4 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                        <Award size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white">Estimated Scholarship Tier:</h4>
                        <p className="text-[11px] text-gray-300 italic">{scholarshipMessage || 'Apply for entrance test to secure additional waivers!'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black text-brand-gold block">{estimatedScholarship}</span>
                      <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-sans">Fee Waiver</span>
                    </div>
                  </div>
                )}

                {/* Scholarship Option and Confirmation checkbox */}
                <div className="space-y-3 pt-3 border-t border-brand-gold/10">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={scholarshipOptIn}
                      onChange={(e) => setScholarshipOptIn(e.target.checked)}
                      className="mt-1 rounded border-brand-gold/30 bg-brand-blue-dark text-brand-gold focus:ring-brand-gold"
                    />
                    <span className="text-xs text-gray-300 leading-normal">
                      Yes, I want to automatically enroll in the <strong>Stm Scholars Scholarship & Entrance Assessment Test</strong> to claim maximum fee discounts and benefits.
                    </span>
                  </label>
                </div>

                {/* Actions */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-sans font-black text-sm uppercase tracking-widest py-4 rounded-xl shadow-[0_4px_24px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-brand-blue-dark border-t-transparent rounded-full animate-spin" />
                        Verifying details...
                      </>
                    ) : (
                      <>
                        Submit Admission Request
                        <Sparkles size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* PRINTABLE SUCCESS RECEIPT VIEW */
            <div
              id="receipt-view"
              className="bg-white text-gray-900 border-4 border-brand-gold rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Receipt Background Gradients / Watermark for security feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-gold/5 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none scale-150">
                <ClipboardList size={300} />
              </div>

              {/* PDF Header */}
              <div className="border-b-2 border-dashed border-gray-300 pb-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  {/* Styled crest specifically for printing on white */}
                  <div className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center text-brand-gold p-1 shadow-md">
                    <CheckCircle2 size={48} className="text-brand-gold" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl tracking-wide text-brand-blue">
                      Stm <span className="text-brand-crimson">SCHOLARS</span>
                    </h3>
                    <p className="text-[10px] font-bold tracking-widest text-brand-blue-dark uppercase">
                      Foundation of Career
                    </p>
                    <p className="text-[10px] text-gray-500 font-sans">
                      Adarsh Nagar, Sitamarhi (Near SC Mishra Math classes)
                    </p>
                  </div>
                </div>

                <div className="text-center md:text-right">
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase px-3 py-1 rounded-full border border-emerald-300 mb-2">
                    PROVISIONALLY ACCEPTED
                  </span>
                  <div className="text-xs font-mono font-bold text-gray-600">
                    REF: <span className="text-brand-blue-dark">{submittedApp.referenceNumber}</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 font-sans">
                    Date: {submittedApp.createdAt}
                  </div>
                </div>
              </div>

              {/* Receipt Content */}
              <div className="py-8 space-y-6">
                <div className="bg-brand-blue/5 border border-brand-gold/20 p-4 rounded-xl text-center">
                  <h4 className="font-display font-black text-lg text-brand-blue uppercase tracking-wide">
                    Pre-Admission Enrollment Slip
                  </h4>
                  <p className="text-xs text-gray-600 font-sans mt-1">
                    Please present this slip at the corporate registration desk to lock in your scholarships.
                  </p>
                </div>

                {/* Details Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm pt-2">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-500 uppercase text-xs">Student Name</span>
                    <span className="font-black text-gray-900">{submittedApp.studentName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-500 uppercase text-xs">Parent Name</span>
                    <span className="font-bold text-gray-800">{submittedApp.parentName}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-500 uppercase text-xs">Selected Program</span>
                    <span className="font-extrabold text-brand-blue">{submittedApp.courseSelected}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-500 uppercase text-xs">Study Mode</span>
                    <span className="font-bold text-gray-800">{submittedApp.modeOfStudy}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-500 uppercase text-xs">Prior Academic Record</span>
                    <span className="font-bold text-gray-800">{submittedApp.previousClass} ({submittedApp.previousMarks}%)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-500 uppercase text-xs">Contact Phone</span>
                    <span className="font-mono font-bold text-gray-800">{submittedApp.phone}</span>
                  </div>
                </div>

                {/* Scholarship Highlight block */}
                <div className="bg-amber-50 border border-amber-300 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-amber-900 text-sm flex items-center gap-1">
                      <Award size={16} className="text-brand-gold fill-brand-gold" />
                      Scholarship Award Tier Verified:
                    </h5>
                    <p className="text-xs text-amber-700 mt-0.5">Based on your score of {submittedApp.previousMarks}%. Subject to verification.</p>
                  </div>
                  <span className="text-3xl font-black text-brand-gold drop-shadow-sm">{estimatedScholarship} OFF</span>
                </div>

                {/* Important Guidelines Section */}
                <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl text-xs space-y-2">
                  <h5 className="font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1">
                    <ShieldAlert size={14} className="text-brand-crimson" />
                    Crucial Next Steps:
                  </h5>
                  <ol className="list-decimal list-inside space-y-1.5 text-gray-600">
                    <li>Visit the corporate campus located at: <strong>Adarsh Nagar Sitamarhi (near by SC mishra mathematics classes)</strong>.</li>
                    <li>Bring 2 recent passport-size photographs, previous class original marksheets, and copy of this Slip.</li>
                    <li>Call <strong>8676965543</strong> for fast-track interview scheduling and campus orientation.</li>
                    <li>Scholarship offer is valid only for <strong>7 working days</strong> from enrollment date.</li>
                  </ol>
                </div>
              </div>

              {/* Print and reset buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between border-t border-gray-200 pt-6">
                <button
                  onClick={resetForm}
                  className="px-5 py-3 rounded-lg border border-gray-300 text-gray-600 font-bold text-xs uppercase tracking-widest hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Apply Another Student
                </button>

                <button
                  onClick={handlePrint}
                  className="bg-brand-blue hover:bg-brand-blue-light text-white font-sans font-black text-xs uppercase tracking-widest px-6 py-3 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer size={16} />
                  Print Admission Slip
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
