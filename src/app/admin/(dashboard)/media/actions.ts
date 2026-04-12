'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function createMedia(formData: {
  url: string;
  alt_text: string;
  type: string;
}) {
  const { data, error } = await supabaseAdmin
    .from('media')
    .insert([formData])
    .select();

  if (error) {
    console.error('Error creating media:', error);
    return { error: error.message };
  }

  revalidatePath('/admin/media');
  revalidatePath('/media');
  return { success: true, data };
}
