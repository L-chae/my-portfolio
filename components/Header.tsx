'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isReady, setIsReady] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const isClickScrolling = useRef(false);
  const clickScrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Update the sliding indicator position and width
  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const activeEl = navRef.current.querySelector(`[data-id="${activeSection}"]`) as HTMLElement;
        if (activeEl) {
          setIndicatorStyle({
            left: activeEl.offsetLeft,
            width: activeEl.offsetWidth,
            opacity: 1,
          });
          // Enable transitions only after the initial position is set
          setTimeout(() => setIsReady(true), 50);
        }
      }
    };

    updateIndicator();
    // Minor delay to ensure fonts/layout shift is settled
    const timeoutId = setTimeout(updateIndicator, 100);
    window.addEventListener('resize', updateIndicator);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [activeSection]);

  // Scroll handler with optimized scroll-spy lock
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // If we are scrolling via a menu click, keep scroll spy disabled
      // until scrolling completely stops for 150ms.
      if (isClickScrolling.current) {
        if (clickScrollTimer.current) clearTimeout(clickScrollTimer.current);
        clickScrollTimer.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 150);
        return;
      }

      // Normal scroll spy
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const sections = ['hero', 'experience', 'projects', 'core-values'];
        const scrollPosition = window.scrollY + 200;
        
        let current = 'hero';
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const elTop = el.getBoundingClientRect().top + window.scrollY;
            if (elTop <= scrollPosition) {
              current = id;
            }
          }
        }
        setActiveSection(current);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (clickScrollTimer.current) clearTimeout(clickScrollTimer.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isClickScrolling.current = true;
      setActiveSection(id); // Instantly move the indicator
      setIsMobileMenuOpen(false);

      const elTop = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elTop - 64, behavior: 'smooth' });

      // Fallback safeguard in case scroll events never fire
      if (clickScrollTimer.current) clearTimeout(clickScrollTimer.current);
      clickScrollTimer.current = setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'core-values', label: 'Core Values' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/75 backdrop-blur-lg border-b border-slate-200/60 shadow-sm' : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <button onClick={() => scrollToSection('hero')} className="text-lg font-bold text-slate-900">
          Lee<span className="text-blue-600">.dev</span>
        </button>

        <nav ref={navRef} className="hidden md:flex relative gap-8 text-[13px] font-bold tracking-widest text-slate-500">
          {navItems.map((item) => (
            <button
              key={item.id}
              data-id={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`py-5 transition-colors ${activeSection === item.id ? 'text-slate-900' : 'hover:text-slate-900'}`}
            >
              {item.label}
            </button>
          ))}
          {/* Hardware-accelerated sliding indicator */}
          <span 
            className={`absolute bottom-3.5 left-0 h-[2px] bg-slate-900 rounded-full ease-out ${isReady ? 'transition-all duration-300' : 'transition-none'}`}
            style={{ 
              transform: `translateX(${indicatorStyle.left}px)`, 
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity 
            }} 
          />
        </nav>

        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white px-6 py-6 flex flex-col gap-5 text-sm font-bold text-slate-600 border-t border-slate-100">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-left">
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}