'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

// 콘텐츠 섹션 순서와 반드시 일치해야 함 (스크롤 감지가 순서 의존적)
const NAV_ITEMS = [
  { id: 'hero',        label: 'Home' },
  { id: 'experience',  label: 'Experience' },
  { id: 'core-values', label: 'Core Values' },
  { id: 'projects',    label: 'Projects' },
];

const HEADER_HEIGHT = 64; // px — header h-16 고정값과 동기화

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef<HTMLElement>(null);
  const sectionOffsets = useRef<{ id: string; top: number }[]>([]);
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  // indicator는 activeSection state 변경 후 DOM 반영이 끝난 뒤 읽어야 정확한 위치를 얻음
  // → activeSection을 useEffect로 감지해서 처리
  useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(
      `[data-id="${activeSection}"]`
    ) as HTMLElement | null;
    if (!activeEl) return;
    setIndicator({
      left: activeEl.offsetLeft,
      width: activeEl.offsetWidth,
      opacity: 1,
    });
  }, [activeSection]);

  const calculateOffsets = useCallback(() => {
    sectionOffsets.current = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      return {
        id,
        top: el ? el.getBoundingClientRect().top + window.scrollY : 0,
      };
    });
  }, []); // NAV_ITEMS는 파일 스코프 상수라 의존성 불필요

  const evaluateScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);

    if (isClickScrolling.current || sectionOffsets.current.length === 0) return;

    // 뷰포트 40% 지점 기준 — 너무 낮으면 섹션 전환이 늦고, 너무 높으면 너무 빠름
    const triggerPoint = scrollY + window.innerHeight * 0.4;

    let current = 'hero';
    for (const { id, top } of sectionOffsets.current) {
      if (triggerPoint >= top) current = id;
    }
    setActiveSection(current);
  }, []);

  // offset 계산과 scroll 리스너는 분리. activeSection을 의존성에 넣으면
  // 섹션 바뀔 때마다 리스너가 재등록되므로 제거.
  useEffect(() => {
    calculateOffsets();

    window.addEventListener('load', calculateOffsets);
    window.addEventListener('resize', calculateOffsets);

    return () => {
      window.removeEventListener('load', calculateOffsets);
      window.removeEventListener('resize', calculateOffsets);
    };
  }, [calculateOffsets, evaluateScrollPosition]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        evaluateScrollPosition();
        scrollRafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [evaluateScrollPosition]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    isClickScrolling.current = true;
    setActiveSection(id);
    setIsMobileMenuOpen(false);

    const offsetTop = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top: Math.max(0, offsetTop), behavior: 'smooth' });

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  }, []);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-0'
          : 'bg-transparent border-transparent py-2'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-lg font-extrabold text-slate-900 tracking-tight hover:opacity-70 transition-opacity"
        >
          Minjun<span className="text-blue-600">.dev</span>
        </button>

        {/* 데스크탑 nav */}
        <nav
          ref={navRef}
          className="hidden md:flex relative gap-8 text-[12px] font-bold tracking-[0.15em] uppercase text-slate-500"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              data-id={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`py-5 transition-colors duration-200 ${
                activeSection === item.id ? 'text-slate-900' : 'hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* indicator: transform으로 이동 — left 직접 변경보다 GPU 처리됨 */}
          <span
            className="absolute bottom-3.5 left-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-out pointer-events-none"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden p-2 text-slate-900"
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-xl absolute w-full ${
          isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <nav className="px-6 py-4 flex flex-col gap-4 text-sm font-bold text-slate-600">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left py-2 transition-colors uppercase tracking-widest ${
                activeSection === item.id ? 'text-blue-600' : 'hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}