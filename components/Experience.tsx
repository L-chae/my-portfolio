import { portfolioData } from '../content/data';

export default function Experience() {
  return (
    // 💡 배경을 흰색으로 변경하여 Hero/Core Values 섹션과 일관성 유지
    <section id="experience" className="py-24 px-6 bg-white border-y border-slate-100">
      {/* 💡 모든 섹션과 동일하게 max-w-6xl 및 mx-auto 사용 */}
      <div className="max-w-6xl mx-auto">
        
        {/* 💡 제목을 왼쪽 정렬 유지 (다른 섹션과 동일) */}
        <h2 className="text-3xl font-extrabold mb-12 text-slate-900 border-b-2 pb-4 inline-block border-slate-900">
          Experience
        </h2>
        
        {/* 💡 max-w-4xl을 유지하되, 전체 컨테이너 내에서 정렬이 깨지지 않도록 mx-0을 제거하고 정렬 보장 */}
        <div className="space-y-6 max-w-4xl">
          {portfolioData.experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="glow-card p-8 md:p-10 border border-slate-100 rounded-3xl bg-slate-50/50 shadow-sm shadow-slate-200/50 transition-all duration-300"
            >
              <div className="glow-content">
                {/* 헤더: 모바일/데스크탑 레이아웃 최적화 */}
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{exp.company}</h3>
                    <p className="text-blue-600 font-bold mt-1 text-base">{exp.role}</p>
                  </div>
                  <span className="shrink-0 bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase self-start">
                    {exp.period}
                  </span>
                </div>

                {/* 태스크: 가독성을 위한 불렛 스타일 적용 */}
                <ul className="space-y-4">
                  {exp.tasks.map((task, idx) => (
                    <li key={idx} className="flex gap-4 items-start text-slate-600">
                      <span className="text-blue-600 font-bold text-lg mt-[-2px]">•</span>
                      <span className="leading-relaxed text-[15px] font-medium text-slate-700">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}