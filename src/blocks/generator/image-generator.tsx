"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  IconUpload,
  IconX,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useAppContext } from "@/contexts/app";

interface ImageGeneratorProps {
  allowMultipleImages?: boolean;
  maxImages?: number;
}

export function ImageGenerator({
  allowMultipleImages = false,
  maxImages = 8,
}: ImageGeneratorProps = {}) {
  const [activeTab, setActiveTab] = useState("image-to-image");
  const [prompt, setPrompt] = useState("What do you want to create?");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);

  const { user } = useAppContext();

  useEffect(() => {
    console.log("user", user);
  }, [user]);

  // Sample preview images
  const sampleImages = [
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxUpload = allowMultipleImages ? maxImages : 1;
    const newFiles = files.slice(0, maxUpload - uploadedImages.length);

    setUploadedImages((prev) => [...prev, ...newFiles]);

    // Create preview URLs
    newFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => [...prev, url]);
    });
  };

  const removeImage = (index: number) => {
    const urlToRemove = previewUrls[index];

    // Revoke the object URL to prevent memory leaks
    if (urlToRemove && urlToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(urlToRemove);
    }

    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const nextPreview = () => {
    setCurrentPreviewIndex((prev) => (prev + 1) % sampleImages.length);
  };

  const prevPreview = () => {
    setCurrentPreviewIndex(
      (prev) => (prev - 1 + sampleImages.length) % sampleImages.length
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 max-w-7xl mx-auto">
      {/* Left Panel */}
      <Card className="bg-background border">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-semibold text-foreground mb-1">
              Image to Image AI
            </h2>
          </div>

          {/* Mode Selection with Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="image-to-image">Image to Image</TabsTrigger>
              <TabsTrigger value="text-to-image">Text to Image</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Model Section */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Model</h3>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-bold">
                    G
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">
                    Google Nano Banana
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ultra-high character consistency
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Try Wan 2.1
              </Button>
            </div>
          </div>

          {/* Images Upload */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">Images</h3>
              <span className="text-sm text-muted-foreground">
                {uploadedImages.length}/{allowMultipleImages ? maxImages : 1}
              </span>
            </div>

            {/* Uploaded Images Preview */}
            {uploadedImages.length > 0 && (
              <div
                className={`grid gap-2 mb-4 ${
                  allowMultipleImages
                    ? "grid-cols-2 sm:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <IconX className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <label className="block">
              <input
                type="file"
                multiple={allowMultipleImages}
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={
                  uploadedImages.length >= (allowMultipleImages ? maxImages : 1)
                }
              />
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
                <IconUpload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <div className="text-foreground font-medium">Add</div>
              </div>
            </label>
          </div>

          {/* Prompt */}
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Prompt</h3>
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] bg-background border resize-none"
                placeholder="What do you want to create?"
              />
              <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                <span>0 / 2000</span>
              </div>
            </div>
          </div>

          {/* Credits */}
          <div className="flex items-center justify-between mb-6 text-sm">
            <span className="text-destructive">🎫 Credits required:</span>
            <span className="font-medium text-foreground">4 Credits</span>
          </div>

          {/* Generate Button */}
          <Button className="w-full bg-background border hover:bg-muted text-foreground">
            ✨ Create
          </Button>
        </CardContent>
      </Card>

      {/* Right Panel - Sample Images */}
      <Card className="bg-background border">
        <CardContent className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="font-semibold text-foreground">Sample Image</h2>
          </div>

          {/* Image Carousel */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-4">
              <img
                src={sampleImages[currentPreviewIndex]}
                alt="Sample"
                className="w-full h-full object-cover"
              />

              {/* Navigation Buttons */}
              <Button
                size="sm"
                variant="secondary"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
                onClick={prevPreview}
              >
                <IconChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 bg-background/80 hover:bg-background"
                onClick={nextPreview}
              >
                <IconChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2">
              {sampleImages.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    index === currentPreviewIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  )}
                  onClick={() => setCurrentPreviewIndex(index)}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
