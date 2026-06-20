'use client';

import Image from 'next/image';
import type { RefObject } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Bot, ExternalLink, Info, Maximize2, X } from 'lucide-react';
import { LinkButton } from '@/components/ui/Button';
import type { ProjectDetail } from '@/content/projectsMock';

type ProjectDetailContentProps = {
  project: ProjectDetail;
  suggestedQuestions: readonly string[];
};

type StringDetailKey = {
  [Key in keyof ProjectDetail]: ProjectDetail[Key] extends string ? Key : never;
}[keyof ProjectDetail];

type DetailSectionKey = Extract<
  StringDetailKey,
  | 'situation'
  | 'problem'
  | 'solution'
  | 'judgment'
  | 'implementation'
  | 'technicalDecision'
  | 'result'
  | 'tradeOff'
>;

type DetailSection = {
  key: DetailSectionKey;
  title: string;
};

type ProjectMetaItem = {
  label: string;
  value: string;
};

type ProjectScreenshot = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type ScreenshotLayout = 'desktop' | 'mobile';

type ScreenshotSelectHandler = (
  screenshot: ProjectScreenshot,
  trigger: HTMLButtonElement,
) => void;

const PROJECT_SCREENSHOTS: Record<string, readonly ProjectScreenshot[]> = {
  storylex: [
    {
      src: '/projects/storylex_main.jpg',
      alt: 'StoryLex 랜딩 페이지 화면',
      title: '랜딩 페이지',
      description: '서비스 목적과 학습 흐름을 소개하는 첫 화면입니다.',
    },
    {
      src: '/projects/storylex_dashboard.jpg',
      alt: 'StoryLex 학습 대시보드 화면',
      title: '학습 대시보드',
      description: '학습 목표, 출석 현황, 주간 학습량을 확인하는 화면입니다.',
    },
    {
      src: '/projects/storylex_word_detail.jpg',
      alt: 'StoryLex 단어 상세 화면',
      title: '단어 상세',
      description: '단어 뜻, 예문, 연관 단어, 학습 통계를 확인하는 화면입니다.',
    },
    {
      src: '/projects/storylex_story.jpg',
      alt: 'StoryLex AI 스토리 학습 화면',
      title: 'AI 스토리',
      description: '학습 단어를 문맥 안에서 복습하는 화면입니다.',
    },
  ],
  rodia: [
    {
      src: '/projects/rodia_home.png',
      alt: 'Rodia 운임 조회 홈 화면',
      title: '운임 조회 홈',
      description: '출발지와 도착지를 선택해 운임을 조회하는 화면입니다.',
    },
    {
      src: '/projects/rodia_quote_request.png',
      alt: 'Rodia 견적 요청 화면',
      title: '견적 요청',
      description: '운송 정보와 화물 정보를 단계별로 입력하는 화면입니다.',
    },
    {
      src: '/projects/rodia_driver_home.png',
      alt: 'Rodia 운영 현황 대시보드 화면',
      title: '운영 대시보드',
      description: '정산 금액, 업무 현황, 빠른 실행 메뉴를 확인하는 화면입니다.',
    },
    {
      src: '/projects/rodia_route_simulation.png',
      alt: 'Rodia 운송 경로와 3D 적재 시뮬레이션 화면',
      title: '경로·적재 시뮬레이션',
      description: '운송 경로와 화물 적재 상태를 확인하는 화면입니다.',
    },
  ],
};

const PROJECT_SCREENSHOT_LAYOUT: Record<string, ScreenshotLayout> = {
  storylex: 'desktop',
  rodia: 'mobile',
};

const OVERVIEW_SECTIONS = [
  { key: 'situation', title: '프로젝트 배경' },
  { key: 'problem', title: '해결 과제' },
  { key: 'solution', title: '해결 방식' },
  { key: 'result', title: '확인 결과' },
] as const satisfies ReadonlyArray<DetailSection>;

const TECHNICAL_SECTIONS = [
  { key: 'judgment', title: '판단 기준' },
  { key: 'implementation', title: '구현 방식' },
  { key: 'technicalDecision', title: '기술 선택' },
  { key: 'tradeOff', title: '선택의 장단점' },
] as const satisfies ReadonlyArray<DetailSection>;

function hasMetaValue(item: ProjectMetaItem | null): item is ProjectMetaItem {
  return Boolean(item?.value);
}

function buildProjectMeta(project: ProjectDetail): ProjectMetaItem[] {
  return [
    project.period ? { label: '기간', value: project.period } : null,
    project.team ? { label: '구성', value: project.team } : null,
    project.role ? { label: '역할', value: project.role } : null,
  ].filter(hasMetaValue);
}

function buildQuestionList(
  project: ProjectDetail,
  suggestedQuestions: readonly string[],
): string[] {
  const questions = [project.aiQuestion, ...suggestedQuestions].filter(Boolean);
  return Array.from(new Set(questions));
}

function ProjectHeroActions({ links }: { links: ProjectDetail['links'] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 sm:flex-row lg:w-55 lg:flex-col">
      {links.map((link, index) => (
        <a
          key={`${link.label}-${link.href}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group inline-flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-[13px] font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring ${
            index === 0
              ? 'border-navy bg-navy text-white hover:border-brand hover:bg-brand'
              : 'border-line-soft bg-surface text-navy shadow-sm hover:border-brand hover:text-brand'
          }`}
        >
          <span className="truncate">{link.label}</span>
          <ExternalLink
            size={15}
            aria-hidden="true"
            className={`shrink-0 transition-colors ${
              index === 0
                ? 'text-white/70 group-hover:text-white'
                : 'text-ink-faint group-hover:text-brand'
            }`}
          />
        </a>
      ))}
    </div>
  );
}

function ProjectHeroHeader({ project }: { project: ProjectDetail }) {
  const hasLinks = project.links.length > 0;

  return (
    <header
      aria-labelledby="project-title"
      className="relative mb-9 px-1 py-2 md:mb-10"
    >
      <div
        className={`grid gap-6 ${
          hasLinks
            ? 'lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end'
            : ''
        }`}
      >
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-line-soft bg-surface-muted px-3 py-1.5 text-[11px] font-bold text-ink-muted">
              {project.label}
            </span>

            <span className="rounded-full border border-brand-soft bg-brand-pale px-3 py-1.5 text-[11px] font-bold text-brand">
              {project.displayLabel}
            </span>
          </div>

          <h1
            id="project-title"
            className="break-keep text-[38px] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-[48px] md:text-[58px]"
          >
            {project.name}
          </h1>

          <p className="mt-4 max-w-3xl break-keep text-[15.5px] leading-[1.75] text-ink-muted md:text-[16.5px]">
            {project.summary}
          </p>

          {project.techStack.length > 0 && (
            <div
              aria-label="기술 스택"
              className="scrollbar-none mt-5 flex max-w-full gap-2 overflow-x-auto pb-1"
            >
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="shrink-0 rounded-lg border border-line-soft bg-surface px-2.5 py-1.5 text-[12px] font-medium text-ink-muted shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <ProjectHeroActions links={project.links} />
      </div>
    </header>
  );
}

function SectionGroup({
  sections,
  project,
}: {
  sections: readonly DetailSection[];
  project: ProjectDetail;
}) {
  return (
    <div className="space-y-5">
      {sections.map(({ key, title }, index) => (
        <article
          key={key}
          className="rounded-2xl border border-line-soft bg-surface px-5 py-5 shadow-sm md:px-6 md:py-6"
        >
          <p className="text-[11px] font-bold tracking-[0.18em] text-brand">
            {String(index + 1).padStart(2, '0')}
          </p>

          <h3 className="mt-2 break-keep text-[20px] font-extrabold tracking-tight text-navy md:text-[21px]">
            {title}
          </h3>

          <p className="mt-4 break-keep text-[15px] leading-[1.85] text-ink">
            {project[key]}
          </p>
        </article>
      ))}
    </div>
  );
}

function ProjectQuickPanel({
  meta,
  questions,
}: {
  meta: ProjectMetaItem[];
  questions: readonly string[];
}) {
  const visibleQuestions = questions.slice(0, 3);

  if (meta.length === 0 && visibleQuestions.length === 0) return null;

  return (
    <aside className="lg:sticky lg:top-24">
      <section className="overflow-hidden rounded-[1.5rem] border border-line-soft bg-surface shadow-sm">
        {meta.length > 0 && (
          <div className="px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-brand">
                <Info size={17} aria-hidden="true" />
              </div>

              <h2 className="text-[14px] font-extrabold text-navy">
                프로젝트 정보
              </h2>
            </div>

            <dl className="mt-4 divide-y divide-line-soft rounded-xl border border-line-soft bg-surface-muted">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[58px_minmax(0,1fr)] gap-3 px-3.5 py-3"
                >
                  <dt className="text-[11px] font-bold tracking-[0.12em] text-ink-faint">
                    {item.label}
                  </dt>
                  <dd className="break-keep text-[13px] font-bold leading-[1.55] text-navy">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {visibleQuestions.length > 0 && (
          <div className="border-t border-brand/20 bg-brand-pale/25 px-5 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-brand">
                <Bot size={17} aria-hidden="true" />
              </div>

              <h2 className="text-[14px] font-extrabold text-brand">
                AI 질문
              </h2>
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              {visibleQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  data-chat-intent="open"
                  data-chat-topic={question}
                  className="w-full rounded-xl border border-brand-soft bg-surface px-4 py-3 text-left text-[13px] font-bold leading-normal text-navy shadow-sm transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </aside>
  );
}

function ScreenshotSectionHeader() {
  return (
    <div className="mb-5 px-1">
      <div>
        <p className="text-[11px] font-bold tracking-[0.18em] text-brand">
          프로젝트 화면
        </p>

        <h2 className="mt-1.5 break-keep text-[22px] font-extrabold tracking-tight text-navy md:text-[25px]">
          화면 구성
        </h2>
      </div>
    </div>
  );
}

function DesktopScreenshotGrid({
  screenshots,
  onSelect,
}: {
  screenshots: readonly ProjectScreenshot[];
  onSelect: ScreenshotSelectHandler;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {screenshots.map((screenshot, index) => (
        <button
          key={screenshot.src}
          type="button"
          onClick={(event) => onSelect(screenshot, event.currentTarget)}
          className="group overflow-hidden rounded-2xl border border-line-soft bg-surface text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
          aria-label={`${screenshot.title} 화면 확대해서 보기`}
        >
          <div className="relative h-55 overflow-hidden bg-surface-muted sm:h-67.5 lg:h-75">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              fill
              sizes="(min-width: 1024px) 520px, (min-width: 768px) 50vw, 100vw"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.015]"
              priority={index === 0}
            />

            <div className="absolute inset-0 flex items-start justify-end p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1 rounded-lg border border-line-soft bg-surface/90 px-2.5 py-1.5 text-[11px] font-bold text-navy shadow-sm backdrop-blur-sm">
                <Maximize2 size={12} aria-hidden="true" />
                확대
              </span>
            </div>
          </div>

          <div className="border-t border-line-soft px-4 py-4">
            <p className="text-[10.5px] font-bold tracking-[0.14em] text-ink-faint">
              {String(index + 1).padStart(2, '0')}
            </p>

            <h3 className="mt-1 text-[14px] font-extrabold text-navy">
              {screenshot.title}
            </h3>

            <p className="mt-1.5 line-clamp-2 break-keep text-[12.5px] leading-[1.6] text-ink-muted">
              {screenshot.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}

function MobileScreenshotRail({
  screenshots,
  onSelect,
}: {
  screenshots: readonly ProjectScreenshot[];
  onSelect: ScreenshotSelectHandler;
}) {
  return (
    <div className="-mx-5 sm:mx-0">
      <div className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 pt-1 sm:px-0">
        {screenshots.map((screenshot, index) => (
          <button
            key={screenshot.src}
            type="button"
            onClick={(event) => onSelect(screenshot, event.currentTarget)}
            className="group w-52.5 shrink-0 snap-start text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring sm:w-55"
            aria-label={`${screenshot.title} 화면 확대해서 보기`}
          >
            <div className="overflow-hidden rounded-4xl border border-line-soft bg-surface p-px shadow-sm transition duration-200 group-hover:border-brand/50 group-hover:shadow-md">
              <div className="relative h-102.5 bg-surface-muted sm:h-107.5">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  fill
                  sizes="220px"
                  className="object-cover object-top"
                  priority={index === 0}
                />

                <div className="absolute inset-0 flex items-start justify-end p-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1 rounded-lg border border-line-soft bg-surface/90 px-2 py-1 text-[11px] font-bold text-navy shadow-sm backdrop-blur-sm">
                    <Maximize2 size={11} aria-hidden="true" />
                    확대
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 px-1">
              <p className="text-[10.5px] font-bold tracking-[0.14em] text-ink-faint">
                {String(index + 1).padStart(2, '0')}
              </p>

              <h3 className="mt-1 text-[13.5px] font-extrabold text-navy">
                {screenshot.title}
              </h3>

              <p className="mt-1 line-clamp-2 break-keep text-[12px] leading-[1.55] text-ink-muted">
                {screenshot.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectScreenshotGallery({
  projectKey,
  onSelect,
}: {
  projectKey: string;
  onSelect: ScreenshotSelectHandler;
}) {
  const screenshots = PROJECT_SCREENSHOTS[projectKey];

  if (!screenshots || screenshots.length === 0) return null;

  const layout = PROJECT_SCREENSHOT_LAYOUT[projectKey] ?? 'desktop';

  return (
    <section className="mt-10 md:mt-12" aria-label="프로젝트 화면 갤러리">
      <ScreenshotSectionHeader />

      {layout === 'mobile' ? (
        <MobileScreenshotRail screenshots={screenshots} onSelect={onSelect} />
      ) : (
        <DesktopScreenshotGrid screenshots={screenshots} onSelect={onSelect} />
      )}
    </section>
  );
}

function ScreenshotModal({
  screenshot,
  onClose,
  dialogRef,
  closeButtonRef,
}: {
  screenshot: ProjectScreenshot | null;
  onClose: () => void;
  dialogRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  if (!screenshot) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="screenshot-modal-title"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line-soft px-4 py-3 md:px-5">
          <div className="min-w-0">
            <h2
              id="screenshot-modal-title"
              className="truncate text-[14px] font-extrabold text-navy md:text-[15px]"
            >
              {screenshot.title}
            </h2>

            <p className="mt-1 hidden truncate text-[12px] text-ink-muted sm:block">
              {screenshot.description}
            </p>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line-soft bg-surface-muted text-ink-muted transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-ring"
            aria-label="확대 이미지 닫기"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </div>

        <div className="relative h-[72vh] bg-surface-muted">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default function ProjectDetailContent({
  project,
  suggestedQuestions,
}: ProjectDetailContentProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'technical'>(
    'overview',
  );
  const [selectedScreenshot, setSelectedScreenshot] =
    useState<ProjectScreenshot | null>(null);
  const screenshotTriggerRef = useRef<HTMLButtonElement | null>(null);
  const screenshotDialogRef = useRef<HTMLDivElement | null>(null);
  const screenshotCloseButtonRef = useRef<HTMLButtonElement | null>(null);

  const projectMeta = buildProjectMeta(project);
  const questions = useMemo(
    () => buildQuestionList(project, suggestedQuestions),
    [project, suggestedQuestions],
  );

  const activeSections =
    activeTab === 'overview' ? OVERVIEW_SECTIONS : TECHNICAL_SECTIONS;

  function handleSelectScreenshot(
    screenshot: ProjectScreenshot,
    trigger: HTMLButtonElement,
  ) {
    screenshotTriggerRef.current = trigger;
    setSelectedScreenshot(screenshot);
  }

  useEffect(() => {
    if (!selectedScreenshot) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const focusModalCloseButton = window.requestAnimationFrame(() => {
      screenshotCloseButtonRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedScreenshot(null);
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = screenshotDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements || focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusModalCloseButton);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      (screenshotTriggerRef.current ?? previouslyFocusedElement)?.focus({
        preventScroll: true,
      });
    };
  }, [selectedScreenshot]);

  return (
    <>
      <main className="page-enter mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-6 md:pb-28 md:pt-24">
        <nav aria-label="프로젝트 상세 페이지 이동" className="mb-6">
          <LinkButton
            href="/#projects"
            variant="ghost"
            size="sm"
            className="-ml-3"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            프로젝트 목록으로 돌아가기
          </LinkButton>
        </nav>

        <ProjectHeroHeader project={project} />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-12">
          <article className="min-w-0">
            <div className="mb-5 grid grid-cols-2 rounded-2xl border border-line-soft bg-surface-muted p-1.5">
              <button
                type="button"
                aria-pressed={activeTab === 'overview'}
                onClick={() => setActiveTab('overview')}
                className={`rounded-xl px-4 py-3 text-[14px] font-extrabold transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-surface text-brand shadow-sm'
                    : 'text-ink-muted hover:text-navy'
                }`}
              >
                프로젝트 개요
              </button>

              <button
                type="button"
                aria-pressed={activeTab === 'technical'}
                onClick={() => setActiveTab('technical')}
                className={`rounded-xl px-4 py-3 text-[14px] font-extrabold transition-colors ${
                  activeTab === 'technical'
                    ? 'bg-surface text-brand shadow-sm'
                    : 'text-ink-muted hover:text-navy'
                }`}
              >
                기술 상세
              </button>
            </div>

            <div
              key={activeTab}
              className="content-switch-enter"
            >
              <SectionGroup sections={activeSections} project={project} />
            </div>
          </article>

          <ProjectQuickPanel meta={projectMeta} questions={questions} />
        </div>

        <ProjectScreenshotGallery
          projectKey={project.projectKey}
          onSelect={handleSelectScreenshot}
        />
      </main>

      <ScreenshotModal
        screenshot={selectedScreenshot}
        onClose={() => setSelectedScreenshot(null)}
        dialogRef={screenshotDialogRef}
        closeButtonRef={screenshotCloseButtonRef}
      />
    </>
  );
}
