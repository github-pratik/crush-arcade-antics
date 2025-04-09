
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: number;
  text: string;
  isVisible: boolean;
};

const CrushMessage: React.FC = () => {
  const [revealed, setRevealed] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Your smile brightens my day!", isVisible: false },
    { id: 2, text: "I think about you more than I should admit...", isVisible: false },
    { id: 3, text: "You make my heart skip a beat", isVisible: false },
    { id: 4, text: "Every moment with you feels magical ✨", isVisible: false },
    { id: 5, text: "You're amazing just the way you are!", isVisible: false }
  ]);

  const revealMessage = () => {
    setRevealed(true);
    
    // Reveal messages one by one with a delay
    let delay = 300;
    const newMessages = [...messages];
    
    newMessages.forEach((message, index) => {
      setTimeout(() => {
        setMessages(current => 
          current.map(m => 
            m.id === message.id ? { ...m, isVisible: true } : m
          )
        );
      }, delay * (index + 1));
    });
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <Card className="bg-white/80 backdrop-blur border-cute-pink shadow-lg max-w-md w-full mx-auto">
      <CardContent className="pt-6">
        {!revealed ? (
          <div className="text-center">
            <div className="mb-4">
              <Heart className="w-12 h-12 text-love-500 mx-auto animate-heart-beat" />
            </div>
            <h3 className="text-xl font-bold mb-4 text-love-700">I have something to tell you...</h3>
            <Button 
              onClick={revealMessage}
              className="bg-love-500 hover:bg-love-600 text-white rounded-full px-6 py-2"
            >
              Reveal Message
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4 text-love-700">My feelings for you...</h3>
            
            <div className="space-y-3 mb-6">
              {messages.map((message, index) => (
                <div 
                  key={message.id}
                  className={cn(
                    "transition-all duration-300 transform",
                    message.isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-4",
                    showAll || index < 2 || (index === 2 && messages[0].isVisible && messages[1].isVisible) 
                      ? "block" 
                      : "hidden"
                  )}
                >
                  <p className="p-3 bg-cute-pink/20 rounded-lg text-love-800">{message.text}</p>
                </div>
              ))}
            </div>
            
            {messages.length > 3 && messages[2].isVisible && (
              <Button
                variant="outline"
                onClick={toggleShowAll}
                className="border-love-300 text-love-700 hover:bg-love-50"
              >
                {showAll ? "Show Less" : "Show More"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CrushMessage;
