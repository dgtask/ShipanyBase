"use client";

import { FormField } from "@/shared/types/blocks/form";
import { ControllerRenderProps } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import { Upload, X, ImageIcon, Trash } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { toast } from "sonner";

interface UploadImageProps {
  field: FormField;
  formField: ControllerRenderProps<Record<string, unknown>, string>;
  data?: any;
  metadata?: Record<string, any>;
  uploadUrl?: string;
  onUpload?: (files: File[]) => Promise<string[]>;
}

export function UploadImage({
  field,
  formField,
  data,
  metadata,
  uploadUrl = "/api/storage/upload-image",
  onUpload,
}: UploadImageProps) {
  const maxImages = metadata?.max || 1;

  const [previews, setPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initialValue = formField.value;
    if (!initialValue) return;

    let urls: string[] = [];

    if (typeof initialValue === "string") {
      urls = initialValue.includes(",")
        ? initialValue.split(",").filter(Boolean)
        : [initialValue];
    } else if (Array.isArray(initialValue)) {
      urls = initialValue;
    }

    if (urls.length > 0) {
      setPreviews(urls);
      setUploadedUrls(urls);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = maxImages - previews.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newPreviews: string[] = [];
    filesToAdd.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string);
          if (newPreviews.length === filesToAdd.length) {
            setPreviews((prev) => [...prev, ...newPreviews]);
            setSelectedFiles((prev) => [...prev, ...filesToAdd]);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newUploadedUrls = uploadedUrls.filter((_, i) => i !== index);

    setPreviews(newPreviews);
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadedUrls(newUploadedUrls);

    // Update form value
    if (newUploadedUrls.length > 0) {
      formField.onChange(
        maxImages === 1 ? newUploadedUrls[0] : newUploadedUrls
      );
    } else {
      formField.onChange(maxImages === 1 ? "" : []);
    }
  };

  const handleRemoveAll = () => {
    setPreviews([]);
    setSelectedFiles([]);
    setUploadedUrls([]);
    formField.onChange(maxImages === 1 ? "" : []);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      let newUploadedUrls: string[] = [];

      if (onUpload) {
        newUploadedUrls = await onUpload(selectedFiles);
      } else {
        const formData = new FormData();
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });

        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload failed");
        }

        const result = await response.json();

        if (result.code !== 0) {
          throw new Error(result.message || "Upload failed");
        }

        newUploadedUrls = result.data.urls;
      }

      const allUploadedUrls = [...uploadedUrls, ...newUploadedUrls];

      formField.onChange(
        maxImages === 1 ? allUploadedUrls[0] : allUploadedUrls
      );

      setUploadedUrls(allUploadedUrls);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current?.click();
  };

  const canAddMore = previews.length < maxImages;

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={maxImages > 1}
        onChange={handleFileSelect}
        className="hidden"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previews.map((preview, index) => {
            const isUploaded = index < uploadedUrls.length;
            return (
              <div
                key={index}
                className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
              >
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* {isUploaded && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs rounded">
                    uploaded
                  </div>
                )} */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                >
                  <X className="size-4" />
                </button>
              </div>
            );
          })}

          {canAddMore && (
            <button
              type="button"
              onClick={handleSelectClick}
              className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2"
            >
              <ImageIcon className="size-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {previews.length}/{maxImages}
              </span>
            </button>
          )}
        </div>
      )}

      {previews.length === 0 && (
        <button
          type="button"
          onClick={handleSelectClick}
          className="w-40 h-40 aspect-video rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors flex flex-col items-center justify-center gap-2"
        >
          <ImageIcon className="size-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {field.placeholder || "upload image"}
          </p>
          {maxImages > 1 && (
            <p className="text-xs text-muted-foreground">{maxImages} images</p>
          )}
        </button>
      )}

      {previews.length > 0 && (
        <div className="flex items-center gap-2">
          {maxImages > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleRemoveAll}
              className="w-32 text-sm"
            >
              <X className="size-4" />
              Remove
            </Button>
          )}
          {selectedFiles.length > 0 && (
            <Button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              size="sm"
              className="w-32 text-xs"
            >
              <Upload className="size-4" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
