
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDuration: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  
  useEffect(() => {
    // Create initial batch of hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => createHeart(i));
    setHearts(initialHearts);
    
    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(current => {
        // Remove some old hearts when there are too many
        const filtered = current.length > 25 
          ? current.filter((_, i) => i > current.length - 25) 
          : current;
          
        return [...filtered, createHeart(Date.now())];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const createHeart = (id: number): FloatingHeart => {
    return {
      id,
      x: Math.random() * 100, // random x position (0-100%)
      y: Math.random() * 100, // random y position (0-100%)
      size: 10 + Math.random() * 20, // random size between 10-30px
      opacity: 0.1 + Math.random() * 0.3, // random opacity between 0.1-0.4
      animationDuration: 15 + Math.random() * 20, // random animation duration between 15-35s
    };
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animation: `float ${heart.animationDuration}s ease-in-out infinite`,
            animationDelay: `-${Math.random() * 5}s`
          }}
        >
          <Heart 
            fill="#FFC0CB" 
            size={heart.size} 
            color="#FFC0CB"
            opacity={heart.opacity}
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
