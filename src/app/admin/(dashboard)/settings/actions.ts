'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function updateSiteSettings(settings: Record<string, string>) {
  try {
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
      updated_at: new Date().toISOString()
    }));

    console.log('[Settings Action] Updating keys:', Object.keys(settings));

    const { error } = await supabaseAdmin
      .from('site_settings')
      .upsert(updates, { onConflict: 'key' });

    if (error) {
      console.error('[Settings Action] Supabase Error:', error);
      return { error: error.message };
    }

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (err: any) {
    console.error('[Settings Action] Fatal Error:', err);
    return { error: err.message || 'Error occurred' };
  }
}

export async function getSiteSettings() {
  const { data, error } = await supabaseAdmin
    .from('site_settings')
    .select('*');

  if (error) {
    console.error('Error fetching site settings:', error);
    return { error: error.message };
  }

  const settings: Record<string, string> = {};
  data.forEach((item: any) => {
    settings[item.key] = item.value;
  });

  return { data: settings };
}
