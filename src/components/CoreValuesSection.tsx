
"use client";

import { DatabaseZap, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SectionLayout } from "./ui/SectionLayout";
import { SectionHeading } from "./ui/SectionHeading";

const CORE_VALUES = [
  {
    Icon: ShieldCheck,
    title: "예외 흐름을 먼저 확인합니다",
    chipClassName: "bg-brand-pale text-brand",
    description:
      "기능이 정상적으로 동작하는지만 보지 않고, 로그인 만료, 네트워크 지연, 여러 요청이 동시에 실패하는 상황처럼 사용 흐름이 끊길 수 있는 경우를 함께 확인합니다.",
  },
  {
    Icon: DatabaseZap,
    title: "반복되는 작업은 구조로 줄입니다",
    chipClassName: "bg-accent-pale text-accent",
    description:
      "API 명세 변경이나 반복되는 요청 처리처럼 실수가 생기기 쉬운 작업은 공통 계층, 코드 생성, 검증 흐름을 통해 관리 가능한 형태로 정리하려고 합니다.",
  },
  {
    Icon: SlidersHorizontal,
    title: "현재 범위에 맞는 방식을 선택합니다",
    chipClassName: "bg-brand-pale text-brand",
    description:
      "모든 문제를 큰 구조로 해결하려 하기보다, 프로젝트 규모와 팀 상황에 맞는 방식을 선택하려고 합니다. 필요 이상으로 복잡해지는 구조는 줄이고, 지금 해결해야 할 문제에 집중합니다.",
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
            프로젝트에서 반복해서 <br className="hidden md:block" />
            확인하는 작업 기준입니다.
          </SectionHeading>
        }
      >
        <div className="scroll-reveal reveal-delay-1 max-w-3xl overflow-hidden rounded-card border border-line-soft bg-surface-glass shadow-card">
          <div className="divide-y divide-line-soft">
            {CORE_VALUES.map(({ Icon, title, description, chipClassName }) => (
              <article
                key={title}
                className="grid gap-5 px-7 py-7 md:grid-cols-[auto_minmax(0,1fr)] md:px-8 md:py-8"
              >
                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-panel ${chipClassName}`}
                >
                  <Icon size={21} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <h4 className="break-keep text-lg font-bold leading-7 text-navy md:text-xl">
                    {title}
                  </h4>

                  <p className="mt-2.5 max-w-prose break-keep text-[15px] leading-8 text-ink">
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