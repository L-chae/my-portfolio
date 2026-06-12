import { notFound } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ChatBar from '@/components/chat/ChatBar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/Badge';
import { Button, LinkButton } from '@/components/ui/Button';
import { SurfaceCard } from '@/components/ui/SurfaceCard';
import { PROJECTS_MOCK } from '@/content/projectsMock';

interface ProjectDetailPageProps {
  params: Promise<{
    projectKey: string;
  }>;
}

const DETAIL_SECTIONS = [
  { key: 'situation', title: '실제 상황' },
  { key: 'problem', title: '문제 정의' },
  { key: 'judgment', title: '나의 판단' },
  { key: 'implementation', title: '구현 방식' },
  { key: 'tradeOff', title: '트레이드오프' },
  { key: 'result', title: '결과' },
] as const;

export function generateStaticParams() {
  return PROJECTS_MOCK.map((project) => ({
    projectKey: project.projectKey,
  }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectKey } = await params;
  const project = PROJECTS_MOCK.find((item) => item.projectKey === projectKey);

  if (!project) notFound();

  return (
    <>
      <ChatBar />

      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pb-28 md:pt-36">
        <LinkButton
          href="/#projects"
          variant="ghost"
          size="sm"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Projects로 돌아가기
        </LinkButton>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,30%)_minmax(0,70%)] lg:gap-16">
          <aside className="self-start">
            <p className="text-sm font-semibold text-slate-500">
              {project.displayLabel}
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-950 break-keep md:text-5xl">
              {project.name}
            </h1>

            <p className="mt-5 text-[15px] leading-8 text-slate-600 break-keep">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech}>
                  {tech}
                </Badge>
              ))}
            </div>
          </aside>

          <article className="max-w-3xl space-y-5">
            {DETAIL_SECTIONS.map(({ key, title }) => (
              <SurfaceCard
                as="section"
                key={key}
                className="bg-white/75 p-6 md:p-7"
              >
                <h2 className="text-sm font-bold text-slate-950">
                  {title}
                </h2>
                <p className="mt-3 text-[15px] leading-8 text-slate-600 break-keep">
                  <strong className="font-semibold text-slate-900">
                    {key === 'problem' ? project.problem : project[key]}
                  </strong>
                </p>
              </SurfaceCard>
            ))}

            <section className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm md:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-bold">
                    이 프로젝트에 대해 AI에게 질문하기
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-300 break-keep">
                    상세 내용을 읽다가 궁금한 지점을 바로 이어서 물어볼 수 있습니다.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="inverse"
                  data-chat-intent="open"
                  data-chat-topic={project.aiQuestion}
                  className="w-max"
                >
                  <Sparkles size={14} aria-hidden="true" />
                  AI 질문하기
                </Button>
              </div>
            </section>
          </article>
        </div>
      </div>

      <Footer />
    </>
  );
}
