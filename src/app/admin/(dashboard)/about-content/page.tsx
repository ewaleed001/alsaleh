'use client';

import React, { useState, useEffect } from 'react';
import { getSiteSettings, updateSiteSettings } from '../settings/actions';
import ImageUploader from '@/components/ImageUploader';
import StrategicGoalsManager from './StrategicGoalsManager';

export default function AboutContentPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    about_who_ar: '',
    about_who_en: '',
    about_intro1_ar: '',
    about_intro1_en: '',
    about_intro2_ar: '',
    about_intro2_en: '',
    about_vision_ar: '',
    about_vision_en: '',
    about_mission_ar: '',
    about_mission_en: '',
    about_values_ar: '',
    about_values_en: '',
    about_image_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    async function loadSettings() {
      const result = await getSiteSettings();
      if (result.data) {
        setSettings(prev => ({
          ...prev,
          ...result.data
        }));
      }
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    const result = await updateSiteSettings(settings);

    if (result.success) {
      setMessage({ type: 'success', text: 'تم حفظ محتوى صفحة "عن الشركة" بنجاح!' });
    } else {
      setMessage({ type: 'error', text: 'حدث خطأ أثناء الحفظ: ' + result.error });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up max-w-5xl">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">إدارة محتوى صفحة "عن الشركة"</h1>
          <p className="text-gray-500 mt-1">تعديل النصوص التعريفية، الرؤية، المهمة والقيم.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {message.text && (
          <div className={`p-4 rounded-lg font-bold text-sm border ${message.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {message.type === 'success' ? '✅' : '⚠️'} {message.text}
          </div>
        )}

        {/* Section: Who We Are */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <span className="text-2xl">📖</span>
            <h2 className="text-lg font-bold text-brand-primary">قسم "من نحن؟"</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">العنوان (بالعربية)</label>
              <input name="about_who_ar" value={settings.about_who_ar} onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Title (English)</label>
              <input name="about_who_en" value={settings.about_who_en} onChange={handleChange} dir="ltr"
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">الفقرة الأولى (بالعربية)</label>
              <textarea name="about_intro1_ar" value={settings.about_intro1_ar} onChange={handleChange} rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition resize-none" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">First Paragraph (English)</label>
              <textarea name="about_intro1_en" value={settings.about_intro1_en} onChange={handleChange} rows={4} dir="ltr"
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition resize-none" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">الفقرة الثانية (بالعربية)</label>
              <textarea name="about_intro2_ar" value={settings.about_intro2_ar} onChange={handleChange} rows={4}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition resize-none" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Second Paragraph (English)</label>
              <textarea name="about_intro2_en" value={settings.about_intro2_en} onChange={handleChange} rows={4} dir="ltr"
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition resize-none" />
            </div>
          </div>
        </div>

        {/* Section: Vision, Mission, Values */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <span className="text-2xl">🎯</span>
            <h2 className="text-lg font-bold text-brand-primary">الرؤية، المهمة والقيم</h2>
          </div>

          <div className="space-y-8">
            {/* Vision */}
            <div className="grid md:grid-cols-2 gap-6 p-4 bg-brand-light/20 rounded-lg">
              <div className="md:col-span-2 font-bold text-brand-dark flex items-center gap-2">
                 <span className="w-2 h-2 bg-brand-secondary rounded-full"></span> الرؤية (Vision)
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500">بالعربية</label>
                <textarea name="about_vision_ar" value={settings.about_vision_ar} onChange={handleChange} rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500">English</label>
                <textarea name="about_vision_en" value={settings.about_vision_en} onChange={handleChange} rows={3} dir="ltr"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" />
              </div>
            </div>

            {/* Mission */}
            <div className="grid md:grid-cols-2 gap-6 p-4 bg-brand-light/20 rounded-lg">
              <div className="md:col-span-2 font-bold text-brand-dark flex items-center gap-2">
                 <span className="w-2 h-2 bg-brand-secondary rounded-full"></span> المهمة (Mission)
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500">بالعربية</label>
                <textarea name="about_mission_ar" value={settings.about_mission_ar} onChange={handleChange} rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500">English</label>
                <textarea name="about_mission_en" value={settings.about_mission_en} onChange={handleChange} rows={3} dir="ltr"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" />
              </div>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-2 gap-6 p-4 bg-brand-light/20 rounded-lg">
              <div className="md:col-span-2 font-bold text-brand-dark flex items-center gap-2">
                 <span className="w-2 h-2 bg-brand-secondary rounded-full"></span> القيم (Values)
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500">بالعربية</label>
                <textarea name="about_values_ar" value={settings.about_values_ar} onChange={handleChange} rows={3}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-500">English</label>
                <textarea name="about_values_en" value={settings.about_values_en} onChange={handleChange} rows={3} dir="ltr"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Image */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <span className="text-2xl">🖼️</span>
            <h2 className="text-lg font-bold text-brand-primary">صورة التعريف (من نحن؟)</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">هذه هي الصورة التي تظهر بجانب قسم التعريف في الصفحة الرئيسية.</p>
            <ImageUploader 
              bucket="about"
              currentUrl={settings.about_image_url}
              onUpload={(url) => setSettings(prev => ({ ...prev, about_image_url: url }))}
            />
          </div>
        </div>

        {/* Section: Strategic Goals */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
            <span className="text-2xl">🚀</span>
            <h2 className="text-lg font-bold text-brand-primary">أهدافنا الاستراتيجية</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">هنا يمكنك التحكم بالأهداف الاستراتيجية التي تظهر في صفحة "عن الشركة".</p>
            <StrategicGoalsManager />
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-primary text-white px-12 py-4 rounded-xl font-bold shadow-lg hover:shadow-brand-primary/20 hover:-translate-y-1 transition-all disabled:opacity-60 flex items-center gap-3 text-lg"
          >
            {saving ? (
              <><div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div> جارٍ الحفظ...</>
            ) : (
              '💾 حفظ جميع التغييرات'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
