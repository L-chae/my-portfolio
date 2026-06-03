import { portfolioData } from '../content/data';

export default function EducationAndCert() {
  return (
    // 💡 묵직한 다크 모드 배경으로 포트폴리오를 안정적으로 마무리
    <section className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Education Card */}
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-6">Education</h4>
            <div className="space-y-6">
              {portfolioData.educations.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold text-white text-lg mb-1">{edu.institution}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Certifications Card */}
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-6">Certifications</h4>
            <div className="space-y-4">
              {portfolioData.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <p className="text-slate-200 font-medium text-sm">{cert.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Skills Card */}
          <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700">
            <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-widest mb-6">Skills</h4>
            <div className="space-y-6">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'TypeScript', 'HTML/CSS'].map(s => (
                    <span key={s} className="px-3 py-1 bg-slate-700 rounded-lg text-xs font-medium text-slate-200">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase mb-2">Frameworks & Tools</p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'React Native', 'Git', 'Figma'].map(s => (
                    <span key={s} className="px-3 py-1 bg-slate-700 rounded-lg text-xs font-medium text-slate-200">{s}</span>
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