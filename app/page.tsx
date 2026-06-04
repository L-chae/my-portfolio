'use client';

import Header from '@/components/Header';
import ChatBar from '@/components/chat/ChatBar';
import HeroSection from '@/components/HeroSection';
import CoreValues from '@/components/CoreValues';
import ExperienceAndInfo from '@/components/ExperienceAndInfo';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="w-full h-full relative">
      <Header />
      <ChatBar />
      <HeroSection />
      <ExperienceAndInfo />
      <Projects />
      <CoreValues />
      <Footer />
    </main>
  );
}