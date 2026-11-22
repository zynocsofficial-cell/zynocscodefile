import React from 'react';
import { InteractiveArchitectureCanvas } from '../architecture/InteractiveArchitectureCanvas';

export const ArchitectureDesignsApp: React.FC = () => {
  return (
    <div className="w-full h-full animate-fade-in">
      <InteractiveArchitectureCanvas />
    </div>
  );
};
