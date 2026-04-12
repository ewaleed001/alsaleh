import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const { data: projectsData, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  const projects = projectsData || [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
         <div>
           <h1 className="text-2xl font-bold text-brand-dark mb-2">إدارة المشاريع العقارية</h1>
           <p className="text-gray-500 text-sm">يمكنك إضافة، تعديل، أو حذف المشاريع الظاهرة للزوار في صفحة المشاريع.</p>
         </div>
         <Link href="/admin/projects/add" className="bg-brand-secondary text-brand-dark px-6 py-3 rounded-md font-bold hover:bg-brand-primary hover:text-white transition-colors shadow-md flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
           </svg>
           إضافة مشروع جديد
         </Link>
      </div>

      {/* Dynamic Data Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right text-sm">
           <thead className="bg-brand-light text-brand-dark font-bold text-base border-b border-gray-200">
              <tr>
                 <th className="p-4 border-l border-white/50 w-12 text-center">م</th>
                 <th className="p-4 border-l border-white/50 w-1/4">اسم المشروع</th>
                 <th className="p-4 border-l border-white/50">التصنيف</th>
                 <th className="p-4 border-l border-white/50">الحالة</th>
                 <th className="p-4 border-l border-white/50">الموقع</th>
                 <th className="p-4 text-center">إجراءات</th>
              </tr>
           </thead>
           <tbody>
              {projects.map((proj, idx) => (
                <tr key={proj.id} className="hover:bg-brand-light/30 transition border-b border-gray-50 last:border-0">
                   <td className="p-4 text-center text-gray-500 font-bold">{idx + 1}</td>
                   <td className="p-4 font-bold text-brand-primary text-base">{proj.title}</td>
                   <td className="p-4">
                     <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{proj.category}</span>
                   </td>
                   <td className="p-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold ${proj.status === 'مكتمل' ? 'bg-green-100 text-green-700' : proj.status === 'تحت الإنشاء' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                       {proj.status}
                     </span>
                   </td>
                   <td className="p-4 text-gray-500 text-sm">{proj.location}</td>
                   <td className="p-4">
                     <div className="flex gap-2 justify-center">
                       <Link href={`/admin/projects/edit/${proj.id}`} className="bg-blue-50 text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-100 transition shadow-sm">
                         تعديل
                       </Link>
                       <DeleteButton id={proj.id} table="projects" itemName={proj.title} />
                     </div>
                   </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-400">
                    <div className="space-y-3">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-secondary/40 mx-auto mb-4">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25-2.25M12 13.875V7.5M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                       </svg>
                      <p className="text-lg font-semibold">لا توجد مشاريع حالياً</p>
                      <Link href="/admin/projects/add" className="text-brand-secondary hover:text-brand-primary font-bold">أضف أول مشروع →</Link>
                    </div>
                  </td>
                </tr>
              )}
           </tbody>
        </table>
        
        {projects.length > 0 && (
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 font-semibold">
            <span>إجمالي المشاريع: {projects.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
