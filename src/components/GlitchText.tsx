
import React, { useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className={`relative z-10 ${isGlitching ? 'animate-glitch' : ''}`}>
        {text}
      </span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-red-500 animate-pulse opacity-70" style={{ transform: 'translate(-2px, -2px)' }}>
            {text}
          </span>
          <span className="absolute top-0 left-0 text-blue-500 animate-pulse opacity-70" style={{ transform: 'translate(2px, 2px)' }}>
            {text}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
