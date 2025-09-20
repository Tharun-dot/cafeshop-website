import { useState, useEffect } from "react";

export const useVideoLoader = (videoSrc) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!videoSrc) {
      setIsVideoLoaded(true);
      return;
    }

    const video = document.createElement('video');
    video.src = videoSrc;
    video.preload = 'metadata';

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = () => {
      setVideoError(true);
      setIsVideoLoaded(true); // Continue loading even if video fails
    };

    const handleCanPlayThrough = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('error', handleError);

    // Start loading the video
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('error', handleError);
    };
  }, [videoSrc]);

  return { isVideoLoaded, videoError };
};
