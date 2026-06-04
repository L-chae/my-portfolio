import { portfolioData } from '../content/data';

export default function ExperienceAndInfo() {
  return (
    <section className="relative py-24 px-6 bg-[#F8F9FF] overflow-hidden">
      {/* 글로우 효과 */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-slate-900 border-b-2 pb-4 inline-block border-slate-900">
          Experience & Info
        </h2>

        <div id="experience" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* 왼쪽: 타임라인 */}
          <div className="lg:col-span-7 space-y-16">
            {portfolioData.allExperiences.map((exp, idx) => (
              <div key={idx} className="relative pl-8 group">
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-sm transition-transform group-hover:scale-125" />
                {idx !== portfolioData.allExperiences.length - 1 && (
                  <div className="absolute left-[5px] top-4 bottom-[-64px] w-0.5 bg-slate-200" />
                )}
                <p className="text-[13px] font-bold text-blue-600 tracking-wider uppercase mb-1.5">{exp.period}</p>
                <h3 className="text-xl font-semibold text-slate-900 mb-1">{exp.title}</h3>
                <p className="text-[14px] text-slate-500 mb-4">{exp.role}</p>
                <p className="text-gray-700 text-[14px] leading-[1.7] bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>

          {/* 오른쪽: Development Focus만 */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-800">
              <h4 className="text-[11px] font-bold text-blue-300 uppercase tracking-[0.08em] mb-8">Development Focus</h4>

              <div className="space-y-8">
                <div>
                  <p className="text-[11px] font-bold text-blue-300 uppercase tracking-[0.08em] mb-4">Interests</p>
                  <ul className="grid grid-cols-1 gap-3">
                    {portfolioData.journeyMetadata.interests.map((item, i) => (
                      <li key={i} className="text-[14px] text-slate-200 flex items-center gap-2">
                        <span className="text-blue-500 text-lg">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <p className="text-[11px] font-bold text-blue-300 uppercase tracking-[0.08em] mb-3">Currently Learning</p>
                  <p className="text-[14px] text-slate-200 leading-[1.7]">{portfolioData.journeyMetadata.learning}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}