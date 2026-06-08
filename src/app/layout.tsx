import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Background from '../components/ui/Background';
import MouseGlowEffect from '../components/ui/MouseGlowEffect';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="antialiased text-slate-900 bg-white">
        <MouseGlowEffect />
        <Background />
        <Header />

        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
