import { useEffect, useRef, useState } from 'react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#1a1a1a] text-white py-16 md:py-20"
    >
      {/* Top Border Line */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 h-px bg-[#0077b6] transition-all duration-800 ${
          isVisible ? 'w-full' : 'w-0'
        }`}
        style={{
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6">
        {/* Logo & Tagline */}
        <div className="text-center mb-10">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className={`inline-block font-display text-3xl md:text-4xl font-bold mb-3 transition-all duration-500 hover:text-[#0077b6] ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
            style={{
              transitionDelay: '200ms',
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            Portfolyo
          </a>
          <p
            className={`text-[#999999] text-sm md:text-base transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transitionDelay: '350ms',
              transitionTimingFunction: 'var(--ease-smooth)',
            }}
          >
            Crafting digital experiences that inspire.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`relative text-sm text-[#999999] transition-all duration-300 hover:text-white group ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: `${450 + index * 70}ms`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p
            className={`text-sm text-[#666666] transition-all duration-500 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              transitionDelay: '850ms',
              transitionTimingFunction: 'var(--ease-smooth)',
            }}
          >
            © 2024 Portfolyo. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex gap-6">
            {legalLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm text-[#666666] transition-all duration-300 hover:text-[#0077b6] ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transitionDelay: `${900 + index * 50}ms`,
                  transitionTimingFunction: 'var(--ease-expo-out)',
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Background Glow Effect */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0077b6]/5 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '500ms' }}
      />
    </footer>
  );
};

export default Footer;
