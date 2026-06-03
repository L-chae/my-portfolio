'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react'; // 햄버거 메뉴용 아이콘 추가

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; 
      const sections = ['hero', 'core-values', 'experience', 'projects'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // 💡 offsetTop 대신 안전한 절대 좌표 계산법 적용
          const absoluteTop = element.getBoundingClientRect().top + window.scrollY;
          if (absoluteTop <= scrollPosition) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll(); 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
      const headerOffset = 80;
      // 💡 이동할 때도 동일하게 절대 좌표 사용
      const absoluteTop = element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: absoluteTop - headerOffset,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false); // 이동 후 모바일 메뉴 닫기
    }
  };

  const navItems = [
    { id: 'core-values', label: 'Core Values' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 py-5 bg-white/70 backdrop-blur-md border-b border-slate-200/50 transition-all">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        
        <a 
          href="#hero" 
          onClick={(e) => scrollToSection(e, 'hero')}
          className="text-xl font-extrabold tracking-tight text-slate-900"
        >
          김민준<span className="text-blue-600">.dev</span>
        </a>
        
        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex gap-8 text-[15px] font-semibold">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`relative pb-1 transition-colors duration-200 ${
                activeSection === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.label}
              <span className={`absolute left-0 bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                activeSection === item.id ? 'w-full' : 'w-0'
              }`}></span>
            </a>
          ))}
        </nav>

        {/* 💡 모바일 햄버거 토글 버튼 */}
        <button 
          className="md:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 💡 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex flex-col gap-4 text-sm font-semibold text-slate-600 shadow-lg">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className={`${activeSection === item.id ? 'text-blue-600' : 'text-slate-600'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}