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

    // Handle loading progress
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(0);
        const duration = video.duration;
        const progress = Math.round((bufferedEnd / duration) * 100);
        setLoadingProgress(progress);
      }
    };

    // Handle video readiness
    const handleCanPlay = () => {
      setVideoLoaded(true);
    };

    // Handle video errors
    const handleError = (e: Event) => {
      // eslint-disable-next-line no-console
      console.error("Video error:", e);
      setHasError(true);
      setVideoLoaded(true); // Hide loading indicator
    };

    // Handle source errors (when a specific format fails)
    const handleSourceError = () => {
      // eslint-disable-next-line no-console
      console.warn("Video source failed, trying next format...");
    };

    // Add all the event listeners
    video.addEventListener("progress", handleProgress);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.addEventListener("abort", handleError);
    video.addEventListener("stalled", handleError);

    // Add error handling for source elements
    const sources = video.querySelectorAll("source");
    sources.forEach((source) => {
      source.addEventListener("error", handleSourceError);
    });

    video.load(); // Explicitly load the video

    // Attempt to play when ready
    video.addEventListener("loadedmetadata", () => {
      video.play().catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Autoplay prevented:", error);
        setVideoLoaded(true); // Show video anyway if autoplay fails
      });
    });

    return () => {
      // Clean up all event listeners
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("abort", handleError);
      video.removeEventListener("stalled", handleError);

      sources.forEach((source) => {
        source.removeEventListener("error", handleSourceError);
      });
    };
  }, []);

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
        poster={posterImage || fallbackImage}
      >
        {/* WebM format for modern browsers (better compression) */}
        <source
          src={`https://moviestorage.fra1.cdn.digitaloceanspaces.com/${videoSrc}.webm`}
          type="video/webm; codecs=vp9"
        />
        {/* H.264 MP4 for broader compatibility */}
        <source
          src={`https://moviestorage.fra1.cdn.digitaloceanspaces.com/${videoSrc}_h264.mp4`}
          type="video/mp4; codecs=avc1.42E01E"
        />
        {/* Original MP4 as final fallback */}
        <source
          src={`https://moviestorage.fra1.cdn.digitaloceanspaces.com/${videoSrc}.mp4`}
          type="video/mp4"
        />
        {/* Fallback message for unsupported browsers */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
          <p>Your browser does not support video playback.</p>
        </div>
      </video>
    </>
  );
}
