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
    // 💡 Experience(slate-50)와 톤을 맞춰 배경을 중화시킴
    <section id="projects" className="py-20 px-6 bg-slate-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-10 text-slate-900 border-b-2 pb-4 inline-block border-slate-900">
          Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.projects.map((project) => (
            <div 
              key={project.id} 
              className="glow-card flex flex-col p-6 border border-slate-100 rounded-3xl bg-white shadow-sm shadow-slate-200/50"
            >
              <div className="glow-content flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{project.title}</h3>
                <p className="text-blue-600 font-semibold mb-3 text-[12px] tracking-widest uppercase">{project.period}</p>
                <p className="text-slate-600 text-[14px] mb-4 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>
                
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-md uppercase">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                  <h4 className="text-[13px] font-bold text-slate-900 mb-2">{project.troubleShooting.title}</h4>
                  <ul className="space-y-1.5">
                    {project.troubleShooting.points.slice(0, 2).map((point, idx) => (
                      <li key={idx} className="text-slate-500 text-[12px] truncate">• {point.split(':')[0]}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 mt-auto">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold bg-slate-900 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all">
                      <GithubIcon size={14} /> GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold bg-slate-100 text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-200 transition-all">
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