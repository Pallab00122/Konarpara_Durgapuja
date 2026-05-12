"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  ImageIcon,
} from "lucide-react";
import type { Photo } from "@/app/gallery/page";

interface PhotoLightboxProps {
  photo: Photo;
  photos: Photo[];
  getPhotoUrl: (filePath: string) => string;
  onClose: () => void;
  onNavigate: (photo: Photo) => void;
  onDownload: (photo: Photo) => void;
}

export default function PhotoLightbox({
  photo,
  photos,
  getPhotoUrl,
  onClose,
  onNavigate,
  onDownload,
}: PhotoLightboxProps) {
  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(photos[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, photos, onNavigate]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      onNavigate(photos[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, photos, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, goToPrev, goToNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation buttons */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Image container */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative max-w-[90vw] max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={getPhotoUrl(photo.file_path)}
          alt={photo.title || `Durga Puja ${photo.year}`}
          width={photo.width || 1200}
          height={photo.height || 800}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
          priority
        />
      </motion.div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-white">
            {photo.title && (
              <div>
                <h3 className="text-lg font-semibold">{photo.title}</h3>
                {photo.description && (
                  <p className="text-white/70 text-sm">{photo.description}</p>
                )}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {photo.year}
              </span>
              {photo.width && photo.height && (
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  {photo.width} x {photo.height}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">
              {currentIndex + 1} / {photos.length}
            </span>

            <button
              onClick={() => onDownload(photo)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/40 text-xs">
        <span>ESC to close</span>
        <span>Arrow keys to navigate</span>
      </div>
    </motion.div>
  );
}
