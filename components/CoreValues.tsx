import { portfolioData } from '../content/data';
import { ShieldAlert, Database, Terminal } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'fa-shield-halved': <ShieldAlert className="w-7 h-7 text-black" />,
  'fa-database': <Database className="w-7 h-7 text-black" />,
  'fa-code': <Terminal className="w-7 h-7 text-black" />,
};

export default function CoreValues() {
  return (
    <section id="core-values" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 border-b pb-4 inline-block border-black">
          Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.coreValues.map((value) => (
            <div 
              key={value.id} 
              className="p-8 border border-gray-100 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-6 w-14 h-14 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-sm">
                {iconMap[value.icon]}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}