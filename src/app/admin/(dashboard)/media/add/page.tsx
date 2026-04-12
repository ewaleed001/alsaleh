'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import { supabase } from '@/lib/supabase';
import { createMedia } from '../actions';

export default function AddMediaPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('يرجى رفع صورة أو إدخال رابط');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await createMedia({
      url: imageUrl,
      alt_text: formData.get('alt_text') as string,
      type: formData.get('type') as string,
    });

    if (result.error) {
      setError('خطأ في حفظ البيانات: ' + result.error);
      setLoading(false);
      return;
    }

    router.push('/admin/media');
    router.refresh();
  };

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">إضافة وسائط جديدة</h1>
          <p className="text-gray-500 mt-1">ارفع صورة أو فيديو إلى مكتبة وسائط الموقع.</p>
        </div>
        <Link href="/admin/media" className="text-gray-500 hover:text-brand-primary flex gap-2 items-center font-semibold transition">
          عودة ←
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="alt_text" className="block text-sm font-bold text-gray-700">وصف الصورة <span className="text-red-500">*</span></label>
              <input type="text" id="alt_text" name="alt_text" required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                placeholder="مثال: مشروع مجمع الرياض بلازا" />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-bold text-gray-700">نوع الوسائط <span className="text-red-500">*</span></label>
              <select id="type" name="type" required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white">
                <option value="image">📷 صورة</option>
                <option value="video">🎬 فيديو</option>
              </select>
            </div>
          </div>

          {/* Image Uploader */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">الملف <span className="text-red-500">*</span></label>
            <ImageUploader
              bucket="media"
              accept="image/*,video/*"
              onUpload={(url) => setImageUrl(url)}
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link href="/admin/media" className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition">
              إلغاء
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-brand-dark transition disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? <><span className="animate-spin">⏳</span> جارٍ الحفظ...</> : '💾 إضافة للمكتبة'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
