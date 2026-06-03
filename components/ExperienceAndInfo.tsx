import { portfolioData } from '../content/data';

export default function ExperienceAndInfo() {
  return (
    <section className="py-24 px-6 bg-slate-50/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-16 text-slate-900 border-b-2 pb-4 inline-block border-slate-900">
          Experience & Info
        </h2>

        <div id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 왼쪽: 개발 여정 타임라인 */}
          <div className="lg:col-span-7 space-y-12">
            {portfolioData.allExperiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* 타임라인 선 및 원 */}
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm transition-transform group-hover:scale-125"></div>
                <div className="absolute left-[5px] top-4 bottom-[-48px] w-0.5 bg-slate-200"></div>
                
                <p className="text-[11px] font-bold text-blue-600 tracking-wider uppercase mb-1">{exp.period}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.title}</h3>
                <p className="text-sm font-semibold text-slate-500 mb-3">{exp.role}</p>
                <p className="text-slate-600 text-[14px] leading-relaxed bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* 오른쪽: 요약 정보 (Info) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 관심사 및 학습 (다크 테마 포인트) */}
            <div className="bg-slate-900 p-8 rounded-3xl text-white shadow-xl">
              <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-6">Development Focus</h4>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Interests</p>
                  <ul className="space-y-2">
                    {portfolioData.journeyMetadata.interests.map((item, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                        <span className="text-blue-500">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-6 border-t border-slate-700">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Currently Learning</p>
                  <p className="text-sm text-slate-200 leading-relaxed">{portfolioData.journeyMetadata.learning}</p>
                </div>
              </div>
            </div>

            {/* 자격증 및 스킬 (밝은 톤의 세컨더리 카드) */}
            <div className="grid grid-cols-1 gap-6">
              <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Certifications</h4>
                <div className="space-y-2">
                  {portfolioData.certifications.map((cert, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[13px]">
                      <span className="text-slate-700 font-medium">{cert.title}</span>
                      <span className="text-slate-400 text-[11px]">{cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}