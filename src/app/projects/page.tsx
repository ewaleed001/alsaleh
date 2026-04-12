import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ScrollReveal from '@/components/ScrollReveal';

// Mark as revalidate to instantly fetch new data or use dynamic: 'force-dynamic'
export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const { data: projects } = await supabase.from('projects').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
  const { data: settingsData } = await supabase.from('site_settings').select('*');

  const settings: Record<string, string> = {};
  settingsData?.forEach(s => { settings[s.key] = s.value; });

  // Fallback to empty array if no data or error
  const displayProjects = projects || [];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: `url('${settings.projects_header_bg_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"}')` }} 
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/95 via-brand-dark/85 to-brand-dark/95 z-10" />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">مشاريعنا العقارية</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-brand-secondary/90 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              اكتشف مجموعة منوعة من أفضل وأرقى المشاريع السكنية والتجارية التي طورناها لبناء مستقبل أفضل.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters and Grid Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['الكل', 'سكني', 'تجاري', 'مكتبي'].map((filter, index) => (
              <button 
                key={index}
                className={`px-8 py-2 rounded-full font-semibold transition-all duration-300 ${
                  index === 0 
                  ? 'bg-brand-primary text-white shadow-md' 
                  : 'bg-white text-gray-600 border-2 border-transparent hover:border-brand-secondary hover:text-brand-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayProjects.map((project, index) => (
              <ScrollReveal key={project.id} delay={index * 0.1}>
              <Link href={`/projects/${project.id}`} className="group bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100 block">
                {/* Visual Area */}
                <div className="relative h-64 w-full overflow-hidden">
                   <img src={project.image_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute inset-0 bg-brand-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                   {/* Status Badge */}
                   <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brand-dark px-4 py-1 rounded-full text-xs font-bold shadow-sm z-10">
                     {project.status}
                   </span>
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-brand-secondary font-bold text-sm mb-2">{project.category}</span>
                  <h3 className="text-2xl font-bold text-brand-primary mb-4 group-hover:text-brand-dark transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-8 mt-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-secondary shrink-0">
                      <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                    </svg>
                    <span>{project.location}</span>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex items-center justify-between w-full pt-4 border-t border-gray-100 group-hover:border-brand-secondary transition-colors">
                    <span className="text-brand-primary font-bold">عرض التفاصيل</span>
                    <span className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand-primary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                      ←
                    </span>
                  </div>
                </div>
              </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Load More */}
          <div className="mt-16 text-center">
            <button className="bg-transparent border-2 border-brand-primary text-brand-primary font-bold px-12 py-3 rounded hover:bg-brand-primary hover:text-white transition-colors duration-300">
              تحميل المزيد
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
