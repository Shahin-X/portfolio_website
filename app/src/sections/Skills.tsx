import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  category: string;
  level: number;
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skills: Skill[] = [
    { name: 'Python', category: 'Programming', level: 85 },
    { name: 'SQL', category: 'Database', level: 90 },
    { name: 'C/C++', category: 'Programming', level: 80 },
    { name: 'Apache Spark', category: 'Big Data', level: 70 },
    { name: 'Snowflake', category: 'Cloud', level: 65 },
    { name: 'AWS', category: 'Cloud', level: 60 },
    { name: 'Pandas', category: 'Data Analysis', level: 85 },
    { name: 'Git', category: 'Tools', level: 80 },
  ];

  const categories = ['Programming', 'Database', 'Big Data', 'Cloud', 'Data Analysis', 'Tools'];

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
      id="skills"
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
          TECHNICAL
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
          SKILLS
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`group bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] transition-all duration-500 hover:border-[#e85d3f] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${200 + index * 50}ms`,
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-bold group-hover:text-[#e85d3f] transition-colors duration-300">
                  {skill.name}
                </h3>
                <p className="text-xs text-[#666]">{skill.category}</p>
              </div>
              <span className="text-sm text-[#888]">{skill.level}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#e85d3f] to-[#a3e635] rounded-full transition-all duration-1000"
                style={{
                  width: isVisible ? `${skill.level}%` : '0%',
                  transitionDelay: `${400 + index * 50}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Category Tags */}
      <div
        className={`mt-10 flex flex-wrap gap-3 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: '600ms',
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      >
        {categories.map((cat) => (
          <span
            key={cat}
            className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#888] text-sm rounded-lg hover:border-[#e85d3f] hover:text-white transition-all duration-300"
          >
            {cat}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Skills;
