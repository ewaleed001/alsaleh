import React from 'react';
import Link from 'next/link';
import TeamMemberForm from '../TeamMemberForm';

export default function AddTeamMemberPage() {
  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">إضافة موظف جديد</h1>
          <p className="text-gray-500 mt-1">أدخل بيانات الموظف والمنصب ليتم عرضه في الموقع.</p>
        </div>
        <Link href="/admin/team" className="text-gray-500 hover:text-brand-primary flex gap-2 items-center font-semibold transition">
          عودة ←
        </Link>
      </div>

      <TeamMemberForm />
    </div>
  );
}
