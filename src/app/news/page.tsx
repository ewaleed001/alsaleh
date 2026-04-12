import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import ScrollReveal from '@/components/ScrollReveal';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const { data: newsItems, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
  const displayNews = newsItems || [];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Header Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168d6c?q=80&w=2070&auto=format&fit=crop')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/95 via-brand-dark/85 to-brand-dark/95 z-10" />
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">المركز الإعلامي والأخبار</h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-brand-secondary/90 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
              ابقَ على اطلاع دائم بأحدث أخبار وفعاليات وإنجازات شركة آل صالح الممتدة في عالم العقار.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {displayNews.map((news, index) => (
              <ScrollReveal key={news.id} delay={index * 0.15}>
              <Link href={`/news/${news.id}`} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col sm:flex-row block">
                {/* News Image */}
                <div className="sm:w-2/5 relative h-64 sm:h-auto overflow-hidden">
                  <img src={news.image_url} alt={news.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                {/* News Content */}
                <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <span className="text-brand-secondary text-sm font-bold block mb-3">{news.date}</span>
                    <h3 className="text-2xl font-bold text-brand-dark mb-4 group-hover:text-brand-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-3 mb-6">
                      {news.summary}
                    </p>
                  </div>
                  
                  <div className="text-brand-primary font-bold flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-brand-secondary w-max mt-4">
                    <span className="bg-brand-light p-2 rounded-full group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                    <span>اقرأ المزيد</span>
                  </div>
                </div>
              </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-16 text-center">
            <button className="bg-transparent border-2 border-brand-primary text-brand-primary font-bold px-12 py-3 rounded-md hover:bg-brand-primary hover:text-white transition-colors duration-300 shadow-sm">
              عرض المزيد من الأخبار
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
