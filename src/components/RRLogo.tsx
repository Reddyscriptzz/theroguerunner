
import React from 'react';

interface RRLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RRLogo: React.FC<RRLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`font-orbitron font-bold ${sizeClasses[size]} ${className} relative overflow-hidden`}>
      <div className="relative flex items-center justify-center animate-glitch">
        <span className="text-cyan-400 relative">R</span>
        <span className="text-cyan-400 relative transform scale-y-[-1] -ml-1">R</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse opacity-50"></div>
    </div>
  );
};

export default RRLogo;
