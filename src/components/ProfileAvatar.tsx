import { useState } from "react";
import { SITE_URLS } from "@/config/urls";

interface ProfileAvatarProps {
  alt: string;
  size: number;
  className?: string;
  loading?: "eager" | "lazy";
}

/** Profile avatar with a local icon fallback when external image hosts are unreachable. */
export default function ProfileAvatar({ alt, size, className, loading }: ProfileAvatarProps) {
  const [src, setSrc] = useState<string>(SITE_URLS.profileImage);

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading={loading}
      className={className}
      onError={() => {
        if (src !== SITE_URLS.profileFallbackImage) {
          setSrc(SITE_URLS.profileFallbackImage);
        }
      }}
    />
  );
}
