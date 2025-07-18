import { useEffect, useCallback } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenis = (window as any).lenis as Lenis | undefined;

  const scrollTo = useCallback((target: string | number | HTMLElement, options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
    immediate?: boolean;
    lock?: boolean;
    force?: boolean;
    onComplete?: () => void;
  }) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    }
  }, [lenis]);

  const scrollToTop = useCallback((options?: {
    duration?: number;
    easing?: (t: number) => number;
  }) => {
    scrollTo(0, options);
  }, [scrollTo]);

  const scrollToBottom = useCallback((options?: {
    duration?: number;
    easing?: (t: number) => number;
  }) => {
    scrollTo(document.body.scrollHeight, options);
  }, [scrollTo]);

  const stop = useCallback(() => {
    if (lenis) {
      lenis.stop();
    }
  }, [lenis]);

  const start = useCallback(() => {
    if (lenis) {
      lenis.start();
    }
  }, [lenis]);

  const resize = useCallback(() => {
    if (lenis) {
      lenis.resize();
    }
  }, [lenis]);

  return {
    lenis,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    stop,
    start,
    resize
  };
};

export default useLenis;
