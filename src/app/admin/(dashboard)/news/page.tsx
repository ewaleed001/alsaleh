import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminNewsPage() {
  const { data: newsData } = await supabase.from('news').select('*').order('created_at', { ascending: false });
  const newsItems = newsData || [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
         <div>
           <h1 className="text-2xl font-bold text-brand-dark mb-2">إدارة المركز الإعلامي (الأخبار)</h1>
           <p className="text-gray-500 text-sm">أضف الأخبار، الفعاليات، الإعلانات الصحفية والاتفاقيات لتظهر فوراً في قسم المركز الإعلامي.</p>
         </div>
         <Link href="/admin/news/add" className="bg-brand-secondary text-brand-dark px-6 py-3 rounded-md font-bold hover:bg-brand-primary hover:text-white transition-colors shadow-md flex items-center gap-2 border border-brand-secondary">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
           </svg>
           إضافة خبر جديد
         </Link>
      </div>

      {/* Dynamic Data Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right text-sm">
           <thead className="bg-brand-light text-brand-dark font-bold text-base border-b border-gray-200">
              <tr>
                 <th className="p-4 border-l border-white/50 w-12 text-center">م</th>
                 <th className="p-4 border-l border-white/50 w-1/2">عنوان الخبر</th>
                 <th className="p-4 border-l border-white/50">تاريخ النشر</th>
                 <th className="p-4 text-center">إجراءات</th>
              </tr>
           </thead>
           <tbody>
              {newsItems.map((news, idx) => (
                <tr key={news.id} className="hover:bg-brand-light/30 transition border-b border-gray-50 last:border-0">
                   <td className="p-4 text-center text-gray-500 font-bold">{idx + 1}</td>
                   <td className="p-4 font-bold text-brand-primary text-base">{news.title}</td>
                   <td className="p-4">
                     <span className="text-gray-600 font-medium">{news.date || new Date(news.created_at).toLocaleDateString('ar-SA')}</span>
                   </td>
                   <td className="p-4">
                     <div className="flex gap-2 justify-center">
                       <Link href={`/admin/news/edit/${news.id}`} className="bg-blue-50 text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-100 transition shadow-sm">
                         تعديل
                       </Link>
                       <DeleteButton id={news.id} table="news" itemName={news.title} />
                     </div>
                   </td>
                </tr>
              ))}
              {newsItems.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-400">
                    <div className="space-y-3">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-secondary/40 mx-auto mb-4">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                       </svg>
                      <p className="text-lg font-semibold">لا توجد أخبار حالياً</p>
                      <Link href="/admin/news/add" className="text-brand-secondary hover:text-brand-primary font-bold">أضف أول خبر →</Link>
                    </div>
                  </td>
                </tr>
              )}
           </tbody>
        </table>
        
        {newsItems.length > 0 && (
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 font-semibold">
            <span>إجمالي الأخبار: {newsItems.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
