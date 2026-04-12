'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import MultiImageUploader from '@/components/MultiImageUploader';
import { supabase } from '@/lib/supabase';
import { updateProject } from '../../actions';

interface Project {
  id: string;
  title: string;
  category: string;
  status: string;
  location: string;
  image_url: string;
  description?: string;
}

// Next.js 14 — params is a plain object (not a Promise)
export default function EditProjectPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [project, setProject] = React.useState<Project | null>(null);
  const [imageUrl, setImageUrl] = React.useState('');
  const [galleryUrls, setGalleryUrls] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(true);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    async function loadProjectData() {
      // Fetch Project
      const { data: proj, error: projErr } = await supabase.from('projects').select('*').eq('id', id).single();
      if (proj) {
        setProject(proj);
        setImageUrl(proj.image_url || '');
      }
      if (projErr) setError('تعذّر تحميل بيانات المشروع');

      // Fetch Gallery
      const { data: gallery } = await supabase
        .from('project_images')
        .select('image_url')
        .eq('project_id', id)
        .order('sort_order', { ascending: true });
      
      if (gallery) {
        setGalleryUrls(gallery.map(img => img.image_url));
      }

      setFetching(false);
    }
    loadProjectData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) { setError('يرجى رفع صورة رئيسية للمشروع'); return; }
    setLoading(true); setError('');

    const formData = new FormData(e.currentTarget);
    const result = await updateProject(id, {
      title: formData.get('title') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      image_url: imageUrl,
    }, galleryUrls);

    if (result.error) { setError('خطأ في حفظ التعديلات: ' + result.error); setLoading(false); return; }

    setSuccess(true);
    setTimeout(() => { router.push('/admin/projects'); router.refresh(); }, 1000);
  };

  if (fetching) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-500 font-medium">جارٍ تحميل بيانات المشروع...</p>
      </div>
    </div>
  );

  if (!project) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center space-y-3">
        <p className="text-red-500 font-bold text-xl">⚠️ المشروع غير موجود</p>
        <Link href="/admin/projects" className="text-brand-primary underline">العودة لقائمة المشاريع</Link>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">تعديل المشروع</h1>
          <p className="text-gray-500 mt-1 text-sm">قم بتحديث بيانات المشروع وسيتم تطبيق التغييرات مباشرة على الموقع.</p>
        </div>
        <Link href="/admin/projects" className="text-gray-500 hover:text-brand-primary flex gap-2 items-center font-semibold transition text-sm">
          عودة ←
        </Link>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm font-medium">⚠️ {error}</div>}
          {success && <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm font-medium">✅ تم حفظ التعديلات بنجاح! جارٍ التحويل...</div>}

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-bold text-gray-700">اسم المشروع <span className="text-red-500">*</span></label>
              <input type="text" id="title" name="title" required defaultValue={project.title}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition" />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-bold text-gray-700">موقع المشروع <span className="text-red-500">*</span></label>
              <input type="text" id="location" name="location" required defaultValue={project.location}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-bold text-gray-700">وصف المشروع / نبذة عنه</label>
              <textarea id="description" name="description" rows={4} defaultValue={project.description}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition resize-none"
                placeholder="اكتب تفاصيل المشروع هنا..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-bold text-gray-700">التصنيف <span className="text-red-500">*</span></label>
              <select id="category" name="category" required defaultValue={project.category}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition bg-white">
                <option value="سكني">سكني</option>
                <option value="تجاري">تجاري</option>
                <option value="مكتبي">مكتبي</option>
                <option value="فندقي">فندقي</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-bold text-gray-700">حالة البناء <span className="text-red-500">*</span></label>
              <select id="status" name="status" required defaultValue={project.status}
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
                currentUrl={project.image_url}
                onUpload={(url) => setImageUrl(url)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">صور إضافية (معرض الصور)</label>
              <MultiImageUploader
                bucket="projects"
                currentUrls={galleryUrls}
                onUpload={(urls) => setGalleryUrls(urls)}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link href="/admin/projects" className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition">
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
