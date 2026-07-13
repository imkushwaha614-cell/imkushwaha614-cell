import React, { useState, useEffect, useRef } from 'react';
import { Award, CheckCircle, GraduationCap, Quote, ShieldCheck, Sparkles, BookOpen, Camera, RotateCcw, Sliders, Settings, Eye, HelpCircle } from 'lucide-react';

interface PortraitPreset {
  name: string;
  id: string;
  brightness: number;
  contrast: number;
  saturation: number;
  sepia: number;
  vignetteIntensity: number; // 0 to 100
  bottomFadeIntensity: number; // 0 to 100
  hueRotate: number;
}

export default function DirectorDesk() {
  const [directorImage, setDirectorImage] = useState<string>('');
  const [showControls, setShowControls] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Profile Customizer State
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(110);
  const [saturation, setSaturation] = useState<number>(105);
  const [sepia, setSepia] = useState<number>(5);
  const [vignette, setVignette] = useState<number>(75);
  const [bottomFade, setBottomFade] = useState<number>(80);
  const [hueRotate, setHueRotate] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<string>('warm-studio');

  const presets: PortraitPreset[] = [
    {
      name: '🎓 Warm Academic',
      id: 'warm-studio',
      brightness: 102,
      contrast: 112,
      saturation: 100,
      sepia: 10,
      vignetteIntensity: 85,
      bottomFadeIntensity: 85,
      hueRotate: 0
    },
    {
      name: '🌳 Outdoor Masker',
      id: 'outdoor-masker',
      brightness: 100,
      contrast: 115,
      saturation: 100,
      sepia: 5,
      vignetteIntensity: 100,
      bottomFadeIntensity: 100,
      hueRotate: 0
    },
    {
      name: '🏛️ Premium Studio',
      id: 'premium-studio',
      brightness: 95,
      contrast: 115,
      saturation: 85,
      sepia: 0,
      vignetteIntensity: 90,
      bottomFadeIntensity: 90,
      hueRotate: 0
    },
    {
      name: '🖤 Executive B&W',
      id: 'monochrome',
      brightness: 92,
      contrast: 130,
      saturation: 0,
      sepia: 0,
      vignetteIntensity: 95,
      bottomFadeIntensity: 90,
      hueRotate: 0
    },
    {
      name: '🌅 Golden Hour',
      id: 'golden-glow',
      brightness: 105,
      contrast: 105,
      saturation: 115,
      sepia: 15,
      vignetteIntensity: 80,
      bottomFadeIntensity: 80,
      hueRotate: 350
    },
    {
      name: '✨ Original Raw',
      id: 'original',
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
      vignetteIntensity: 0,
      bottomFadeIntensity: 0,
      hueRotate: 0
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('director_photo');
    if (saved) {
      setDirectorImage(saved);
    } else {
      // Check if director.jpg exists in root or /public
      fetch('/director.jpg', { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            setDirectorImage('/director.jpg');
          } else {
            fetch('/public/director.jpg', { method: 'HEAD' })
              .then((res2) => {
                if (res2.ok) {
                  setDirectorImage('/public/director.jpg');
                } else {
                  setDirectorImage('https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=600&h=750');
                }
              })
              .catch(() => {
                setDirectorImage('https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=600&h=750');
              });
          }
        })
        .catch(() => {
          setDirectorImage('https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=600&h=750');
        });
    }

    // Load saved filters if any
    const savedFilters = localStorage.getItem('director_filters');
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        setBrightness(parsed.brightness || 100);
        setContrast(parsed.contrast || 110);
        setSaturation(parsed.saturation || 105);
        setSepia(parsed.sepia || 5);
        setVignette(parsed.vignette || 75);
        setBottomFade(parsed.bottomFade || 80);
        setHueRotate(parsed.hueRotate || 0);
        setActivePreset(parsed.activePreset || 'warm-studio');
      } catch (e) {
        console.error('Error loading filters', e);
      }
    }
  }, []);

  const saveFilters = (newFilters: any) => {
    localStorage.setItem('director_filters', JSON.stringify(newFilters));
  };

  const applyPreset = (preset: PortraitPreset) => {
    setBrightness(preset.brightness);
    setContrast(preset.contrast);
    setSaturation(preset.saturation);
    setSepia(preset.sepia);
    setVignette(preset.vignetteIntensity);
    setBottomFade(preset.bottomFadeIntensity);
    setHueRotate(preset.hueRotate);
    setActivePreset(preset.id);

    saveFilters({
      brightness: preset.brightness,
      contrast: preset.contrast,
      saturation: preset.saturation,
      sepia: preset.sepia,
      vignette: preset.vignetteIntensity,
      bottomFade: preset.bottomFadeIntensity,
      hueRotate: preset.hueRotate,
      activePreset: preset.id
    });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setDirectorImage(base64String);
        localStorage.setItem('director_photo', base64String);
        // Toggle controls open so they can customize their uploaded photo right away
        setShowControls(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('director_photo');
    localStorage.removeItem('director_filters');
    setDirectorImage('https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&q=80&w=600&h=750');
    // Reset to warm-studio
    const defaultPreset = presets[0];
    applyPreset(defaultPreset);
  };

  return (
    <section id="director-desk" className="py-20 bg-brand-blue-dark border-t border-brand-gold/15 relative overflow-hidden">
      {/* Aesthetic ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Hidden file input for custom photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-gold font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
            Leadership & Vision
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white mt-4 tracking-tight leading-tight">
            Director's <span className="gold-gradient-text">Message</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson mx-auto mt-6" />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Director Image & Credentials (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-center" id="director-profile-card">
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              {/* Outer Golden/Crimson Glow Frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-crimson via-brand-gold to-brand-crimson rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              {/* Profile Wrapper */}
              <div className="relative bg-brand-blue-dark p-2 rounded-2xl border border-brand-gold/30 overflow-hidden shadow-2xl">
                
                {/* Real-time Studio Graphic Mask Filter (Absolute Layers) */}
                <div className="relative w-full max-w-[320px] h-[400px] rounded-xl overflow-hidden bg-[#0A192F]">
                  {directorImage ? (
                    <img
                      src={directorImage}
                      alt="Director Rajnish Kumar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter transition-transform duration-500 group-hover:scale-[1.02]"
                      style={{
                        filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) sepia(${sepia}%) hue-rotate(${hueRotate}deg)`
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-blue-light/20 flex items-center justify-center">
                      <span className="text-gray-400">Loading Image...</span>
                    </div>
                  )}

                  {/* VIGNETTE MASK - Masks background corners, focusing entirely on face & shirt */}
                  {vignette > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none transition-all duration-300"
                      style={{
                        background: `radial-gradient(circle, transparent ${100 - vignette}%, rgba(10, 25, 47, ${vignette / 100}) 100%)`
                      }}
                    />
                  )}

                  {/* BOTTOM BLEND FADE - Fades out lower background, clothing, bench, etc. into solid deep corporate blue */}
                  {bottomFade > 0 && (
                    <div 
                      className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none transition-all duration-300"
                      style={{
                        background: `linear-gradient(to top, rgba(10, 25, 47, 1) 0%, rgba(10, 25, 47, ${bottomFade / 100}) 40%, transparent 100%)`
                      }}
                    />
                  )}

                  {/* Subtle Golden Ambient Light Flare */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
                </div>
                
                {/* Upload Overlay on Hover */}
                <div className="absolute inset-2 bg-black/60 backdrop-blur-xs rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 z-10">
                  <div className="w-12 h-12 rounded-full bg-brand-gold/20 border border-brand-gold flex items-center justify-center text-brand-gold mb-3">
                    <Camera size={24} />
                  </div>
                  <span className="text-white font-bold text-sm">Upload Your Picture</span>
                  <p className="text-xs text-gray-300 mt-1 max-w-[200px]">Click anywhere to upload or change Director's photo</p>
                  
                  {localStorage.getItem('director_photo') && (
                    <button
                      onClick={handleResetImage}
                      className="mt-4 px-3 py-1 text-[10px] font-bold bg-brand-crimson hover:bg-brand-crimson-light text-white rounded-md flex items-center gap-1.5 transition-colors z-20"
                    >
                      <RotateCcw size={10} /> Reset Default
                    </button>
                  )}
                </div>

                {/* Overlay Ribbon Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-brand-blue-dark/95 border border-brand-gold/30 backdrop-blur-md rounded-lg p-3 text-center shadow-lg transition-transform group-hover:translate-y-[-4px] z-10">
                  <span className="font-display font-extrabold text-white tracking-wide block text-sm">
                    RAJNISH KUMAR
                  </span>
                  <span className="font-sans text-[10px] font-bold text-brand-gold-light uppercase tracking-wider block mt-0.5">
                    Director (M.Sc-Zoology)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Upload Tip & Studio Controls Trigger */}
            <div className="mt-3 flex flex-col items-center gap-2 w-full max-w-[340px]">
              <div className="flex justify-between items-center w-full px-1">
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="text-[11px] text-gray-300 hover:text-brand-gold transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera size={12} className="text-brand-gold" />
                  <span>Upload Pic</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowControls(!showControls)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-all cursor-pointer ${
                    showControls 
                      ? 'bg-brand-gold text-brand-blue-dark border-brand-gold' 
                      : 'bg-brand-blue-light/10 text-brand-gold-light border-brand-gold/20 hover:bg-brand-blue-light/30'
                  }`}
                >
                  <Sliders size={11} />
                  <span>Background Studio</span>
                </button>
              </div>

              {/* Collapsible Background Studio controls */}
              {showControls && (
                <div className="w-full bg-brand-blue-light/10 border border-brand-gold/20 p-4 rounded-xl mt-1 space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-brand-gold/15 pb-2 mb-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Settings size={12} className="text-brand-gold" />
                      Studio Customizer
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowControls(false)}
                      className="text-[10px] text-gray-400 hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  <p className="text-[10px] text-gray-300 leading-normal">
                    💡 <strong>Pro-Tip:</strong> High vignette and bottom fade levels can cleanly mask out casual/outdoor backgrounds (like park benches) and give a formal studio outline!
                  </p>

                  {/* Presets Row */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-sans">
                      Select Professional Profile Preset
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {presets.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => applyPreset(p)}
                          className={`px-2 py-1 text-[10px] font-medium rounded transition-all cursor-pointer ${
                            activePreset === p.id
                              ? 'bg-brand-gold text-brand-blue-dark font-bold shadow'
                              : 'bg-brand-blue-dark/50 text-gray-300 hover:text-white border border-brand-gold/10'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Controls */}
                  <div className="space-y-3 pt-2 border-t border-brand-gold/10">
                    {/* Vignette Shadow Intensity Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-gray-300 mb-1">
                        <span>Vignette (Masks Bench Background)</span>
                        <span className="text-brand-gold font-mono">{vignette}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={vignette}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setVignette(val);
                          setActivePreset('custom');
                        }}
                        className="w-full h-1.5 bg-brand-blue-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                      />
                    </div>

                    {/* Bottom Fade Mask Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-gray-300 mb-1">
                        <span>Bottom Blend Fade (Masks Seat/Bench)</span>
                        <span className="text-brand-gold font-mono">{bottomFade}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={bottomFade}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setBottomFade(val);
                          setActivePreset('custom');
                        }}
                        className="w-full h-1.5 bg-brand-blue-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                      />
                    </div>

                    {/* Brightness Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-gray-300 mb-1">
                        <span>Brightness</span>
                        <span className="text-brand-gold font-mono">{brightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="70"
                        max="140"
                        value={brightness}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setBrightness(val);
                          setActivePreset('custom');
                        }}
                        className="w-full h-1.5 bg-brand-blue-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                      />
                    </div>

                    {/* Contrast Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-gray-300 mb-1">
                        <span>Contrast</span>
                        <span className="text-brand-gold font-mono">{contrast}%</span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="150"
                        value={contrast}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setContrast(val);
                          setActivePreset('custom');
                        }}
                        className="w-full h-1.5 bg-brand-blue-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                      />
                    </div>

                    {/* Saturation Slider */}
                    <div>
                      <div className="flex justify-between text-[10px] font-semibold text-gray-300 mb-1">
                        <span>Color Saturation</span>
                        <span className="text-brand-gold font-mono">{saturation}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="200"
                        value={saturation}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setSaturation(val);
                          setActivePreset('custom');
                        }}
                        className="w-full h-1.5 bg-brand-blue-dark rounded-lg appearance-none cursor-pointer accent-brand-gold"
                      />
                    </div>

                    {/* Reset Button */}
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          const p = presets[0]; // Warm Academic
                          applyPreset(p);
                        }}
                        className="text-[9px] font-bold text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <RotateCcw size={8} /> Reset Customizer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Credentials / Key Details below card */}
            <div className="mt-6 w-full max-w-[340px] space-y-3 font-sans text-xs sm:text-sm bg-brand-blue-light/15 border border-brand-gold/15 p-5 rounded-xl">
              <div className="flex items-center gap-3">
                <GraduationCap className="text-brand-gold flex-shrink-0" size={18} />
                <span className="text-gray-200"><strong>Postgraduate:</strong> M.Sc in Zoology</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="text-brand-gold flex-shrink-0" size={18} />
                <span className="text-gray-200"><strong>Core Speciality:</strong> Conceptual Biology & Zoology</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-gold flex-shrink-0" size={18} />
                <span className="text-gray-200"><strong>Academic Experience:</strong> 8+ Years Mentoring Elite Batches</span>
              </div>
            </div>
          </div>

          {/* Director Vision & Words (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Elegant Quote */}
            <div className="relative bg-brand-blue-light/20 border-l-4 border-brand-gold p-6 rounded-r-xl shadow-xl">
              <Quote className="absolute top-3 right-4 text-brand-gold/10" size={56} />
              <p className="font-serif italic text-base sm:text-lg text-brand-gold-light leading-relaxed">
                "At Stm Scholars, we do not believe in rote memorization. Our core mission is to empower young scientific minds with ultimate conceptual clarity so they naturally decode complex problems in JEE, NEET, and board exams."
              </p>
              <span className="block mt-3 text-right font-sans text-xs font-bold uppercase tracking-wider text-white">
                — Rajnish Kumar, Director
              </span>
            </div>

            {/* Welcoming Narrative */}
            <div className="space-y-4 text-gray-300 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                Welcome to <strong>Stm Scholars (Foundation of Career)</strong>. Education is the greatest catalyst for lifelong success. As an educator specializing in Zoology, I have witnessed firsthand how structural, concept-focused learning transforms academic outcomes and boosts self-confidence.
              </p>
              <p>
                Whether you are aiming for top medical colleges through <strong>NEET</strong>, pursuing engineering in elite <strong>IITs/NITs via JEE</strong>, or building early analytical aptitude in <strong>CBSE K-12 classes</strong>, our methodology is calibrated to ensure that your concepts are bulletproof.
              </p>
              <p>
                We provide meticulously curated worksheets, up-to-date practice papers, and a small student-teacher ratio to ensure that no question goes unanswered. Join us at our Sitamarhi corporate campus to turn your career ambitions into real-world achievements.
              </p>
            </div>

            {/* Bullet Points of Core Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="text-brand-gold mt-1 flex-shrink-0" size={16} />
                <div>
                  <h4 className="text-white font-bold text-sm">Targeted Curriculum</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Designed from fundamental NCERT to advanced ranks.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="text-brand-gold mt-1 flex-shrink-0" size={16} />
                <div>
                  <h4 className="text-white font-bold text-sm">Zoology & Life Sciences Expert</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Direct personal oversight for NEET Biology prep.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="text-brand-gold mt-1 flex-shrink-0" size={16} />
                <div>
                  <h4 className="text-white font-bold text-sm">Personal Progress Reviews</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Continuous feedback sessions direct from director's room.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckCircle className="text-brand-gold mt-1 flex-shrink-0" size={16} />
                <div>
                  <h4 className="text-white font-bold text-sm">Career Counseling</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Unmatched focus on early career goal mapping.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
