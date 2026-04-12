import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminMediaPage() {
  const { data: mediaData } = await supabase.from('media').select('*').order('created_at', { ascending: false });
  const mediaItems = mediaData || [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
         <div>
           <h1 className="text-2xl font-bold text-brand-dark mb-2">إدارة مكتبة الوسائط (الصور والفيديو)</h1>
           <p className="text-gray-500 text-sm">ارفع صورك وفيديوهاتك لتبدو جاهزة للعرض كمعرض أعمال في واجهة الموقع.</p>
         </div>
         <Link href="/admin/media/add" className="bg-brand-secondary text-brand-dark px-6 py-3 rounded-md font-bold hover:bg-brand-primary hover:text-white transition-colors shadow-md flex items-center gap-2 border border-brand-secondary">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
           </svg>
           رفع وسائط جديدة
         </Link>
      </div>

      {/* Dynamic Data Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right text-sm">
           <thead className="bg-brand-light text-brand-dark font-bold text-base border-b border-gray-200">
              <tr>
                 <th className="p-4 border-l border-white/50 w-12 text-center">م</th>
                 <th className="p-4 border-l border-white/50 w-1/3">الوصف (Alt Text)</th>
                 <th className="p-4 border-l border-white/50">النوع</th>
                 <th className="p-4 border-l border-white/50">تاريخ الرفع</th>
                 <th className="p-4 text-center">إجراءات</th>
              </tr>
           </thead>
           <tbody>
              {mediaItems.map((media, idx) => (
                <tr key={media.id || idx} className="hover:bg-brand-light/30 transition border-b border-gray-50 last:border-0">
                   <td className="p-4 text-center text-gray-500 font-bold">{idx + 1}</td>
                   <td className="p-4 font-bold text-brand-primary text-base flex items-center gap-4">
                     <div className="w-12 h-12 bg-gray-200 rounded object-cover flex items-center justify-center shrink-0 border border-gray-300 overflow-hidden">
                       <img src={media.url} alt={media.alt_text} className="w-full h-full object-cover" />
                     </div>
                     {media.alt_text || media.title}
                   </td>
                   <td className="p-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${media.type === 'image' || media.type === 'صورة' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                       {media.type === 'image' ? 'صورة' : media.type === 'video' ? 'فيديو' : media.type}
                     </span>
                   </td>
                   <td className="p-4">
                     <span className="text-gray-600 font-medium">{new Date(media.created_at || new Date()).toLocaleDateString('ar-SA')}</span>
                   </td>
                   <td className="p-4">
                     <div className="flex gap-2 justify-center">
                       <DeleteButton id={media.id} table="media" itemName={media.alt_text || 'هذا العنصر'} />
                     </div>
                   </td>
                </tr>
              ))}
              {mediaItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-400">
                    <div className="space-y-3">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-secondary/40 mx-auto mb-4">
                         <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                       </svg>
                      <p className="text-lg font-semibold">لا توجد وسائط حالياً</p>
                      <Link href="/admin/media/add" className="text-brand-secondary hover:text-brand-primary font-bold">أضف أول وسائط →</Link>
                    </div>
                  </td>
                </tr>
              )}
           </tbody>
        </table>
        
        {mediaItems.length > 0 && (
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 font-semibold">
            <span>إجمالي الوسائط: {mediaItems.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
