// hooks/useActiveSection.ts
import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        const nextSection = sectionIds.reduce<{
          id: string;
          ratio: number;
        } | null>((best, id) => {
          const ratio = visibleSections.get(id) ?? 0;
          if (ratio === 0) return best;
          if (!best || ratio > best.ratio) return { id, ratio };
          return best;
        }, null);

        if (nextSection) {
          setActiveSection(nextSection.id);
        }
      },
      { threshold: [0.1, 0.25, 0.5, 0.75] }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}
