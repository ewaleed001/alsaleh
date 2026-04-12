'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function getTeamMembers() {
  const { data, error } = await supabaseAdmin
    .from('team_members')
    .select('*')
    .order('sort_order', { ascending: true });
    
  if (error) return { error: error.message };
  return { data };
}

export async function saveTeamMember(formData: {
  id?: string;
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  image_url?: string;
  linkedin_url?: string;
  sort_order?: number;
  bio_ar?: string;
  bio_en?: string;
  email?: string;
  phone?: string;
  show_image?: boolean;
}) {
  const { id, ...data } = formData;

  if (id) {
    const { error } = await supabaseAdmin
      .from('team_members')
      .update(data)
      .eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabaseAdmin
      .from('team_members')
      .insert([data]);
    if (error) return { error: error.message };
  }
  
  revalidatePath('/admin/team');
  revalidatePath('/about');
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  const { error } = await supabaseAdmin
    .from('team_members')
    .delete()
    .eq('id', id);
    
  if (error) return { error: error.message };
  
  revalidatePath('/admin/team');
  revalidatePath('/about');
  return { success: true };
}
