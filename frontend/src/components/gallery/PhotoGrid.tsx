"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/app/gallery/page";

interface PhotoGridProps {
  photos: Photo[];
  getPhotoUrl: (filePath: string) => string;
  onPhotoClick: (photo: Photo) => void;
}

export default function PhotoGrid({
  photos,
  getPhotoUrl,
  onPhotoClick,
}: PhotoGridProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          index={index}
          getPhotoUrl={getPhotoUrl}
          onClick={() => onPhotoClick(photo)}
        />
      ))}
    </div>
  );
}

interface PhotoCardProps {
  photo: Photo;
  index: number;
  getPhotoUrl: (filePath: string) => string;
  onClick: () => void;
}

function PhotoCard({ photo, index, getPhotoUrl, onClick }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Calculate aspect ratio for placeholder
  const aspectRatio =
    photo.width && photo.height ? photo.height / photo.width : 1;
  const placeholderHeight = Math.min(Math.max(aspectRatio * 100, 60), 150);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 10) * 0.05 }}
      className="break-inside-avoid group cursor-pointer"
      onClick={onClick}
    >
      <div
        className="relative overflow-hidden rounded-xl bg-muted"
        style={{
          paddingBottom: isLoaded ? undefined : `${placeholderHeight}%`,
        }}
      >
        {!hasError ? (
          <Image
            src={getPhotoUrl(photo.file_path)}
            alt={photo.title || `Durga Puja ${photo.year}`}
            width={photo.width || 400}
            height={photo.height || 300}
            className={`w-full h-auto object-cover transition-all duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-105`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">Failed to load</span>
          </div>
        )}

        {/* Overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            {photo.title && (
              <p className="text-white text-sm font-medium truncate">
                {photo.title}
              </p>
            )}
            <p className="text-white/80 text-xs">{photo.year}</p>
          </div>
        </div>

        {/* Year badge */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          {photo.year}
        </div>

        {/* Loading shimmer */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        )}
      </div>
    </motion.div>
  );
}
