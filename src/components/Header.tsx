import React, { useState, useEffect } from 'react';
import CrestLogo from './CrestLogo';
import { Menu, X, Landmark, GraduationCap, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onAdminToggle: () => void;
  showAdmin: boolean;
  onNavigateToSection: (sectionId: string) => void;
}

export default function Header({ onAdminToggle, showAdmin, onNavigateToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Posters', id: 'poster-gallery' },
    { label: 'Why Choose Us', id: 'why-us' },
    { label: 'Director', id: 'director-desk' },
    { label: 'Programs', id: 'programs' },
    { label: 'Apply Now', id: 'admission-form' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (showAdmin) {
      onAdminToggle(); // switch back to main view
      // Wait for re-render before scrolling
      setTimeout(() => {
        onNavigateToSection(id);
      }, 100);
    } else {
      onNavigateToSection(id);
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-blue-dark/95 backdrop-blur-md shadow-lg border-b border-brand-gold/20 py-2'
          : 'bg-gradient-to-b from-brand-blue-dark/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => handleNavClick('hero')}
            id="brand-logo-container"
          >
            <CrestLogo size={42} showText={false} />
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-wide leading-tight">
                Stm <span className="gold-gradient-text">SCHOLARS</span>
              </span>
              <span className="font-sans text-[10px] font-semibold text-brand-gold-light tracking-widest uppercase leading-none">
                Foundation of Career
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" id="desktop-nav">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="font-sans text-sm font-medium text-gray-300 hover:text-brand-gold transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-gold after:transition-all hover:after:w-full"
              >
                {item.label}
              </button>
            ))}

            {/* Admin Portal Toggle */}
            <button
              onClick={onAdminToggle}
              id="admin-view-toggle-desktop"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                showAdmin
                  ? 'bg-brand-gold text-brand-blue-dark border-brand-gold'
                  : 'bg-brand-blue-light/40 text-brand-gold border-brand-gold/30 hover:bg-brand-gold/10'
              }`}
            >
              <ShieldCheck size={14} />
              {showAdmin ? 'Main Website' : 'Admin Panel'}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('admission-form')}
              id="header-cta-button"
              className="bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-sans font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-md shadow-[0_4px_14px_rgba(212,175,55,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Apply Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onAdminToggle}
              id="admin-view-toggle-mobile-icon"
              className={`p-2 rounded-md ${
                showAdmin ? 'text-brand-gold bg-brand-blue-light/50' : 'text-gray-400 hover:text-white'
              }`}
              title="Admin Panel"
            >
              <ShieldCheck size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-trigger"
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-brand-blue-light/35 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-blue-dark/95 backdrop-blur-lg border-b border-brand-gold/20" id="mobile-nav-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left px-4 py-3 rounded-md text-base font-semibold text-gray-300 hover:text-brand-gold hover:bg-brand-blue-light/30 transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-4 pb-2 px-4 border-t border-brand-gold/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onAdminToggle();
                }}
                className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-md text-sm font-bold uppercase tracking-wider border transition-all ${
                  showAdmin
                    ? 'bg-brand-gold text-brand-blue-dark border-brand-gold'
                    : 'bg-brand-blue-light text-brand-gold border-brand-gold/30'
                }`}
              >
                <ShieldCheck size={16} />
                {showAdmin ? 'Back To Main Website' : 'Go To Admin Panel'}
              </button>
              
              <button
                onClick={() => handleNavClick('admission-form')}
                className="w-full bg-brand-gold text-brand-blue-dark font-bold text-center text-sm uppercase tracking-widest py-3 rounded-md shadow-md"
              >
                Apply Online Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
