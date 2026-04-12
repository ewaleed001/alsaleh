'use client';

import React, { useState, useRef } from 'react';

interface MultiImageUploaderProps {
  bucket: string;
  currentUrls?: string[];
  onUpload: (urls: string[]) => void;
}

export default function MultiImageUploader({
  bucket,
  currentUrls = [],
  onUpload,
}: MultiImageUploaderProps) {
  const [images, setImages] = useState<string[]>(currentUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  // Sync images if currentUrls change from parent (useful for edit mode)
  React.useEffect(() => {
    if (currentUrls && currentUrls.length > 0) {
      setImages(currentUrls);
    }
  }, [currentUrls]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setError('');
    setUploading(true);

    const uploadedUrls: string[] = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 5 * 1024 * 1024) {
        setError(`حجم الملف ${file.name} كبير. الحد الأقصى 5MB.`);
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('bucket', bucket);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await res.json();
        if (res.ok && result.url) {
          uploadedUrls.push(result.url);
        } else {
          setError(`خطأ في رفع ${file.name}: ${result.error || 'حاول مجدداً'}`);
        }
      } catch (err) {
        setError(`خطأ في الاتصال أثناء رفع ${file.name}`);
      }
    }

    setImages(uploadedUrls);
    onUpload(uploadedUrls);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onUpload(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group bg-gray-50">
            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 left-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition shadow-sm"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="aspect-video rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 hover:border-brand-primary hover:bg-brand-light/20 transition disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <span className="text-2xl text-gray-400">+</span>
              <span className="text-xs font-bold text-gray-500">إضافة صور</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-red-600 text-xs bg-red-50 p-2 rounded border border-red-100 italic">
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
