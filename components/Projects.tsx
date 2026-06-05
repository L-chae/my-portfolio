'use client';

import { portfolioData } from '../content/data';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  const { setIsExpanded, handleSend } = useChat();
  const containerRef = useScrollReveal(); 

  const handleAskAI = (projectTitle: string) => {
    setIsExpanded(true);
    setTimeout(() => {
      handleSend(`${projectTitle} 프로젝트의 핵심 아키텍처와 해결 과정에 대해 알려줘`);
    }, 300); 
  };

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-24 px-6 bg-slate-50/50 border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* 헤더 영역 */}
        <div className="reveal opacity-0 translate-y-4 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 transition-all duration-700 flex items-end justify-between mb-12">
          <h2 className="text-3xl font-bold text-slate-900 border-b-2 pb-4 border-slate-900 inline-block tracking-tight">
            Featured Projects
          </h2>
          <p className="hidden md:block text-slate-500 text-[14.5px] font-medium pb-4">
            핵심 기술적 고민을 담은 쇼케이스입니다.
          </p>
        </div>
        
        {/* 💡 3열 배치 적용 (lg:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, idx) => (
            <div 
              key={project.id} 
              id={`project-${project.id}`} 
              style={{ transitionDelay: `${idx * 100}ms` }}
              className="reveal opacity-0 translate-y-6 data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 transition-all duration-700 ease-out group flex flex-col p-7 border border-slate-200/80 rounded-[28px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1.5"
            >
              <div className="flex flex-col flex-1">
                
                {/* 1. 타이틀 & 기간 */}
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-[20px] font-bold text-slate-900 tracking-tight leading-snug mb-1">{project.title}</h3>
                    <p className="text-blue-600 font-semibold text-[11px] tracking-widest uppercase">{project.period}</p>
                  </div>
                </div>
                
                {/* 2. 태그 시스템 */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags?.map((tag: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-100/80 text-slate-600 text-[11px] font-semibold rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 3. 요약 */}
                <p className="text-slate-600 text-[14px] mb-7 leading-relaxed break-keep">
                  {project.summary}
                </p>

                {/* 4. 핵심 성과 */}
                <div className="bg-gradient-to-br from-blue-50/50 to-slate-50 p-5 rounded-2xl border border-blue-100/50 mb-8 flex-1">
                  <h4 className="text-[13px] font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]"></span>
                    Key Technical Impact
                  </h4>
                  <ul className="space-y-3">
                    {project.content?.solution.slice(0, 2).map((point: string, i: number) => (
                      <li key={i} className="text-slate-600 text-[13px] leading-relaxed flex items-start gap-2.5">
                        <span className="text-blue-400 mt-1 shrink-0 text-[11px]">✓</span>
                        <span className="break-keep">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 5. 액션 버튼 영역 (3열 좁은 너비에 맞춘 상하 배치 구조) */}
                <div className="flex flex-col gap-3 mt-auto pt-5 border-t border-slate-100">
                  <button 
                    onClick={() => handleAskAI(project.title)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white px-4 py-3 rounded-xl text-[13px] font-bold transition-colors duration-300 group/btn"
                  >
                    <Sparkles size={16} className="transition-transform group-hover/btn:scale-110" />
                    AI에게 질문하기
                  </button>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 text-[12.5px] font-bold bg-slate-100 text-slate-700 px-3 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                        <GithubIcon size={15} /> 코드
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 text-[12.5px] font-bold bg-slate-100 text-slate-700 px-3 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                        <ExternalLink size={15} /> 데모
                      </a>
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}