import React from 'react';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function MediaLibraryPage() {
  const { data: mediaItems, error } = await supabase.from('media').select('*').order('created_at', { ascending: false });
  const displayMedia = mediaItems || [];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Header Section */}
      <section className="bg-brand-dark py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary opacity-30 mix-blend-color-burn" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">مكتبة الصور والفيديو</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            تصفح معرضنا الخاص المليء بالصور والفيديوهات الحيّة لمشاريعنا وإنجازاتنا المتنوعة.
          </p>
        </div>
      </section>

      {/* Main Grid Area */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters */}
          <div className="flex justify-center gap-4 mb-16">
            {['الكل', 'الصور', 'الفيديو'].map((filter, index) => (
              <button 
                key={index}
                className={`px-8 py-2 rounded-full font-semibold transition-all duration-300 ${
                  index === 0 
                  ? 'bg-brand-secondary text-brand-dark shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Masonry-style Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayMedia.map((item, index) => (
              <div 
                key={item.id || index} 
                className={`group relative overflow-hidden rounded-xl bg-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer border border-black/5
                  ${index === 3 || index === 7 ? 'sm:col-span-2 md:col-span-2 aspect-[16/9]' : 'aspect-square'}
                `}
              >
                {/* Image Layer */}
                <img 
                  src={item.url} 
                  alt={item.alt_text} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-white font-bold text-lg">{item.alt_text}</span>
                  <span className="text-brand-secondary text-sm">{item.type === 'video' ? 'شاهد الفيديو' : 'عرض الصورة'}</span>
                </div>

                {/* Video Play Icon Indicator */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:bg-brand-secondary group-hover:border-transparent transition-colors shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white group-hover:text-brand-dark transition-colors translate-x-1">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
