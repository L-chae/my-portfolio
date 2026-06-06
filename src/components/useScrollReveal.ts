import { useEffect, useRef } from 'react';

/**
 * 컨테이너 내 `.scroll-reveal` 요소에 IntersectionObserver를 등록합니다.
 * - 마운트 시점에 이미 뷰포트 안에 있는 요소는 즉시 `is-visible` 처리
 *   (opacity:0 깜빡임 방지)
 * - 뷰포트 밖 요소만 Observer로 감시
 * - 컴포넌트 언마운트 시 Observer 자동 정리
 *
 * 반환된 ref를 감시 대상의 최상위 컨테이너에 붙이세요.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // 한 번 보인 요소는 더 이상 감시 불필요
          }
        });
      },
      { threshold: 0 } // 1px이라도 걸리면 즉시 트리거
    );

    const elements = container.querySelectorAll<HTMLElement>('.scroll-reveal');

    elements.forEach((el) => {
      const { top, bottom } = el.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
        // 이미 화면 안 → 즉시 visible (Observer 등록 전 깜빡임 방지)
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []); // 마운트 1회 실행. 섹션 데이터는 정적이므로 재실행 불필요

  return containerRef;
}
