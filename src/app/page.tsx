"use client";

import Header from "@/components/Header";
import ChatBar from "@/components/chat/ChatBar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ExperienceSection from "@/components/ExperienceSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import ProjectsSection from "@/components/ProjectsSection";
// 1. 데이터 파일 임포트
//import { portfolioData } from '@/content/data';

export default function Home() {
  return (
    <main className="w-full h-full relative">
      <Header />
      <ChatBar />
      <HeroSection />
      <ExperienceSection />
      <CoreValuesSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
