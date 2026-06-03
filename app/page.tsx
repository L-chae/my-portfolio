import HeroSection from '@/components/HeroSection';
import CoreValues from '@/components/CoreValues';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import EducationAndCert from '@/components/EducationAndCert';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="w-full h-full">
      <HeroSection />
      <CoreValues />
      <Experience />
      <Projects />
      <EducationAndCert />
      <Footer />
    </main>
  );
}