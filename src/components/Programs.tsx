import React from 'react';
import { PROGRAMS } from '../data';
import { BookOpen, Calendar, Milestone, Users, Star, ArrowUpRight, GraduationCap } from 'lucide-react';
import { Course } from '../types';

interface ProgramsProps {
  onSelectCourse: (courseId: string) => void;
}

export default function Programs({ onSelectCourse }: ProgramsProps) {
  return (
    <section id="programs" className="py-20 bg-brand-blue-dark/95 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            Our Offerings
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight">
            Specialized <span className="gold-gradient-text">Academic Programs</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson mx-auto mt-6" />
          <p className="text-gray-300 mt-6 font-sans text-base sm:text-lg">
            Empowering students from elementary school to college with the right concept clarity, experienced mentorship, and robust testing modules.
          </p>
        </div>

        {/* Featured Programs: JEE & NEET */}
        <div className="mb-12">
          <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-gold-light mb-6 flex items-center gap-2">
            <Star className="text-brand-gold fill-brand-gold animate-pulse" size={20} />
            National Entrance Exam Pathways (Core Streams)
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="featured-programs-grid">
            {PROGRAMS.filter(p => p.highlight).map((program) => (
              <div
                key={program.id}
                className="relative bg-gradient-to-b from-brand-blue-light/30 to-brand-blue-dark/90 border-2 border-brand-gold/40 hover:border-brand-gold rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-2xl flex flex-col justify-between"
                id={`featured-card-${program.id}`}
              >
                {/* Premium badge */}
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-brand-crimson text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  <Star size={10} className="fill-white" /> Featured
                </div>

                <div>
                  <span className="font-sans text-xs font-bold tracking-widest text-[#F6E294] uppercase bg-brand-blue-light/50 px-3 py-1 rounded-md border border-brand-gold/10">
                    {program.targetClasses}
                  </span>
                  
                  <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-4 leading-tight">
                    {program.title}
                  </h4>
                  <p className="text-xs font-serif text-brand-gold-light mt-1 tracking-wider uppercase">
                    {program.subtitle}
                  </p>
                  
                  <p className="text-sm text-gray-300 mt-4 leading-relaxed font-sans">
                    {program.description}
                  </p>

                  {/* Highlights section */}
                  <div className="mt-6 border-t border-brand-gold/10 pt-4">
                    <h5 className="font-sans font-bold text-xs text-[#F6E294] tracking-wider uppercase mb-3">
                      Syllabus & Core Benefits:
                    </h5>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-gray-300">
                          <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 bg-brand-gold rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-brand-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <Calendar size={14} className="text-brand-gold" />
                    <span>Duration: <strong className="text-white">{program.duration}</strong></span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(program.id)}
                    className="w-full sm:w-auto bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark font-sans font-extrabold text-xs uppercase tracking-widest px-5 py-3 rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    Enroll Now
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Foundation & Academic Support: K-12, I.Sc, B.Sc */}
        <div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-gold-light mb-6 flex items-center gap-2 mt-12">
            <GraduationCap className="text-brand-gold" size={24} />
            Foundation & Secondary Academic Support
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="standard-programs-grid">
            {PROGRAMS.filter(p => !p.highlight).map((program) => (
              <div
                key={program.id}
                className="bg-brand-blue-light/10 hover:bg-brand-blue-light/25 border border-brand-gold/15 hover:border-brand-gold/30 rounded-xl p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between"
                id={`standard-card-${program.id}`}
              >
                <div>
                  <span className="font-sans text-[10px] font-bold tracking-widest text-[#F6E294] uppercase bg-brand-blue-dark/50 px-2.5 py-1 rounded border border-brand-gold/5">
                    {program.targetClasses}
                  </span>

                  <h4 className="font-display font-bold text-xl text-white mt-3 leading-snug">
                    {program.title}
                  </h4>
                  <p className="text-[10px] font-serif text-brand-gold-light mt-0.5 tracking-wider uppercase">
                    {program.subtitle}
                  </p>

                  <p className="text-xs text-gray-300 mt-3 leading-relaxed font-sans">
                    {program.description}
                  </p>

                  {/* Highlights section */}
                  <div className="mt-4 border-t border-brand-gold/10 pt-3">
                    <ul className="space-y-1.5">
                      {program.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex gap-2 items-start text-xs text-gray-300">
                          <span className="mt-1.5 flex-shrink-0 w-1 h-1 bg-brand-gold/70 rounded-full" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-brand-gold/10 flex flex-col justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
                    <Calendar size={12} className="text-brand-gold" />
                    <span>Duration: <strong className="text-white">{program.duration}</strong></span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(program.id)}
                    className="w-full bg-brand-blue-light/50 hover:bg-brand-gold hover:text-brand-blue-dark border border-brand-gold/20 text-brand-gold font-sans font-bold text-[11px] uppercase tracking-widest py-2.5 rounded transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Select Program
                    <ArrowUpRight size={12} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional information on coaching (Poster 2 & 3: Coaching also available for I.Sc & B.Sc) */}
        <div className="mt-12 text-center bg-brand-blue-light/20 border border-brand-gold/10 p-5 rounded-xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-brand-crimson text-white font-bold text-xs uppercase tracking-widest px-3 py-1.5 rounded">
            Admission Notice
          </div>
          <p className="text-xs sm:text-sm text-gray-300 font-sans">
            Limited seats are available in the elite batches for <strong>Integrated JEE & NEET</strong>. Complete the admission form below to schedule your orientation.
          </p>
        </div>
      </div>
    </section>
  );
}
