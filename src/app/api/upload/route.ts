import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bucket = formData.get('bucket') as string;

    if (!file || !bucket) {
      return NextResponse.json({ error: 'بيانات الملف مفقودة' }, { status: 400 });
    }

    // التحقق من البيئة في السجل
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    console.log(`[Upload API] Bucket: ${bucket}, File: ${file.name}`);
    console.log(`[Upload API] Key valid: ${serviceKey.length > 50}, Ends with: ${serviceKey.slice(-4)}`);

    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;

    // تحويل الملف إلى Blob ثم إلى Buffer لضمان التوافق التام
    const arrayBuffer = await file.arrayBuffer();
    
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(fileName, arrayBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('[Upload API] Supabase Error:', uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return NextResponse.json({ url: urlData.publicUrl });

  } catch (err: any) {
    console.error('[Upload API] Fatal Error:', err);
    return NextResponse.json({ error: err.message || 'Error processing upload' }, { status: 500 });
  }
}
