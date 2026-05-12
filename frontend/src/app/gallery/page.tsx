"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PhotoGrid from "@/components/gallery/PhotoGrid";
import PhotoLightbox from "@/components/gallery/PhotoLightbox";
import YearFilter from "@/components/gallery/YearFilter";
import { Loader2, ImageIcon } from "lucide-react";

export interface Photo {
  id: string;
  title: string | null;
  description: string | null;
  year: number;
  file_path: string;
  file_name: string;
  file_size: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

const PHOTOS_PER_PAGE = 30;

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Fetch available years
  useEffect(() => {
    async function fetchYears() {
      const { data } = await supabase
        .from("gallery_photos")
        .select("year")
        .order("year", { ascending: false });

      if (data) {
        const years = [...new Set(data.map((d) => d.year))];
        setAvailableYears(years);
      }
    }
    fetchYears();
  }, []);

  // Fetch photos
  const fetchPhotos = useCallback(
    async (offset: number, append: boolean = false) => {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      let query = supabase
        .from("gallery_photos")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + PHOTOS_PER_PAGE - 1);

      if (selectedYear) {
        query = query.eq("year", selectedYear);
      }

      const { data, count, error } = await query;

      if (error) {
        console.error("Error fetching photos:", error);
      } else if (data) {
        if (append) {
          setPhotos((prev) => [...prev, ...data]);
        } else {
          setPhotos(data);
        }
        setTotalCount(count || 0);
        setHasMore(data.length === PHOTOS_PER_PAGE);
      }

      setLoading(false);
      setLoadingMore(false);
    },
    [selectedYear, supabase]
  );

  // Initial load and year filter change
  useEffect(() => {
    setPhotos([]);
    setHasMore(true);
    fetchPhotos(0);
  }, [selectedYear, fetchPhotos]);

  // Infinite scroll observer
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          fetchPhotos(photos.length, true);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loading, photos.length, fetchPhotos]);

  // Get public URL for a photo
  const getPhotoUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from("gallery-photos")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  // Handle download
  const handleDownload = async (photo: Photo) => {
    const url = getPhotoUrl(photo.file_path);
    const response = await fetch(url);
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = photo.file_name || `photo-${photo.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-gradient-to-b from-primary/10 to-background">
        <div className="absolute inset-0 pattern-overlay opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Photo <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Relive the divine moments of Konarpara Durga Puja through our
              collection of {totalCount.toLocaleString()}+ photographs spanning
              years of celebrations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border py-4">
        <div className="container mx-auto px-4">
          <YearFilter
            years={availableYears}
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            totalCount={totalCount}
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No photos yet
            </h3>
            <p className="text-muted-foreground text-center max-w-md">
              {selectedYear
                ? `No photos found for ${selectedYear}. Try selecting a different year.`
                : "Photos will appear here once they are uploaded by the admin."}
            </p>
          </div>
        ) : (
          <>
            <PhotoGrid
              photos={photos}
              getPhotoUrl={getPhotoUrl}
              onPhotoClick={setSelectedPhoto}
            />

            {/* Load more trigger */}
            <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
              {loadingMore && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading more photos...</span>
                </div>
              )}
              {!hasMore && photos.length > 0 && (
                <p className="text-muted-foreground text-sm">
                  You&apos;ve seen all {totalCount.toLocaleString()} photos
                </p>
              )}
            </div>
          </>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <PhotoLightbox
            photo={selectedPhoto}
            photos={photos}
            getPhotoUrl={getPhotoUrl}
            onClose={() => setSelectedPhoto(null)}
            onNavigate={setSelectedPhoto}
            onDownload={handleDownload}
          />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
