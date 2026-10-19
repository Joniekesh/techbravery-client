import { Image } from "@imagekit/react";

interface ImageAssetLike {
  url: string;
}

interface ImageContainerProps {
  src: string | ImageAssetLike | null | undefined;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  alt?: string;
}

const ImageContainer = ({
  src,
  className,
  width = 500,
  height = 500,
  loading = "lazy",
  alt = "Image",
}: ImageContainerProps) => {
  const endPoint = import.meta.env.VITE_API_IMAGE_KIT_ENDPOINT;

  const imageSrc =
    typeof src === "string" ? src.trim() : (src?.url?.trim() ?? "");

  if (!imageSrc) {
    return null;
  }

  return (
    <Image
      urlEndpoint={endPoint}
      src={imageSrc}
      width={width}
      height={height}
      alt={alt}
      loading={loading}
      className={className}
      // transformation={[
      //   { aiUpscale: true },
      //   {
      //     blur: 30,
      //     quality: 20,
      //   },
      // ]}
    />
  );
};

export default ImageContainer;
