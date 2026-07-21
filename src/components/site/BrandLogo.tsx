import { useEffect, useRef, useState } from "react";
import { officialLogoUrl } from "@/lib/site-content";

type BrandLogoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export function BrandLogo({
  src,
  alt,
  width,
  height,
  className,
  loading,
  fetchPriority,
}: BrandLogoProps) {
  const requestedSrc = src.trim() || officialLogoUrl;
  const [currentSrc, setCurrentSrc] = useState(requestedSrc);
  const fallbackApplied = useRef(false);

  useEffect(() => {
    fallbackApplied.current = false;
    setCurrentSrc(requestedSrc);
  }, [requestedSrc]);

  const handleError = () => {
    if (fallbackApplied.current || currentSrc === officialLogoUrl) return;
    fallbackApplied.current = true;
    setCurrentSrc(officialLogoUrl);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={handleError}
    />
  );
}
