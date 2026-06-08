import { useEffect, useRef, DependencyList } from 'react';

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

    const outerRaf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const elements = container.querySelectorAll<HTMLElement>('.scroll-reveal');

        elements.forEach((el) => {
          const { top, bottom } = el.getBoundingClientRect();
          if (top < window.innerHeight && bottom > 0) {
            // 트랜지션 없이 즉시 표시
            el.style.transition = 'none';
            el.classList.add('is-visible');
            el.getBoundingClientRect(); // force reflow
            requestAnimationFrame(() => {
              el.style.transition = '';
            });
          } else {
            observer.observe(el);
          }
        });
      });
    });

    return () => {
      cancelAnimationFrame(outerRaf);
      observer.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}