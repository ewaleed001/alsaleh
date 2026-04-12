import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function NewsDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  const { data: news, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !news) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Image Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden bg-brand-dark">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-50 mix-blend-multiply"
          style={{ backgroundImage: `url('${news.image_url}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-auto mb-16 space-y-4">
          <span className="text-brand-secondary font-bold text-sm tracking-wider uppercase mb-2 block">المركز الإعلامي</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg max-w-4xl mx-auto">
            {news.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-300 text-sm md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-brand-secondary shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
            <span>{news.date || new Date(news.created_at).toLocaleDateString('ar-SA')}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 px-4 -mt-10 relative z-30">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-100 p-8 md:p-14">
          
          {/* Article Content */}
          <article className="prose prose-lg mx-auto text-gray-600 leading-relaxed text-justify mb-12">
            <p className="text-xl md:text-2xl font-semibold text-brand-dark mb-8 leading-snug">
              {news.summary}
            </p>
            <p className="mb-6">
              في إطار سعي شركة آل صالح المستمر لتعزيز مكانتها في السوق العقاري السعودي وتقديم مشاريع تواكب رؤية المملكة 2030، يبرز هذا الحدث كعلامة فارقة في التزامنا بتقديم الجودة والتميز لعملائنا وشركائنا.
            </p>
            <p>
              يأتي هذا الخبر ليؤكد على استراتيجية الشركة طويلة الأمد في توسيع قاعدتها الاستثمارية وتقديم حلول عصرية متكاملة سواء في القطاع السكني أو التجاري. وسنواصل العمل جنباً إلى جنب مع كبرى الجهات والخبراء لضمان تقديم مخرجات تفوق التوقعات وتحقق القيمة المضافة لجميع أصحاب المصلحة.
            </p>
          </article>

          {/* Share & Back Action */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-6 justify-between items-center">
            <div className="flex items-center gap-4 text-brand-dark font-bold">
               <span>شارك الخبر:</span>
               <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-brand-primary hover:text-white transition">X</button>
               <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-brand-primary hover:text-white transition">in</button>
            </div>
            <Link href="/news" className="bg-brand-secondary text-brand-dark px-8 py-3 rounded-md font-bold hover:bg-brand-primary hover:text-white transition text-center flex items-center gap-2">
              <span>العودة للأخبار</span>
              <span>←</span>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
