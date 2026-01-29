import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  description: string;
  period: string;
}

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      title: 'Data Engineering Intern',
      company: 'Learning & Projects',
      description: 'Building data pipelines, working with Apache Spark, Snowflake, and cloud platforms. Gaining hands-on experience with ETL processes and data warehousing.',
      period: '2023 - Present',
    },
    {
      id: 2,
      title: 'Computer Science Student',
      company: 'KIIT University',
      description: 'Pursuing B.Tech in Electronics Engineering with focus on data systems, programming, and modern computing technologies.',
      period: '2021 - 2025',
    },
    {
      id: 3,
      title: 'Self-Learner',
      company: 'Online Platforms',
      description: 'Continuously learning data engineering concepts, SQL, Python, cloud computing through online courses and hands-on projects.',
      period: '2020 - Present',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 px-8 md:px-12 lg:px-16"
    >
      {/* Section Header */}
      <div className="mb-12">
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionTimingFunction: 'var(--ease-expo-out)',
          }}
        >
          2+ YEARS OF
        </h2>
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '100ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
            WebkitTextStroke: '2px #444',
            color: 'transparent',
          }}
        >
          EXPERIENCE
        </h2>
      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            className={`group bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] transition-all duration-500 hover:border-[#e85d3f] hover:-translate-y-1 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${200 + index * 100}ms`,
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#e85d3f] transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#666] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <p className="text-[#e85d3f] font-medium mb-3">{exp.company}</p>
                <p className="text-sm text-[#888] leading-relaxed">{exp.description}</p>
              </div>
              <div className="md:text-right">
                <span className="text-sm text-[#666] bg-[#2a2a2a] px-3 py-1 rounded-lg">
                  {exp.period}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
