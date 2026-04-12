'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/ImageUploader';
import { saveTeamMember } from './actions';

interface TeamMemberFormProps {
  member?: any;
}

export default function TeamMemberForm({ member }: TeamMemberFormProps) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(member?.image_url || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const result = await saveTeamMember({
      id: member?.id,
      name_ar: formData.get('name_ar') as string,
      name_en: formData.get('name_en') as string,
      role_ar: formData.get('role_ar') as string,
      role_en: formData.get('role_en') as string,
      image_url: imageUrl,
      linkedin_url: formData.get('linkedin_url') as string,
      sort_order: parseInt(formData.get('sort_order') as string) || 0,
      bio_ar: formData.get('bio_ar') as string,
      bio_en: formData.get('bio_en') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      show_image: formData.get('show_image') === 'on'
    });

    if (result.error) {
      setError('خطأ في حفظ البيانات: ' + result.error);
      setLoading(false);
      return;
    }

    router.push('/admin/team');
    router.refresh();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">الاسم (بالعربية) *</label>
            <input name="name_ar" defaultValue={member?.name_ar} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Name (English) *</label>
            <input name="name_en" defaultValue={member?.name_en} required dir="ltr"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition text-left" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">المنصب (بالعربية) *</label>
            <input name="role_ar" defaultValue={member?.role_ar} required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Role (English) *</label>
            <input name="role_en" defaultValue={member?.role_en} required dir="ltr"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition text-left" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">البريد الإلكتروني</label>
            <input name="email" type="email" defaultValue={member?.email} dir="ltr"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition text-left" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">رقم الهاتف</label>
            <input name="phone" defaultValue={member?.phone} dir="ltr"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition text-left" />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">رابط LinkedIn</label>
            <input name="linkedin_url" defaultValue={member?.linkedin_url} dir="ltr"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition text-left" 
              placeholder="https://linkedin.com/in/..." />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">ترتيب العرض</label>
            <input name="sort_order" type="number" defaultValue={member?.sort_order || 0}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-bold text-gray-700">النبذة التعريفية (بالعربية)</label>
            <textarea name="bio_ar" defaultValue={member?.bio_ar} rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition resize-none" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-bold text-gray-700">Biography (English)</label>
            <textarea name="bio_en" defaultValue={member?.bio_en} rows={3} dir="ltr"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition resize-none text-left" />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-brand-light/20 p-4 rounded-lg border border-brand-primary/10">
          <input 
            type="checkbox" 
            name="show_image" 
            id="show_image"
            defaultChecked={member?.show_image !== false} 
            className="w-5 h-5 accent-brand-primary cursor-pointer"
          />
          <label htmlFor="show_image" className="text-sm font-bold text-gray-700 cursor-pointer select-none">
            {member?.show_image === false ? '❌ الصورة مخفية حالياً' : '✅ إظهار الصورة في الموقع'}
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700">صورة الموظف</label>
          <ImageUploader
            bucket="team"
            onUpload={(url) => setImageUrl(url)}
            currentUrl={imageUrl}
          />
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
          <Link href="/admin/team" className="px-6 py-3 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition">
            إلغاء
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:bg-brand-dark transition disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> جارٍ الحفظ...</>
            ) : (
              '💾 حفظ البيانات'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
