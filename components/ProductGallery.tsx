"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

export default function ProductGallery({ mainImage, gallery }: { mainImage: string, gallery: string[] }) {
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const allImages = [mainImage, ...gallery];

  return (
    <>
      <div className="flex flex-col gap-6">
        
        {/* Main Image - Now Clickable */}
        <div 
          className="relative w-full aspect-square bg-worn border border-ink/10 overflow-hidden cursor-zoom-in group"
          onClick={() => setIsLightboxOpen(true)}
        >
          {selectedImage && (
              <Image 
                  src={selectedImage} 
                  alt="Product Shot" 
                  fill 
                  className="object-cover transition-all duration-500 group-hover:scale-105"
              />
          )}
          
          {/* Hint Icon */}
          <div className="absolute top-4 right-4 bg-paper/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={20} />
          </div>
        </div>

        {/* Thumbnails */}
        {gallery.length > 0 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                  <button 
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-20 flex-shrink-0 border transition-all ${
                          selectedImage === img 
                          ? "border-accent opacity-100" 
                          : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                  >
                      <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
              ))}
          </div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 text-paper hover:text-accent transition-colors z-50">
              <X size={40} />
            </button>

            {/* Huge Image */}
            <div className="relative w-full h-full max-w-5xl max-h-screen">
              <Image 
                src={selectedImage} 
                alt="Full Screen View" 
                fill 
                className="object-contain" 
              />
            </div>
            
            <p className="absolute bottom-6 left-0 w-full text-center text-paper/50 font-mono text-xs uppercase">
              Click anywhere to close
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}