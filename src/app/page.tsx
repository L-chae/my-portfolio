'use client';

import Header from '@/components/Header';
import ChatBar from '@/components/chat/ChatBar';
import HeroSection from '@/components/HeroSection';
import CoreValues from '@/components/CoreValues';
import ExperienceAndInfo from '@/components/ExperienceAndInfo';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

// 1. 데이터 파일 임포트
import { portfolioData } from '@/content/data';

export default function Home() {
  return (
    <main className="w-full h-full relative">
      <Header />
      <ChatBar />
      <HeroSection />
      <ExperienceAndInfo />
      
      {/* 2. 데이터 주입 */}
      <Projects projects={portfolioData.projects} />
      <CoreValues values={portfolioData.coreValues} />
      
      <Footer />
    </main>
  );
}