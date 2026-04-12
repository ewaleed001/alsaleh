import React from 'react';
import { supabase } from '@/lib/supabase';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const { data: messagesData } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  const messages = messagesData || [];

  const unreadCount = messages.filter((m: any) => !m.is_read).length;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100 gap-4">
         <div>
           <h1 className="text-2xl font-bold text-brand-dark mb-2">رسائل التواصل</h1>
           <p className="text-gray-500 text-sm">جميع الرسائل الواردة من نموذج اتصل بنا في الموقع.</p>
         </div>
         {unreadCount > 0 && (
           <div className="bg-brand-secondary text-brand-dark px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             {unreadCount} رسائل جديدة
           </div>
         )}
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-right text-sm">
           <thead className="bg-brand-light text-brand-dark font-bold text-base border-b border-gray-200">
              <tr>
                 <th className="p-4 border-l border-white/50 w-12 text-center">م</th>
                 <th className="p-4 border-l border-white/50">الاسم</th>
                 <th className="p-4 border-l border-white/50">البريد</th>
                 <th className="p-4 border-l border-white/50">الموضوع</th>
                 <th className="p-4 border-l border-white/50 hidden md:table-cell">الرسالة</th>
                 <th className="p-4 border-l border-white/50">التاريخ</th>
                 <th className="p-4 text-center">إجراءات</th>
              </tr>
           </thead>
           <tbody>
              {messages.map((msg: any, idx: number) => (
                <tr key={msg.id} className={`hover:bg-brand-light/30 transition border-b border-gray-50 last:border-0 ${!msg.is_read ? 'bg-blue-50/50' : ''}`}>
                   <td className="p-4 text-center text-gray-500 font-bold">
                     {!msg.is_read && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-1"></span>}
                     {idx + 1}
                   </td>
                   <td className="p-4 font-bold text-brand-primary">{msg.name}</td>
                   <td className="p-4 text-gray-600" dir="ltr">{msg.email}</td>
                   <td className="p-4">
                     <span className="bg-brand-light text-brand-primary px-3 py-1 rounded-full text-xs font-semibold">{msg.subject}</span>
                   </td>
                   <td className="p-4 text-gray-500 text-sm max-w-[200px] truncate hidden md:table-cell">{msg.message}</td>
                   <td className="p-4 text-gray-500 text-xs">{new Date(msg.created_at).toLocaleDateString('ar-SA')}</td>
                   <td className="p-4">
                     <div className="flex gap-2 justify-center">
                       <DeleteButton id={msg.id} table="messages" itemName={`رسالة ${msg.name}`} />
                     </div>
                   </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-400">
                    <div className="space-y-3">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-brand-secondary/40 mx-auto mb-4">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                       </svg>
                      <p className="text-lg font-semibold">لا توجد رسائل حالياً</p>
                      <p className="text-sm">ستظهر الرسائل هنا عندما يتواصل معكم الزوار عبر نموذج اتصل بنا.</p>
                    </div>
                  </td>
                </tr>
              )}
           </tbody>
        </table>
        
        {messages.length > 0 && (
          <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 font-semibold">
            <span>إجمالي الرسائل: {messages.length} ({unreadCount} غير مقروءة)</span>
          </div>
        )}
      </div>
    </div>
  );
}
