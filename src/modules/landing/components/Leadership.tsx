import React, { useState } from 'react';
import { Linkedin, Twitter, ArrowUpRight, Award } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const LeaderImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback to a professional generic placeholder if the specific image fails
      setImgSrc("https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=400&h=400");
    }
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className}
      onError={handleError}
    />
  );
};

export const Leadership: React.FC = () => {
  const leaders = [
    {
      name: "Yousuf Mohammed Jaleel",
      role: "Founder & CEO",
      bio: "Former Principal Architect at CloudSystems. Yousuf leads the strategic vision of Zynocs, focusing on AI-driven enterprise transformation and next-gen cloud infrastructure.",
      image: "/images/leadership/yousuf-mohammed-jaleel.jpeg"
    },
    {
      name: "Mohammed Khaja Moinuddin",
      role: "Founder & Chairperson",
      bio: "A veteran in cybersecurity and corporate governance. Mohammed ensures Zynocs remains at the forefront of secure, ethical technological advancement and global expansion.",
      image: "/images/leadership/mohammed-khaja-moinuddin.jpeg"
    }
  ];

  return (
    <div className="mt-32 mb-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-4">Visionary Leadership</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Guiding Zynocs with a blend of technical mastery and strategic foresight.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
        {leaders.map((leader, idx) => (
          <SpotlightCard key={idx} className="p-8 group h-full" spotlightColor="rgba(56, 189, 248, 0.1)">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="relative shrink-0">
                <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-slate-700 group-hover:border-brand-500 transition-colors shadow-xl bg-slate-800">
                  <LeaderImage 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" 
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-slate-900 rounded-xl p-2 border border-slate-800 shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                  <Award className="w-5 h-5 text-brand-400" />
                </div>
              </div>
              
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">{leader.name}</h3>
                <div className="inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-4">
                  {leader.role}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {leader.bio}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <a href="#" className="text-slate-500 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-lg hover:bg-slate-800">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="text-slate-500 hover:text-white transition-colors bg-slate-800/50 p-2 rounded-lg hover:bg-slate-800">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <button className="text-xs text-brand-400 hover:text-brand-300 font-medium ml-auto flex items-center group/btn">
                    View Profile <ArrowUpRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};
