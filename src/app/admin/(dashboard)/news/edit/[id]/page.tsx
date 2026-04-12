'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import { supabase } from '@/lib/supabase';
import { updateNews } from '../../actions';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  image_url: string;
}

// Next.js 14 — params is a plain object (not a Promise)
export default function EditNewsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [newsItem, setNewsItem] = React.useState<NewsItem | null>(null);
  const [imageUrl, setImageUrl] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(true);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    supabase.from('news').select('*').eq('id', id).single().then(({ data, error }) => {
      if (data) {
        setNewsItem(data);
        setImageUrl(data.image_url || '');
      }
      if (error) setError('تعذّر تحميل بيانات الخبر');
      setFetching(false);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) { setError('يرجى رفع صورة أو إدخال رابط الصورة'); return; }
    setLoading(true); setError('');

    const formData = new FormData(e.currentTarget);
    const result = await updateNews(id, {
      title: formData.get('title') as string,
      summary: formData.get('summary') as string,
      date: formData.get('date') as string,
      image_url: imageUrl,
    });

    if (result.error) { setError('خطأ في حفظ التعديلات: ' + result.error); setLoading(false); return; }

    setSuccess(true);
    setTimeout(() => { router.push('/admin/news'); router.refresh(); }, 1000);
  };

  if (fetching) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-500 font-medium">جارٍ تحميل بيانات الخبر...</p>
      </div>
    </div>
  );

  if (!newsItem) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-3">
        <p className="text-red-500 font-bold text-xl">⚠️ الخبر غير موجود</p>
        <Link href="/admin/news" className="text-brand-primary underline">العودة لقائمة الأخبار</Link>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">تعديل الخبر</h1>
          <p className="text-gray-500 mt-1 text-sm">قم بتحديث بيانات الخبر وسيتم تطبيق التغييرات مباشرة على الموقع.</p>
        </div>
        <Link href="/admin/news" className="text-gray-500 hover:text-brand-primary flex gap-2 items-center font-semibold transition text-sm">
          عودة ←
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm font-medium">⚠️ {error}</div>}
          {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm font-medium">✅ تم حفظ التعديلات بنجاح! جارٍ التحويل...</div>}

          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-bold text-gray-700">عنوان الخبر <span className="text-red-500">*</span></label>
            <input type="text" id="title" name="title" required defaultValue={newsItem.title}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition" />
          </div>

          <div className="space-y-2">
            <label htmlFor="summary" className="block text-sm font-bold text-gray-700">ملخص الخبر <span className="text-red-500">*</span></label>
            <textarea id="summary" name="summary" required rows={4} defaultValue={newsItem.summary}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition resize-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-bold text-gray-700">تاريخ النشر <span className="text-red-500">*</span></label>
            <input type="date" id="date" name="date" required defaultValue={newsItem.date}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">صورة الخبر <span className="text-red-500">*</span></label>
            <ImageUploader
              bucket="news"
              currentUrl={newsItem.image_url}
              onUpload={(url) => setImageUrl(url)}
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link href="/admin/news" className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition">
              إلغاء
            </Link>
            <button type="submit" disabled={loading || success}
              className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-brand-dark transition disabled:opacity-60 flex items-center gap-2">
              {loading ? <><span className="animate-spin">⏳</span> جارٍ الحفظ...</> : '💾 حفظ التعديلات'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
