import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-lg">
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-brand-primary/5 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl">🏗️</span>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-brand-dark">الصفحة غير موجودة</h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. تفضل بالعودة للصفحة الرئيسية.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="bg-brand-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-dark transition shadow-md">
            العودة للرئيسية
          </Link>
          <Link href="/contact" className="border-2 border-brand-primary text-brand-primary px-8 py-3 rounded-lg font-bold hover:bg-brand-primary hover:text-white transition">
            تواصل معنا
          </Link>
        </div>
      </div>
    </div>
  );
}
