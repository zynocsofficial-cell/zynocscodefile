
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Terminal, Cloud, Lock, Zap, Database, Globe, Atom, Code, Server, Box, Layers, Smartphone, Wifi } from 'lucide-react';
import { Section } from '@/types';

interface HeroProps {
  onNavigate: (section: Section) => void;
}

// Tech Chip Component
const TechChip = ({ name, Icon }: { name: string; Icon: React.ElementType }) => (
  <div className="flex items-center space-x-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-sm min-w-max group/chip cursor-default transition-all duration-300 hover:bg-slate-800/90 hover:border-brand-500/40 hover:scale-105 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)]">
    <Icon className="w-4 h-4 text-slate-400 group-hover/chip:text-brand-400 transition-colors" />
    <span className="text-slate-300 text-xs sm:text-sm font-medium group-hover/chip:text-white transition-colors">{name}</span>
  </div>
);

// Interactive Marquee Component
const InteractiveMarquee = ({
  items,
  baseSpeed = 0.5,
  initialDirection = 1
}: {
  items: { name: string; icon: any }[];
  baseSpeed?: number;
  initialDirection?: number; // 1 for left, -1 for right
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [glowSide, setGlowSide] = useState<'none' | 'left' | 'right'>('none');

  // Physics refs
  const position = useRef(0);
  const speed = useRef(baseSpeed);
  const targetSpeed = useRef(baseSpeed);
  const direction = useRef(initialDirection); // 1 = moving left (content moves negative X)
  const isHovering = useRef(false);
  const requestRef = useRef<number>(null);

  // Mouse handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isHovering.current = true;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const normalizedX = mouseX / width; // 0 (left) to 1 (right)

    // Interaction Logic:
    // Center (0.4 - 0.6): Pause/Slow
    // Left (< 0.2): Fast Left
    // Right (> 0.8): Fast Right

    if (normalizedX < 0.15) {
      // Super Fast Left
      targetSpeed.current = baseSpeed * 5;
      direction.current = 1;
      setGlowSide('left');
    } else if (normalizedX > 0.85) {
      // Super Fast Right
      targetSpeed.current = baseSpeed * 5;
      direction.current = -1; // Move right (positive X)
      setGlowSide('right');
    } else if (normalizedX > 0.4 && normalizedX < 0.6) {
      // Center Pause
      targetSpeed.current = 0;
      setGlowSide('none');
    } else {
      // Normal cruising
      targetSpeed.current = baseSpeed;
      // Keep existing direction or drift gently
      setGlowSide('none');
    }
  }, [baseSpeed]);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    targetSpeed.current = baseSpeed;
    direction.current = initialDirection;
    setGlowSide('none');
  }, [baseSpeed, initialDirection]);

  // Animation Loop
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      // Smooth speed interpolation (lerp)
      const lerpFactor = 0.05; // Adjust for responsiveness vs smoothness
      speed.current += (targetSpeed.current - speed.current) * lerpFactor;

      // Update position
      // direction 1 = moving content left (decreasing X)
      // direction -1 = moving content right (increasing X)
      const moveAmount = speed.current * (deltaTime / 16) * (direction.current === 1 ? -1 : 1);
      position.current += moveAmount;

      // Seamless Loop Logic
      if (scrollerRef.current) {
        const width = scrollerRef.current.scrollWidth / 2; // Width of one set of items

        // Wrap around logic
        if (position.current <= -width) {
          position.current += width;
        } else if (position.current >= 0) {
          position.current -= width;
        }

        scrollerRef.current.style.transform = `translateX(${position.current}px)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden py-1 group select-none"
    >
      {/* Dynamic Glows on Sides */}
      <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-600/20 to-transparent z-10 transition-opacity duration-500 pointer-events-none ${glowSide === 'left' ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-accent-600/20 to-transparent z-10 transition-opacity duration-500 pointer-events-none ${glowSide === 'right' ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Standard Fade Masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>

      <div ref={scrollerRef} className="flex w-max space-x-4 px-2">
        {/* Render 4 copies for smooth infinite scroll */}
        {[...items, ...items, ...items, ...items].map((tech, idx) => (
          <TechChip key={`${idx}`} name={tech.name} Icon={tech.icon} />
        ))}
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [textIndex, setTextIndex] = useState(0);
  const rotatingTexts = ["Intelligence", "Precision", "Speed", "Security"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const row1 = [
    { name: 'React', icon: Atom },
    { name: 'Next.js', icon: Globe },
    { name: 'TypeScript', icon: Code },
    { name: 'Node.js', icon: Server },
    { name: 'Tailwind CSS', icon: Layers },
    { name: 'React Native', icon: Smartphone },
    { name: 'GraphQL', icon: Zap },
    { name: 'Vue.js', icon: Box },
  ];

  const row2 = [
    { name: 'AWS Cloud', icon: Cloud },
    { name: 'Docker', icon: Box },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Kubernetes', icon: Server },
    { name: 'Cybersecurity', icon: Lock },
    { name: 'Gemini AI', icon: Terminal },
    { name: 'Python', icon: Terminal },
    { name: 'DevOps', icon: Wifi },
  ];

  return (
    <div className="relative flex flex-col pt-28 sm:pt-36 lg:pt-40 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern -z-20 opacity-40"></div>

      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-screen filter blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 py-6 sm:py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left Content */}
            <div className="text-left animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-sm mb-5 sm:mb-6">
                <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
                <span className="text-brand-300 text-xs sm:text-sm font-medium tracking-wide">FUTURE TECH SOLUTIONS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-5 sm:mb-6 leading-[1.15]">
                Innovate with <br />
                <span key={textIndex} className="gradient-text animate-fade-in-up inline-block min-w-[240px] sm:min-w-[300px]">
                  {rotatingTexts[textIndex]}
                </span>
              </h1>

              <p className="max-w-xl text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 leading-relaxed">
                Zynocs architects enterprise-grade digital ecosystems. We merge cutting-edge AI with robust engineering to future-proof your business.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-4">
                <button
                  onClick={() => onNavigate(Section.Contact)}
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-1 flex items-center justify-center group"
                >
                  Start Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => onNavigate(Section.Services)}
                  className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl border border-slate-700 bg-slate-900/50 text-white font-semibold text-base sm:text-lg hover:bg-slate-800 transition-all hover:-translate-y-1 backdrop-blur-sm flex items-center justify-center"
                >
                  Explore Services
                </button>
              </div>
            </div>

            {/* Right Visual - Floating Code Card */}
            <div className="hidden md:block relative animate-float">
              <div className="relative z-10 glass-card p-5 sm:p-6 lg:p-7 rounded-2xl border-slate-700/50 transform md:rotate-1 lg:rotate-2 hover:rotate-0 transition-all duration-500 group shadow-2xl">
                <div className="flex items-center justify-between mb-4 border-b border-slate-700/80 pb-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/90"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/90"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">zynocs_core.ts</span>
                </div>
                <div className="space-y-3 font-mono text-xs sm:text-sm">
                  <div className="text-pink-400">import <span className="text-white">{'{ AI, Cloud }'}</span> from <span className="text-green-400">'@zynocs/core'</span>;</div>
                  <div className="text-slate-400">// Initializing Enterprise Module</div>
                  <div className="pl-4 border-l-2 border-slate-700 group-hover:border-brand-500 transition-colors">
                    <div className="text-blue-400">const <span className="text-yellow-300">solution</span> = <span className="text-purple-400">await</span> Zynocs.build({'{'}</div>
                    <div className="pl-4 text-white">performance: <span className="text-orange-400">'MAX'</span>,</div>
                    <div className="pl-4 text-white">security: <span className="text-orange-400">'LEVEL_5'</span>,</div>
                    <div className="pl-4 text-white">scalability: <span className="text-purple-400">true</span></div>
                    <div className="text-blue-400">{'}'});</div>
                  </div>
                  <div className="text-green-400 mt-4">{'>'} System Ready...</div>
                  <div className="text-brand-400 animate-pulse">{'>'} Deploying Success...</div>
                </div>
              </div>

              {/* Background Glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-600 to-accent-600 blur-3xl opacity-20 -z-10 rounded-full transform scale-110"></div>
            </div>

          </div>
        </div>
      </div>

      {/* Modern Sleek Marquee Section */}
      <div className="relative border-y border-slate-800/60 bg-slate-950/40 backdrop-blur-md py-4 sm:py-5 mt-10 sm:mt-14 lg:mt-16 mb-6 sm:mb-10 overflow-hidden">
        {/* Subtle accent border line glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-brand-500/25 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-accent-500/25 to-transparent"></div>

        {/* Marquee Rows */}
        <div className="space-y-3 sm:space-y-4">
          <InteractiveMarquee items={row1} baseSpeed={0.8} initialDirection={1} />
          <InteractiveMarquee items={row2} baseSpeed={0.8} initialDirection={-1} />
        </div>
      </div>
    </div>
  );
};
