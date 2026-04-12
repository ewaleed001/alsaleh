/**
 * Script to execute SQL on Supabase project
 * Usage: node scripts/fix_db.js
 * (You will need your Database Password)
 */

const { Client } = require('pg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const projectRef = 'cxdnzvvqqgcvdloiapuf';
const connectionUrlBase = `postgres://postgres:[PASSWORD]@db.${projectRef}.supabase.co:5432/postgres`;

async function runSQL() {
  console.log('\n🚀 بدء عملية تحديث قاعدة البيانات...');
  console.log('يرجى العلم أنك ستحتاج إلى "Database Password" الخاصة بالمشروع على Supabase.\n');

  rl.question('أدخل كلمة مرور قاعدة البيانات: ', async (password) => {
    if (!password) {
      console.error('❌ يجب إدخال كلمة المرور.');
      rl.close();
      return;
    }

    const connectionString = connectionUrlBase.replace('[PASSWORD]', password);
    const client = new Client({ connectionString });

    try {
      console.log('⏳ جاري الاتصال بقاعدة البيانات...');
      await client.connect();
      console.log('✅ تم الاتصال بنجاح.');

      console.log('⏳ جاري تنفيذ أمر إضافة العمود (show_image)...');
      await client.query(`
        ALTER TABLE public.team_members 
        ADD COLUMN IF NOT EXISTS show_image boolean DEFAULT true;
      `);
      console.log('✨ تم إضافة العمود بنجاح!');

      console.log('⏳ جاري إضافة نصوص الـ Hero الافتراضية...');
      await client.query(`
        INSERT INTO public.site_settings (key, value)
        VALUES 
        ('hero_title_ar', 'نحن هنا لنقدم لكم تجربة فريدة، تجمع بين سهولة التصفح وتنوع الخيارات العقارية.'),
        ('hero_title_en', 'We are here to provide you a unique experience, combining easy browsing with diverse real estate options.'),
        ('hero_subtitle_ar', '50 عاماً من الثقة في السوق العقاري السعودي'),
        ('hero_subtitle_en', '50 years of trust in the Saudi real estate market')
        ON CONFLICT (key) DO NOTHING;
      `);
      console.log('✨ تم إضافة إعدادات الـ Hero بنجاح!');

      console.log('\n🎉 اكتمل التحديث بنجاح! يمكنك الآن تجربة الموقع.');
    } catch (err) {
      console.error('\n❌ حدث خطأ أثناء التنفيذ:');
      if (err.message.includes('password authentication failed')) {
        console.error('تنبيه: كلمة المرور المدخلة غير صحيحة. يرجى التأكد منها من لوحة تحكم Supabase.');
      } else {
        console.error(err.message);
      }
    } finally {
      await client.end();
      rl.close();
    }
  });
}

runSQL();
