'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function createNews(formData: {
  title: string;
  summary: string;
  date: string;
  image_url: string;
}) {
  const { data, error } = await supabaseAdmin
    .from('news')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error creating news:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/news');
  revalidatePath('/news');
  return { success: true, data };
}

export async function updateNews(id: string, formData: {
  title: string;
  summary: string;
  date: string;
  image_url: string;
}) {
  const { data, error } = await supabaseAdmin
    .from('news')
    .update(formData)
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error updating news:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/news');
  revalidatePath(`/news/${id}`);
  revalidatePath('/news');
  return { success: true, data };
}
