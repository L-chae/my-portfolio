import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Background from '../components/ui/Background';
import MouseGlowEffect from '../components/ui/MouseGlowEffect';

export const metadata: Metadata = {
  title: '이채은 | Frontend Developer',
  description: 'Frontend Developer Portfolio',
  icons: {
    icon: '/projects/ai-logo.png',
    shortcut: '/projects/ai-logo.png',
    apple: '/projects/ai-logo.png',
  },
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
      <body className="bg-base text-navy antialiased">
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
