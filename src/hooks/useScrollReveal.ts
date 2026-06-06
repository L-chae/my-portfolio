import { useEffect, useRef, DependencyList } from 'react';

/**
 * @param deps 비동기 데이터로 인해 DOM이 늦게 그려질 경우, 해당 데이터를 배열로 주입하여 옵저버를 재실행합니다.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(deps: DependencyList = []) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              entry.target.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );

    const rAF = requestAnimationFrame(() => {
      const elements = container.querySelectorAll<HTMLElement>('.scroll-reveal');

      elements.forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        if (top < window.innerHeight && bottom > 0) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(rAF);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps); 

  return containerRef;
}