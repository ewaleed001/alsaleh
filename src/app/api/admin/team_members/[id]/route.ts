import { supabaseAdmin } from '@/lib/supabase-admin';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete team member error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/admin/team');
  revalidatePath('/about');

  return NextResponse.json({ success: true });
}
