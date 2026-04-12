'use client';

import React, { useState, useEffect } from 'react';
import { getStrategicGoals, upsertStrategicGoal, deleteStrategicGoal } from './goal-actions';

interface StrategicGoal {
  id?: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  sort_order: number;
}

export default function StrategicGoalsManager() {
  const [goals, setGoals] = useState<StrategicGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentGoal, setCurrentGoal] = useState<StrategicGoal>({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    sort_order: 0
  });

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals() {
    const { data, error } = await getStrategicGoals();
    if (data) setGoals(data);
    setLoading(false);
  }

  const handleEdit = (goal: StrategicGoal) => {
    setEditingId(goal.id || null);
    setCurrentGoal({ ...goal });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setCurrentGoal({
      title_ar: '',
      title_en: '',
      description_ar: '',
      description_en: '',
      sort_order: goals.length
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentGoal(prev => ({ ...prev, [name]: name === 'sort_order' ? parseInt(value) || 0 : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { success, error } = await upsertStrategicGoal(currentGoal);
    if (success) {
      alert('تم الحفظ بنجاح');
      handleCancel();
      loadGoals();
    } else {
      alert('خطأ: ' + error);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الهدف؟')) return;
    const { success, error } = await deleteStrategicGoal(id);
    if (success) {
      loadGoals();
    } else {
      alert('خطأ: ' + error);
    }
  };

  if (loading) return <div>جارٍ التحميل...</div>;

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-brand-dark mb-6">
          {editingId ? 'تعديل هدف استراتيجي' : 'إضافة هدف استراتيجي جديد'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">العنوان بالشريط (بالعربية)</label>
              <input 
                name="title_ar" 
                value={currentGoal.title_ar} 
                onChange={handleChange} 
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Title (English)</label>
              <input 
                name="title_en" 
                value={currentGoal.title_en} 
                onChange={handleChange} 
                dir="ltr"
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" 
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-gray-700">الوصف (بالعربية)</label>
              <textarea 
                name="description_ar" 
                value={currentGoal.description_ar} 
                onChange={handleChange} 
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" 
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-gray-700">Description (English)</label>
              <textarea 
                name="description_en" 
                value={currentGoal.description_en} 
                onChange={handleChange} 
                dir="ltr"
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" 
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">الترتيب</label>
              <input 
                type="number"
                name="sort_order" 
                value={currentGoal.sort_order} 
                onChange={handleChange} 
                className="w-full border border-gray-300 rounded-lg p-3 focus:border-brand-primary outline-none transition" 
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-primary text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-brand-dark transition-all disabled:opacity-60"
            >
              {saving ? 'جارٍ الحفظ...' : (editingId ? 'تحديث الهدف' : 'إضافة الهدف')}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all"
              >
                إلغاء التعديل
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-brand-dark mb-6">الأهداف الحالية</h3>
        <div className="grid gap-4">
          {goals.map((goal, idx) => (
            <div key={goal.id} className="flex items-center justify-between p-4 bg-brand-light/20 rounded-lg border border-brand-secondary/10 hover:border-brand-secondary transition">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-brand-dark font-bold shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-brand-dark">{goal.title_ar}</h4>
                  <p className="text-sm text-gray-500 line-clamp-2">{goal.description_ar}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(goal)}
                  className="p-2 text-brand-primary hover:bg-brand-primary hover:text-white rounded-lg transition"
                >
                  ✏️
                </button>
                <button 
                  onClick={() => handleDelete(goal.id!)}
                  className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          {goals.length === 0 && (
            <div className="text-center py-8 text-gray-400">لا توجد أهداف حالياً. قم بإضافة أحد الأهداف أعلاه.</div>
          )}
        </div>
      </div>
    </div>
  );
}
