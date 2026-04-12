import React from 'react';
import { supabase } from '@/lib/supabase';
import HomeClient from '@/components/HomeClient';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: projects } = await supabase.from('projects').select('*').limit(3).order('sort_order', { ascending: true }).order('created_at', { ascending: false });
  const { data: newsItems } = await supabase.from('news').select('*').limit(2).order('created_at', { ascending: false });
  const { data: mediaItems } = await supabase.from('media').select('*').limit(5).order('created_at', { ascending: false });
  const { data: partners } = await supabase.from('partners').select('*').order('sort_order', { ascending: true });
  const { data: settingsData } = await supabase.from('site_settings').select('*');

  const settings: Record<string, string> = {};
  settingsData?.forEach((item: any) => {
    settings[item.key] = item.value;
  });

  return (
    <HomeClient
      projects={projects || []}
      news={newsItems || []}
      media={mediaItems || []}
      partners={partners || []}
      settings={settings}
    />
  );
}
