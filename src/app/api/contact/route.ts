import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'جميع الحقول المطلوبة يجب ملؤها' }, { status: 400 });
    }

    const { error } = await supabase.from('contact_messages').insert([
      { name, email, phone, subject, message }
    ]);

    if (error) {
      console.error('Error saving contact message:', error);
      return NextResponse.json({ error: 'فشل في حفظ الرسالة' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'خطأ في السيرفر' }, { status: 500 });
  }
}
