import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Fetch real counts from Supabase
  const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
  const { count: completedCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'مكتمل');
  const { count: underConstructionCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'تحت الإنشاء');
  const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true });
  const { count: mediaCount } = await supabase.from('media').select('*', { count: 'exact', head: true });

  // Fetch latest 5 projects for overview table
  const { data: latestProjects } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(5);
  const { data: latestNews } = await supabase.from('news').select('*').order('created_at', { ascending: false }).limit(3);

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Welcome Header */}
      <h1 className="text-3xl font-bold text-brand-dark mb-2">مرحبا بك في لوحة تحكم منصة آل صالح</h1>
      <p className="text-gray-500 text-lg mb-8">من هنا يمكنك إدارة وتحرير جميع محتويات الموقع بسهولة لتظهر للعملاء بشكل فوري.</p>

      {/* Statistics Cards - REAL DATA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Link href="/admin/projects" className="bg-white p-6 rounded-xl shadow-sm border border-brand-primary/10 flex flex-col gap-4 hover:shadow-md transition group">
            <div className="flex items-center justify-between">
              <span className="text-brand-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-3h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                </svg>
              </span>
              <span className="text-xs text-gray-400 group-hover:text-brand-primary transition font-bold">عرض الكل ←</span>
            </div>
            <div className="text-3xl font-bold text-brand-dark">{projectsCount || 0}</div>
            <div className="text-gray-500 font-medium">إجمالي المشاريع</div>
         </Link>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-primary/10 flex flex-col gap-4 hover:shadow-md transition">
            <span className="text-brand-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </span>
            <div className="text-3xl font-bold text-brand-dark">{completedCount || 0}</div>
            <div className="text-gray-500 font-medium">مشاريع مكتملة</div>
         </div>
         <Link href="/admin/news" className="bg-white p-6 rounded-xl shadow-sm border border-brand-primary/10 flex flex-col gap-4 hover:shadow-md transition group">
            <div className="flex items-center justify-between">
              <span className="text-brand-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                </svg>
              </span>
              <span className="text-xs text-gray-400 group-hover:text-brand-primary transition font-bold">عرض الكل →</span>
            </div>
            <div className="text-3xl font-bold text-brand-dark">{newsCount || 0}</div>
            <div className="text-gray-500 font-medium">أخبار في المركز الإعلامي</div>
         </Link>
         <Link href="/admin/media" className="bg-white p-6 rounded-xl shadow-sm border border-brand-primary/10 flex flex-col gap-4 hover:shadow-md transition group">
            <div className="flex items-center justify-between">
              <span className="text-brand-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </span>
              <span className="text-xs text-gray-400 group-hover:text-brand-primary transition font-bold">عرض الكل →</span>
            </div>
            <div className="text-3xl font-bold text-brand-dark">{mediaCount || 0}</div>
            <div className="text-gray-500 font-medium">صورة وفيديو في المكتبة</div>
         </Link>
      </div>

      {/* Quick Action Sections */}
      <div className="grid md:grid-cols-2 gap-8 mt-12">
        
        {/* Latest Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-brand-dark text-white p-4 font-bold flex justify-between items-center">
             <span>أحدث المشاريع المضافة</span>
             <Link href="/admin/projects/add" className="bg-brand-secondary text-brand-dark px-3 py-1 rounded text-sm hover:opacity-80 transition">
               + مشروع جديد
             </Link>
          </div>
          <div className="p-0">
             <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 text-gray-600">
                   <tr>
                      <th className="p-4 border-b">الاسم</th>
                      <th className="p-4 border-b">النوع</th>
                      <th className="p-4 border-b">الحالة</th>
                      <th className="p-4 border-b text-center">إجراءات</th>
                   </tr>
                </thead>
                <tbody>
                   {(latestProjects || []).map((proj) => (
                     <tr key={proj.id} className="hover:bg-brand-light/40 transition">
                        <td className="p-4 border-b font-semibold text-brand-primary">{proj.title}</td>
                        <td className="p-4 border-b text-gray-500">{proj.category}</td>
                        <td className="p-4 border-b">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${proj.status === 'مكتمل' ? 'bg-green-100 text-green-700' : proj.status === 'تحت الإنشاء' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                            {proj.status}
                          </span>
                        </td>
                        <td className="p-4 border-b flex justify-center gap-2">
                          <Link href={`/admin/projects/edit/${proj.id}`} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded">
                            تعديل
                          </Link>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
             <div className="p-4 text-center">
               <Link href="/admin/projects" className="text-brand-primary text-sm font-semibold hover:underline">
                 عرض جميع المشاريع لإدارتها ({projectsCount || 0})
               </Link>
             </div>
          </div>
        </div>

        {/* Latest News */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-brand-primary text-white p-4 font-bold flex justify-between items-center">
             <span>آخر الأخبار</span>
             <Link href="/admin/news/add" className="bg-brand-secondary text-brand-dark px-3 py-1 rounded text-sm hover:opacity-80 transition">
               + خبر جديد
             </Link>
          </div>
          <div className="p-0">
             <table className="w-full text-right text-sm">
                <thead className="bg-gray-50 text-gray-600">
                   <tr>
                      <th className="p-4 border-b">العنوان</th>
                      <th className="p-4 border-b">التاريخ</th>
                      <th className="p-4 border-b text-center">إجراءات</th>
                   </tr>
                </thead>
                <tbody>
                   {(latestNews || []).map((news) => (
                     <tr key={news.id} className="hover:bg-brand-light/40 transition">
                        <td className="p-4 border-b font-semibold text-brand-primary">{news.title}</td>
                        <td className="p-4 border-b text-gray-500">{news.date}</td>
                        <td className="p-4 border-b flex justify-center gap-2">
                          <Link href={`/admin/news/edit/${news.id}`} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded">
                            تعديل
                          </Link>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
             <div className="p-4 text-center">
               <Link href="/admin/news" className="text-brand-primary text-sm font-semibold hover:underline">
                 عرض جميع الأخبار لإدارتها ({newsCount || 0})
               </Link>
             </div>
          </div>
        </div>

      </div>

    </div>
  );
}
