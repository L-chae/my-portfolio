'use client';

import { portfolioData } from '../content/data';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  return (
    // 💡 스펙 적용: 배경 #FFFFFF (bg-white)
    <section id="projects" className="py-20 px-6 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* 💡 스펙 적용: 타이틀 #0F172A (slate-900), font-weight: 700 (font-bold) */}
        <h2 className="text-3xl font-bold mb-10 text-slate-900 border-b-2 pb-4 inline-block border-slate-900">
          Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div 
              key={project.id} 
              // 💡 스펙 적용: 테두리 #E2E8F0 (slate-200), 기본 섀도우, 호버 섀도우 및 -2px 이동
              className="flex flex-col p-6 border border-slate-200 rounded-3xl bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(37,99,235,0.10)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex flex-col flex-1">
                {/* 💡 스펙 적용: 프로젝트명 #0F172A (slate-900), 600 (semibold) */}
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{project.title}</h3>
                
                {/* 💡 스펙 적용: 날짜 #2563EB (blue-600), 12px */}
                <p className="text-blue-600 font-medium mb-3 text-[12px] tracking-widest uppercase">{project.period}</p>
                
                {/* 💡 스펙 적용: 설명 #64748B (slate-500), 13px */}
                <p className="text-slate-500 text-[13px] mb-4 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech, idx) => (
                    // 💡 스펙 적용: 태그 배경 #EFF6FF (blue-50), 텍스트 #2563EB (blue-600) 11px 500, 테두리 #DBEAFE (blue-100)
                    <span key={idx} className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-600 text-[11px] font-medium rounded-md uppercase">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 트러블슈팅/이슈 요약 영역 */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                  {/* 💡 스펙 적용: 소제목 #374151 (gray-700), 12px, 600 (semibold) */}
                  <h4 className="text-[12px] font-semibold text-gray-700 mb-2">{project.troubleShooting.title}</h4>
                  <ul className="space-y-1.5">
                    {project.troubleShooting.points.slice(0, 2).map((point, idx) => (
                      // 💡 스펙 적용: 항목 텍스트 #64748B (slate-500), 13px
                      <li key={idx} className="text-slate-500 text-[13px] truncate">• {point.split(':')[0]}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-auto">
                  {project.githubUrl && (
                    // 💡 스펙 적용: GitHub 버튼 #0F172A (slate-900), 텍스트 #FFFFFF
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold bg-slate-900 text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-all">
                      <GithubIcon size={14} /> GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    // 💡 스펙 적용: Demo 버튼 투명 배경, 테두리 #E2E8F0 (slate-200), 텍스트 #374151 (gray-700)
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold bg-transparent border border-slate-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all">
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}