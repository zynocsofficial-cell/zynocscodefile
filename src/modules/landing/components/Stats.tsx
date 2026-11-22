import React, { useEffect, useState, useRef } from 'react';
import { Briefcase, Users, Cpu, Clock } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const AnimatedCounter = ({ end, duration = 1800, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);
      setCount(Math.floor(easeOutQuart(percentage) * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}{suffix}</span>;
};

export const Stats: React.FC = () => {
  const stats = [
    { 
      label: 'Projects Delivered', 
      value: 24, 
      suffix: '+', 
      icon: Briefcase,
      color: 'text-brand-400',
      spotlightColor: 'rgba(56, 189, 248, 0.18)',
      desc: 'Production enterprise systems' 
    },
    { 
      label: 'Client Retention', 
      value: 98, 
      suffix: '%', 
      icon: Users,
      color: 'text-emerald-400',
      spotlightColor: 'rgba(52, 211, 153, 0.18)',
      desc: 'Multi-year engineering partnerships' 
    },
    { 
      label: 'Team Experts', 
      value: 25, 
      suffix: '+', 
      icon: Cpu,
      color: 'text-purple-400',
      spotlightColor: 'rgba(192, 132, 252, 0.18)',
      desc: 'Specialized architects & engineers' 
    },
    { 
      label: 'Years Experience', 
      value: 6, 
      suffix: '+', 
      icon: Clock,
      color: 'text-amber-400',
      spotlightColor: 'rgba(251, 191, 36, 0.18)',
      desc: 'Delivering mission-critical solutions' 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 animate-fade-in-up">
      {stats.map((stat, idx) => (
        <SpotlightCard
          key={idx}
          spotlightColor={stat.spotlightColor}
          className="p-7 sm:p-8 h-full rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-500/10 group cursor-default"
        >
          <div className="flex flex-col justify-between h-full">
            <div className="mb-6">
              <div className={`w-fit p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>

            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 font-mono tracking-tight group-hover:text-brand-300 transition-colors">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>

              <div className="text-sm font-bold text-slate-200 tracking-wide mb-1">
                {stat.label}
              </div>

              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                {stat.desc}
              </p>
            </div>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
};
