import { notFound } from "next/navigation";
import ScrollToTopInstant from "@/components/ScrollToTopInstant";
import ChatBar from "@/components/chat/ChatBar";
import Footer from "@/components/Footer";
import ProjectDetailContent from "@/components/projects/ProjectDetailContent";
import { PROJECTS_MOCK } from "@/content/projectsMock";
import { SUGGESTION_MAP } from "@/content/suggestions";

interface ProjectDetailPageProps {
  params: Promise<{
    projectKey: string;
  }>;
}

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
      <ScrollToTopInstant />
      <ChatBar hideFloatingButton />

      <ProjectDetailContent
        project={project}
        suggestedQuestions={suggestedQuestions}
      />

      <Footer />
    </>
  );
}
