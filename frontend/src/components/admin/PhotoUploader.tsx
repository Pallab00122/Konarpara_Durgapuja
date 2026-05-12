"use client";

import { useState, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Check,
  AlertCircle,
  ImageIcon,
  Loader2,
  FolderUp,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface PhotoUploaderProps {
  onUploadComplete: () => void;
}

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  status: "pending" | "uploading" | "success" | "error";
  progress: number;
  error?: string;
}

export default function PhotoUploader({ onUploadComplete }: PhotoUploaderProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  const handleFileSelect = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      const newFiles: UploadFile[] = Array.from(selectedFiles)
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => ({
          id: Math.random().toString(36).substring(7),
          file,
          preview: URL.createObjectURL(file),
          status: "pending" as const,
          progress: 0,
        }));

      if (newFiles.length !== selectedFiles.length) {
        toast.warning("Some files were skipped (only images allowed)");
      }

      setFiles((prev) => [...prev, ...newFiles]);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const clearCompleted = () => {
    setFiles((prev) => {
      prev
        .filter((f) => f.status === "success")
        .forEach((f) => URL.revokeObjectURL(f.preview));
      return prev.filter((f) => f.status !== "success");
    });
  };

  const getImageDimensions = (
    file: File
  ): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const uploadFiles = async () => {
    const pendingFiles = files.filter((f) => f.status === "pending");
    if (pendingFiles.length === 0) {
      toast.info("No files to upload");
      return;
    }

    setIsUploading(true);

    for (const uploadFile of pendingFiles) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: "uploading" as const } : f
        )
      );

      try {
        // Generate unique file path
        const fileExt = uploadFile.file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${selectedYear}/${fileName}`;

        // Get image dimensions
        const dimensions = await getImageDimensions(uploadFile.file);

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from("gallery-photos")
          .upload(filePath, uploadFile.file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        // Insert metadata into database
        const { error: dbError } = await supabase.from("gallery_photos").insert({
          title: uploadFile.file.name.replace(/\.[^/.]+$/, ""),
          year: selectedYear,
          file_path: filePath,
          file_name: uploadFile.file.name,
          file_size: uploadFile.file.size,
          width: dimensions.width,
          height: dimensions.height,
        });

        if (dbError) throw dbError;

        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? { ...f, status: "success" as const, progress: 100 }
              : f
          )
        );
      } catch (error: any) {
        console.error("Upload error:", error);
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  status: "error" as const,
                  error: error.message || "Upload failed",
                }
              : f
          )
        );
      }
    }

    setIsUploading(false);
    onUploadComplete();

    const successCount = files.filter(
      (f) => f.status === "success" || pendingFiles.some((p) => p.id === f.id)
    ).length;
    if (successCount > 0) {
      toast.success(`Successfully uploaded ${pendingFiles.length} photo(s)`);
    }
  };

  const pendingCount = files.filter((f) => f.status === "pending").length;
  const successCount = files.filter((f) => f.status === "success").length;
  const errorCount = files.filter((f) => f.status === "error").length;

  return (
    <div className="space-y-6">
      {/* Year Selection */}
      <div className="bg-card rounded-xl border border-border p-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Select Year for Upload
        </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="w-full md:w-48 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isDragging ? "bg-primary/20" : "bg-muted"
            }`}
          >
            <FolderUp
              className={`w-8 h-8 ${isDragging ? "text-primary" : "text-muted-foreground"}`}
            />
          </div>
          <div>
            <p className="text-lg font-medium text-foreground">
              {isDragging ? "Drop photos here" : "Drag & drop photos here"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse from your device
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Supports: JPG, PNG, WebP, GIF (max 50MB each)
          </p>
        </div>
      </div>

      {/* File Preview Grid */}
      {files.length > 0 && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              Selected Photos ({files.length})
            </h3>
            <div className="flex items-center gap-2">
              {successCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Clear completed
                </button>
              )}
              <div className="flex items-center gap-3 text-sm">
                {pendingCount > 0 && (
                  <span className="text-muted-foreground">
                    {pendingCount} pending
                  </span>
                )}
                {successCount > 0 && (
                  <span className="text-green-600">{successCount} uploaded</span>
                )}
                {errorCount > 0 && (
                  <span className="text-red-500">{errorCount} failed</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <AnimatePresence>
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                  />

                  {/* Status overlay */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                      file.status === "pending"
                        ? "bg-black/0 group-hover:bg-black/40"
                        : file.status === "uploading"
                          ? "bg-black/60"
                          : file.status === "success"
                            ? "bg-green-500/60"
                            : "bg-red-500/60"
                    }`}
                  >
                    {file.status === "uploading" && (
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    )}
                    {file.status === "success" && (
                      <Check className="w-8 h-8 text-white" />
                    )}
                    {file.status === "error" && (
                      <AlertCircle className="w-8 h-8 text-white" />
                    )}
                  </div>

                  {/* Remove button */}
                  {file.status === "pending" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(file.id);
                      }}
                      className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  {/* File name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <p className="text-white text-xs truncate">
                      {file.file.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Upload button */}
          {pendingCount > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={uploadFiles}
                disabled={isUploading}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload {pendingCount} Photo{pendingCount > 1 ? "s" : ""}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="bg-accent/10 rounded-xl p-6">
        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-accent" />
          Tips for best results
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>
            - Use high-resolution images (at least 1920x1080) for best display
          </li>
          <li>- Organize photos by year for easy browsing</li>
          <li>
            - You can upload multiple photos at once (drag & drop or select)
          </li>
          <li>- Supported formats: JPEG, PNG, WebP, GIF</li>
        </ul>
      </div>
    </div>
  );
}
