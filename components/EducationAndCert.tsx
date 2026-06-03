import { portfolioData } from '../content/data';

export default function EducationAndCert() {
  return (
    <section className="py-12 bg-white reveal">
      <div className="max-w-6xl mx-auto px-6 border-t border-slate-100 pt-12">
        <div className="flex flex-wrap gap-x-12 gap-y-6 justify-between text-sm text-slate-600">
          
          {/* 1. 학력 및 교육 영역 */}
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Education & Training</h4>
            {portfolioData.educations.map((edu) => (
              <p key={edu.id} className="mb-1">
                {edu.institution} {edu.description.split(' (')[0]}
              </p>
            ))}
          </div>

          {/* 2. 자격증 영역 (가로로 슬래시 병합) */}
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Certifications</h4>
            <p>
              {portfolioData.certifications.map(cert => cert.title).join(' / ')}
            </p>
          </div>

          {/* 3. 스킬 영역 (원본 HTML과 동일하게 유지) */}
          <div>
            <h4 className="font-bold text-slate-900 mb-2">Skills</h4>
            <p className="mb-1">JavaScript / TypeScript / HTML, CSS</p>
            <p>React Native / React / Git / Figma</p>
          </div>

        </div>
      </div>
    </section>
  );
}