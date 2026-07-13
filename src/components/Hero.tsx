import React from 'react';
import CrestLogo from './CrestLogo';
import { Award, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

interface HeroProps {
  onApplyClick: () => void;
  onExplorePrograms: () => void;
}

export default function Hero({ onApplyClick, onExplorePrograms }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden blue-gold-gradient"
    >
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
      
      {/* Curved Banner / Ribbon Effect at the top & side */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-crimson/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      {/* Decorative Gold & Crimson Ribbon Lines */}
      <div className="absolute top-28 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent pointer-events-none" />
      <div className="absolute top-[116px] left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-crimson/30 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col items-center justify-center z-10 text-center">
        {/* Flag badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-blue-light/50 border border-brand-gold/30 text-brand-gold-light text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 animate-pulse shadow-inner">
          <Award size={14} className="text-brand-gold" />
          FOR ALL CBSE CLASSES (K-12) & COMPETITIVE EXAMS
        </div>

        {/* Major Crest Logo */}
        <CrestLogo size={140} showText={false} className="mb-6 animate-float" />

        {/* Title & Slogans */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-wider leading-none select-none">
          Stm <span className="gold-gradient-text drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">SCHOLARS</span>
        </h1>
        
        {/* Foundation sub-banner */}
        <div className="w-full max-w-2xl mt-3 mb-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-brand-gold/40"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 sm:px-6 bg-[#0B1536] font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-widest text-[#F6E294] uppercase italic">
              Foundation of Career
            </span>
          </div>
        </div>

        <p className="max-w-2xl font-serif text-base sm:text-lg text-gray-200 tracking-widest uppercase font-medium mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span>ACHIEVE EXCELLENCE</span>
          <span className="text-brand-gold hidden sm:inline">|</span>
          <span>IGNITE YOUR POTENTIAL</span>
        </p>

        {/* Highlights banner matching Poster 2 & 3 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full bg-brand-blue-dark/60 border border-brand-gold/20 p-4 sm:p-6 rounded-xl backdrop-blur-md mb-12 shadow-2xl">
          <div className="flex flex-col items-center text-center p-2 border-r border-brand-gold/10 last:border-0 md:border-r">
            <span className="text-brand-gold font-bold text-lg sm:text-xl">CONCEPT</span>
            <span className="text-xs text-gray-300 uppercase tracking-wider mt-1">Clarity</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 border-r border-brand-gold/10 last:border-0 md:border-r">
            <span className="text-brand-gold font-bold text-lg sm:text-xl">EXPERT</span>
            <span className="text-xs text-gray-300 uppercase tracking-wider mt-1">Faculty</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 border-r border-brand-gold/10 last:border-0 md:border-r">
            <span className="text-brand-gold font-bold text-lg sm:text-xl">REGULAR</span>
            <span className="text-xs text-gray-300 uppercase tracking-wider mt-1">Test Series</span>
          </div>
          <div className="flex flex-col items-center text-center p-2 last:border-0">
            <span className="text-brand-gold font-bold text-lg sm:text-xl">RESULT</span>
            <span className="text-xs text-gray-300 uppercase tracking-wider mt-1">Oriented</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md">
          <button
            onClick={onApplyClick}
            id="hero-apply-btn"
            className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-sans font-extrabold text-sm uppercase tracking-widest px-8 py-4 rounded-lg shadow-[0_4px_20px_rgba(212,175,55,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            Apply Online 2026
            <ArrowRight size={16} />
          </button>
          
          <button
            onClick={onExplorePrograms}
            id="hero-explore-btn"
            className="w-full sm:w-auto bg-brand-blue-light/40 hover:bg-brand-blue-light/60 text-white border border-brand-gold/30 font-sans font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Our Programs
            <BookOpen size={16} className="text-brand-gold" />
          </button>
        </div>

        {/* Slogan footnote */}
        <div className="mt-14 flex items-center gap-2 text-brand-gold/80 text-xs sm:text-sm font-semibold tracking-wider uppercase italic">
          <GraduationCap size={16} className="text-brand-gold" />
          COACHING FOR FUTURE LEADERS • JOIN TODAY, ACHIEVE TOMORROW
        </div>
      </div>
      
      {/* Bottom Wave decoration representing high-end aesthetic */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-brand-blue-dark to-transparent pointer-events-none" />
    </section>
  );
}
