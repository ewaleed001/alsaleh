'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import MultiImageUploader from '@/components/MultiImageUploader';
import { supabase } from '@/lib/supabase';
import { createProject } from '../actions';

export default function AddProjectPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState('');
  const [galleryUrls, setGalleryUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('يرجى رفع صورة رئيسية للمشروع');
      return;
    }
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await createProject({
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as string,
      location: formData.get('location') as string,
      image_url: imageUrl,
    }, galleryUrls);

    if (result.error) {
      setError('خطأ في حفظ البيانات: ' + result.error);
      setLoading(false);
      return;
    }

    router.push('/admin/projects');
    router.refresh();
  };

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">إضافة مشروع جديد</h1>
          <p className="text-gray-500 mt-1">أدخل تفاصيل المشروع وارفع صورته ليتم عرضه في الموقع.</p>
        </div>
        <Link href="/admin/projects" className="text-gray-500 hover:text-brand-primary flex gap-2 items-center font-semibold transition">
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
              <label htmlFor="title" className="block text-sm font-bold text-gray-700">اسم المشروع <span className="text-red-500">*</span></label>
              <input type="text" id="title" name="title" required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                placeholder="مثال: مجمع العليا بلازا" />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-bold text-gray-700">موقع المشروع <span className="text-red-500">*</span></label>
              <input type="text" id="location" name="location" required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
                placeholder="مثال: الرياض، حي العليا" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-bold text-gray-700">وصف المشروع / نبذة عنه</label>
              <textarea id="description" name="description" rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition resize-none"
                placeholder="اكتب تفاصيل المشروع هنا..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-bold text-gray-700">التصنيف <span className="text-red-500">*</span></label>
              <select id="category" name="category" required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white">
                <option value="سكني">سكني</option>
                <option value="تجاري">تجاري</option>
                <option value="مكتبي">مكتبي</option>
                <option value="فندقي">فندقي</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-bold text-gray-700">حالة البناء <span className="text-red-500">*</span></label>
              <select id="status" name="status" required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white">
                <option value="مكتمل">مكتمل</option>
                <option value="تحت الإنشاء">تحت الإنشاء</option>
                <option value="مستقبلي">مستقبلي</option>
              </select>
            </div>
          </div>

          {/* Image Uploader */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">الصورة الرئيسية للمشروع <span className="text-red-500">*</span></label>
              <ImageUploader
                bucket="projects"
                onUpload={(url) => setImageUrl(url)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">صور إضافية (معرض الصور)</label>
              <MultiImageUploader
                bucket="projects"
                onUpload={(urls) => setGalleryUrls(urls)}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link href="/admin/projects" className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition">
              إلغاء
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-brand-dark transition disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? (
                <><span className="animate-spin">⏳</span> جارٍ الحفظ...</>
              ) : (
                '💾 حفظ المشروع وإضافته'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
