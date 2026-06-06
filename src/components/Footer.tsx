'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
    
          
          {/* 구분선 */}
          <div className="w-px h-4 bg-slate-300 mx-2" />

          {/* 맨 위로 가기 버튼 */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 text-[12px] font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            TOP <ArrowUp size={14} />
          </button>
        </div>
        
    </footer>
  );
}