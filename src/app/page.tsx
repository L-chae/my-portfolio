"use client";

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
    <div className="w-full h-full relative">
      <ChatBar />
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <CoreValuesSection />
      <Footer />
    </div>
  );
}
