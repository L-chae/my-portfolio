'use client';

import Header from '@/components/Header';
import DynamicChatBar from '@/components/DynamicChatBar';
import HeroSection from '@/components/HeroSection';
import CoreValues from '@/components/CoreValues';
import ExperienceAndInfo from '@/components/ExperienceAndInfo';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal'; // 커스텀 훅 임포트

export default function Home() {
  useScrollReveal(); // 전역 스크롤 애니메이션 실행

  return (
    <main className="w-full h-full relative">
      <Header />
      <DynamicChatBar />
      <HeroSection />
      <ExperienceAndInfo />
      <Projects />
      <CoreValues />
      <Footer />
    </main>
  );
}