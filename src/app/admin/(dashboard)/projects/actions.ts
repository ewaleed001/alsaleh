'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function createProject(formData: {
  title: string;
  description: string;
  category: string;
  status: string;
  location: string;
  image_url: string;
  sort_order?: number;
}, galleryUrls?: string[]) {
  const finalFormData = { ...formData, sort_order: formData.sort_order ?? 999 };
  const { data: project, error } = await supabaseAdmin
    .from('projects')
    .insert([finalFormData])
    .select()
    .single();

  if (error) {
    console.error('Error creating project:', error);
    return { error: error.message };
  }

  // Save gallery images if provided
  if (galleryUrls && galleryUrls.length > 0) {
    const galleryData = galleryUrls.map((url, index) => ({
      project_id: project.id,
      image_url: url,
      sort_order: index
    }));
    const { error: galleryError } = await supabaseAdmin
      .from('project_images')
      .insert(galleryData);
    
    if (galleryError) {
      console.error('Error saving gallery images:', galleryError);
    }
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  return { success: true, data: project };
}

export async function updateProject(id: string, formData: {
  title: string;
  description: string;
  category: string;
  status: string;
  location: string;
  image_url: string;
  sort_order?: number;
}, galleryUrls?: string[]) {
  const { data: project, error } = await supabaseAdmin
    .from('projects')
    .update(formData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    return { error: error.message };
  }

  // Handle gallery updates: simple approach is delete and re-insert
  if (galleryUrls) {
    await supabaseAdmin
      .from('project_images')
      .delete()
      .eq('project_id', id);

    if (galleryUrls.length > 0) {
      const galleryData = galleryUrls.map((url, index) => ({
        project_id: id,
        image_url: url,
        sort_order: index
      }));
      await supabaseAdmin
        .from('project_images')
        .insert(galleryData);
    }
  }

  revalidatePath('/admin/projects');
  revalidatePath(`/projects/${id}`);
  revalidatePath('/projects');
  return { success: true, data: project };
}

