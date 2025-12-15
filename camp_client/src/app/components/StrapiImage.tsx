import Image from "next/image";
import { getStrapiURL } from "@/app/utils/get-strapi-url";

interface StrapiImageProps {
  src: string;
  alt: string;
  className?: string;
  [key: string]: string | number | boolean | undefined;
}

export function StrapiImage({
  src,
  alt,
  className,
  ...rest
}: Readonly<StrapiImageProps>) {
  const imageUrl = getStrapiMedia(src);

  console.log("this is the image url" + imageUrl);

  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      className={className}
      {...rest}
      unoptimized
    />
  );
}

export function getStrapiMedia(url: string | null) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return getStrapiURL() + url;
}
