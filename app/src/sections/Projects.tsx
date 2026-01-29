import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Database, Cloud, BarChart3, FileCode } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  icon: React.ElementType;
  color: string;
}

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'ETL Pipeline with Apache Spark',
      category: 'Data Engineering',
      description: 'Built a scalable ETL pipeline using Apache Spark for processing large datasets with transformations and aggregations.',
      tech: ['Spark', 'Python', 'SQL'],
      icon: Database,
      color: '#e85d3f',
    },
    {
      id: 2,
      title: 'Cloud Data Warehouse',
      category: 'Cloud Computing',
      description: 'Designed and implemented a data warehouse solution using Snowflake with optimized query performance.',
      tech: ['Snowflake', 'SQL', 'AWS'],
      icon: Cloud,
      color: '#a3e635',
    },
    {
      id: 3,
      title: 'Data Visualization Dashboard',
      category: 'Analytics',
      description: 'Created interactive dashboards for business intelligence using Python visualization libraries.',
      tech: ['Python', 'Pandas', 'Matplotlib'],
      icon: BarChart3,
      color: '#3b82f6',
    },
    {
      id: 4,
      title: 'SQL Query Optimization',
      category: 'Database',
      description: 'Developed optimized SQL queries for complex data retrieval with improved performance metrics.',
      tech: ['SQL', 'PostgreSQL', 'Indexing'],
      icon: FileCode,
      color: '#f59e0b',
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
      id="projects"
      ref={sectionRef}
      className="py-20 px-8 md:px-12 lg:px-16"
    >
      {/* Section Header */}
      <div className="mb-12">
        <div
          className={`flex items-center gap-3 mb-4 transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          <span className="text-sm font-medium text-[#e85d3f] uppercase tracking-wider">
            Recent Projects
          </span>
          <span
            className={`h-px bg-[#e85d3f] transition-all duration-600 ${
              isVisible ? 'w-12' : 'w-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          />
        </div>

        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '100ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
          }}
        >
          RECENT
        </h2>
        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-black mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '200ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
            WebkitTextStroke: '2px #444',
            color: 'transparent',
          }}
        >
          PROJECTS
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <div
              key={project.id}
              className={`group relative bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] transition-all duration-500 cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${300 + index * 100}ms`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.color}10 0%, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Category */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: project.color }} />
                  </div>
                  <span className="text-xs text-[#666] uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#e85d3f] transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#888] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-[#2a2a2a] text-[#888] rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="flex justify-end">
                  <div
                    className={`w-10 h-10 rounded-lg border border-[#333] flex items-center justify-center transition-all duration-300 ${
                      hoveredId === project.id
                        ? 'bg-[#e85d3f] border-[#e85d3f] text-white'
                        : 'text-[#666]'
                    }`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
