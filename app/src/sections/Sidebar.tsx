import { useState, useEffect } from 'react';
import { Linkedin, Github, Twitter, Instagram } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

const Sidebar = ({ activeSection }: SidebarProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/sk-shahin-mahammad-945204283', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Shahin-X', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: 'https://www.instagram.com/jake.s1702/?hl=en', label: 'Instagram' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[320px] bg-[#0f0f0f] border-r border-[#2a2a2a] flex-col z-50">
      {/* Profile Card */}
      <div className="p-6 flex-1 overflow-y-auto">
        <div
          className={`bg-[#1a1a1a] rounded-2xl p-5 border border-[#2a2a2a] transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
        >
          {/* Profile Image */}
          <div className="relative mb-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-[#e85d3f] to-[#a3e635]">
              <img
                src="/hero_1.jpg"
                alt="Sk Shahin Mahammad"
                className="w-full h-full object-cover mix-blend-luminosity"
              />
            </div>
            {/* Status Indicator */}
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#a3e635] rounded-full border-4 border-[#1a1a1a] flex items-center justify-center">
              <span className="w-2 h-2 bg-[#0f0f0f] rounded-full animate-pulse"></span>
            </div>
          </div>

          {/* Name */}
          <h2 className="text-xl font-bold text-white mb-1">Sk Shahin Mahammad</h2>
          
          {/* Bio */}
          <p className="text-sm text-[#888888] leading-relaxed mb-4">
            A Data Engineering Enthusiast passionate about cloud-first data systems and modern computing.
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-3">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-[#888888] hover:text-[#e85d3f] hover:bg-[#3a3a3a] transition-all duration-300"
                  aria-label={social.label}
                  style={{
                    transitionDelay: `${300 + index * 50}ms`,
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 space-y-1">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? 'bg-[#e85d3f] text-white'
                  : 'text-[#888888] hover:text-white hover:bg-[#1a1a1a]'
              } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
              style={{
                transitionDelay: `${400 + index * 50}ms`,
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              <span className={`w-2 h-2 rounded-full ${
                activeSection === link.href.slice(1) ? 'bg-white' : 'bg-[#555]'
              }`} />
              {link.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-[#2a2a2a]">
        <p className="text-xs text-[#555] text-center">
          © 2024 Sk Shahin Mahammad
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
