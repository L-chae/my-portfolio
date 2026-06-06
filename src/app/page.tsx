'use client';

import Header from '@/components/Header';
import ChatBar from '@/components/chat/ChatBar';
import HeroSection from '@/components/HeroSection';
import PortfolioContent from '@/components/PortfolioContent';
import Footer from '@/components/Footer';

// 1. 데이터 파일 임포트
//import { portfolioData } from '@/content/data';

export default function Home() {
  return (
    <main className="w-full h-full relative">
      <Header />
      <ChatBar />
      <HeroSection />
      <PortfolioContent />
      <Footer />
    </main>
  );
}