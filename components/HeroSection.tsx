'use client';

import { useEffect, useState } from 'react';
import { portfolioData } from '../content/data';
// import ChatWidget from './ChatWidget';
import MockupChatWidget from './MockupChatWidget';
import { Terminal, ArrowDown } from 'lucide-react'; // Github 제거

// 대체용 커스텀 GitHub SVG 아이콘
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const fullText = "const role = 'Scenario_Validator';";

  useEffect(() => {
    let currentLength = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, currentLength + 1));
      currentLength++;
      if (currentLength >= fullText.length) clearInterval(typingInterval);
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-12 relative z-10">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="reveal">
          <div className="font-mono text-sm font-bold text-blue-600 mb-6 flex items-center gap-2">
            <Terminal size={18} />
            <span className="border-r-2 border-blue-600 pr-1 animate-pulse">
              {typedText}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-slate-900">
            {portfolioData.name} <br />
            <span className="text-blue-600 block mt-2 text-4xl">{portfolioData.role}</span>
          </h1>
          
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md font-medium">
            {portfolioData.introduction}
          </p>
          
          <div className="flex gap-4">
            <a 
              href="#experience" 
              className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
            >
              경험 확인하기 <ArrowDown size={18} />
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm"
            >
              <GithubIcon size={18} /> GitHub
            </a>
          </div>
        </div>

        <div className="reveal delay-1 flex justify-center lg:justify-end">
          <div className="glow-card p-1 w-full max-w-md bg-white/50">
            <div className="glow-content">
              {/* <ChatWidget /> */}
              <MockupChatWidget />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}