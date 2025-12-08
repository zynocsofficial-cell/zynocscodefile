import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10", withText = false }) => {
  return (
    <div className="flex items-center gap-2">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <defs>
          <linearGradient id="logo_gradient" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" /> {/* Red */}
            <stop offset="20%" stopColor="#F97316" /> {/* Orange */}
            <stop offset="40%" stopColor="#EAB308" /> {/* Yellow */}
            <stop offset="60%" stopColor="#22C55E" /> {/* Green */}
            <stop offset="80%" stopColor="#06B6D4" /> {/* Cyan */}
            <stop offset="100%" stopColor="#3B82F6" /> {/* Blue */}
          </linearGradient>
        </defs>
        <path 
          d="M35 30 H85 L35 90 H85" 
          stroke="url(#logo_gradient)" 
          strokeWidth="20" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      {withText && (
        <span className="text-2xl font-bold text-white tracking-tighter">
          Zynocs
        </span>
      )}
    </div>
  );
};