import React from 'react';

interface LogoProps {
  className?: string;
  withText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10 w-10", withText = false }) => {
  return (
    <div className="flex items-center gap-2.5 select-none">
      <img
        src="/images/logos/zynocs-logo.svg"
        alt="Zynocs Logo"
        className={`${className} object-contain transition-transform duration-300`}
      />
      {withText && (
        <span className="text-2xl font-bold text-white tracking-tight font-sans">
          Zynocs
        </span>
      )}
    </div>
  );
};
