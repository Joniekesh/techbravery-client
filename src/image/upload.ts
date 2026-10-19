import { getErrorMessage } from "@/utils/getErrorMessage";
import { makeRequest } from "@/utils/makeRequest";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";
import { toast } from "sonner";

export type KycDocumentType = "FRONT_DOCUMENT" | "BACK_DOCUMENT" | "SELFIE";

export interface KycDocumentAsset {
  id: string;
  kycId: string;
  assetId: string;
  type: KycDocumentType;

  asset: {
    id: string;
    fileId: string;
    url: string;
    fileName: string;
    mimeType: string;
    size: number;
  };
}

export type ImageAssetPurpose =
  | "KYC_DOCUMENT"
  | "KYC_SELFIE"
  | "PROFILE_IMAGE"
  | "COMPANY_LOGO"
  | "INVESTMENT_IMAGE"
  | "SUPPORT_ATTACHMENT"
  | "INVESTMENT_DOCUMENT"
  | "GENERAL";

/**
 * IMPORTANT:
 * These purpose values must exactly match your backend Prisma enum.
 *
 * If your backend currently uses APPLICATION_THUMBNAIL and
 * APPLICATION_IMAGE instead, add those exact values here instead.
 */
export type ApplicationImageAssetPurpose =
  | "APPLICATION_THUMBNAIL"
  | "APPLICATION_IMAGE";

export interface ImageAsset {
  id: string;
  fileId: string;
  url: string;
  fileName: string;
  mimeType: string;
  size: number;
  folder?: string | null;

  purpose: ImageAssetPurpose | ApplicationImageAssetPurpose;

  status: "PENDING" | "ACTIVE" | "DELETED" | "FAILED";

  createdAt: string;
  updatedAt: string;
}

export interface UploadResult {
  assetId: string;
  fileId: string;

  url: string;
  name: string;
  size: number;
  mimeType: string;
}

interface UploadOptions {
  files: File | File[];
  purpose: ImageAssetPurpose | ApplicationImageAssetPurpose;
  folder?: string;
  fileNamePrefix?: string;
  onProgress?: (progress: number) => void;
  abortSignal?: AbortSignal;
}

const authenticate = async () => {
  try {
    const response = await makeRequest.get("/image-kit/upload-auth");

    return response.data as {
      signature: string;
      expire: number;
      token: string;
      publicKey: string;
    };
  } catch (error) {
    toast.error(getErrorMessage(error));
    throw error;
  }
};

export async function createImageAsset(data: {
  fileName: string;
  mimeType: string;
  size: number;
  purpose: ImageAssetPurpose | ApplicationImageAssetPurpose;
  folder?: string;
}): Promise<ImageAsset> {
  const response = await makeRequest.post("/image-kit", data);

  return response.data as ImageAsset;
}

export async function completeImageAsset(
  assetId: string,
  data: {
    fileId: string;
    url: string;
    fileName: string;
    mimeType: string;
    size: number;
    folder?: string;
  },
): Promise<ImageAsset> {
  const response = await makeRequest.put(
    `/image-kit/${assetId}/complete`,
    data,
  );

  return response.data as ImageAsset;
}

export async function getMyImageAssets(): Promise<ImageAsset[]> {
  const response = await makeRequest.get("/image-assets/me");

  return response.data as ImageAsset[];
}

export async function getImageAsset(assetId: string): Promise<ImageAsset> {
  const response = await makeRequest.get(`/image-assets/${assetId}`);

  return response.data as ImageAsset;
}

export async function deleteImageAsset(assetId: string) {
  const response = await makeRequest.delete(`/image-assets/${assetId}`);

  return response.data;
}

// -----------------------------------------------------------------------------
// Main upload function
// -----------------------------------------------------------------------------

/**
 * Upload one or multiple files through the centralized ImageAsset system.
 *
 * Flow:
 *
 * 1. Create PENDING ImageAsset in PostgreSQL
 * 2. Upload file to ImageKit
 * 3. Complete ImageAsset in PostgreSQL
 * 4. Return database assetId + ImageKit metadata
 *
 * The Application should use assetId.
 * The frontend should NOT treat fileId as the Application image ID.
 */
export async function uploadFiles(
  options: UploadOptions,
): Promise<UploadResult[]> {
  const { files, purpose, folder, fileNamePrefix, onProgress, abortSignal } =
    options;

  const fileArray = Array.isArray(files) ? files : [files];

  if (fileArray.length === 0) {
    throw new Error("No files selected.");
  }

  try {
    const results = await Promise.all(
      fileArray.map(async (file) => {
        // ---------------------------------------------------------------
        // Validate
        // ---------------------------------------------------------------

        if (!file.type.startsWith("image/")) {
          throw new Error(`"${file.name}" is not a supported image file.`);
        }

        // ---------------------------------------------------------------
        // 1. Create pending ImageAsset
        // ---------------------------------------------------------------

        const pendingAsset = await createImageAsset({
          fileName: file.name,
          mimeType: file.type,
          size: file.size,
          purpose,
          folder,
        });

        try {
          // -------------------------------------------------------------
          // 2. Authenticate with ImageKit
          // -------------------------------------------------------------

          const { signature, expire, token, publicKey } = await authenticate();

          // -------------------------------------------------------------
          // 3. Upload to ImageKit
          // -------------------------------------------------------------

          const fileName = fileNamePrefix
            ? `${fileNamePrefix}-${Date.now()}-${file.name}`
            : file.name;

          const response = await upload({
            file,
            fileName,
            publicKey,
            expire,
            token,
            signature,
            abortSignal,

            onProgress: (event) => {
              if (onProgress && event.total) {
                onProgress((event.loaded / event.total) * 100);
              }
            },
          });

          if (!response.url || !response.fileId || !response.name) {
            throw new Error("Invalid upload response from ImageKit.");
          }

          // -------------------------------------------------------------
          // 4. Complete ImageAsset
          // -------------------------------------------------------------

          const completedAsset = await completeImageAsset(pendingAsset.id, {
            fileId: response.fileId,
            url: response.url,
            fileName: response.name,
            mimeType: file.type,
            size: response.size ?? file.size,
            folder,
          });

          // -------------------------------------------------------------
          // 5. Return BOTH IDs
          // -------------------------------------------------------------

          return {
            assetId: completedAsset.id,
            fileId: response.fileId,
            url: response.url,
            name: response.name,
            size: response.size ?? file.size,
            mimeType: file.type,
          };
        } catch (error) {
          /*
           * Do NOT delete the ImageAsset directly here.
           *
           * Your backend cleanup job can remove abandoned PENDING assets.
           *
           * If the ImageKit upload succeeded but completeImageAsset failed,
           * the backend should eventually clean the orphaned provider file
           * according to your ImageAsset cleanup strategy.
           */
          throw error;
        }
      }),
    );

    return results;
  } catch (error) {
    if (error instanceof ImageKitAbortError) {
      throw new Error("Upload aborted.");
    }

    if (error instanceof ImageKitInvalidRequestError) {
      throw new Error(error.message);
    }

    if (error instanceof ImageKitUploadNetworkError) {
      throw new Error("Network error during image upload.");
    }

    if (error instanceof ImageKitServerError) {
      throw new Error("ImageKit server error.");
    }

    throw error;
  }
}

export async function uploadApplicationAsset({
  file,
  purpose,
  folder,
  fileNamePrefix,
  onProgress,
  abortSignal,
}: {
  file: File;
  purpose: ApplicationImageAssetPurpose;
  folder?: string;
  fileNamePrefix?: string;
  onProgress?: (progress: number) => void;
  abortSignal?: AbortSignal;
}): Promise<UploadResult> {
  const results = await uploadFiles({
    files: file,
    purpose,
    folder,
    fileNamePrefix,
    onProgress,
    abortSignal,
  });

  const result = results[0];

  if (!result) {
    throw new Error("Image upload completed without returning an asset.");
  }

  return result;
}

export async function attachKycDocument(data: {
  kycId: string;
  assetId: string;
  type: KycDocumentType;
}) {
  const response = await makeRequest.post(`/kyc/${data.kycId}/documents`, {
    assetId: data.assetId,
    type: data.type,
  });

  return response.data as KycDocumentAsset;
}

export async function getKycDocuments(kycId: string) {
  const response = await makeRequest.get(`/kyc/${kycId}/documents`);

  return response.data as KycDocumentAsset[];
}
