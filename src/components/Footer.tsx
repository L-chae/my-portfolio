'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-center text-xs leading-6 text-zinc-500 md:text-left">
          © 2026 이채은. Built with Next.js, TypeScript, and Portfolio AI. All rights reserved.
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 p-2 text-[12px] font-bold text-zinc-500 transition-colors hover:text-slate-900"
        >
          TOP <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  );
}
