"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Trash2,
  Search,
  Calendar,
  Loader2,
  AlertCircle,
  CheckSquare,
  Square,
  ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

interface Photo {
  id: string;
  title: string | null;
  year: number;
  file_path: string;
  file_name: string;
  file_size: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

interface PhotoManagerProps {
  refreshTrigger: number;
}

const PHOTOS_PER_PAGE = 50;

export default function PhotoManager({ refreshTrigger }: PhotoManagerProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClient();

  // Fetch years
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
  }, [refreshTrigger]);

  // Fetch photos
  const fetchPhotos = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("gallery_photos")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(page * PHOTOS_PER_PAGE, (page + 1) * PHOTOS_PER_PAGE - 1);

    if (filterYear) {
      query = query.eq("year", filterYear);
    }

    if (searchTerm) {
      query = query.ilike("file_name", `%${searchTerm}%`);
    }

    const { data, count, error } = await query;

    if (error) {
      console.error("Error fetching photos:", error);
      toast.error("Failed to fetch photos");
    } else {
      setPhotos(data || []);
      setTotalCount(count || 0);
      setHasMore((data?.length || 0) === PHOTOS_PER_PAGE);
    }

    setLoading(false);
  }, [filterYear, searchTerm, page, supabase]);

  useEffect(() => {
    setPage(0);
    setSelectedIds(new Set());
  }, [filterYear, searchTerm, refreshTrigger]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos, refreshTrigger]);

  const getPhotoUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from("gallery-photos")
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === photos.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(photos.map((p) => p.id)));
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.size === 0) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedIds.size} photo(s)? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const photosToDelete = photos.filter((p) => selectedIds.has(p.id));

      // Delete from storage
      const filePaths = photosToDelete.map((p) => p.file_path);
      const { error: storageError } = await supabase.storage
        .from("gallery-photos")
        .remove(filePaths);

      if (storageError) {
        console.error("Storage delete error:", storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from("gallery_photos")
        .delete()
        .in("id", Array.from(selectedIds));

      if (dbError) throw dbError;

      toast.success(`Deleted ${selectedIds.size} photo(s)`);
      setSelectedIds(new Set());
      fetchPhotos();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error("Failed to delete photos");
    }

    setIsDeleting(false);
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return "Unknown";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const currentYear = new Date().getFullYear();
  const years = availableYears.length > 0 ? availableYears : [currentYear];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card rounded-xl border border-border p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by filename..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Year filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <select
              value={filterYear || ""}
              onChange={(e) =>
                setFilterYear(e.target.value ? Number(e.target.value) : null)
              }
              className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Actions bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={selectAll}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {selectedIds.size === photos.length && photos.length > 0 ? (
              <CheckSquare className="w-5 h-5" />
            ) : (
              <Square className="w-5 h-5" />
            )}
            {selectedIds.size === photos.length && photos.length > 0
              ? "Deselect All"
              : "Select All"}
          </button>

          <span className="text-sm text-muted-foreground">
            {selectedIds.size > 0
              ? `${selectedIds.size} selected`
              : `${totalCount} photos total`}
          </span>
        </div>

        {selectedIds.size > 0 && (
          <button
            onClick={deleteSelected}
            disabled={isDeleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
            Delete Selected
          </button>
        )}
      </div>

      {/* Photo Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border border-border">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">
            No photos found
          </h3>
          <p className="text-muted-foreground text-sm">
            {searchTerm || filterYear
              ? "Try adjusting your filters"
              : "Upload some photos to get started"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <AnimatePresence>
              {photos.map((photo) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`relative group aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer border-2 transition-all ${
                    selectedIds.has(photo.id)
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-border"
                  }`}
                  onClick={() => toggleSelect(photo.id)}
                >
                  <Image
                    src={getPhotoUrl(photo.file_path)}
                    alt={photo.title || photo.file_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />

                  {/* Selection indicator */}
                  <div
                    className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      selectedIds.has(photo.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-black/50 text-white opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    {selectedIds.has(photo.id) ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </div>

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs truncate">
                      {photo.file_name}
                    </p>
                    <p className="text-white/70 text-xs">
                      {photo.year} - {formatFileSize(photo.file_size)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {Math.ceil(totalCount / PHOTOS_PER_PAGE) || 1}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
