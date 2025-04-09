
import React, { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateRandomMessage } from '@/lib/gameUtils';
import { toast } from '@/components/ui/use-toast';

interface HeartInfo {
  id: number;
  x: number;
  y: number;
  speed: number;
  size: number;
  rotation: number;
}

const HeartCatcher: React.FC = () => {
  const [hearts, setHearts] = useState<HeartInfo[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [catcherPosition, setCatcherPosition] = useState(50);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('crushGameHighScore');
    return saved ? parseInt(saved) : 0;
  });
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const catcherWidth = 80; // width of catcher in pixels
  
  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setHearts([]);
  };
  
  // Handle mouse/touch movement for the catcher
  const handleCatcherMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!gameAreaRef.current || !gameStarted) return;
    
    const gameWidth = gameAreaRef.current.offsetWidth;
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    
    // Calculate position as percentage of game area width
    const newPosition = Math.max(0, Math.min(100, (relativeX / gameWidth) * 100));
    setCatcherPosition(newPosition);
  };
  
  // Create new falling hearts
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      if (hearts.length < 10) {
        setHearts(currentHearts => {
          const newHeart = {
            id: Date.now(),
            x: Math.random() * 100, // Position as percentage of width
            y: -10,
            speed: 1 + Math.random() * 2,
            size: 20 + Math.random() * 15,
            rotation: Math.random() * 360
          };
          return [...currentHearts, newHeart];
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameStarted, hearts.length, gameOver]);
  
  // Update heart positions
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const frameRate = 1000 / 60; // 60 FPS
    
    const interval = setInterval(() => {
      setHearts(currentHearts => {
        return currentHearts.map(heart => {
          // Move the heart down
          const updatedHeart = {
            ...heart,
            y: heart.y + heart.speed
          };
          
          return updatedHeart;
        }).filter(heart => {
          // Check for catching the heart
          if (heart.y > 95 && Math.abs(heart.x - catcherPosition) < 10) {
            // Heart is caught
            setScore(prevScore => prevScore + 1);
            
            // Show a sweet message when heart is caught
            if (Math.random() > 0.5) {
              toast({
                title: '❤️ Sweet!',
                description: generateRandomMessage(),
                duration: 3000,
              });
            }
            
            return false;
          }
          
          // Remove hearts that fall off the screen
          return heart.y < 110;
        });
      });
    }, frameRate);
    
    return () => clearInterval(interval);
  }, [gameStarted, catcherPosition, gameOver]);
  
  // Game timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      setTimeLeft(time => {
        if (time <= 1) {
          setGameOver(true);
          
          // Update high score if needed
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('crushGameHighScore', score.toString());
          }
          
          return 0;
        }
        return time - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameStarted, score, highScore, gameOver]);

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      {!gameStarted ? (
        <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg animate-bounce-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">Heart Catcher</h2>
          <p className="mb-6 text-foreground/80">Catch falling hearts to earn sweet messages!</p>
          <Button 
            onClick={startGame}
            className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-6 rounded-full text-lg"
          >
            Start Game
          </Button>
          {highScore > 0 && (
            <p className="mt-4 text-sm text-muted-foreground">High Score: {highScore}</p>
          )}
        </div>
      ) : (
        <div 
          ref={gameAreaRef}
          className="relative w-full h-[70vh] bg-secondary/40 backdrop-blur-sm rounded-2xl overflow-hidden border-4 border-primary/50 shadow-xl"
          onMouseMove={handleCatcherMove}
          onTouchMove={handleCatcherMove}
        >
          {/* Game status */}
          <div className="absolute top-2 left-0 right-0 flex justify-between px-4 py-2 z-10">
            <div className="bg-white/80 rounded-full px-4 py-1 text-primary font-bold">
              Score: {score}
            </div>
            <div className="bg-white/80 rounded-full px-4 py-1 text-primary font-bold">
              Time: {timeLeft}s
            </div>
          </div>
          
          {/* Falling hearts */}
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="absolute"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                transform: `rotate(${heart.rotation}deg)`,
              }}
            >
              <Heart
                size={heart.size}
                fill="#FF6B81"
                color="#FF6B81"
                className="drop-shadow-md"
              />
            </div>
          ))}
          
          {/* Catcher */}
          <div
            className="absolute bottom-2"
            style={{
              left: `calc(${catcherPosition}% - ${catcherWidth / 2}px)`,
              width: `${catcherWidth}px`,
              transition: 'left 0.1s ease-out'
            }}
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <Heart size={60} fill="#F43F5E" className="filter drop-shadow-lg" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                  Catch!
                </div>
              </div>
            </div>
          </div>
          
          {/* Game over overlay */}
          {gameOver && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-20">
              <div className="bg-white p-6 rounded-2xl shadow-xl text-center animate-bounce-in">
                <h3 className="text-2xl font-bold mb-2 text-primary">Game Over!</h3>
                <p className="mb-4">You caught {score} hearts!</p>
                {score > highScore - 1 && (
                  <p className="text-love-600 font-bold mb-4">New High Score! ✨</p>
                )}
                <Button 
                  onClick={startGame}
                  className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded-full"
                >
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeartCatcher;
