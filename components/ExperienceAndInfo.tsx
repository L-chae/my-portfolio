'use client';

import { portfolioData } from '../content/data';

export default function ExperienceAndInfo() {
  const { experiences, profile } = portfolioData;

  return (
    <section className="relative py-24 px-6 bg-[#F8F9FF] overflow-hidden">
      {/* 백그라운드 글로우 효과 */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-slate-900 border-b-2 pb-4 inline-block border-slate-900">
          Experience & Info
        </h2>

        <div id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* 왼쪽: 실무 경험 타임라인 */}
          <div className="lg:col-span-7 space-y-12">
            {experiences.map((exp, idx) => (
              <div key={exp.id} className="relative pl-8 group">
                {/* 타임라인 노드 및 선 */}
                <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-[2.5px] border-white shadow-sm transition-transform duration-300 group-hover:scale-125" />
                {idx !== experiences.length - 1 && (
                  <div className="absolute left-[6px] top-5 bottom-[-48px] w-0.5 bg-slate-200" />
                )}
                
                {/* 헤더 정보 */}
                <p className="text-[12.5px] font-bold text-blue-600 tracking-widest uppercase mb-1.5">{exp.period}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.company}</h3>
                <p className="text-[14px] text-slate-500 font-medium mb-5">{exp.role}</p>
                
                {/* 성과(Tasks) 리스트 렌더링 */}
                <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                  <ul className="space-y-3.5">
                    {exp.tasks.map((task, i) => (
                      <li key={i} className="text-slate-600 text-[14px] leading-[1.6] flex items-start gap-3">
                        <span className="text-blue-500 mt-1.5 shrink-0 text-[8px]">■</span>
                        <span className="break-keep">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* 오른쪽: Development Focus (Profile 연동) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-slate-900 p-8 sm:p-10 rounded-[28px] shadow-xl border border-slate-800">
              <h4 className="text-[11.5px] font-bold text-blue-400 uppercase tracking-[0.1em] mb-8 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Development Focus
              </h4>

              <div className="space-y-8">
                {/* 1. Core Strengths (새로 추가된 데이터 활용) */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.08em] mb-4">Core Strengths</p>
                  <div className="flex flex-wrap gap-2.5">
                    {profile.strengths.map((item, i) => (
                      <span key={i} className="px-3.5 py-1.5 bg-slate-800 text-slate-200 text-[13px] font-medium rounded-lg border border-slate-700/50">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Interests */}
                <div className="pt-7 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.08em] mb-4">Interests</p>
                  <ul className="grid grid-cols-1 gap-3.5">
                    {profile.interests.map((item, i) => (
                      <li key={i} className="text-[14px] text-slate-300 flex items-center gap-3 font-medium">
                        <span className="text-blue-500 text-lg leading-none mt-[-2px]">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Currently Learning */}
                <div className="pt-7 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.08em] mb-3">Currently Learning</p>
                  <p className="text-[14px] text-slate-300 leading-[1.7] font-medium break-keep">
                    {profile.learning}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}