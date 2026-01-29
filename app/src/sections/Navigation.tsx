import { useState, useEffect } from 'react';

interface NavigationProps {
  scrollY: number;
}

const Navigation = ({ scrollY }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isScrolled = scrollY > 50;

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]'
            : 'bg-transparent'
        }`}
        style={{
          height: isScrolled ? '64px' : '80px',
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className={`font-display text-2xl font-bold text-[#1a1a1a] transition-all duration-300 hover:scale-105 hover:tracking-wider ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
          >
            Portfolyo
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className={`relative text-sm font-medium text-[#1a1a1a] transition-all duration-300 group ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
                style={{
                  transitionDelay: `${100 + index * 80}ms`,
                  transitionTimingFunction: 'var(--ease-expo-out)',
                }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0077b6] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className={`px-5 py-2.5 bg-[#0077b6] text-white text-sm font-medium rounded-full transition-all duration-300 hover:bg-[#005a8c] hover:scale-105 hover:shadow-lg ${
                isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{
                transitionDelay: '500ms',
                transitionTimingFunction: 'var(--ease-spring)',
              }}
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#1a1a1a] transition-transform duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'top-3 rotate-45' : 'top-1'
                }`}
              />
              <span
                className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 md:hidden ${
          isMenuOpen
            ? 'clip-path-full opacity-100'
            : 'clip-path-zero opacity-0 pointer-events-none'
        }`}
        style={{
          clipPath: isMenuOpen
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
            : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`text-3xl font-display font-semibold text-[#1a1a1a] transition-all duration-500 ${
                isMenuOpen
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
              style={{
                transitionDelay: isMenuOpen ? `${100 + index * 100}ms` : '0ms',
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact');
            }}
            className={`mt-4 px-8 py-3 bg-[#0077b6] text-white text-lg font-medium rounded-full transition-all duration-500 ${
              isMenuOpen
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
            style={{
              transitionDelay: isMenuOpen ? '600ms' : '0ms',
              transitionTimingFunction: 'var(--ease-expo-out)',
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
