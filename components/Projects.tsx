'use client';

import { portfolioData } from '../content/data';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useChat } from '@/hooks/useChat'; // 경로 확인 필수

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  // 💡 개선점: setInputValue 대신 handleSend를 가져와 즉시 메시지를 전송합니다.
  const { setIsExpanded, handleSend } = useChat();

  const handleAskAI = (projectTitle: string) => {
    // 1. 챗봇 창을 엽니다.
    setIsExpanded(true);
    
    // 2. 입력창에 글자를 채우는 대신, 챗봇에게 즉시 메시지를 전송합니다.
    // 약간의 딜레이를 주어 창이 열리는 애니메이션 도중에 자연스럽게 메시지가 올라가도록 합니다.
    setTimeout(() => {
      handleSend(`${projectTitle} 프로젝트의 핵심 아키텍처와 해결 과정에 대해 알려줘`);
    }, 300); 
  };

  return (
    <section id="projects" className="py-20 px-6 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-3xl font-bold text-slate-900 border-b-2 pb-4 border-slate-900 inline-block">
            Featured Projects
          </h2>
          <p className="hidden md:block text-slate-500 text-sm font-medium pb-4">
            핵심 기술적 고민을 담은 쇼케이스입니다.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div 
              key={project.id} 
              id={`project-${project.id}`} 
              className="group flex flex-col p-6 sm:p-8 border border-slate-200/80 rounded-[28px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-400"
            >
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{project.title}</h3>
                    <p className="text-blue-600 font-semibold mt-1.5 text-[12.5px] tracking-widest uppercase">{project.period}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags?.map((tag, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100/80 text-slate-600 text-[11.5px] font-semibold rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-slate-600 text-[14px] mb-6 leading-[1.6]">
                  {project.summary}
                </p>

                <div className="bg-gradient-to-br from-blue-50/50 to-slate-50 p-5 rounded-2xl border border-blue-100/50 mb-7 flex-1">
                  <h4 className="text-[13px] font-bold text-blue-900 mb-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Key Technical Impact
                  </h4>
                  <ul className="space-y-2.5">
                    {project.content?.solution.slice(0, 2).map((point, idx) => (
                      <li key={idx} className="text-slate-600 text-[13.5px] leading-snug flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5 shrink-0">✓</span>
                        <span className="break-keep">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-4 border-t border-slate-100">
                  <button 
                    onClick={() => handleAskAI(project.title)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white px-4 py-2.5 rounded-xl text-[13.5px] font-bold transition-colors duration-300 group/btn"
                  >
                    <Sparkles size={16} className="transition-transform group-hover/btn:scale-110" />
                    AI에게 질문하기
                  </button>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[13px] font-bold bg-slate-100 text-slate-700 px-3.5 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                        <GithubIcon size={15} /> 코드
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[13px] font-bold bg-slate-100 text-slate-700 px-3.5 py-2.5 rounded-xl hover:bg-slate-200 transition-colors">
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