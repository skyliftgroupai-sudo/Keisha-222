"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Hero background video: autoplay, muted, looping, no controls.
 *
 * - `className` sizes/positions the element; the caller controls layout.
 * - Falls back to `fallbackImage` if the video fails to load for any reason.
 * - Honors `prefers-reduced-motion`: pauses immediately after the first
 *   frame renders, rather than looping continuously.
 */
export function HeroVideo({
  src,
  poster,
  fallbackImage,
  fallbackAlt,
  className,
  priorityImage = false,
}: {
  src: string;
  poster: string;
  fallbackImage: string;
  fallbackAlt: string;
  className?: string;
  priorityImage?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      const pauseOnData = () => video.pause();
      video.addEventListener("loadeddata", pauseOnData, { once: true });
      return () => video.removeEventListener("loadeddata", pauseOnData);
    }
  }, []);

  if (failed) {
    return (
      <Image
        src={fallbackImage}
        alt={fallbackAlt}
        fill
        priority={priorityImage}
        sizes="100vw"
        className={cn("img-grade object-cover", className)}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={cn("object-cover", className)}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onError={() => setFailed(true)}
    />
  );
}
