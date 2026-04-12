import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  const { data: gallery } = await supabase
    .from('project_images')
    .select('*')
    .eq('project_id', resolvedParams.id)
    .order('sort_order', { ascending: true });

  if (error || !project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Image Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url('${project.image_url}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent z-10" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-auto mb-16 space-y-4">
          <span className="bg-brand-secondary text-brand-dark px-4 py-1 rounded-full text-sm font-bold shadow-sm inline-block">
            {project.status}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
            {project.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-200 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brand-secondary shrink-0">
              <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
            </svg>
            <span>{project.location}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 px-4 -mt-10 relative z-30">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl border border-gray-100 p-8 md:p-12">
          
          {/* Quick Info Bar */}
          <div className="flex flex-wrap gap-8 items-center border-b border-gray-100 pb-8 mb-8 justify-around text-center">
             <div>
               <p className="text-gray-500 text-sm mb-1 mb-2">التصنيف</p>
               <p className="text-xl font-bold text-brand-primary">{project.category}</p>
             </div>
             <div className="hidden md:block w-px h-12 bg-gray-200"></div>
             <div>
               <p className="text-gray-500 text-sm mb-1 mb-2">حالة المشروع</p>
               <p className="text-xl font-bold text-brand-primary">{project.status}</p>
             </div>
             <div className="hidden md:block w-px h-12 bg-gray-200"></div>
             <div>
               <p className="text-gray-500 text-sm mb-1 mb-2">الموقع</p>
               <p className="text-xl font-bold text-brand-primary">{project.location}</p>
             </div>
          </div>

           {/* Description Content */}
           <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
             <h2 className="text-3xl font-bold text-brand-dark mb-4">نظرة عامة على المشروع</h2>
             {project.description ? (
               <p className="text-justify whitespace-pre-wrap">{project.description}</p>
             ) : (
               <>
                <p className="text-justify">
                  مشروع "{project.title}" التابع لشركة آل صالح العقارية يعد من أبرز المشاريع في منطقة ({project.location}). 
                  يأتي هذا المشروع ضمن خطتنا لتطوير مشاريع ذات طابع {project.category} تلبي احتياجات وطموحات السوق، 
                  وتحقق أعلى معايير الجودة والاستدامة.
                </p>
                <p className="text-justify">
                  تم تخطيط هذا المشروع بعناية فائقة وتصميمه ليوفر تجربة استثنائية سواء للمستثمرين أو للسكان. 
                  حالياً، المشروع في مرحلة "{project.status}"، ونعمل بكل جهد معتاد من خبرتنا الممتدة لأكثر من 50 عاماً، 
                  لضمان تنفيذ كافة التفاصيل بدقة متناهية وتسليمه بحسب الجدول الزمني المحدد.
                </p>
               </>
             )}
            {/* Gallery Section */}
            {gallery && gallery.length > 0 && (
              <div className="pt-12 border-t border-gray-100">
                <h3 className="text-2xl font-bold text-brand-dark mb-6">معرض صور المشروع</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.map((img: any, i: number) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
                      <img src={img.image_url} alt={`${project.title} - ${i}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
           </div>
          {/* Action Buttons */}
          <div className="mt-12 flex justify-center">
            <Link href="/projects" className="bg-gray-100 text-gray-700 px-10 py-4 rounded-md font-bold text-lg hover:bg-gray-200 transition text-center shadow-sm">
              العودة للمشاريع ←
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
