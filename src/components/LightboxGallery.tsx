'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryImage {
  image_url: string;
}

export default function LightboxGallery({ gallery, projectTitle }: { gallery: GalleryImage[], projectTitle: string }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((img: any, i: number) => (
          <div 
            key={i} 
            className="aspect-video rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedImage(img.image_url)}
          >
            <img 
              src={img.image_url} 
              alt={`${projectTitle} - image ${i + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
            />
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white bg-black/50 hover:bg-white hover:text-black rounded-full p-2 transition-colors z-[101]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage} 
              alt="Enlarged" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
