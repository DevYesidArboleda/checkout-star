import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';

type UseAutoPlayProps = {
  rootMargin?: string;
  threshold?: number;
};

export const useAutoPlay = ({ rootMargin = '0px', threshold = 0.5 }: UseAutoPlayProps = {}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<ReactPlayer | any>(null);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin,
      threshold,
    });

    if (videoRef.current?.wrapper) {
      observer.observe(videoRef.current.wrapper);
    }

    return () => {
      if (videoRef.current?.wrapper) {
        observer.unobserve(videoRef.current.wrapper);
      }
    };
  }, [rootMargin, threshold]);

  return { isPlaying, videoRef };
};