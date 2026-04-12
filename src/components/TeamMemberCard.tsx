'use client';

import React, { useState } from 'react';

interface TeamMemberCardProps {
  member: any;
  lang: string;
}

export default function TeamMemberCard({ member, lang }: TeamMemberCardProps) {
  const [showBio, setShowBio] = useState(false);

  const name = lang === 'ar' ? member.name_ar : member.name_en;
  const role = lang === 'ar' ? member.role_ar : member.role_en;
  const bio = lang === 'ar' ? member.bio_ar : member.bio_en;

  return (
    <div className="group relative bg-brand-light/20 rounded-2xl overflow-hidden border border-brand-secondary/10 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      {member.show_image !== false && (
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
          <img 
            src={member.image_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000'} 
            alt={name}
            className={`w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ${showBio ? 'blur-sm grayscale-0' : ''}`}
          />
          
          {/* Bio Overlay */}
          {showBio && (
            <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm p-6 flex flex-col justify-center text-white animate-fade-in">
               <button 
                  onClick={() => setShowBio(false)}
                  className="absolute top-4 left-4 text-white hover:text-brand-secondary transition"
               >
                 ✕
               </button>
               <h4 className="font-bold text-brand-secondary mb-2">{lang === 'ar' ? 'عن الموظف' : 'About Member'}</h4>
               <p className="text-sm leading-relaxed overflow-y-auto max-h-[80%] custom-scrollbar">
                  {bio || (lang === 'ar' ? 'لا يوجد نبذة تعريفية متاحة حالياً.' : 'No biography available yet.')}
               </p>
               {(member.email || member.phone) && (
                 <div className="mt-4 pt-4 border-t border-white/10 space-y-1 text-xs">
                   {member.email && <div className="flex items-center gap-2">📧 {member.email}</div>}
                   {member.phone && <div className="flex items-center gap-2">📞 {member.phone}</div>}
                 </div>
               )}
            </div>
          )}
        </div>
      )}

      <div className="p-6 text-center flex-1 flex flex-col">
        <h4 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
          {name}
        </h4>
        <p className="text-sm text-brand-primary font-medium mb-4">
          {role}
        </p>
        
        <div className="mt-auto flex justify-center gap-3">
          {bio && (
            <button 
              onClick={() => setShowBio(!showBio)}
              className="text-xs font-bold px-3 py-1.5 rounded-full bg-brand-secondary/20 text-brand-dark hover:bg-brand-secondary transition"
            >
              {lang === 'ar' ? 'عرض السيرة' : 'View Bio'}
            </button>
          )}

          {member.linkedin_url && (
            <a 
              href={member.linkedin_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center hover:bg-brand-secondary hover:text-brand-dark transition-all shadow-md"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
