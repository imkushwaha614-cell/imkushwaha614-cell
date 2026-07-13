import React, { useState } from 'react';
import { BookOpen, Trophy, Users, GraduationCap, Award, ChevronLeft, ChevronRight, Milestone, Star, Landmark, ShieldAlert, Sparkles } from 'lucide-react';

interface PosterData {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  mainColor: string; // 'crimson', 'blue', 'gold'
  icon: React.ReactNode;
  highlights: string[];
  footerNote: string;
  details: { label: string; value: string }[];
}

export default function PosterGallery() {
  const [activePoster, setActivePoster] = useState(0);

  const posters: PosterData[] = [
    {
      id: 1,
      title: "Stm Scholars",
      subtitle: "FOUNDATION OF CAREER",
      badge: "OFFICIAL LAUNCH",
      mainColor: "gold",
      icon: <Award className="text-brand-gold animate-bounce" size={44} />,
      highlights: [
        "Knowledge Is Power — Ignite Your True Potential",
        "Achieve Unmatched Academic Excellence Early",
        "Expert Coaching for JEE, NEET, and CBSE K-12",
        "Corporate Desk: Adarsh Nagar, Sitamarhi (Near SC Mishra Math classes)"
      ],
      footerNote: "Join Today, Achieve Tomorrow • Seats are strictly limited.",
      details: [
        { label: "Landmark", value: "SC Mishra Math classes" },
        { label: "Target", value: "Future Engineers & Doctors" }
      ]
    },
    {
      id: 2,
      title: "Best Study Material",
      subtitle: "COMPREHENSIVE RESOURCES",
      badge: "POSTER #2",
      mainColor: "blue",
      icon: <BookOpen className="text-brand-gold" size={44} />,
      highlights: [
        "Up-To-Date Syllabus aligned with the latest national patterns",
        "Exhaustive Practice Question Papers for rigorous training",
        "Curated daily workbook assignments & formulas sheets",
        "Comprehensive board-exam answer keys and hints booklets"
      ],
      footerNote: "Learn from structured modules developed by industry experts.",
      details: [
        { label: "Syllabus Type", value: "CBSE & Competitive Align" },
        { label: "Resource Level", value: "Basic to Advanced Tier" }
      ]
    },
    {
      id: 3,
      title: "Proven Results",
      subtitle: "CONSISTENT TRACK RECORD",
      badge: "POSTER #3",
      mainColor: "crimson",
      icon: <Trophy className="text-brand-gold" size={44} />,
      highlights: [
        "High Success Selection Rate in prestigious competitive tests",
        "Top State & National selection records year after year",
        "CRUCIAL: Coaching also available for Intermediate of Science (I.Sc)",
        "COLLEGE SUPPORT: Quality coaching for Bachelor of Science (B.Sc)"
      ],
      footerNote: "Unlock highest board scores and elite institute ranks.",
      details: [
        { label: "Academic Support", value: "I.Sc & B.Sc Streams" },
        { label: "Success Rate", value: "Consistently Outstanding" }
      ]
    },
    {
      id: 4,
      title: "Personalized Attention",
      subtitle: "SELECTIVE BATCHING",
      badge: "POSTER #4",
      mainColor: "blue",
      icon: <Users className="text-brand-gold" size={44} />,
      highlights: [
        "Low Student-Teacher Ratio ensuring focus on every student",
        "Individual interactive doubt clearance sessions daily",
        "Structured periodic progress monitoring and performance tracking",
        "Direct parental updates with counseling support"
      ],
      footerNote: "No student gets left behind in our selective batches.",
      details: [
        { label: "Batch Sizing", value: "Small & Interactive" },
        { label: "Monitoring", value: "Weekly Analytical Tests" }
      ]
    },
    {
      id: 5,
      title: "Expert Faculty",
      subtitle: "CONCEPT MASTER CLASS",
      badge: "POSTER #5",
      mainColor: "gold",
      icon: <GraduationCap className="text-brand-gold" size={44} />,
      highlights: [
        "Experienced Subject Specialist Teachers on panel",
        "Quality Education focusing strictly on core conceptual clarity",
        "Direct conceptual seminars led by Director Rajnish Kumar (M.Sc-Zoology)",
        "Special focus on logical derivation over memorization"
      ],
      footerNote: "Deconstruct complicated scientific and math ideas easily.",
      details: [
        { label: "Zoology Lead", value: "Rajnish Kumar (M.Sc)" },
        { label: "Core Focus", value: "Absolute Concept Clarity" }
      ]
    },
    {
      id: 6,
      title: "Integrated Program Pathways",
      subtitle: "ELITE CAREER STREAMS",
      badge: "POSTER #6",
      mainColor: "crimson",
      icon: <Milestone className="text-brand-gold" size={44} />,
      highlights: [
        "Rigorous Integrated JEE Main & Advanced pathway for Engineers",
        "Comprehensive High-Yield NEET medical stream preparation",
        " early foundation courses for CBSE Classes K-12",
        "Coaching also available for College level classes (I.Sc & B.Sc)"
      ],
      footerNote: "Building structural pathways from school desk to dream career.",
      details: [
        { label: "Classes", value: "CBSE K-12, I.Sc & B.Sc" },
        { label: "Entrance Focus", value: "JEE Mains, Adv & NEET" }
      ]
    }
  ];

  const handleNext = () => {
    setActivePoster((prev) => (prev + 1) % posters.length);
  };

  const handlePrev = () => {
    setActivePoster((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const currentPoster = posters[activePoster];

  // Helper for dynamic theme colors matching the premium theme
  const getPosterColors = (color: string) => {
    switch (color) {
      case 'crimson':
        return {
          cardBg: 'from-brand-crimson/35 via-brand-blue-dark/95 to-brand-crimson/15',
          border: 'border-brand-crimson/50',
          badgeBg: 'bg-brand-crimson text-white',
          glow: 'shadow-[0_0_30px_rgba(157,28,36,0.25)]'
        };
      case 'gold':
        return {
          cardBg: 'from-brand-blue-light/40 via-brand-blue-dark/95 to-brand-gold/15',
          border: 'border-brand-gold/50',
          badgeBg: 'bg-brand-gold text-brand-blue-dark',
          glow: 'shadow-[0_0_30px_rgba(212,175,55,0.25)]'
        };
      default:
        return {
          cardBg: 'from-brand-blue-light/35 via-brand-blue-dark/95 to-brand-blue-light/10',
          border: 'border-brand-blue-light/50',
          badgeBg: 'bg-brand-blue-light text-brand-gold-light',
          glow: 'shadow-[0_0_30px_rgba(26,49,117,0.25)]'
        };
    }
  };

  const activeTheme = getPosterColors(currentPoster.mainColor);

  return (
    <section id="poster-gallery" className="py-20 bg-brand-blue-dark/95 relative border-t border-brand-gold/15 overflow-hidden">
      {/* Decorative Grid Line Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      <div className="absolute top-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand-gold font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            Interactive Poster Wall
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight leading-tight">
            Our Digital <span className="gold-gradient-text">Coaching Posters</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson mx-auto mt-6" />
          <p className="text-gray-300 mt-6 font-sans text-sm sm:text-base">
            Click through the interactive digital display below to review the official Stm Scholars campus posters and notices detailing our specifications and courses.
          </p>
        </div>

        {/* Poster Carousel Wrapper */}
        <div className="relative max-w-4xl mx-auto mb-12">
          
          {/* Main Selected Poster Render */}
          <div className={`relative bg-gradient-to-br ${activeTheme.cardBg} border-2 ${activeTheme.border} ${activeTheme.glow} rounded-2xl p-6 sm:p-10 transition-all duration-500 backdrop-blur-md`}>
            
            {/* Background watermark for absolute realism */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-white pointer-events-none select-none">
              {currentPoster.icon}
            </div>

            {/* Poster Corner Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-brand-gold/40" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-brand-gold/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-brand-gold/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-brand-gold/40" />

            {/* Poster Top Banner bar */}
            <div className="flex justify-between items-center pb-6 border-b border-brand-gold/15 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-dark border border-brand-gold/30 flex items-center justify-center">
                  {currentPoster.icon}
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-wider">
                    {currentPoster.title}
                  </h4>
                  <p className="font-serif text-[10px] font-bold tracking-widest text-[#F6E294] uppercase mt-0.5">
                    {currentPoster.subtitle}
                  </p>
                </div>
              </div>
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${activeTheme.badgeBg}`}>
                {currentPoster.badge}
              </span>
            </div>

            {/* Poster Main Content Box */}
            <div className="space-y-6">
              {/* Highlight list */}
              <div className="space-y-4">
                {currentPoster.highlights.map((item, index) => (
                  <div key={index} className="flex gap-3.5 items-start">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                      <Star size={11} className="fill-brand-gold animate-pulse" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed font-sans">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Specification Grid in poster */}
              <div className="grid grid-cols-2 gap-4 bg-brand-blue-dark/50 border border-brand-gold/10 p-4 rounded-xl">
                {currentPoster.details.map((detail, index) => (
                  <div key={index} className="text-center sm:text-left">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">
                      {detail.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-brand-gold block mt-0.5">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Poster Footer Banner */}
            <div className="mt-8 pt-5 border-t border-brand-gold/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
              <div className="flex items-center gap-2 text-xs text-gray-300 font-sans italic">
                <Landmark size={14} className="text-brand-gold" />
                <span>Sitamarhi Adarsh Nagar corporate desk</span>
              </div>
              <span className="font-serif text-xs font-semibold text-[#F6E294] tracking-wider uppercase">
                {currentPoster.footerNote}
              </span>
            </div>

          </div>

          {/* Navigation Controls (Left & Right arrows overlay) */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 sm:-ml-6 bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark p-2 sm:p-3 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-90 cursor-pointer z-25"
            title="Previous Poster"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 sm:-mr-6 bg-brand-gold hover:bg-brand-gold-light text-brand-blue-dark p-2 sm:p-3 rounded-full shadow-2xl transition-transform hover:scale-110 active:scale-90 cursor-pointer z-25"
            title="Next Poster"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

        </div>

        {/* Thumbnails list for selection */}
        <div className="flex flex-wrap justify-center gap-3">
          {posters.map((poster, index) => (
            <button
              key={poster.id}
              onClick={() => setActivePoster(index)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                activePoster === index
                  ? 'bg-brand-gold text-brand-blue-dark border-brand-gold shadow-md font-bold'
                  : 'bg-brand-blue-light/10 text-gray-300 border-brand-gold/15 hover:bg-brand-blue-light/30'
              }`}
            >
              {poster.title.split(' ')[0]} {poster.title.split(' ')[1] || ''}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
