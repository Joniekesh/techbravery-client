import { makeRequest } from "@/utils/makeRequest";

export async function deleteImageAsset(assetId: string) {
  if (!assetId.trim()) {
    throw new Error("ImageKit file ID is required");
  }

  const response = await makeRequest.delete(
    `/image-kit/${encodeURIComponent(assetId)}`,
  );

  return response.data;
}
