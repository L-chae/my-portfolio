'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'core-values', label: 'Core Values' }
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef<HTMLElement>(null);
  const sectionOffsets = useRef<{ id: string; top: number }[]>([]);
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRafRef = useRef<number | null>(null); // rAF 식별자

  // 1. 인디케이터 업데이트 로직
  const updateIndicator = useCallback((id: string) => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-id="${id}"]`) as HTMLElement;
    if (activeEl) {
      setIndicator({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  }, []);

  // 2. 좌표 계산 로직
  const calculateOffsets = useCallback(() => {
    sectionOffsets.current = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      return {
        id,
        top: el ? el.getBoundingClientRect().top + window.scrollY : 0,
      };
    });
  }, []);

  // 3. 스크롤 평가 로직 (rAF 내부에서 실행될 핵심 로직)
  const evaluateScrollPosition = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);
    
    if (isClickScrolling.current || sectionOffsets.current.length === 0) return;

    const triggerPoint = scrollY + window.innerHeight * 0.4;
    
    let current = 'hero';
    for (let i = 0; i < sectionOffsets.current.length; i++) {
      if (triggerPoint >= sectionOffsets.current[i].top) {
        current = sectionOffsets.current[i].id;
      }
    }
    setActiveSection(current);
  }, []);

  // 새로고침 대응 및 초기 세팅
// 새로고침 대응 및 초기 세팅
  useEffect(() => {
    // 1. 오프셋 계산은 DOM 읽기만 수행하므로 동기 실행 무방
    calculateOffsets();

    // 2. 상태 업데이트(setState)를 동반하는 로직은 다음 프레임으로 지연 처리 (ESLint 경고 해결)
    requestAnimationFrame(() => {
      evaluateScrollPosition();
      updateIndicator(activeSection);
    });

    window.addEventListener('load', calculateOffsets);
    window.addEventListener('resize', calculateOffsets);

    return () => {
      window.removeEventListener('load', calculateOffsets);
      window.removeEventListener('resize', calculateOffsets);
    };
  }, [calculateOffsets, evaluateScrollPosition, updateIndicator, activeSection]);
  // 성능이 최적화된 스크롤 이벤트 리스너
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRafRef.current) return; // 이미 예약된 프레임이 있으면 무시

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    isClickScrolling.current = true;
    setActiveSection(id);
    updateIndicator(id); // 즉각적인 UI 반영
    setIsMobileMenuOpen(false);

    const offsetTop = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm' : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <button onClick={() => scrollToSection('hero')} className="text-lg font-bold text-slate-900">
          Lee<span className="text-blue-600">.dev</span>
        </button>

        <nav ref={navRef} className="hidden md:flex relative gap-8 text-[13px] font-bold tracking-widest text-slate-500">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              data-id={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`py-5 transition-colors ${activeSection === item.id ? 'text-slate-900' : 'hover:text-slate-900'}`}
            >
              {item.label}
            </button>
          ))}
          <span 
            className="absolute bottom-3.5 left-0 h-0.5 bg-slate-900 rounded-full transition-all duration-300 ease-out pointer-events-none"
            style={{ 
              transform: `translateX(${indicator.left}px)`, 
              width: `${indicator.width}px`,
              opacity: indicator.opacity 
            }} 
          />
        </nav>

        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* 모바일 메뉴 스타일 대응: 페이드 & 슬라이드 애니메이션 추가 */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-slate-100 shadow-xl absolute w-full ${
        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <nav className="px-6 py-4 flex flex-col gap-4 text-sm font-bold text-slate-600">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)} 
              className={`text-left py-2 transition-colors ${activeSection === item.id ? 'text-blue-600' : 'active:text-slate-900'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}