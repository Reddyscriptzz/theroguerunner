
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  flip3D?: boolean;
  backContent?: React.ReactNode;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  children, 
  className = '', 
  flip3D = false,
  backContent 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (flip3D && backContent) {
    return (
      <div 
        className={`relative w-full h-full perspective-1000 ${className}`}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <motion.div
          className="relative w-full h-full preserve-3d transition-transform duration-700"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* Front */}
          <Card className="absolute inset-0 backface-hidden bg-gray-900/50 border-gray-800 hover:border-cyan-500/50 backdrop-blur-md">
            {children}
          </Card>
          
          {/* Back */}
          <Card className="absolute inset-0 backface-hidden bg-gray-900/50 border-gray-800 backdrop-blur-md rotate-y-180">
            {backContent}
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className={`bg-gray-900/30 border-gray-800 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/20 ${className}`}>
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
