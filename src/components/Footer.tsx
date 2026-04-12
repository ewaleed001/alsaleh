'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  // Hide footer on all admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-brand-primary text-brand-light py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
         {/* Brand Column */}
         <div className="space-y-6 col-span-1 md:col-span-1">
           <div className="flex-shrink-0 mt-2 bg-white inline-block p-2 rounded max-w-[200px]">
             <img src="/logo.svg" alt="Al-Saleh Group Logo" className="h-[auto] max-h-[80px] w-full object-contain" />
           </div>
           <p className="text-gray-400 text-sm leading-relaxed">
             {t.footer.desc}
           </p>
           <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-brand-secondary hover:text-brand-secondary cursor-pointer transition">X</div>
             <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-brand-secondary hover:text-brand-secondary cursor-pointer transition">in</div>
             <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:border-brand-secondary hover:text-brand-secondary cursor-pointer transition">f</div>
           </div>
         </div>

         {/* Navigation Links */}
         <div>
           <h4 className="text-lg font-bold text-white mb-6 border-b-2 border-brand-secondary inline-block pb-2">{t.footer.quick_links}</h4>
           <ul className="space-y-4 text-gray-400 text-sm">
             <li><Link href="/about" className="hover:text-brand-secondary transition">{t.nav.about}</Link></li>
             <li><Link href="/projects" className="hover:text-brand-secondary transition">{t.nav.projects}</Link></li>
             <li><Link href="/news" className="hover:text-brand-secondary transition">{t.nav.news}</Link></li>
             <li><Link href="/contact" className="hover:text-brand-secondary transition">{t.nav.contact}</Link></li>
           </ul>
         </div>

         {/* Projects Direct Links */}
         <div>
           <h4 className="text-lg font-bold text-white mb-6 border-b-2 border-brand-secondary inline-block pb-2">{t.footer.top_projects}</h4>
           <ul className="space-y-4 text-gray-400 text-sm">
             <li><Link href="/projects" className="hover:text-brand-secondary transition">{t.footer.top_projects}</Link></li>
           </ul>
         </div>

         {/* Contact Info */}
         <div>
           <h4 className="text-lg font-bold text-white mb-6 border-b-2 border-brand-secondary inline-block pb-2">{t.footer.contact_us}</h4>
           <ul className="space-y-4 text-gray-400 text-sm">
             <li className="flex items-start gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-secondary mt-1 shrink-0">
                 <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
               </svg>
               <span>{t.footer.address}</span>
             </li>
             <li className="flex items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-secondary shrink-0">
                 <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
               </svg>
               <span dir="ltr">{t.footer.phone}</span>
             </li>
             <li className="flex items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-secondary shrink-0">
                 <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                 <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
               </svg>
               <span>{t.footer.email}</span>
             </li>
           </ul>
         </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
         <p>{t.footer.rights}</p>
         <a href="https://profile-omar-alodaini.netlify.app/developer" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
           <img src="/dev_logo.png" alt="Omar Alodaini" className="h-10 w-auto object-contain" />
         </a>
      </div>
    </footer>
  );
}
