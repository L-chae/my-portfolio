'use client';

// 💡 면접관의 이목을 끄는 수치 및 문제 해결 중심의 고품질 목업 데이터
const MOCK_DATA = {
  experiences: [
    {
      id: "exp-1",
      period: "2023. 03 - Present",
      company: "스타트업 A (Frontend Lead)",
      role: "B2B SaaS 플랫폼 아키텍처 설계 및 성능 최적화",
      tasks: [
        "React와 Zustand를 활용한 파생 상태(Derived State) 아키텍처 도입으로 불필요한 리렌더링 40% 감소",
        "Orval 기반 OpenAPI 타입 자동화 파이프라인 구축하여 프론트-백엔드 인터페이스 장애율 0% 달성",
        "Axios Interceptor를 활용한 인앱 API 디버거 개발로 QA 팀의 버그 리포트 검증 시간 주당 5시간 단축",
      ],
    },
    {
      id: "exp-2",
      period: "2021. 08 - 2023. 02",
      company: "에이전시 B (Frontend Engineer)",
      role: "엔터프라이즈 사내 시스템 UI/UX 개발",
      tasks: [
        "사내 공통 컴포넌트(Design System) 라이브러리화 진행하여 신규 프로젝트 초기 세팅 시간 3일에서 1일로 단축",
        "토큰 만료 시 동시 다발적인 401 에러를 제어하기 위한 Promise Queue 인터셉터 구현",
        "Storybook 기반의 UI 문서화 도입으로 기획/디자인 직군과의 커뮤니케이션 비용 30% 절감",
      ],
    }
  ],
  profile: {
    strengths: ["Architecture Design", "Performance Optimization", "DX Improvement", "React Ecosystem"],
    interests: ["Micro-Frontend", "WebAssembly", "Data Visualization", "Functional Programming"],
    learning: "복잡한 클라이언트 상태 관리를 넘어, 사용자 경험을 극대화하기 위한 브라우저 렌더링 최적화와 Web Worker를 활용한 메인 스레드 병목 해소에 대해 연구하고 있습니다.",
  }
};

export default function ExperienceAndInfo() {
  const { experiences, profile } = MOCK_DATA;

  return (
    <section className="relative py-24 px-6 bg-[#F8F9FF] overflow-hidden">
      {/* 백그라운드 글로우 효과 (임의값 최소화) */}
      <div className="absolute top-0 left-0 w-100 h-100 bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

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
                  <div className="absolute left-1.5 top-5 -bottom-12 w-0.5 bg-slate-200" />
                )}
                
                {/* 헤더 정보 */}
                <p className="text-[12.5px] font-bold text-blue-600 tracking-widest uppercase mb-1.5">{exp.period}</p>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.company}</h3>
                <p className="text-[14px] text-slate-500 font-medium mb-5">{exp.role}</p>
                
                {/* 성과(Tasks) 리스트 렌더링 */}
                <div className="bg-white p-6 rounded-[20px] border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                  <ul className="space-y-3.5">
                    {exp.tasks.map((task, i) => (
                      // 고유 문자열 기반 key 생성
                      <li key={`${exp.id}-task-${i}`} className="text-slate-600 text-[14px] leading-relaxed flex items-start gap-3">
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
              <h4 className="text-[11.5px] font-bold text-blue-400 uppercase tracking-widest mb-8 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Development Focus
              </h4>

              <div className="space-y-8">
                {/* 1. Core Strengths */}
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Core Strengths</p>
                  <div className="flex flex-wrap gap-2.5">
                    {profile.strengths.map((item) => (
                      <span key={item} className="px-3.5 py-1.5 bg-slate-800 text-slate-200 text-[13px] font-medium rounded-lg border border-slate-700/50">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. Interests */}
                <div className="pt-7 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Interests</p>
                  <ul className="grid grid-cols-1 gap-3.5">
                    {profile.interests.map((item) => (
                      <li key={item} className="text-[14px] text-slate-300 flex items-center gap-3 font-medium">
                        <span className="text-blue-500 text-lg leading-none -mt-0.5">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Currently Learning */}
                <div className="pt-7 border-t border-slate-800/80">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Currently Learning</p>
                  <p className="text-[14px] text-slate-300 leading-relaxed font-medium break-keep">
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