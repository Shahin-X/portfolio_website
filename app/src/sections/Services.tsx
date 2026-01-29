import { useEffect, useRef, useState } from 'react';
import {
  Palette,
  Globe,
  Code,
  Layout,
  Sparkles,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const services: Service[] = [
    {
      id: 1,
      title: 'Brand Identity',
      description:
        'Logo design, color systems, typography, and comprehensive brand guidelines.',
      icon: Palette,
    },
    {
      id: 2,
      title: 'Web Design',
      description:
        'Responsive, user-centered designs that convert visitors into customers.',
      icon: Globe,
    },
    {
      id: 3,
      title: 'Development',
      description:
        'Clean, performant code using modern technologies and best practices.',
      icon: Code,
    },
    {
      id: 4,
      title: 'UI/UX Design',
      description:
        'Intuitive interfaces backed by research and user testing.',
      icon: Layout,
    },
    {
      id: 5,
      title: 'Motion Design',
      description:
        'Animations and interactions that bring your digital products to life.',
      icon: Sparkles,
    },
    {
      id: 6,
      title: 'Consulting',
      description:
        'Strategic guidance to help you make informed digital decisions.',
      icon: MessageSquare,
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
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Section Label */}
          <div
            className={`flex items-center justify-center gap-3 mb-4 transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            <span
              className={`h-px bg-[#0077b6] transition-all duration-600 ${
                isVisible ? 'w-12' : 'w-0'
              }`}
            />
            <span className="text-sm font-medium text-[#0077b6] uppercase tracking-wider">
              Services
            </span>
            <span
              className={`h-px bg-[#0077b6] transition-all duration-600 ${
                isVisible ? 'w-12' : 'w-0'
              }`}
            />
          </div>

          {/* Heading */}
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4 transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{
              transitionDelay: '100ms',
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            What I Can Do For <span className="text-[#0077b6]">You</span>
          </h2>

          {/* Description */}
          <p
            className={`text-[#666666] leading-relaxed max-w-xl mx-auto transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: '400ms',
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            From concept to launch, I provide end-to-end digital solutions
            tailored to your needs.
          </p>
        </div>

        {/* Services Grid - Staggered Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isOffset = index % 2 === 1;

            return (
              <div
                key={service.id}
                className={`group relative bg-[#f5f5f5] rounded-2xl p-6 md:p-8 transition-all duration-600 cursor-pointer ${
                  isOffset ? 'lg:mt-10' : ''
                } ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-16'
                }`}
                style={{
                  transitionDelay: `${500 + index * 100}ms`,
                  transitionTimingFunction: 'var(--ease-expo-out)',
                }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-white flex items-center justify-center mb-5 transition-all duration-300 shadow-sm ${
                    hoveredId === service.id
                      ? 'bg-[#0077b6] text-white rotate-[10deg] scale-110'
                      : 'text-[#0077b6]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-[#1a1a1a] mb-3 group-hover:text-[#0077b6] transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#666666] text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Learn More Link */}
                <div
                  className={`flex items-center gap-2 text-sm font-medium text-[#0077b6] transition-all duration-300 ${
                    hoveredId === service.id
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2'
                  }`}
                >
                  <span className="relative">
                    Learn More
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[#0077b6] transition-all duration-300 ${
                        hoveredId === service.id ? 'w-full' : 'w-0'
                      }`}
                    />
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredId === service.id ? 'translate-x-1' : ''
                    }`}
                  />
                </div>

                {/* Hover Border */}
                <div
                  className={`absolute inset-0 border-2 border-[#0077b6] rounded-2xl pointer-events-none transition-all duration-300 ${
                    hoveredId === service.id
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />

                {/* Hover Shadow */}
                <div
                  className={`absolute inset-0 rounded-2xl shadow-xl transition-all duration-300 -z-10 ${
                    hoveredId === service.id
                      ? 'opacity-100 translate-y-2'
                      : 'opacity-0 translate-y-0'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
