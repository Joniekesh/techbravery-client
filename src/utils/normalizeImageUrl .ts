export interface ImageAsset {
  id: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export const normalizeImageUrl = (
  image: ImageAsset | null | undefined,
): string => {
  return image?.url?.trim() ?? "";
};
