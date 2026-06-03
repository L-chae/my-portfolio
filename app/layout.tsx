'use client'; // 이벤트 리스너를 사용하기 위해 클라이언트 컴포넌트로 전환

import { useEffect } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  // 마우스 위치를 추적하여 모든 glow-card에 CSS 변수를 주입하는 React 로직
useEffect(() => {
    // 터치 디바이스(모바일) 감지: 모바일이면 마우스 트래킹 이벤트 등록 안 함
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.glow-card') as NodeListOf<HTMLElement>;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <html lang="ko">
      <body className="antialiased">
        {/* HTML 템플릿의 배경 패턴 및 Ambient Orb 포팅 */}
        <div className="bg-pattern" />
        <div className="ambient-orb" style={{ width: '50vw', height: '50vw', background: '#dbeafe', top: '-10%', left: '-10%' }} />
        <div className="ambient-orb" style={{ width: '40vw', height: '40vw', background: '#f3e8ff', bottom: '-10%', right: '-10%', animationDelay: '-5s' }} />
        
        {children}
      </body>
    </html>
  );
}