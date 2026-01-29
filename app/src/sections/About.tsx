import { useEffect, useRef, useState } from 'react';
import { GraduationCap, MapPin, Sparkles } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'B.Tech in Electronics Engineering from KIIT University',
      color: '#e85d3f',
    },
    {
      icon: MapPin,
      title: 'Location',
      description: 'Bhubaneswar, Odisha, India',
      color: '#a3e635',
    },
    {
      icon: Sparkles,
      title: 'Interests',
      description: 'Technology, Data Systems, Cloud Computing',
      color: '#3b82f6',
    },
  ];

  return (
    <section
      id="about"
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
            About Me
          </span>
          <span
            className={`h-px bg-[#e85d3f] transition-all duration-600 ${
              isVisible ? 'w-12' : 'w-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          />
        </div>

        <h2
          className={`text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '100ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
          }}
        >
          Passionate About <span className="text-[#e85d3f]">Data</span> & 
          <span className="text-[#a3e635]"> Technology</span>
        </h2>

        <p
          className={`text-[#888] leading-relaxed max-w-3xl transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '200ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
          }}
        >
          I am a B.Tech student from KIIT University with a background in Electronics and 
          Computer Science Engineering. I am deeply interested in technology, data, and modern 
          computing systems, and I enjoy continuously learning and improving my skills.
        </p>

        <p
          className={`text-[#888] leading-relaxed max-w-3xl mt-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '300ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
          }}
        >
          I am motivated, detail-oriented, and comfortable working both independently and in 
          team environments. I am looking to grow professionally while contributing to meaningful 
          projects in the data engineering space.
        </p>
      </div>

      {/* Highlight Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`group bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a] transition-all duration-500 hover:border-[${item.color}] hover:-translate-y-1 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${400 + index * 100}ms`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-[#888]">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
