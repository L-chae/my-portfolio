import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import ChatBar from "@/components/chat/ChatBar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { PROJECTS_MOCK } from "@/content/projectsMock";
import { SUGGESTION_MAP } from "@/content/suggestions";
interface ProjectDetailPageProps {
  params: Promise<{
    projectKey: string;
  }>;
}

const DETAIL_SECTIONS = [
  {
    key: "problem",
    title: "문제 상황",
  },
  {
    key: "judgment",
    title: "판단 기준",
  },
  {
    key: "implementation",
    title: "구현 방식",
  },
  {
    key: "result",
    title: "결과",
  },
  {
    key: "tradeOff",
    title: "트레이드오프",
  },
] as const;

export function generateStaticParams() {
  return PROJECTS_MOCK.map((project) => ({
    projectKey: project.projectKey,
  }));
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { projectKey } = await params;
  const project = PROJECTS_MOCK.find((item) => item.projectKey === projectKey);

  if (!project) notFound();
  const suggestedQuestions = SUGGESTION_MAP[project.projectKey] ?? [
    project.aiQuestion,
  ];
  return (
    <>
      <ChatBar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-28 md:pt-36">
        <LinkButton href="/#projects" variant="ghost" size="sm">
          <ArrowLeft size={16} aria-hidden="true" />
          Projects로 돌아가기
        </LinkButton>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,32%)_minmax(0,68%)] lg:gap-16">
          <aside className="self-start lg:sticky lg:top-28">
            <p className="text-sm font-semibold text-ink-muted">
              {project.displayLabel}
            </p>

            <h1 className="mt-4 break-keep text-4xl font-bold text-navy md:text-5xl">
              {project.name}
            </h1>

            <p className="mt-5 break-keep text-[15px] leading-8 text-ink">
              {project.summary}
            </p>

            <div className="mt-8 rounded-panel border border-line bg-surface p-5 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
                Focus
              </p>
              <p className="mt-3 break-keep text-sm leading-7 text-ink">
                {project.solution}
              </p>
            </div>

            <div className="mt-5 rounded-panel border border-line bg-surface p-5 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-muted">
                Tech Stack
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </aside>

          <article className="max-w-3xl space-y-5">
            {DETAIL_SECTIONS.map(({ key, title }) => (
              <SurfaceCard as="section" key={key} className="p-6 md:p-7">
                <h2 className="text-sm font-bold text-navy">{title}</h2>

                <p className="mt-4 break-keep text-[15px] leading-8 text-ink">
                  {project[key]}
                </p>
              </SurfaceCard>
            ))}

            {project.links.length > 0 && (
              <SurfaceCard as="section" className="p-6 md:p-7">
                <h2 className="text-sm font-bold text-navy">관련 링크</h2>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.links.map((link) => (
                    <LinkButton
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      variant="secondary"
                      size="sm"
                    >
                      {link.label}
                    </LinkButton>
                  ))}
                </div>
              </SurfaceCard>
            )}
            <section className="rounded-panel border border-line-dark bg-navy p-6 text-white shadow-card md:p-7">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={15} aria-hidden="true" className="text-white" />
                  <h2 className="text-sm font-bold text-white">
                    이 프로젝트에 대해 더 물어보기
                  </h2>
                </div>

                <p className="mt-2 break-keep text-sm leading-7 text-white/70">
                  아래 질문을 선택하면 해당 프로젝트 맥락으로 AI에게 이어서 물어볼 수 있습니다.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    data-chat-intent="open"
                    data-chat-topic={question}
                    className="rounded-pill border border-line-dark bg-navy-soft px-4 py-2 text-left text-sm font-medium text-white transition hover:bg-surface hover:text-navy"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}
