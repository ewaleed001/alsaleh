'use client';

import React, { useState, useEffect } from 'react';
import ImageUploader from '@/components/ImageUploader';
import { getPartners, savePartner, deletePartner } from './actions';

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ id: '', name: '', logo_url: '', sort_order: 0 });
  const [message, setMessage] = useState({ type: '', text: '' });

  async function loadData() {
    setLoading(true);
    const result = await getPartners();
    if (result.data) setPartners(result.data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.logo_url) return;
    
    setSaving(true);
    const result = await savePartner({
      id: form.id || undefined,
      name: form.name,
      logo_url: form.logo_url,
      sort_order: Number(form.sort_order)
    });

    if (result.success) {
      setMessage({ type: 'success', text: 'تم الحفظ بنجاح!' });
      setForm({ id: '', name: '', logo_url: '', sort_order: 0 });
      loadData();
    } else {
      setMessage({ type: 'error', text: 'خطأ: ' + result.error });
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من الحذف؟')) return;
    const result = await deletePartner(id);
    if (result.success) loadData();
  };

  if (loading) return <div className="p-8 text-center text-brand-primary">جارٍ التحميل...</div>;

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">إدارة شركاء النجاح</h1>
          <p className="text-gray-500 mt-1">أضف شعارات الشركات الشريكة التي تظهر في الصفحة الرئيسية.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-brand-primary/10 space-y-4">
            <h2 className="font-bold text-brand-primary border-b pb-3 mb-4">
              {form.id ? '🛠️ تعديل شريك' : '➕ إضافة شريك جديد'}
            </h2>
            
            {message.text && (
              <div className={`p-3 rounded text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 text-right">اسم الشركة</label>
              <input 
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded outline-none focus:border-brand-primary" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 text-right">ترتيب العرض</label>
              <input 
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) })}
                className="w-full border p-2 rounded outline-none" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700 text-right">شعار الشركة</label>
              <ImageUploader 
                bucket="partners"
                currentUrl={form.logo_url}
                onUpload={(url) => setForm({ ...form, logo_url: url })}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button 
                type="submit" 
                disabled={saving}
                className="flex-1 bg-brand-primary text-white py-2 rounded font-bold hover:bg-brand-dark transition disabled:opacity-50"
              >
                {saving ? 'جارٍ الحفظ...' : 'حفــظ'}
              </button>
              {form.id && (
                <button 
                  type="button" 
                  onClick={() => setForm({ id: '', name: '', logo_url: '', sort_order: 0 })}
                  className="px-4 bg-gray-100 text-gray-600 py-2 rounded font-bold"
                >
                  إلغاء
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 group relative">
                <div className="aspect-square flex items-center justify-center p-4">
                  <img src={partner.logo_url} alt={partner.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="text-center font-bold text-sm text-gray-700 mt-2 truncate">{partner.name}</div>
                
                {/* Overlay actions */}
                <div className="absolute inset-0 bg-brand-dark/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition rounded-xl">
                  <button 
                     onClick={() => setForm({ ...partner })}
                     className="bg-white text-brand-dark p-2 rounded-full hover:bg-brand-secondary transition"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(partner.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
          {partners.length === 0 && <div className="text-center py-20 text-gray-400 bg-white rounded-xl border-2 border-dashed">لا يوجد شركاء مضافين حالياً.</div>}
        </div>
      </div>
    </div>
  );
}
