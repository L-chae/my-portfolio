'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timerRef.current) clearTimeout(timerRef.current);

      timerRef.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
        
        const sections = ['hero', 'experience', 'projects', 'core-values'];
        const scrollPosition = window.scrollY + 200;
        
        let current = 'hero';
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= scrollPosition) {
            current = id;
          }
        }
        setActiveSection(current);
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'core-values', label: 'Core Values' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/60 backdrop-blur-md border-b border-slate-200' : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
        <button onClick={() => scrollToSection('hero')} className="text-lg font-bold text-slate-900">
          Lee<span className="text-blue-600">.dev</span>
        </button>

        <nav className="hidden md:flex gap-8 text-[13px] font-bold tracking-widest text-slate-500">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative py-5 transition-colors ${activeSection === item.id ? 'text-slate-900' : 'hover:text-slate-900'}`}
            >
              {item.label}
              <span className={`absolute left-0 bottom-3.5 h-px bg-slate-900 transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0'}`} />
            </button>
          ))}
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