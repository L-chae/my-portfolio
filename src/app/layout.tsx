'use client';

import { useEffect } from 'react';
import './globals.css';
import Header from '../components/Header';
import Background from '../components/ui/Background';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  // 마우스 트래킹 로직: 성능을 위해 passive 이벤트 등록 고려
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      // requestAnimationFrame은 렌더링 성능 최적화의 핵심입니다.
      window.requestAnimationFrame(() => {
        const cards = document.querySelectorAll('.glow-card');
        cards.forEach((el) => {
          const card = el as HTMLElement;
          const rect = card.getBoundingClientRect();
          
          // 뷰포트 내에 있는 카드만 계산하여 불필요한 연산 차단
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          if (isVisible) {
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          }
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <html lang="ko" className="scroll-smooth">
      <body className="antialiased text-slate-900 bg-white">
        <Background />
        <Header />
        
        {/* main 태그에 min-h-screen을 주어 레이아웃 안정성 확보 */}
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}