const { createClient } = require('@supabase/supabase-js');

// استخراج البيانات من ملف .env.local يدوياً للسهولة
const supabaseUrl = 'https://cxdnzvvqqgcvdloiapuf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4ZG56dnZxcWdjdmRsb2lhcHVmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM4NDI4MiwiZXhwIjoyMDg4OTYwMjgyfQ.YKL9G5IuSiOGksncbTPfEhEKzPHHdCCA_bLOeAI2eM8';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function initStorage() {
  const buckets = ['projects', 'news', 'team', 'media'];

  console.log('🚀 لبدء إنشاء الـ Buckets في Supabase Storage...');

  for (const bucketName of buckets) {
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`✅ المجلد "${bucketName}" موجود مسبقاً.`);
      } else {
        console.error(`❌ خطأ في إنشاء "${bucketName}":`, error.message);
      }
    } else {
      console.log(`✨ تم إنشاء المجلد "${bucketName}" بنجاح!`);
    }
  }

  console.log('\n✅ انتهت العملية. يرجى التأكد من إضافة RLS Policies في لوحة تحكم Supabase كما هو موضح في الدليل.');
}

initStorage();
