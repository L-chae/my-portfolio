"use client";

import { DatabaseZap, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SectionLayout } from "./ui/SectionLayout";
import { SectionHeading } from "./ui/SectionHeading";

const CORE_VALUES = [
  {
    Icon: ShieldCheck,
    title: "시나리오 검증가",
    chipClassName: "bg-brand-pale text-brand",
    description:
      "사용자는 100번의 정상 동작보다 1번의 실패 경험을 더 오래 기억합니다. 해피 패스(Happy Path) 구현보다 네트워크 지연, 인증 만료 등 실패 흐름(Failure Flow)을 선제적으로 방어합니다.",
  },
  {
    Icon: DatabaseZap,
    title: "반복 비용의 시스템적 제거",
    chipClassName: "bg-accent-pale text-accent",
    description:
      "휴먼 에러를 유발하는 반복 업무를 방치하지 않습니다. OpenAPI 기반 코드 생성기나 Zod를 활용해 런타임 에러를 빌드 타임으로 끌어올려 팀의 생산성을 높입니다.",
  },
  {
    Icon: SlidersHorizontal,
    title: "적정 기술과 오버엔지니어링 경계",
    chipClassName: "bg-brand-pale text-brand",
    description:
      "미래의 확장성을 과도하게 고려하다 발생한 실패 경험을 바탕으로, 현재 팀 규모와 비즈니스 우선순위에 맞춰 가장 적합한 '적정 수준의 타협점'을 도출합니다.",
  },
];

export default function CoreValuesSection() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref}>
      <SectionLayout
        id="core-values"
        aside={
          <SectionHeading eyebrow="CORE VALUES">
            기능 구현보다 <br className="hidden md:block" />
            유지보수 비용을 <br className="hidden md:block" />
            고민합니다.
          </SectionHeading>
        }
      >
        <div className="scroll-reveal max-w-3xl overflow-hidden rounded-card border border-line-soft bg-surface-glass">
          <div className="divide-y divide-line-soft">
            {CORE_VALUES.map(({ Icon, title, description, chipClassName }) => (
              <article
                key={title}
                className="grid gap-4 px-6 py-6 md:grid-cols-[auto_minmax(0,1fr)] md:px-7 md:py-7"
              >
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-panel ${chipClassName}`}
                >
                  <Icon size={20} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h4 className="text-base font-bold text-navy break-keep">
                    {title}
                  </h4>
                  <p className="mt-2 max-w-prose break-keep text-sm leading-7 text-ink">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionLayout>
    </div>
  );
}
