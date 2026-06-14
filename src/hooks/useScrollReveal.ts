'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>('.scroll-reveal'));

    if (root.matches('.scroll-reveal')) {
      revealTargets.unshift(root);
    }

    if (revealTargets.length === 0) return;

    const showAll = () => {
      revealTargets.forEach((element) => {
        element.classList.add('is-visible');
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          const shouldRepeat = element.dataset.revealRepeat === 'true';

          if (entry.isIntersecting) {
            element.classList.add('is-visible');

            if (!shouldRepeat) {
              observer.unobserve(element);
            }

            return;
          }

          if (!shouldRepeat) return;

          const isBelowViewport = entry.boundingClientRect.top > window.innerHeight * 0.85;

          if (isBelowViewport) {
            element.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -12% 0px',
      }
    );

    revealTargets.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return containerRef;
}
