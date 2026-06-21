"use client";

import {
  Building2,
  CalendarDays,
  Database,
  GitCommitHorizontal,
  Layers3,
} from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SectionLayout } from "./ui/SectionLayout";
import { SectionHeading } from "./ui/SectionHeading";

const EXPERIENCE = {
  company: "HiveLab - AIS실",
  role: "미래내일 일경험 인턴",
  title: "PSD 데이터 라벨링 · Figma UI 마크업",
  period: "2026.05 ~ 2026.07",
};

const HEADLINE_LINES = [
  "PSD 데이터를 라벨링하고",
  "Figma UI를 마크업했습니다.",
];

const WORK_ITEMS = [
  {
    icon: Database,
    eyebrow: "PSD DATA",
    title: "학습용 PSD 데이터 라벨링",
    description:
      "PSD 레이어를 버튼·배너·텍스트·이미지로 분류하고 기준에 맞게 검수했습니다.",
    tags: ["레이어 확인", "UI 요소 라벨링", "기준 기반 검수"],
  },
  {
    icon: Layers3,
    eyebrow: "FIGMA UI",
    title: "Figma 기반 UI 마크업",
    description:
      "Figma MCP와 Claude를 활용해 이벤트 화면 2종과 에러 팝업을 SCSS/Gulp 환경에서 마크업했습니다.",
    tags: ["이벤트 화면 2종", "에러 팝업 UI", "SCSS/Gulp"],
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
            {HEADLINE_LINES.map((line, index) => (
              <span key={line}>
                {line}
                {index < HEADLINE_LINES.length - 1 && (
                  <br className="hidden md:block" />
                )}
              </span>
            ))}
          </SectionHeading>
        }
      >
        <article className="scroll-reveal reveal-delay-1 max-w-4xl">
          <div className="space-y-5">
            <div className="flex flex-col gap-4 border-b border-line-soft pb-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-panel bg-brand-pale text-brand">
                  <Building2 size={20} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand">
                    {EXPERIENCE.company}
                  </p>

                  <h4 className="mt-1 break-keep text-xl font-bold leading-tight text-navy md:text-2xl">
                    {EXPERIENCE.title}
                  </h4>

                  <p className="mt-1.5 text-sm font-semibold text-ink">
                    {EXPERIENCE.role}
                  </p>
                </div>
              </div>

              <div className="flex w-fit shrink-0 items-center gap-2 rounded-pill border border-line bg-white px-3 py-1.5 text-sm font-semibold text-ink">
                <CalendarDays size={14} aria-hidden="true" />
                <span>{EXPERIENCE.period}</span>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {WORK_ITEMS.map(({ icon: Icon, eyebrow, title, description, tags }) => (
                <section
                  key={title}
                  className="rounded-panel border border-line-soft bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-pale text-brand">
                      <Icon size={18} aria-hidden="true" />
                    </div>

                    <div>
                      <p className="text-xs font-bold tracking-[0.18em] text-brand">
                        {eyebrow}
                      </p>

                      <h5 className="mt-0.5 text-base font-bold text-navy">
                        {title}
                      </h5>
                    </div>
                  </div>

                  <p className="mt-3 break-keep text-sm leading-7 text-ink">
                    {description}
                  </p>

                  <ul className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-pill bg-brand-pale px-3 py-1 text-xs font-semibold text-brand"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="flex items-start gap-3 rounded-panel border border-line-soft bg-white p-4 shadow-sm">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-pale text-brand">
                <GitCommitHorizontal size={18} aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-bold text-navy">
                  별도 실습 · GitLab 커밋
                </p>

                <p className="mt-1 break-keep text-sm leading-7 text-ink">
                  Claude를 보조 도구로 코드 수정 방향을 확인하고, GitLab에서
                  변경 사항을 커밋하는 흐름을 실습했습니다.
                </p>
              </div>
            </div>
          </div>
        </article>
      </SectionLayout>
    </div>
  );
}