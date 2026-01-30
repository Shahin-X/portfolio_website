import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Database, Cloud, Code } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, projects: 0, certifications: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Animate counters when visible
  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setCounts({
          years: Math.round(2 * easeOut),
          projects: Math.round(3 * easeOut),
          certifications: Math.round(3 * easeOut),
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, interval);
    }
  }, [isVisible]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center px-8 md:px-12 lg:px-16 py-20"
    >
      {/* Large Title */}
      <div className="mb-8">
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          DATA
        </h1>
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{
            transitionDelay: '100ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
            WebkitTextStroke: '2px #444',
            color: 'transparent',
          }}
        >
          ENGINEER
        </h1>
      </div>

      {/* Description */}
      <p
        className={`text-lg md:text-xl text-[#888888] max-w-2xl mb-10 leading-relaxed transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: '300ms',
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      >
        Passionate about building cloud-first data systems and transforming raw data 
        into actionable insights. Specializing in modern data architectures with 
        Apache Spark, Snowflake, and cloud technologies.
      </p>

      {/* Stats */}
      <div
        className={`flex flex-wrap gap-8 md:gap-16 mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: '400ms',
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      >
        <div>
          <p className="text-4xl md:text-5xl font-bold text-white mb-1">+{counts.years}</p>
          <p className="text-sm text-[#666] uppercase tracking-wider">Years Learning</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-bold text-white mb-1">+{counts.projects}</p>
          <p className="text-sm text-[#666] uppercase tracking-wider">Projects</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-bold text-white mb-1">+{counts.certifications}</p>
          <p className="text-sm text-[#666] uppercase tracking-wider">Certifications</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div
        className={`flex flex-wrap gap-4 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          transitionDelay: '500ms',
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      >
        <button
          onClick={() => scrollToSection('#projects')}
          className="group px-6 py-3 bg-[#e85d3f] text-white font-medium rounded-xl flex items-center gap-2 transition-all duration-300 hover:bg-[#d14d32] hover:scale-105"
        >
          View Projects
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <button
          onClick={() => scrollToSection('#contact')}
          className="px-6 py-3 border border-[#333] text-white font-medium rounded-xl transition-all duration-300 hover:border-[#e85d3f] hover:text-[#e85d3f]"
        >
          Get In Touch
        </button>
      </div>

      {/* Mobile-only: Social Links */}
      <div className="lg:hidden mt-12 flex gap-4">
        {[
          { icon: Database, label: 'SQL' },
          { icon: Cloud, label: 'Cloud' },
          { icon: Code, label: 'Python' },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center text-[#888] transition-all duration-500 ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{
                transitionDelay: `${600 + index * 100}ms`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              <Icon className="w-5 h-5" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
