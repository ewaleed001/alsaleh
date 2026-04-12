'use server';

import { supabaseAdmin } from '@/lib/supabase-admin';
import { revalidatePath } from 'next/cache';

export async function getStrategicGoals() {
  const { data, error } = await supabaseAdmin
    .from('strategic_goals')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching strategic goals:', error);
    return { error: error.message };
  }

  return { data };
}

export async function upsertStrategicGoal(goal: any) {
  const { data, error } = await supabaseAdmin
    .from('strategic_goals')
    .upsert(goal)
    .select()
    .single();

  if (error) {
    console.error('Error upserting strategic goal:', error);
    return { error: error.message };
  }

  revalidatePath('/about');
  return { data, success: true };
}

export async function deleteStrategicGoal(id: string) {
  const { error } = await supabaseAdmin
    .from('strategic_goals')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting strategic goal:', error);
    return { error: error.message };
  }

  revalidatePath('/about');
  return { success: true };
}
