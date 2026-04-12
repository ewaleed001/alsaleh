import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminTeamPage() {
  const { data: teamData, error } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
  const team = teamData || [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
         <div>
           <h1 className="text-2xl font-bold text-brand-dark mb-2">إدارة فريق العمل</h1>
           <p className="text-gray-500 text-sm">أضف موظفي الشركة وفريق الإدارة ليظهروا في صفحة "عن الشركة".</p>
         </div>
         <Link href="/admin/team/add" className="bg-brand-secondary text-brand-dark px-6 py-3 rounded-md font-bold hover:bg-brand-primary hover:text-white transition-colors shadow-md flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
           </svg>
           إضافة موظف جديد
         </Link>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right text-sm">
           <thead className="bg-brand-light text-brand-dark font-bold text-base border-b border-gray-200">
              <tr>
                 <th className="p-4 border-l border-white/50 w-12 text-center">الترتيب</th>
                 <th className="p-4 border-l border-white/50">الصورة</th>
                 <th className="p-4 border-l border-white/50">الاسم</th>
                 <th className="p-4 border-l border-white/50">المنصب</th>
                 <th className="p-4 text-center">إجراءات</th>
              </tr>
           </thead>
           <tbody>
              {team.map((member, idx) => (
                <tr key={member.id} className="hover:bg-brand-light/30 transition border-b border-gray-50 last:border-0">
                   <td className="p-4 text-center text-gray-500 font-bold">{member.sort_order}</td>
                   <td className="p-4">
                     <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
                       <img src={member.image_url || 'https://via.placeholder.com/150'} alt={member.name_ar} className="w-full h-full object-cover" />
                     </div>
                   </td>
                   <td className="p-4">
                     <div className="font-bold text-brand-primary">{member.name_ar}</div>
                     <div className="text-xs text-gray-400">{member.name_en}</div>
                   </td>
                   <td className="p-4">
                     <div className="text-gray-700">{member.role_ar}</div>
                     <div className="text-xs text-gray-400">{member.role_en}</div>
                   </td>
                   <td className="p-4">
                     <div className="flex gap-2 justify-center">
                       <Link href={`/admin/team/edit/${member.id}`} className="bg-blue-50 text-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-100 transition shadow-sm">
                         تعديل
                       </Link>
                       <DeleteButton id={member.id} table="team_members" itemName={member.name_ar} />
                     </div>
                   </td>
                </tr>
              ))}
              {team.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-400">
                    <div className="space-y-3">
                      <p className="text-lg font-semibold">لا يوجد موظفين حالياً</p>
                      <Link href="/admin/team/add" className="text-brand-secondary hover:text-brand-primary font-bold">أضف أول موظف →</Link>
                    </div>
                  </td>
                </tr>
              )}
           </tbody>
        </table>
      </div>
    </div>
  );
}
