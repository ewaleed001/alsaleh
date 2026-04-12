'use client';

import React, { useState, useRef } from 'react';

interface ImageUploaderProps {
  bucket: string;          // e.g. 'projects', 'news', 'media'
  currentUrl?: string;     // existing image URL (for edit mode)
  onUpload: (url: string) => void;  // callback with final public URL
  accept?: string;
}

export default function ImageUploader({
  bucket,
  currentUrl,
  onUpload,
  accept = 'image/*',
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(currentUrl || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(currentUrl && !currentUrl.includes('supabase') ? currentUrl : '');
  const fileRef = useRef<HTMLInputElement>(null);

  // Sync preview if currentUrl changes from parent
  React.useEffect(() => {
    if (currentUrl) {
      setPreview(currentUrl);
      if (!currentUrl.includes('supabase')) {
        setUrlInput(currentUrl);
      }
    }
  }, [currentUrl]);

  // ─── Upload file via server API (bypasses RLS) ─────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('حجم الملف كبير. الحد الأقصى 5MB.');
      return;
    }

    setError('');
    setUploading(true);
    setProgress(30);

    // Send to server API route (uses SERVICE_ROLE_KEY, bypasses RLS)
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', bucket);

    setProgress(60);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    setProgress(90);

    const result = await res.json();

    if (!res.ok || result.error) {
      setError(`خطأ في الرفع: ${result.error || 'حاول مجدداً'}`);
      setUploading(false);
      setProgress(0);
      return;
    }

    setProgress(100);
    setPreview(result.url);
    onUpload(result.url);

    setTimeout(() => {
      setUploading(false);
      setProgress(0);
    }, 600);
  };

  // ─── Use external URL directly ──────────────────────────────────────────────
  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    setPreview(urlInput.trim());
    onUpload(urlInput.trim());
    setError('');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && fileRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileRef.current.files = dt.files;
      fileRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex rounded-lg overflow-hidden border border-gray-200 w-fit">
        <button
          type="button"
          onClick={() => setTab('upload')}
          className={`px-5 py-2 text-sm font-bold transition ${tab === 'upload' ? 'bg-brand-primary text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          📁 رفع من الجهاز
        </button>
        <button
          type="button"
          onClick={() => setTab('url')}
          className={`px-5 py-2 text-sm font-bold transition ${tab === 'url' ? 'bg-brand-primary text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
        >
          🔗 رابط URL
        </button>
      </div>

      {/* Upload Tab */}
      {tab === 'upload' && (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-brand-primary/30 rounded-xl p-8 text-center cursor-pointer hover:border-brand-primary hover:bg-brand-light/30 transition-all duration-200 group"
        >
          <input
            ref={fileRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          {uploading ? (
            <div className="space-y-3">
              <div className="text-brand-primary text-4xl animate-bounce">⬆️</div>
              <p className="font-bold text-brand-primary">جارٍ الرفع...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">{progress}%</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-4xl group-hover:scale-110 transition-transform duration-200">🖼️</div>
              <p className="font-bold text-brand-dark">اسحب الصورة هنا أو اضغط للاختيار</p>
              <p className="text-xs text-gray-400">PNG, JPG, WEBP — الحد الأقصى 5MB</p>
            </div>
          )}
        </div>
      )}

      {/* URL Tab */}
      {tab === 'url' && (
        <div className="flex gap-3">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
            dir="ltr"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-5 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition text-sm"
          >
            معاينة
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg border border-red-200">
          ⚠️ {error}
        </p>
      )}

      {/* Preview */}
      {preview && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">معاينة الصورة</p>
          <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setError('تعذّر تحميل الصورة. تأكد من صحة الرابط.')}
            />
            <button
              type="button"
              onClick={() => { setPreview(''); setUrlInput(''); onUpload(''); }}
              className="absolute top-2 left-2 w-7 h-7 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
