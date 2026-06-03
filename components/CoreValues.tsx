import { portfolioData } from '../content/data';
import { ShieldAlert, Database, Terminal } from 'lucide-react';

// 밝고 차분한 파스텔톤 조합
const valueStyles = [
  { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', icon: <ShieldAlert className="w-7 h-7" /> },
  { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200', icon: <Database className="w-7 h-7" /> },
  { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200', icon: <Terminal className="w-7 h-7" /> },
];

export default function CoreValues() {
  return (
    // 💡 아주 연한 블루 그레이 배경(bg-slate-50보다 한 단계 더 부드러운 블루톤)
    <section id="core-values" className="py-24 px-6 bg-sky-50/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold mb-12 text-slate-900 border-b-2 pb-4 inline-block border-slate-900">
          Core Values
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.coreValues.map((value, index) => {
            const style = valueStyles[index % valueStyles.length];
            return (
              <div 
                key={value.id} 
                // 💡 카드 배경을 순수 화이트로 유지하여 깔끔함을 강조
                className="glow-card p-8 border border-slate-100 rounded-3xl bg-white shadow-sm shadow-sky-100/50 transition-all duration-300"
              >
                <div className="glow-content">
                  <div className={`mb-6 w-14 h-14 ${style.bg} ${style.text} border ${style.border} rounded-2xl flex items-center justify-center`}>
                    {style.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                    {value.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}