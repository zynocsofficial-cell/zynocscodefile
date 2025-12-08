
import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor on mobile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    setIsVisible(true);

    const mouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, input, textarea { cursor: none; }
      `}</style>
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 2.5 : 1})`,
        }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-80 blur-[1px]"></div>
      </div>
      <div 
        className="fixed top-0 left-0 w-2 h-2 bg-brand-400 rounded-full pointer-events-none z-[10000] transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`
        }}
      />
    </>
  );
};
