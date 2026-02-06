import { useEffect, useRef, useState } from 'react';
import { Send, Check, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('message', formData.message);

      // Option B: no-cors (fire & forget)
      await fetch('https://formspree.io/f/xkovnwnl', {
        method: 'POST',
        body: form,
        mode: 'no-cors',
      });

      // Always show success
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      // This will almost never run with no-cors
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'shahinmd1710@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 90648 29003' },
    { icon: MapPin, label: 'Location', value: 'Bhubaneswar, Odisha, India' },
  ];

  return (
    <section
      id="contact"
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
          LET'S WORK
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
          TOGETHER
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div
          className={`space-y-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '200ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
          }}
        >
          <p className="text-[#888] leading-relaxed">
            Have a project in mind or want to collaborate? I'm always open to discussing 
            new opportunities in data engineering and cloud computing.
          </p>

          <div className="space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a]"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#e85d3f]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#e85d3f]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#666] uppercase">{item.label}</p>
                    <p className="text-white">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: '300ms',
            transitionTimingFunction: 'var(--ease-expo-out)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a]">
                <div className="w-16 h-16 rounded-full bg-[#a3e635]/20 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-[#a3e635]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-[#888]">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#666] mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white placeholder-[#555] outline-none focus:border-[#e85d3f] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#666] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white placeholder-[#555] outline-none focus:border-[#e85d3f] transition-colors duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#666] mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl text-white placeholder-[#555] outline-none focus:border-[#e85d3f] transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#e85d3f] text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:bg-[#d14d32] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Submit
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-[#2a2a2a] text-center">
        <p className="text-[#555] text-sm">
          Made by <span className="text-[#e85d3f]">Sk Shahin Mahammad</span> | Powered by React
        </p>
      </div>
    </section>
  );
};

export default Contact;
