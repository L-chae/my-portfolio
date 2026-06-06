"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// 카드별 색상 팔레트 (라이트 배경 기반)
const PALETTES = [
  {
    bg: "bg-[#EEEDFE]",
    catBg: "bg-[#AFA9EC]",
    catText: "text-[#26215C]",
    num: "text-[#AFA9EC]",
    title: "text-[#26215C]",
    liner: "text-[#534AB7]",
    dash: "text-[#534AB7]",
    problem: "text-[#3C3489]",
    techBg: "bg-[#534AB7]/10",
    techText: "text-[#534AB7]",
    border: "border-[#534AB7]/20",
    linkLabel: "text-[#3C3489]",
    linkSub: "text-[#7F77DD]",
    iconBg: "bg-[#534AB7]/10 border-[#534AB7]/25 text-[#534AB7]",
  },
  {
    bg: "bg-[#E1F5EE]",
    catBg: "bg-[#9FE1CB]",
    catText: "text-[#085041]",
    num: "text-[#5DCAA5]",
    title: "text-[#085041]",
    liner: "text-[#0F6E56]",
    dash: "text-[#1D9E75]",
    problem: "text-[#085041]",
    techBg: "bg-[#0F6E56]/10",
    techText: "text-[#0F6E56]",
    border: "border-[#0F6E56]/20",
    linkLabel: "text-[#085041]",
    linkSub: "text-[#1D9E75]",
    iconBg: "bg-[#0F6E56]/10 border-[#0F6E56]/25 text-[#0F6E56]",
  },
  {
    bg: "bg-[#FAEEDA]",
    catBg: "bg-[#FAC775]",
    catText: "text-[#412402]",
    num: "text-[#EF9F27]",
    title: "text-[#412402]",
    liner: "text-[#854F0B]",
    dash: "text-[#BA7517]",
    problem: "text-[#633806]",
    techBg: "bg-[#854F0B]/10",
    techText: "text-[#854F0B]",
    border: "border-[#854F0B]/20",
    linkLabel: "text-[#412402]",
    linkSub: "text-[#BA7517]",
    iconBg: "bg-[#854F0B]/10 border-[#854F0B]/25 text-[#854F0B]",
  },
  {
    bg: "bg-[#FAECE7]",
    catBg: "bg-[#F5C4B3]",
    catText: "text-[#4A1B0C]",
    num: "text-[#F0997B]",
    title: "text-[#4A1B0C]",
    liner: "text-[#993C1D]",
    dash: "text-[#993C1D]",
    problem: "text-[#712B13]",
    techBg: "bg-[#993C1D]/10",
    techText: "text-[#993C1D]",
    border: "border-[#993C1D]/20",
    linkLabel: "text-[#4A1B0C]",
    linkSub: "text-[#D85A30]",
    iconBg: "bg-[#993C1D]/10 border-[#993C1D]/25 text-[#993C1D]",
  },
] as const;

// 프로젝트 데이터 구조 정의
export interface Project {
  id: string | number;
  category: string;
  title: string;
  oneLiner: string;
  problems?: string[];
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects = [] }: ProjectsProps) {
const ref = useScrollReveal();

  return (
    <section id="projects" ref={ref} className="py-24 bg-[#f7f6f2]">
      <div className="max-w-300 mx-auto px-6">
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.2em] uppercase text-slate-400 mb-3 font-medium">
            Featured projects
          </p>
          <h2 className="font-['Syne'] text-[42px] font-extrabold tracking-tight text-slate-900 leading-none">
            주요 프로젝트
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {projects.map((project, idx) => {
            const p = PALETTES[idx % PALETTES.length];
            const isMain = idx === 0;

            return (
              <div
                key={project.id}
                style={{ transitionDelay: `${idx * 80}ms` }}
                className={[
                  "reveal",
                  "opacity-0",
                  "translate-y-4",
                  "transition-all",
                  "duration-500",
                  "ease-out",
                  "data-[visible=true]:opacity-100",
                  "data-[visible=true]:translate-y-0",
                  "rounded-3xl",
                  "p-10",
                  "flex",
                  "flex-col",
                  "hover:shadow-2xl",
                  "hover:shadow-slate-200/50",
                  "hover:-translate-y-2",
                  p.bg,
                  isMain ? "lg:col-span-7" : "lg:col-span-5",
                ].join(" ")}
              >
                {/* 상단: 카테고리 + 번호 */}
                <div className="flex justify-between items-center mb-8">
                  <span
                    className={`text-[11px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full ${p.catBg} ${p.catText}`}
                  >
                    {project.category}
                  </span>
                  <span
                    className={`font-['Syne'] text-[16px] font-bold opacity-60 ${p.num}`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* 타이틀 & 한 줄 요약 */}
                <h3
                  className={`font-['Syne'] text-[28px] font-extrabold tracking-tight mb-3 ${p.title}`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-[14px] font-normal mb-8 leading-relaxed max-w-lg ${p.liner}`}
                >
                  {project.oneLiner}
                </p>

                {/* 핵심 문제: 명확한 여백 확보 */}
                <div className="space-y-3 mb-8 flex-1">
                  {project.problems?.slice(0, 3).map((problem, i) => (
                    <div
                      key={i}
                      className="flex gap-3 text-[14px] leading-relaxed"
                    >
                      <span className={`shrink-0 mt-1 ${p.dash}`}>●</span>
                      <span className={`${p.problem} font-medium`}>
                        {problem}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 기술 스택: 강조 */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-[11px] px-3 py-1 rounded-md font-semibold ${p.techBg} ${p.techText}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 하단 액션: 시각적 우선순위 강화 */}
                <div
                  className={`pt-6 border-t flex items-center justify-between ${p.border}`}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="group/link flex items-center gap-2 text-[15px] font-bold hover:opacity-70 transition-opacity"
                  >
                    <span className={p.linkLabel}>Explore Project</span>
                    <ArrowRight
                      size={16}
                      className={`${p.linkLabel} group-hover/link:translate-x-1 transition-transform`}
                    />
                  </Link>

                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Github Repository"
                        className={`${p.title} hover:opacity-60 transition-opacity`}
                      >
                        <GithubIcon size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                        className={`${p.title} hover:opacity-60 transition-opacity`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
