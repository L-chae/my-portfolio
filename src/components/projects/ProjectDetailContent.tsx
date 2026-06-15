"use client";

import { useState } from "react";
import { ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import type { ProjectDetail } from "@/content/projectsMock";

type ProjectDetailContentProps = {
  project: ProjectDetail;
  suggestedQuestions: readonly string[];
};

type StringDetailKey = {
  [Key in keyof ProjectDetail]: ProjectDetail[Key] extends string ? Key : never;
}[keyof ProjectDetail];

type DetailSectionKey = Extract<
  StringDetailKey,
  | "situation"
  | "problem"
  | "solution"
  | "judgment"
  | "implementation"
  | "technicalDecision"
  | "result"
  | "tradeOff"
>;

type DetailSection = {
  key: DetailSectionKey;
  title: string;
};

type ProjectMetaItem = {
  label: string;
  value: string;
};

const OVERVIEW_SECTIONS = [
  { key: "situation", title: "프로젝트 상황" },
  { key: "problem", title: "해결한 문제" },
  { key: "solution", title: "해결 방향" },
  { key: "result", title: "확인한 결과" },
] as const satisfies ReadonlyArray<DetailSection>;

const TECHNICAL_SECTIONS = [
  { key: "judgment", title: "판단 기준" },
  { key: "implementation", title: "구현 방식" },
  { key: "technicalDecision", title: "기술적으로 고민한 점" },
  { key: "tradeOff", title: "선택의 장단점" },
] as const satisfies ReadonlyArray<DetailSection>;

function hasMetaValue(item: ProjectMetaItem | null): item is ProjectMetaItem {
  return Boolean(item?.value);
}

function buildProjectMeta(project: ProjectDetail): ProjectMetaItem[] {
  return [
    project.period ? { label: "기간", value: project.period } : null,
    project.team ? { label: "규모", value: project.team } : null,
    project.role ? { label: "역할", value: project.role } : null,
  ].filter(hasMetaValue);
}

// 둥둥 떠다니는 박스를 완전히 제거하고 텍스트 본연의 여백으로 승부하는 본문
function SectionGroup({
  sections,
  project,
}: {
  sections: readonly DetailSection[];
  project: ProjectDetail;
}) {
  return (
    <div className="space-y-16">
      {sections.map(({ key, title: sectionTitle }, index) => (
        <article
          key={key}
          className={
            index === sections.length - 1 ? "" : "border-b border-line-soft pb-16"
          }
        >
          <h3 className="mb-6 flex items-center gap-3.5 break-keep text-[20px] font-extrabold text-navy">
            <span
              className="h-[18px] w-[3px] rounded-full bg-brand"
              aria-hidden="true"
            />
            {sectionTitle}
          </h3>
          <p className="break-keep pl-4 text-[16px] leading-[1.85] text-ink md:pl-4">
            {project[key]}
          </p>
        </article>
      ))}
    </div>
  );
}

export default function ProjectDetailContent({
  project,
  suggestedQuestions,
}: ProjectDetailContentProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "technical">("overview");
  const projectMeta = buildProjectMeta(project);

  return (
    <main className="page-enter mx-auto max-w-6xl px-6 pb-24 pt-28 md:pb-32 md:pt-36">
      
      {/* 1. 네비게이션 */}
      <nav aria-label="프로젝트 상세 페이지 이동" className="mb-12">
        <LinkButton href="/#projects" variant="ghost" size="sm" className="-ml-3">
          <ArrowLeft size={16} aria-hidden="true" />
          Projects로 돌아가기
        </LinkButton>
      </nav>

      {/* 2. Hero 영역: 우측에 있던 정보와 스택을 모두 상단으로 흡수하여 가로로 넓게 배치 */}
      <header className="mb-16 md:mb-20">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-line-soft bg-surface-muted px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-ink-muted">
            {project.label}
          </span>
          <span className="rounded-full border border-brand-soft bg-brand-pale px-3.5 py-1.5 text-[11px] font-bold tracking-wider text-brand">
            {project.displayLabel}
          </span>
        </div>

        <h1 className="break-keep text-4xl font-extrabold tracking-tight text-navy sm:text-5xl md:text-[3.8rem] md:leading-[1.15]">
          {project.name}
        </h1>

        <p className="mt-6 max-w-3xl break-keep text-[18px] leading-[1.7] text-ink-muted md:mt-8">
          {project.summary}
        </p>

        {/* 상단으로 올라온 메타 정보 & 기술 스택 (우측 열 다이어트의 핵심) */}
        <div className="mt-10 flex flex-col gap-8 border-t border-line-soft pt-8 lg:flex-row lg:items-start lg:gap-16">
          {projectMeta.length > 0 && (
            <dl className="flex flex-wrap gap-x-12 gap-y-6">
              {projectMeta.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11.5px] font-bold uppercase tracking-widest text-ink-faint">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[14.5px] font-bold text-navy">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {project.techStack.length > 0 && (
            <div className="lg:border-l lg:border-line-soft lg:pl-16">
              <h2 className="mb-3 text-[11.5px] font-bold uppercase tracking-widest text-ink-faint">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-surface-soft px-2.5 py-1 text-[12px] font-medium text-ink-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 3. 2단 그리드: 좌측(본문)과 우측(액션)만 남겨 시선 분산 차단 */}
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-24">
        
        {/* 좌측 영역: 탭 + 본문 */}
        <article className="min-w-0">
          
          {/* 심플한 밑줄 탭 */}
          <div className="mb-14 flex gap-8 border-b border-line-soft">
            <button
              onClick={() => setActiveTab("overview")}
              className={`relative pb-4 text-[16px] font-bold transition-colors ${
                activeTab === "overview"
                  ? "text-brand after:absolute after:bottom-[-1.5px] after:left-0 after:h-[2px] after:w-full after:bg-brand"
                  : "text-ink-muted hover:text-navy"
              }`}
            >
              핵심 요약
            </button>

            <button
              onClick={() => setActiveTab("technical")}
              className={`relative pb-4 text-[16px] font-bold transition-colors ${
                activeTab === "technical"
                  ? "text-brand after:absolute after:bottom-[-1.5px] after:left-0 after:h-[2px] after:w-full after:bg-brand"
                  : "text-ink-muted hover:text-navy"
              }`}
            >
              기술 상세
            </button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out">
            <SectionGroup
              sections={activeTab === "overview" ? OVERVIEW_SECTIONS : TECHNICAL_SECTIONS}
              project={project}
            />
          </div>
        </article>

        {/* 4. 우측 영역: 정보 카드를 전부 빼고 오직 "링크"와 "AI 챗봇"만 남김 */}
        <aside className="space-y-6 lg:sticky lg:top-32">
          
          {/* 관련 링크 (심플한 버튼 리스트) */}
          {project.links.length > 0 && (
            <div className="rounded-2xl border border-line-soft bg-surface px-6 py-6 shadow-sm">
              <h2 className="mb-4 text-[11.5px] font-bold uppercase tracking-widest text-navy">
                Links
              </h2>
              <div className="flex flex-col gap-3">
                {project.links.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-xl bg-navy px-4 py-3 text-[13.5px] font-bold text-white transition-colors hover:bg-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
                  >
                    <span className="truncate">{link.label}</span>
                    <ExternalLink
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 text-white/60 transition-colors group-hover:text-white"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* AI 챗봇 유도 (가장 돋보여야 할 핵심 액션) */}
          <div className="rounded-2xl border border-brand/20 bg-brand-pale/30 px-6 py-7 shadow-sm">
            <h2 className="flex items-center gap-2.5 text-[14.5px] font-extrabold text-brand">
              <Sparkles size={16} aria-hidden="true" />
              AI에게 더 물어보기
            </h2>
            <p className="mt-3 break-keep text-[13px] leading-[1.65] text-ink-muted">
              아래 질문을 누르면 이 프로젝트의 맥락을 가진 AI 챗봇이 열립니다. 궁금한 점을 질문해 보세요.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  data-chat-intent="open"
                  data-chat-topic={question}
                  className="w-full rounded-xl border border-brand-soft bg-surface px-4 py-3.5 text-left text-[13px] font-bold text-navy shadow-sm transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
          
        </aside>
      </div>
    </main>
  );
}