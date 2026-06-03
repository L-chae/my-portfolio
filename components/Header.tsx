'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 💡 섹션 판단 범위를 좁혀 중복 활성화 방지
      const scrollPosition = window.scrollY + 150;
      const sections = ['hero', 'experience', 'projects', 'core-values'];
      let current = 'hero';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
          if (absoluteTop <= scrollPosition) current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 64,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
      setActiveSection(id); // 💡 클릭 시 즉시 활성화 상태 변경
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'core-values', label: 'Core Values' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        
        <a href="#hero" onClick={(e) => scrollToSection(e, 'hero')} className="text-lg font-bold text-slate-900">
          Lee<span className="text-blue-600">.dev</span>
        </a>
        
        <nav className="hidden md:flex gap-8 text-[13px] font-bold tracking-widest text-slate-500">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`relative py-5 transition-colors ${
                activeSection === item.id ? 'text-slate-900' : 'hover:text-slate-900'
              }`}
            >
              {item.label}
              
              {/* 💡 오직 활성화된 상태에서만 밑줄 표시 */}
              <span className={`absolute left-0 bottom-3.5 h-[1px] bg-slate-900 transition-all duration-300 ease-out 
                ${activeSection === item.id ? 'w-full' : 'w-0'}`}
              ></span>
            </a>
          ))}
        </nav>

        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white px-6 py-6 flex flex-col gap-5 text-sm font-bold text-slate-600 border-t border-slate-100">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}