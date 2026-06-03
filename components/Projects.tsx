import { portfolioData } from '../content/data';
import { ExternalLink } from 'lucide-react'; // Github import 제거

// 1. 직접 선언한 가벼운 GitHub SVG 컴포넌트
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Projects() {
  return (
    <section className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 border-b pb-4 inline-block border-black">
          Projects
        </h2>
        
        <div className="space-y-12">
          {portfolioData.projects.map((project) => (
            <div 
              key={project.id} 
              className="flex flex-col lg:flex-row gap-8 lg:gap-12 p-8 border border-gray-100 rounded-3xl hover:shadow-xl transition-shadow duration-300"
            >
              <div className="lg:w-1/3 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-500 font-medium mb-4">{project.period}</p>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {project.summary}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto">
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      <GithubIcon size={16} /> {/* 대체한 아이콘 적용 */}
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:w-2/3 bg-gray-50 p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-6 bg-black rounded-sm"></div>
                  <h4 className="text-lg font-bold text-gray-900">{project.troubleShooting.title}</h4>
                </div>
                <ul className="space-y-5">
                  {project.troubleShooting.points.map((point, idx) => {
                    const [title, ...desc] = point.split(':');
                    return (
                      <li key={idx} className="text-gray-700 leading-relaxed text-[15px]">
                        {desc.length > 0 ? (
                          <>
                            <strong className="text-black font-semibold bg-gray-200 px-1.5 py-0.5 rounded mr-2">
                              {title.trim()}
                            </strong>
                            {desc.join(':').trim()}
                          </>
                        ) : (
                          point
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}