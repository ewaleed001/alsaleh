'use client';

import React, { useState, useEffect } from 'react';
import { updateSiteSettings, getSiteSettings } from './actions';
import ImageUploader from '@/components/ImageUploader';

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({
    phone: '',
    email: '',
    address_ar: '',
    address_en: '',
    hours_ar: '',
    hours_en: '',
    whatsapp: '',
    ceo_name_ar: '',
    ceo_name_en: '',
    ceo_role_ar: '',
    ceo_role_en: '',
    ceo_bio_ar: '',
    ceo_bio_en: '',
    ceo_experience: '',
    ceo_image: '',
    ceo_badge_ar: '',
    ceo_badge_en: '',
    ceo_section_title_ar: '',
    ceo_section_title_en: '',
    ceo_stat_label_ar: '',
    ceo_stat_label_en: '',
    ceo_projects_val: '',
    ceo_projects_label_ar: '',
    ceo_projects_label_en: '',
    hero_title_ar: '',
    hero_title_en: '',
    hero_subtitle_ar: '',
    hero_subtitle_en: '',
    hero_bg_url: '',
    projects_header_bg_url: '',
    news_bg_url: '',
    stat_experience: '',
    stat_projects: '',
    stat_clients: '',
    stat_cities: '',
  });

  useEffect(() => {
    async function load() {
      const res = await getSiteSettings();
      if (res.data) {
        setSettings(prev => ({ ...prev, ...res.data }));
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await updateSiteSettings(settings);
    if (res.success) {
      setMessage({ type: 'success', text: 'تم حفظ الإعدادات بنجاح!' });
    } else {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء الحفظ: ' + res.error });
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-brand-dark">إعدادات الموقع وبيانات التواصل</h1>
        <p className="text-gray-500 mt-1">تحكم في أرقام الهواتف، العناوين، والبريد الإلكتروني الظاهر في الموقع.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className={`p-4 rounded-lg text-sm font-medium border ${
            message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
            🏠 العبارة الرئيسية (Hero Section)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">العنوان الرئيسي (عربي)</label>
              <textarea 
                name="hero_title_ar" value={settings.hero_title_ar} onChange={handleChange} rows={2}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Hero Title (English)</label>
              <textarea 
                name="hero_title_en" value={settings.hero_title_en} onChange={handleChange} rows={2}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left" 
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">العنوان الفرعي (عربي)</label>
              <input 
                type="text" name="hero_subtitle_ar" value={settings.hero_subtitle_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Hero Subtitle (English)</label>
              <input 
                type="text" name="hero_subtitle_en" value={settings.hero_subtitle_en} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left" 
                dir="ltr"
              />
            </div>
            <div className="md:col-span-2 space-y-2 pt-4 border-t border-gray-100">
              <label className="block text-sm font-bold text-gray-700">صورة الخلفية (Home Hero Background)</label>
              <ImageUploader 
                bucket="media"
                currentUrl={settings.hero_bg_url}
                onUpload={(url) => setSettings(prev => ({ ...prev, hero_bg_url: url }))}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
            🖼️ صور خلفيات الصفحات (Page Backgrounds)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">خلفية هيدر صفحة "المشاريع"</label>
              <ImageUploader 
                bucket="media"
                currentUrl={settings.projects_header_bg_url}
                onUpload={(url) => setSettings(prev => ({ ...prev, projects_header_bg_url: url }))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">خلفية قسم "أخبار الشركة" (الصفحة الرئيسية)</label>
              <ImageUploader 
                bucket="media"
                currentUrl={settings.news_bg_url}
                onUpload={(url) => setSettings(prev => ({ ...prev, news_bg_url: url }))}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
            📊 أرقام وإحصائيات الشركة (Live Stats)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">سنوات الخبرة</label>
              <input 
                type="text" name="stat_experience" value={settings.stat_experience} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">عدد المشاريع</label>
              <input 
                type="text" name="stat_projects" value={settings.stat_projects} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">عدد العملاء</label>
              <input 
                type="text" name="stat_clients" value={settings.stat_clients} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">عدد المدن</label>
              <input 
                type="text" name="stat_cities" value={settings.stat_cities} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">رقم الهاتف</label>
              <input 
                type="text" name="phone" value={settings.phone} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">البريد الإلكتروني</label>
              <input 
                type="email" name="email" value={settings.email} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">رقم الواتساب (للتواصل المباشر)</label>
              <input 
                type="text" name="whatsapp" value={settings.whatsapp} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none"
                placeholder="مثال: 966500000000"
                dir="ltr"
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4">
            <h3 className="font-bold text-brand-primary">العنوان (Address)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">العنوان بالعربية</label>
                <textarea 
                  name="address_ar" value={settings.address_ar} onChange={handleChange} rows={2}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Address in English</label>
                <textarea 
                  name="address_en" value={settings.address_en} onChange={handleChange} rows={2}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none resize-none text-left"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4">
            <h3 className="font-bold text-brand-primary">ساعات العمل (Working Hours)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">ساعات العمل بالعربية</label>
                <input 
                  type="text" name="hours_ar" value={settings.hours_ar} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Working Hours in English</label>
                <input 
                  type="text" name="hours_en" value={settings.hours_en} onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-brand-dark flex items-center gap-2">
            👨‍💼 الإدارة التنفيذية
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">اسم المدير التنفيذي (عربي)</label>
              <input 
                type="text" name="ceo_name_ar" value={settings.ceo_name_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">CEO Name (English)</label>
              <input 
                type="text" name="ceo_name_en" value={settings.ceo_name_en} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left" 
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">المنصب (عربي)</label>
              <input 
                type="text" name="ceo_role_ar" value={settings.ceo_role_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Role (English)</label>
              <input 
                type="text" name="ceo_role_en" value={settings.ceo_role_en} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left" 
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">سنوات الخبرة (رقم فقط)</label>
              <input 
                type="text" name="ceo_experience" value={settings.ceo_experience} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
                placeholder="مثال: 15"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-gray-700">صورة المدير التنفيذي</label>
              <ImageUploader 
                bucket="team"
                currentUrl={settings.ceo_image}
                onUpload={(url) => setSettings(prev => ({ ...prev, ceo_image: url }))}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-gray-700">النبذة التعريفية (عربي)</label>
              <textarea 
                name="ceo_bio_ar" value={settings.ceo_bio_ar} onChange={handleChange} rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-gray-700">النبذة التعريفية (English Bio)</label>
              <textarea 
                name="ceo_bio_en" value={settings.ceo_bio_en} onChange={handleChange} rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left"
                dir="ltr"
              />
            </div>

            <hr className="md:col-span-2 border-gray-100 my-4" />
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">شارة القسم (عربي) - "Management Msg"</label>
              <input 
                type="text" name="ceo_badge_ar" value={settings.ceo_badge_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Section Badge (English)</label>
              <input 
                type="text" name="ceo_badge_en" value={settings.ceo_badge_en} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left" dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">عنوان القسم (عربي)</label>
              <input 
                type="text" name="ceo_section_title_ar" value={settings.ceo_section_title_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Section Title (English)</label>
              <input 
                type="text" name="ceo_section_title_en" value={settings.ceo_section_title_en} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left" dir="ltr"
              />
            </div>

            <hr className="md:col-span-2 border-gray-100 my-4" />

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">وصف سنوات الخبرة (عربي)</label>
              <input 
                type="text" name="ceo_stat_label_ar" value={settings.ceo_stat_label_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Exp Label (English)</label>
              <input 
                type="text" name="ceo_stat_label_en" value={settings.ceo_stat_label_en} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left" dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">قيمة الإحصائية الثانية (مثال: 50+)</label>
              <input 
                type="text" name="ceo_projects_val" value={settings.ceo_projects_val} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">وصف الإحصائية الثانية (عربي)</label>
              <input 
                type="text" name="ceo_projects_label_ar" value={settings.ceo_projects_label_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Stat 2 Label (English)</label>
              <input 
                type="text" name="ceo_projects_label_en" value={settings.ceo_projects_label_en} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-brand-primary outline-none text-left" dir="ltr"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-primary text-white px-10 py-3 rounded-lg font-bold shadow-lg hover:bg-brand-dark transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> جارٍ الحفظ...</>
            ) : (
              '💾 حفظ جميع الإعدادات'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
