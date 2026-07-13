import React from 'react';
import { SPECIFICATIONS } from '../data';
import { BookOpen, Trophy, Users, GraduationCap, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function Specifications() {
  // Map string to actual component
  const getIcon = (name: string, className: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className={className} size={36} />;
      case 'Trophy':
        return <Trophy className={className} size={36} />;
      case 'Users':
        return <Users className={className} size={36} />;
      case 'GraduationCap':
        return <GraduationCap className={className} size={36} />;
      default:
        return <CheckCircle2 className={className} size={36} />;
    }
  };

  return (
    <section id="why-us" className="py-20 bg-brand-blue-dark relative overflow-hidden">
      {/* Decorative items */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            Specifications & Features
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight leading-tight">
            Why Choose <span className="gold-gradient-text">Stm Scholars</span>?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson mx-auto mt-6" />
          <p className="text-gray-300 mt-6 font-sans text-base sm:text-lg leading-relaxed">
            Delivering peerless educational methodologies, high-tech resources, and unmatched attention to support every student’s dream career pathway.
          </p>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12" id="specifications-grid">
          {SPECIFICATIONS.map((spec) => (
            <div
              key={spec.id}
              className="group flex flex-col md:flex-row gap-6 bg-brand-blue-light/20 hover:bg-brand-blue-light/35 border border-brand-gold/15 hover:border-brand-gold/40 p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-xl"
              id={`spec-card-${spec.id}`}
            >
              {/* Icon Section with custom background */}
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-brand-blue-dark border border-brand-gold/30 text-brand-gold shadow-[0_4px_10px_rgba(212,175,55,0.15)] group-hover:scale-110 transition-transform duration-300">
                {getIcon(spec.iconName, 'text-brand-gold')}
              </div>

              {/* Text Section */}
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-brand-gold-light transition-colors">
                  {spec.title}
                </h3>
                <p className="text-sm text-gray-300 mt-2 font-sans italic">
                  {spec.description}
                </p>

                {/* Sub-items details from image */}
                <div className="mt-6 space-y-4">
                  {spec.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <div className="mt-1 flex-shrink-0">
                        <CheckCircle2 className="text-brand-gold" size={16} />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-sm text-[#F6E294]">
                          {item.subtitle}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-300 mt-0.5 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight quote banner */}
        <div className="mt-16 bg-gradient-to-r from-brand-crimson/30 via-brand-blue-light/30 to-brand-crimson/30 border border-brand-gold/25 p-6 sm:p-8 rounded-2xl text-center backdrop-blur-md max-w-4xl mx-auto shadow-2xl">
          <h4 className="font-serif text-lg sm:text-xl font-bold italic text-brand-gold-light">
            "Join Today, Achieve Tomorrow"
          </h4>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 font-sans tracking-wide">
            Our expert faculty, state-of-the-art practice papers, and continuous progress tracking ensure maximum probability of success in board & competitive examinations.
          </p>
        </div>
      </div>
    </section>
  );
}
