"use client";

import { Building2 } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SectionLayout } from "./ui/SectionLayout";
import { SectionHeading } from "./ui/SectionHeading";

const EXPERIENCE = {
  company: "HiveLab",
  title: "AI 데이터 품질 관리 · 마크업 준비",
  period: "2026.05.06 ~ 2026.07.15",
};

const EXPERIENCE_ITEMS = [
  {
    label: "디자인 데이터 정리",
    text: "PSD 내부 레이어와 버튼, 배너, 텍스트, 이미지 같은 UI 요소가 기준에 맞게 구성되어 있는지 확인했습니다.",
  },
  {
    label: "Figma 구조 정리",
    text: "레이어 이름, 프레임 구조, 오토 레이아웃, 컴포넌트 단위를 개발자가 이해하기 쉬운 형태로 다듬었습니다.",
  },
  {
    label: "마크업 준비",
    text: "HTML/CSS 수준의 내부 테스트용 퍼블리싱을 경험하며, 디자인 데이터가 실제 화면 구조로 옮겨지는 과정을 확인했습니다.",
  },
];

export default function ExperienceSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <SectionLayout
        id="experience"
        aside={
          <SectionHeading eyebrow="EXPERIENCE">
            디자인 데이터를 정리하고 <br className="hidden md:block" />
            화면 구현 전 단계를 <br className="hidden md:block" />
            경험했습니다.
          </SectionHeading>
        }
      >
        <article className="scroll-reveal reveal-delay-1 max-w-3xl">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 border-b border-line-soft pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-panel bg-brand-pale text-brand">
                  <Building2 size={22} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h4 className="mt-1 break-keep text-xl font-bold leading-tight text-navy md:text-2xl">
                    {EXPERIENCE.company}
                  </h4>

                  <p className="mt-2 break-keep text-[15px] font-semibold leading-7 text-ink">
                    {EXPERIENCE.title}
                  </p>
                </div>
              </div>

              <p className="w-fit rounded-pill border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink sm:mt-1">
                {EXPERIENCE.period}
              </p>
            </div>

            <ul className="space-y-4">
              {EXPERIENCE_ITEMS.map(({ label, text }) => (
                <li key={label} className="flex items-start gap-4">
                  <span
                    className="mt-1.5 shrink-0 text-brand"
                    aria-hidden="true"
                  >
                    ✦
                  </span>

                  <p className="break-keep text-[15px] leading-8 text-ink">
                    <strong className="font-bold text-navy">{label}</strong>
                    <span className="text-ink"> — {text}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </SectionLayout>
    </div>
  );
}
