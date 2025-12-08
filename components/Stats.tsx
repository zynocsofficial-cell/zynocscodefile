import React, { useEffect, useState, useRef } from 'react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
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
      
      // Easing function for smooth stop
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
    { label: 'Projects Delivered', value: 50, suffix: '+' },
    { label: 'Client Retention', value: 98, suffix: '%' },
    { label: 'Team Experts', value: 25, suffix: '+' },
    { label: 'Years Experience', value: 10, suffix: '+' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-slate-800 py-12 bg-slate-900/30 backdrop-blur-sm">
      {stats.map((stat, idx) => (
        <div key={idx} className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
          <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
            <AnimatedCounter end={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-sm text-brand-400 font-medium uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};