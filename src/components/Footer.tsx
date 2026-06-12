'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <footer className="border-t border-line-dark bg-navy px-6 py-12 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-center text-xs leading-6 text-white/60 md:text-left">
          © 2026 이채은. Built with Next.js, TypeScript, and Portfolio AI. All rights reserved.
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 rounded-full border border-line-dark px-3 py-2 text-[12px] font-bold text-white/70 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
        >
          TOP <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
