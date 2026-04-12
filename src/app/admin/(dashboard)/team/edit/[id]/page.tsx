import React, { use } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import TeamMemberForm from '../../TeamMemberForm';
import { notFound } from 'next/navigation';

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const { data: member, error } = await supabase
    .from('team_members')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !member) {
    notFound();
  }

  return (
    <div className="space-y-6 animate-fade-in-up max-w-4xl">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">تعديل بيانات الموظف</h1>
          <p className="text-gray-500 mt-1">تعديل الاسم أو المنصب أو الصورة لعضو فريق العمل.</p>
        </div>
        <Link href="/admin/team" className="text-gray-500 hover:text-brand-primary flex gap-2 items-center font-semibold transition">
          عودة ←
        </Link>
      </div>

      <TeamMemberForm member={member} />
    </div>
  );
}
