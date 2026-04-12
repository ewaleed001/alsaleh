'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function getPartners() {
  const { data, error } = await supabaseAdmin
    .from('partners')
    .select('*')
    .order('sort_order', { ascending: true });
    
  if (error) return { error: error.message };
  return { data };
}

export async function savePartner(formData: {
  id?: string;
  name: string;
  logo_url: string;
  website_url?: string;
  sort_order?: number;
}) {
  const { id, ...data } = formData;

  if (id) {
    const { error } = await supabaseAdmin
      .from('partners')
      .update(data)
      .eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await supabaseAdmin
      .from('partners')
      .insert([data]);
    if (error) return { error: error.message };
  }
  
  revalidatePath('/admin/partners');
  revalidatePath('/');
  return { success: true };
}

export async function deletePartner(id: string) {
  const { error } = await supabaseAdmin
    .from('partners')
    .delete()
    .eq('id', id);
    
  if (error) return { error: error.message };
  
  revalidatePath('/admin/partners');
  revalidatePath('/');
  return { success: true };
}
