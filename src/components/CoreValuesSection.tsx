"use client";

import { Shield, Database, TerminalSquare } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { SectionLayout } from "./ui/SectionLayout";

const CORE_VALUES = [
  {
    Icon: Shield,
    title: "시나리오 검증가",
    description:
      "사용자는 100번의 정상 동작보다 1번의 실패 경험을 더 오래 기억합니다. 해피 패스(Happy Path) 구현보다 네트워크 지연, 인증 만료 등 실패 흐름(Failure Flow)을 선제적으로 방어합니다.",
  },
  {
    Icon: Database,
    title: "반복 비용의 시스템적 제거",
    description:
      "휴먼 에러를 유발하는 반복 업무를 방치하지 않습니다. OpenAPI 기반 코드 생성기나 Zod를 활용해 런타임 에러를 빌드 타임으로 끌어올려 팀의 생산성을 높입니다.",
  },
  {
    Icon: TerminalSquare,
    title: "적정 기술과 오버엔지니어링 경계",
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
          <>
            <h2 className="text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-3 md:mb-4">
              Core Values
            </h2>
            <h3 className="text-3xl md:text-2xl font-extrabold text-slate-900 leading-tight break-keep">
              기능 구현보다 <br className="hidden md:block" />
              유지보수 비용을 <br className="hidden md:block" />
              고민합니다.
            </h3>
          </>
        }
      >
        <div className="space-y-12 md:space-y-16">
          {CORE_VALUES.map(({ Icon, title, description }) => (
            <article
              key={title}
              className="scroll-reveal flex gap-5 items-start"
            >
              <div className="w-12 h-12 bg-white border border-slate-200/60 shadow-sm rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <Icon size={22} />
              </div>

              <div className="flex-1">
                <h4 className="text-xl md:text-lg font-bold text-slate-900 mb-3 break-keep">
                  {title}
                </h4>
                <p className="text-[15px] text-slate-600 leading-relaxed break-keep">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </SectionLayout>
    </div>
  );
}
