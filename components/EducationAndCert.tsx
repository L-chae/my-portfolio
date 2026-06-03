import { portfolioData } from '../content/data';

export default function EducationAndCert() {
  return (
    <section className="py-20 bg-gray-50 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 학력 영역 */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-900 border-b pb-3 inline-block border-black">
            Education
          </h2>
          <div className="space-y-6">
            {portfolioData.educations.map((edu) => (
              <div key={edu.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900">{edu.institution}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-3 font-medium">{edu.period}</p>
                <p className="text-gray-700 text-[15px]">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 자격증 영역 */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-gray-900 border-b pb-3 inline-block border-black">
            Certifications
          </h2>
          <div className="space-y-6">
            {portfolioData.certifications.map((cert) => (
              <div key={cert.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900">{cert.title}</h3>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50 text-sm">
                  <span className="text-gray-700 font-semibold">{cert.issuer}</span>
                  <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}