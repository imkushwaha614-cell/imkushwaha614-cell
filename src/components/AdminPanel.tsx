import React, { useState, useEffect } from 'react';
import { AdmissionApplication } from '../types';
import { ShieldCheck, Search, Trash2, Download, RefreshCw, FileSpreadsheet, UserCheck, Clock, UserMinus, Database } from 'lucide-react';

interface AdminPanelProps {
  onRefreshTrigger?: number;
}

export default function AdminPanel({ onRefreshTrigger = 0 }: AdminPanelProps) {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');

  // Load applications from localStorage
  const loadApplications = () => {
    const existing = localStorage.getItem('stm_scholars_applications');
    if (existing) {
      setApplications(JSON.parse(existing));
    } else {
      // Create seed data if empty so the admin panel looks beautiful on initial load
      const seedData: AdmissionApplication[] = [
        {
          id: '1',
          studentName: 'Rahul Mishra',
          parentName: 'SC Mishra',
          email: 'rahul.mishra@gmail.com',
          phone: '9876543210',
          address: 'Adarsh Nagar, Sitamarhi',
          courseSelected: 'Integrated JEE Mains & Advanced',
          previousClass: '10th Standard',
          previousMarks: 94.6,
          boardName: 'CBSE',
          modeOfStudy: 'Offline',
          scholarshipOptIn: true,
          status: 'Approved',
          createdAt: '7/11/2026, 4:32:10 PM',
          referenceNumber: 'STM-2026-72819'
        },
        {
          id: '2',
          studentName: 'Anjali Kumari',
          parentName: 'Sanjay Singh',
          email: 'anjali.neet@gmail.com',
          phone: '8765432109',
          address: 'Dumra, Sitamarhi',
          courseSelected: 'NEET Preparation Program',
          previousClass: '12th Standard',
          previousMarks: 88.2,
          boardName: 'BSEB',
          modeOfStudy: 'Offline',
          scholarshipOptIn: true,
          status: 'Pending',
          createdAt: '7/12/2026, 11:15:22 AM',
          referenceNumber: 'STM-2026-90451'
        },
        {
          id: '3',
          studentName: 'Pranav Sharma',
          parentName: 'Manoj Sharma',
          email: 'pranav.foundation@gmail.com',
          phone: '7654321098',
          address: 'Riga Road, Sitamarhi',
          courseSelected: 'Foundation Course (K-12)',
          previousClass: '9th Standard',
          previousMarks: 72.0,
          boardName: 'ICSE',
          modeOfStudy: 'Online',
          scholarshipOptIn: false,
          status: 'Reviewing',
          createdAt: '7/12/2026, 2:40:01 PM',
          referenceNumber: 'STM-2026-12054'
        }
      ];
      localStorage.setItem('stm_scholars_applications', JSON.stringify(seedData));
      setApplications(seedData);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [onRefreshTrigger]);

  const handleStatusChange = (id: string, newStatus: 'Pending' | 'Approved' | 'Reviewing') => {
    const updated = applications.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    setApplications(updated);
    localStorage.setItem('stm_scholars_applications', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this application record?')) {
      const filtered = applications.filter(app => app.id !== id);
      setApplications(filtered);
      localStorage.setItem('stm_scholars_applications', JSON.stringify(filtered));
    }
  };

  const handleResetDatabase = () => {
    if (confirm('Are you sure you want to restore default demo database submissions?')) {
      localStorage.removeItem('stm_scholars_applications');
      loadApplications();
    }
  };

  const exportToJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(applications, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `StmScholars_Enrollments_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Filter application list
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      app.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCourse = selectedCourseFilter === 'all' || app.courseSelected.includes(selectedCourseFilter);
    const matchesStatus = selectedStatusFilter === 'all' || app.status === selectedStatusFilter;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = applications.length;
  const approvedCount = applications.filter(a => a.status === 'Approved').length;
  const pendingCount = applications.filter(a => a.status === 'Pending').length;
  const reviewingCount = applications.filter(a => a.status === 'Reviewing').length;

  return (
    <section id="admin-panel" className="py-24 bg-brand-blue-dark min-h-screen relative overflow-hidden">
      <div className="absolute top-10 left-10 w-96 h-96 bg-brand-blue-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-brand-gold/15">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={16} /> INTERNAL REGISTRATION DATABASE
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-white mt-2">
              Corporate <span className="gold-gradient-text">Admin Dashboard</span>
            </h2>
            <p className="text-sm text-gray-300 mt-1">Review student applications, adjust approval states, and manage scholarships.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportToJSON}
              className="flex items-center gap-1.5 bg-brand-blue-light/50 hover:bg-brand-blue-light/75 border border-brand-gold/20 text-white font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer"
            >
              <Download size={14} /> Export JSON
            </button>
            <button
              onClick={handleResetDatabase}
              className="flex items-center gap-1.5 bg-brand-crimson/20 hover:bg-brand-crimson/40 border border-brand-crimson/30 text-brand-gold font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all cursor-pointer"
              title="Reset Database to Default Demo Records"
            >
              <Database size={14} /> Reset Database
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Card 1: Total */}
          <div className="bg-brand-blue-light/10 border border-brand-gold/15 p-5 rounded-xl">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">Total Enrolled</span>
            <span className="text-3xl font-black text-white mt-1 block">{totalCount}</span>
            <span className="text-[10px] text-brand-gold mt-1 block">Students registered</span>
          </div>

          {/* Card 2: Approved */}
          <div className="bg-brand-blue-light/10 border border-emerald-500/25 p-5 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">Approved</span>
              <UserCheck size={16} className="text-emerald-400" />
            </div>
            <span className="text-3xl font-black text-emerald-400 mt-1 block">{approvedCount}</span>
            <span className="text-[10px] text-gray-400 mt-1 block">Direct seat reserved</span>
          </div>

          {/* Card 3: Pending */}
          <div className="bg-brand-blue-light/10 border border-amber-500/25 p-5 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">Pending</span>
              <Clock size={16} className="text-amber-400" />
            </div>
            <span className="text-3xl font-black text-amber-400 mt-1 block">{pendingCount}</span>
            <span className="text-[10px] text-gray-400 mt-1 block">Awaiting test/interview</span>
          </div>

          {/* Card 4: Reviewing */}
          <div className="bg-brand-blue-light/10 border border-brand-gold/15 p-5 rounded-xl">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">In Review</span>
              <UserMinus size={16} className="text-brand-gold-light" />
            </div>
            <span className="text-3xl font-black text-brand-gold-light mt-1 block">{reviewingCount}</span>
            <span className="text-[10px] text-gray-400 mt-1 block">Documents missing</span>
          </div>
        </div>

        {/* FILTERS AND TABLE WRAPPER */}
        <div className="bg-brand-blue-light/10 border border-brand-gold/15 rounded-xl shadow-2xl p-6 backdrop-blur-md">
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3.5 top-3 text-brand-gold" size={16} />
              <input
                type="text"
                placeholder="Search by student name, phone, or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-brand-blue-dark border border-brand-gold/25 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
              {/* Course filter */}
              <select
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="bg-brand-blue-dark border border-brand-gold/25 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold"
              >
                <option value="all">All Programs</option>
                <option value="JEE">JEE Mains & Adv</option>
                <option value="NEET">NEET Prep</option>
                <option value="Foundation">Foundation (K-12)</option>
                <option value="I.Sc">I.Sc Boards</option>
                <option value="B.Sc">B.Sc College</option>
              </select>

              {/* Status filter */}
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="bg-brand-blue-dark border border-brand-gold/25 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold"
              >
                <option value="all">All States</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Reviewing">Reviewing</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-brand-gold/15 text-[11px] font-bold text-[#F6E294] uppercase tracking-wider">
                  <th className="py-4 px-4">Student Details</th>
                  <th className="py-4 px-4">Program & Study Format</th>
                  <th className="py-4 px-4 text-center">Marks (Previous Class)</th>
                  <th className="py-4 px-4 text-center">Ref & Date</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-gold/10 text-xs sm:text-sm text-gray-300">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-brand-blue-light/5 transition-colors">
                      {/* Column 1: Student Details */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-white text-base">{app.studentName}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Parent: {app.parentName}</div>
                        <div className="text-[11px] font-mono text-brand-gold-light mt-0.5">Phone: {app.phone}</div>
                        <div className="text-[10px] text-gray-400">{app.address}</div>
                      </td>

                      {/* Column 2: Program & Format */}
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{app.courseSelected}</div>
                        <div className="flex gap-1.5 items-center mt-1">
                          <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-brand-blue-light/40 border border-brand-gold/10 text-brand-gold">
                            {app.modeOfStudy}
                          </span>
                          {app.scholarshipOptIn && (
                            <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/15">
                              Scholarship Test Opt-in
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Column 3: Marks */}
                      <td className="py-4 px-4 text-center">
                        <div className="font-bold text-white text-base">{app.previousMarks}%</div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{app.previousClass} ({app.boardName})</div>
                      </td>

                      {/* Column 4: Ref Number & Date */}
                      <td className="py-4 px-4 text-center font-mono">
                        <div className="text-xs font-bold text-white">{app.referenceNumber}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{app.createdAt}</div>
                      </td>

                      {/* Column 5: Status badge */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase border text-center font-sans focus:outline-none cursor-pointer ${
                              app.status === 'Approved'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                : app.status === 'Pending'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-[#D4AF37]/10 text-brand-gold border-[#D4AF37]/30'
                            }`}
                          >
                            <option value="Pending" className="bg-[#070F25] text-white">Pending</option>
                            <option value="Approved" className="bg-[#070F25] text-white">Approved</option>
                            <option value="Reviewing" className="bg-[#070F25] text-white">In Review</option>
                          </select>
                        </div>
                      </td>

                      {/* Column 6: Delete action */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="text-gray-400 hover:text-brand-crimson-light p-2 rounded-lg transition-colors cursor-pointer"
                          title="Delete Registration Record"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400 font-sans">
                      No matching student registrations found in this batch database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
