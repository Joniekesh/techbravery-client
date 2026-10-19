import { useRef, useState } from "react";
import type { ChangeEvent } from "react";

import {
  FileText,
  ImageIcon,
  Loader2,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";

import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import type {
  ApplicationImage,
  CreateApplicationForm,
} from "@/types/application";

import { uploadApplicationAsset } from "@/image/upload";

import { deleteImageAsset } from "@/image/delete";

import ImageContainer from "@/image/ImageContainer";
import { ImageAssetPurpose } from "@/types/image-asset";

interface Props {
  value: CreateApplicationForm;
  onChange: (updates: Partial<CreateApplicationForm>) => void;
  onTitleChange?: (title: string) => void;
}

const normalizeImage = (image: ApplicationImage): ApplicationImage => image;

export function ApplicationBasicSection({
  value,
  onChange,
  onTitleChange,
}: Props) {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [thumbnailUploading, setThumbnailUploading] = useState(false);

  const [galleryUploading, setGalleryUploading] = useState(false);

  const [thumbnailDeleting, setThumbnailDeleting] = useState(false);

  const [deletingGalleryIndex, setDeletingGalleryIndex] = useState<
    number | null
  >(null);

  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [galleryProgress, setGalleryProgress] = useState(0);

  const images = (value.images ?? []).map(normalizeImage);

  const handleThumbnailUpload = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    setThumbnailUploading(true);
    setThumbnailProgress(0);

    try {
      /*
       * If an old thumbnail exists, remove it first.
       */
      if (value.thumbnailAssetId) {
        await deleteImageAsset(value.thumbnailAssetId);
      }

      const result = await uploadApplicationAsset({
        file,
        purpose: ImageAssetPurpose.APPLICATION_THUMBNAIL,
        folder: "applications",
        fileNamePrefix: "application-thumbnail",
        onProgress: setThumbnailProgress,
      });

      onChange({
        thumbNail: result.url,
        thumbnailAssetId: result.assetId,
      });

      /*
       * A thumbnail cannot simultaneously be a gallery image.
       */
      const filteredGallery = images.filter(
        (image) => image.assetId !== result.assetId,
      );

      if (filteredGallery.length !== images.length) {
        onChange({
          images: filteredGallery,
        });
      }

      toast.success("Thumbnail uploaded successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to upload thumbnail.",
      );
    } finally {
      setThumbnailUploading(false);
      setThumbnailProgress(0);
    }
  };

  const handleGalleryUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    event.target.value = "";

    if (!files.length) {
      return;
    }

    const invalidFile = files.find((file) => !file.type.startsWith("image/"));

    if (invalidFile) {
      toast.error("Please select image files only.");
      return;
    }

    if (images.length + files.length > 30) {
      toast.error("An application cannot have more than 30 gallery images.");
      return;
    }

    setGalleryUploading(true);
    setGalleryProgress(0);

    const uploadedImages: ApplicationImage[] = [];

    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        const result = await uploadApplicationAsset({
          file,
          purpose: ImageAssetPurpose.APPLICATION_IMAGE,
          folder: "applications",
          fileNamePrefix: "application-image",

          onProgress: (progress) => {
            const overall = ((index + progress / 100) / files.length) * 100;

            setGalleryProgress(overall);
          },
        });

        /*
         * Prevent the thumbnail asset from appearing
         * in the gallery.
         */
        if (result.assetId === value.thumbnailAssetId) {
          await deleteImageAsset(result.assetId);
          continue;
        }

        uploadedImages.push({
          assetId: result.assetId,
          url: result.url,
          fileId: result.fileId,
          name: result.name,
        });
      }

      if (uploadedImages.length) {
        onChange({
          images: [...images, ...uploadedImages],
        });

        toast.success(
          `${uploadedImages.length} image${
            uploadedImages.length === 1 ? "" : "s"
          } uploaded successfully.`,
        );
      }
    } catch (error) {
      /*
       * Successfully uploaded files remain in the form so the
       * administrator can remove them manually.
       */
      if (uploadedImages.length) {
        onChange({
          images: [...images, ...uploadedImages],
        });
      }

      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to upload application images.",
      );
    } finally {
      setGalleryUploading(false);
      setGalleryProgress(0);
    }
  };

  const removeThumbnail = async () => {
    if (thumbnailDeleting || thumbnailUploading || !value.thumbnailAssetId) {
      return;
    }

    setThumbnailDeleting(true);

    try {
      await deleteImageAsset(value.thumbnailAssetId);

      onChange({
        thumbNail: "",
        thumbnailAssetId: null,
      });

      toast.success("Thumbnail removed.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete thumbnail.",
      );
    } finally {
      setThumbnailDeleting(false);
    }
  };

  const removeGalleryImage = async (index: number) => {
    if (deletingGalleryIndex !== null || galleryUploading) {
      return;
    }

    const image = images[index];

    if (!image) {
      return;
    }

    setDeletingGalleryIndex(index);

    try {
      await deleteImageAsset(image.assetId);

      onChange({
        images: images.filter((_, imageIndex) => imageIndex !== index),
      });

      toast.success("Image removed.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to delete image.",
      );
    } finally {
      setDeletingGalleryIndex(null);
    }
  };

  return (
    <Card className="min-w-0">
      <CardHeader>
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <CardTitle>Basic Information</CardTitle>

            <CardDescription>
              Core information displayed on the public platform page.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="min-w-0 space-y-8">
        {/* NAME / SLUG */}
        <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <Label htmlFor="title">Platform Name *</Label>

            <Input
              id="title"
              value={value.title}
              onChange={(event) => onTitleChange?.(event.target.value)}
              placeholder="e.g. ExAfrik P2P Exchange"
            />
          </div>

          <div className="min-w-0 space-y-2">
            <Label htmlFor="slug">URL Slug *</Label>

            <Input
              id="slug"
              value={value.slug}
              onChange={(event) =>
                onChange({
                  slug: event.target.value,
                })
              }
              placeholder="exafrik-p2p-exchange"
            />

            <p className="text-xs text-muted-foreground">
              Used in the public platform URL.
            </p>
          </div>
        </div>

        {/* SHORT DESCRIPTION */}
        <div className="space-y-2">
          <Label htmlFor="shortDescription">Short Description *</Label>

          <Textarea
            id="shortDescription"
            value={value.shortDescription}
            onChange={(event) =>
              onChange({
                shortDescription: event.target.value,
              })
            }
            rows={3}
            maxLength={500}
            placeholder="A concise description of the platform..."
          />

          <div className="text-right text-xs text-muted-foreground">
            {value.shortDescription.length}/500
          </div>
        </div>

        {/* LONG DESCRIPTION */}
        <div className="space-y-2">
          <Label htmlFor="longDescription">Full Description *</Label>

          <Textarea
            id="longDescription"
            value={value.longDescription}
            onChange={(event) =>
              onChange({
                longDescription: event.target.value,
              })
            }
            rows={8}
            maxLength={10000}
            placeholder="Describe the platform, problem it solves, target market, technology and value proposition..."
          />
        </div>

        {/* THUMBNAIL */}
        <section className="space-y-4">
          <div>
            <h3 className="font-semibold">Application Thumbnail</h3>

            <p className="text-sm text-muted-foreground">
              Upload the primary image for this application.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailUpload}
              />

              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={thumbnailUploading || thumbnailDeleting}
                onClick={() => thumbnailInputRef.current?.click()}
              >
                {thumbnailUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading {Math.round(thumbnailProgress)}%
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Thumbnail
                  </>
                )}
              </Button>

              {thumbnailUploading && (
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${thumbnailProgress}%`,
                    }}
                  />
                </div>
              )}

              {value.thumbnailAssetId && (
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <span className="flex-1 truncate text-xs text-muted-foreground">
                    Asset ID: {value.thumbnailAssetId}
                  </span>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                    disabled={thumbnailUploading || thumbnailDeleting}
                    onClick={removeThumbnail}
                  >
                    {thumbnailDeleting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <X className="mr-2 h-4 w-4" />
                    )}
                    Remove
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Thumbnail Preview</Label>

              <div className="flex min-h-40 items-center justify-center overflow-hidden rounded-xl border bg-muted/30">
                {value.thumbNail ? (
                  <ImageContainer
                    src={value.thumbNail}
                    alt="Application thumbnail preview"
                    width={800}
                    height={450}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                    Thumbnail preview
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="space-y-4">
          <div>
            <h3 className="font-semibold">Application Images</h3>

            <p className="text-sm text-muted-foreground">
              Upload screenshots, product images, or other application images.
            </p>
          </div>

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleGalleryUpload}
          />

          <Button
            type="button"
            variant="outline"
            disabled={galleryUploading}
            onClick={() => galleryInputRef.current?.click()}
          >
            {galleryUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading {Math.round(galleryProgress)}%
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Images
              </>
            )}
          </Button>

          {galleryUploading && (
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${galleryProgress}%`,
                }}
              />
            </div>
          )}

          {images.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={image.assetId}
                  className="overflow-hidden rounded-xl border bg-card"
                >
                  <div className="relative flex h-44 items-center justify-center overflow-hidden bg-muted/30">
                    <ImageContainer
                      src={image.url}
                      alt={`Application image ${index + 1}`}
                      width={800}
                      height={450}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 p-3">
                    <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                      {image.name || `Image ${index + 1}`}
                    </p>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      disabled={
                        galleryUploading || deletingGalleryIndex !== null
                      }
                      onClick={() => removeGalleryImage(index)}
                    >
                      {deletingGalleryIndex === index ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />

              <p className="text-sm text-muted-foreground">
                No application images added yet.
              </p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            {images.length} gallery image
            {images.length === 1 ? "" : "s"} added
          </p>
        </section>
      </CardContent>
    </Card>
  );
}
