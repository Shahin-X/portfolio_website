import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CEO',
      company: 'TechNova',
      quote:
        "Alex transformed our brand identity completely. The attention to detail and creative vision exceeded our expectations. Working with Alex was an absolute pleasure from start to finish.",
      image: '/testimonial-sarah.jpg',
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Founder',
      company: 'Artisan Co.',
      quote:
        "Working with Alex was a game-changer for our e-commerce platform. Sales increased 40% after the redesign. The user experience improvements were immediately noticeable.",
      image: '/testimonial-marcus.jpg',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Director',
      company: 'Lumina Analytics',
      quote:
        "The dashboard design Alex created made our complex data accessible and beautiful. Our users love it. The intuitive interface has significantly reduced support tickets.",
      image: '/testimonial-emily.jpg',
    },
  ];

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  // Auto-advance
  useEffect(() => {
    if (!isPaused && isVisible) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isVisible, nextSlide]);

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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#f5f5f5] overflow-hidden"
    >
      {/* Background Quote Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Quote
          className={`w-64 h-64 text-[#0077b6]/5 transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '500ms' }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
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
              Testimonials
            </span>
            <span
              className={`h-px bg-[#0077b6] transition-all duration-600 ${
                isVisible ? 'w-12' : 'w-0'
              }`}
            />
          </div>

          {/* Heading */}
          <h2
            className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] transition-all duration-600 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
            style={{
              transitionDelay: '100ms',
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            What Clients <span className="text-[#0077b6]">Say</span>
          </h2>
        </div>

        {/* Carousel */}
        <div
          className={`relative transition-all duration-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transitionDelay: '400ms',
            perspective: '1200px',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides Container */}
          <div className="relative h-[400px] md:h-[350px]">
            {testimonials.map((testimonial, index) => {
              const isActive = index === activeIndex;
              const isPrev =
                index ===
                (activeIndex - 1 + testimonials.length) % testimonials.length;
              const isNext = index === (activeIndex + 1) % testimonials.length;

              let transform = 'translateX(100%) scale(0.8) rotateY(-15deg)';
              let opacity = 0;
              let zIndex = 0;

              if (isActive) {
                transform = 'translateX(0) scale(1) rotateY(0deg)';
                opacity = 1;
                zIndex = 10;
              } else if (isPrev) {
                transform = 'translateX(-60%) scale(0.85) rotateY(5deg)';
                opacity = 0.5;
                zIndex = 5;
              } else if (isNext) {
                transform = 'translateX(60%) scale(0.85) rotateY(-5deg)';
                opacity = 0.5;
                zIndex = 5;
              }

              return (
                <div
                  key={testimonial.id}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-600"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transitionTimingFunction: 'var(--ease-expo-out)',
                  }}
                >
                  <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl max-w-2xl w-full mx-4">
                    {/* Quote */}
                    <p
                      className={`text-lg md:text-xl text-[#1a1a1a] leading-relaxed mb-8 font-display italic transition-all duration-400 ${
                        isActive ? 'blur-0' : 'blur-[2px]'
                      }`}
                    >
                      "{testimonial.quote}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#0077b6]/20">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-display font-bold text-[#1a1a1a]">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-[#666666]">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0077b6] transition-all duration-300 hover:bg-[#0077b6] hover:text-white hover:scale-110 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#0077b6] transition-all duration-300 hover:bg-[#0077b6] hover:text-white hover:scale-110 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-6 bg-[#0077b6]'
                    : 'w-2 bg-[#0077b6]/30 hover:bg-[#0077b6]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
