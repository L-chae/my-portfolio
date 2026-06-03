import { portfolioData } from '../content/data';

export default function Experience() {
  return (
    <section className="py-20 bg-gray-50 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 border-b pb-4 inline-block border-black">
          Experience
        </h2>
        <div className="space-y-8">
          {portfolioData.experiences.map((exp) => (
            <div key={exp.id} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-50">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{exp.company}</h3>
                  <p className="text-lg text-gray-600 font-medium mt-2">{exp.role}</p>
                </div>
                <span className="inline-block mt-4 md:mt-0 bg-gray-100 text-gray-800 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-4">
                {exp.tasks.map((task, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-gray-700">
                    <span className="text-black font-bold text-xl leading-none mt-0.5">•</span>
                    <span className="leading-relaxed text-[15px]">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}