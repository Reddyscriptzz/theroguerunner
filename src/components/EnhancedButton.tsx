
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import GlitchText from './GlitchText';

interface EnhancedButtonProps {
  children: React.ReactNode;
  className?: string;
  glitch?: boolean;
  pulse?: boolean;
  onClick?: () => void;
  href?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({ 
  children, 
  className = '', 
  glitch = false,
  pulse = false,
  onClick,
  href,
  variant = "default",
  size = "default"
}) => {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant={variant}
        size={size}
        className={`relative overflow-hidden group ${pulse ? 'animate-pulse-glow' : ''} ${className}`}
        onClick={handleClick}
      >
        {/* Energy pulse effect */}
        {pulse && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
        
        <span className="relative z-10">
          {glitch ? <GlitchText text={typeof children === 'string' ? children : 'Button'} /> : children}
        </span>
      </Button>
    </motion.div>
  );
};

export default EnhancedButton;
