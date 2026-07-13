import React from 'react';
import { CONTACT_INFO } from '../data';
import { MapPin, Phone, Mail, Globe, Shield, Heart, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#060B1C] text-gray-400 border-t border-brand-gold/25 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-brand-gold/15 pb-12 mb-12">
          {/* Col 1: Branding & Motto */}
          <div className="space-y-4">
            <h4 className="font-display font-extrabold text-2xl text-white tracking-wider leading-none">
              Stm <span className="gold-gradient-text">SCHOLARS</span>
            </h4>
            <p className="font-serif text-xs font-semibold text-[#F6E294] tracking-widest uppercase">
              Foundation of Career
            </p>
            <p className="text-sm text-gray-300 leading-relaxed font-sans max-w-sm">
              Empowering future leaders with top-tier concept clarity, premium learning material, and continuous progress tracking for JEE, NEET, and board exams.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href={CONTACT_INFO.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-brand-blue-light/50 border border-brand-gold/20 flex items-center justify-center text-gray-300 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                <Share2 size={15} />
              </a>
              <a
                href={CONTACT_INFO.social.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-brand-blue-light/50 border border-brand-gold/20 flex items-center justify-center text-gray-300 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                <Globe size={15} />
              </a>
              <a
                href={CONTACT_INFO.social.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-brand-blue-light/50 border border-brand-gold/20 flex items-center justify-center text-gray-300 hover:text-brand-gold hover:border-brand-gold transition-colors"
              >
                <Shield size={15} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Contacts */}
          <div className="space-y-4">
            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider border-l-2 border-brand-gold pl-3">
              Direct Contact
            </h5>
            <ul className="space-y-4 text-sm font-sans">
              <li className="flex items-start gap-3">
                <Phone className="text-brand-gold flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="block font-semibold text-gray-200">Call / WhatsApp:</span>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-brand-gold font-mono transition-colors text-lg font-bold">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-brand-gold flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="block font-semibold text-gray-200">Email Address:</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-brand-gold transition-colors font-mono">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Location */}
          <div className="space-y-4">
            <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider border-l-2 border-brand-gold pl-3">
              Corporate Desk Location
            </h5>
            <ul className="space-y-3 text-sm font-sans">
              <li className="flex items-start gap-3">
                <MapPin className="text-brand-gold flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <span className="block font-semibold text-gray-200">Address:</span>
                  <span className="text-gray-300 leading-relaxed block">
                    {CONTACT_INFO.address}
                  </span>
                  <span className="inline-block mt-2 text-xs bg-brand-crimson/20 border border-brand-crimson/30 text-[#F6E294] font-semibold px-2.5 py-1 rounded">
                    Landmark: Near by SC Mishra Mathematics Classes
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower footer copyright block */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-gray-500">
          <p>© {new Date().getFullYear()} Stm Scholars (Foundation of Career). All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made for future leaders</span>
            <Heart size={10} className="text-brand-crimson fill-brand-crimson" />
            <span>at Sitamarhi, Bihar</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
