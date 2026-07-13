import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PosterGallery from './components/PosterGallery';
import Specifications from './components/Specifications';
import DirectorDesk from './components/DirectorDesk';
import Programs from './components/Programs';
import AdmissionForm from './components/AdmissionForm';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { AdmissionApplication } from './types';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('jee');
  const [refreshAdminTrigger, setRefreshAdminTrigger] = useState(0);

  // Smooth scroll helper
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Automatically switch course and scroll down
  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setTimeout(() => {
      navigateToSection('admission-form');
    }, 100);
  };

  const handleAdminToggle = () => {
    setShowAdmin(!showAdmin);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback when a new student completes registration
  const handleFormSubmitted = (app: AdmissionApplication) => {
    // Increment trigger to update AdminPanel records reactive-ly
    setRefreshAdminTrigger(prev => prev + 1);
  };

  return (
    <div className="bg-brand-blue-dark min-h-screen text-gray-200 antialiased selection:bg-brand-gold selection:text-brand-blue-dark">
      
      {/* Universal Sticky Header */}
      <Header
        onAdminToggle={handleAdminToggle}
        showAdmin={showAdmin}
        onNavigateToSection={navigateToSection}
      />

      {/* Main Content Layout */}
      <main className="transition-all duration-300">
        {showAdmin ? (
          // Admin View of Database Submissions
          <div className="animate-fade-in" id="admin-view-root">
            <AdminPanel onRefreshTrigger={refreshAdminTrigger} />
          </div>
        ) : (
          // Front-facing Student Portal
          <div className="animate-fade-in" id="portal-view-root">
            {/* Hero Section */}
            <Hero
              onApplyClick={() => navigateToSection('admission-form')}
              onExplorePrograms={() => navigateToSection('programs')}
            />

            {/* Interactive Campus Poster Slideshow / Digital Canvas */}
            <PosterGallery />

            {/* Why Choose Us - USPs & Specifications from Posters */}
            <Specifications />

            {/* From the Director's Desk */}
            <DirectorDesk />

            {/* Academic Program Pathways */}
            <Programs onSelectCourse={handleSelectCourse} />

            {/* Interactive Registration Portal */}
            <AdmissionForm
              selectedCourseId={selectedCourseId}
              onFormSubmitted={handleFormSubmitted}
            />
          </div>
        )}
      </main>

      {/* Universal Footer */}
      <Footer />
    </div>
  );
}
