'use client';

import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Tailwind JIT 누락을 막기 위해 data 속성 사용
            entry.target.setAttribute('data-visible', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // DOM 트리가 완전히 구성된 직후 탐색하도록 미세 지연(안전 장치)
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        const reveals = containerRef.current.querySelectorAll('.reveal');
        reveals.forEach((el) => observer.observe(el));
      }
    }, 50);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return containerRef;
}