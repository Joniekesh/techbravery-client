export const ImageAssetPurpose = {
  APPLICATION_THUMBNAIL: "APPLICATION_THUMBNAIL",
  APPLICATION_IMAGE: "APPLICATION_IMAGE",
  KYC_DOCUMENT: "KYC_DOCUMENT",
  KYC_SELFIE: "KYC_SELFIE",
  PROFILE_IMAGE: "PROFILE_IMAGE",
  COMPANY_LOGO: "COMPANY_LOGO",
  INVESTMENT_IMAGE: "INVESTMENT_IMAGE",
  SUPPORT_ATTACHMENT: "SUPPORT_ATTACHMENT",
  INVESTMENT_DOCUMENT: "INVESTMENT_DOCUMENT",
  GENERAL: "GENERAL",
} as const;

export type ImageAssetPurpose =
  (typeof ImageAssetPurpose)[keyof typeof ImageAssetPurpose];

export const ImageAssetStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
  FAILED: "FAILED",
} as const;

export type ImageAssetStatus =
  (typeof ImageAssetStatus)[keyof typeof ImageAssetStatus];

export interface ImageAsset {
  id: string;
  fileName: string;
  mimeType: string;
  size: number;
  url: string;
  userId: string;
  fileId: string;
  purpose: ImageAssetPurpose;
  status: ImageAssetStatus;
}
