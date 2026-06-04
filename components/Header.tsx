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

  // 1. 네비게이션 밑줄 인디케이터 업데이트
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

  // 2. 각 섹션의 절대 좌표 계산 및 캐싱 (Reflow 최소화)
  const calculateOffsets = useCallback(() => {
    sectionOffsets.current = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      return {
        id,
        // 현재 스크롤 위치를 더해 문서 최상단 기준 절대 좌표 획득
        top: el ? el.getBoundingClientRect().top + window.scrollY : 0,
      };
    });
  }, []);

  useEffect(() => {
    updateIndicator(activeSection);
  }, [activeSection, updateIndicator]);

  // 최초 로드 및 리사이즈 시 좌표 캐싱
  useEffect(() => {
    // DOM 렌더링이 완료된 후 좌표 계산
    setTimeout(calculateOffsets, 100); 
    
    window.addEventListener('resize', calculateOffsets);
    return () => window.removeEventListener('resize', calculateOffsets);
  }, [calculateOffsets]);

  // 3. 캐시된 좌표 기반 초경량 스크롤 스파이
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // 클릭으로 인한 자동 스크롤 중에는 스크롤 스파이 중지
      if (isClickScrolling.current) return;

      // 뷰포트 높이의 40% 지점을 감지 기준으로 설정 (수치 조건: 일반적인 UX 기준)
      const triggerPoint = window.scrollY + window.innerHeight * 0.4;
      
      let current = 'hero';
      for (let i = 0; i < sectionOffsets.current.length; i++) {
        if (triggerPoint >= sectionOffsets.current[i].top) {
          current = sectionOffsets.current[i].id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    isClickScrolling.current = true;
    setActiveSection(id);
    setIsMobileMenuOpen(false);

    // 고정 헤더 높이(64px)를 고려한 스크롤 위치 보정
    const offsetTop = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });

    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/75 backdrop-blur-lg border-b border-slate-200/60 shadow-sm' : 'bg-transparent border-transparent'
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
            className="absolute bottom-3.5 left-0 h-[2px] bg-slate-900 rounded-full transition-all duration-300 ease-out pointer-events-none"
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

      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white px-6 py-6 flex flex-col gap-5 text-sm font-bold text-slate-600 border-t border-slate-100 shadow-xl absolute w-full">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left py-2 active:text-slate-900">
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}