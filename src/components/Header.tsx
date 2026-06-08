'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero',        label: 'Home' },
  { id: 'experience',  label: 'Experience' },
  { id: 'core-values', label: 'Core Values' },
  { id: 'projects',    label: 'Projects' },
];

const HEADER_HEIGHT = 64;

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

  // 모바일 메뉴 오픈 시 배경 스크롤 차단
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
  }, []);

  const evaluateScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20); // 💡 투명도 변화를 더 민감하게(50->20) 감지

    if (isClickScrolling.current || sectionOffsets.current.length === 0) return;

    const triggerPoint = scrollY + window.innerHeight * 0.4;
    const isBottomReached = Math.ceil(scrollY + window.innerHeight) >= document.documentElement.scrollHeight;

    let current = NAV_ITEMS[0].id;

    if (isBottomReached) {
      current = sectionOffsets.current[sectionOffsets.current.length - 1].id;
    } else {
      for (const { id, top } of sectionOffsets.current) {
        if (triggerPoint >= top) current = id;
      }
    }
    
    setActiveSection(current);
  }, []);

  // 새로고침 시 인디케이터 즉시 동기화 로직 포함
  useEffect(() => {
    calculateOffsets();
    
    const initTimer = setTimeout(() => {
      evaluateScrollPosition();
    }, 50);

    const handleLoadAndResize = () => {
      calculateOffsets();
      evaluateScrollPosition();
    };

    window.addEventListener('load', handleLoadAndResize);
    window.addEventListener('resize', handleLoadAndResize);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('load', handleLoadAndResize);
      window.removeEventListener('resize', handleLoadAndResize);
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

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled || isMobileMenuOpen
          ? 'bg-white/40 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-0'
          : 'bg-transparent border-transparent py-2'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-lg font-extrabold text-slate-900 tracking-tight hover:opacity-70 transition-opacity"
        >
          Lee<span className="text-blue-600">.dev</span>
        </button>

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
          <span
            className="absolute bottom-3.5 left-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-out pointer-events-none"
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: `${indicator.width}px`,
              opacity: indicator.opacity,
            }}
          />
        </nav>

        <button
          className="md:hidden p-2 text-slate-900 transition-transform"
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white/60 backdrop-blur-xl border-t border-white/50 shadow-xl absolute w-full ${
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