"use client";

import { useEffect, useRef, useState } from "react";
import { VideoLoadingFallback } from "./video-loading-fallback";

interface VideoPlayerProps {
  /** Base video filename without extension (e.g., "intro_reduced_2", "spa_reduced") */
  videoSrc: string;
  /** Loading/fallback image path */
  fallbackImage: string;
  /** Alt text for the fallback image */
  fallbackAlt?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show loading progress indicator */
  showProgress?: boolean;
  /** Custom poster image (defaults to fallbackImage) */
  posterImage?: string;
}

export default function VideoPlayer({
  videoSrc,
  fallbackImage,
  fallbackAlt = "Video background",
  className = "absolute inset-0 h-full w-full object-cover",
  showProgress = false,
  posterImage,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let loadingTimeout: NodeJS.Timeout;

    // Fast loading handler
    const handleCanPlay = () => {
      setVideoLoaded(true);
      setHasError(false);
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };

    // Error handler
    const handleError = () => {
      setHasError(true);
      setVideoLoaded(true);
      if (loadingTimeout) clearTimeout(loadingTimeout);
    };

    // Quick fallback timeout (5 seconds)
    loadingTimeout = setTimeout(() => {
      setHasError(true);
      setVideoLoaded(true);
    }, 5000);

    // Add event listeners
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("loadeddata", handleCanPlay);
    video.addEventListener("error", handleError);

    // Load immediately
    video.load();

    // Try to play immediately
    video.play().catch(() => {
      // Autoplay failed, but still show video
      setVideoLoaded(true);
      if (loadingTimeout) clearTimeout(loadingTimeout);
    });

    return () => {
      if (loadingTimeout) clearTimeout(loadingTimeout);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("loadeddata", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, [videoSrc]);

  return (
    <>
      {!videoLoaded && !hasError && (
        <div className="absolute inset-0 z-10">
          <VideoLoadingFallback imageSrc={fallbackImage} alt={fallbackAlt} />
          {showProgress && (
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm">
                Video: {loadingProgress}%
              </div>
            </div>
          )}
        </div>
      )}

      {hasError && (
        <div
          className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={className}
        style={{ opacity: videoLoaded && !hasError ? 1 : 0 }}
        preload="auto"
      >
        <source
          src={`https://moviestorage.fra1.cdn.digitaloceanspaces.com/${videoSrc}.mp4`}
          type="video/mp4"
        />
        <source
          src={`https://moviestorage.fra1.cdn.digitaloceanspaces.com/${videoSrc}.webm`}
          type="video/webm"
        />
      </video>
    </>
  );
}
