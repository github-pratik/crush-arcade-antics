
import React, { useState } from 'react';
import { HeartPulse, Gift, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeartCatcher from '@/components/HeartCatcher';
import CrushMessage from '@/components/CrushMessage';
import FloatingHearts from '@/components/FloatingHearts';

const Index = () => {
  const [name, setName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  
  const handleEnter = () => {
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-8 px-4 relative">
      {/* Background floating hearts */}
      <FloatingHearts />
      
      {showWelcome ? (
        <div className="w-full max-w-md flex flex-col items-center justify-center my-auto">
          <Card className="w-full bg-white/80 backdrop-blur-sm border-cute-pink shadow-xl animate-bounce-in">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <HeartPulse className="w-16 h-16 text-love-500 mx-auto" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6 text-love-700">
                Crush Arcade Antics
              </h1>
              <p className="mb-8 text-foreground/80">
                A sweet little place made just for you! Play games and discover cute messages.
              </p>
              
              <Button
                onClick={handleEnter}
                size="lg"
                className="bg-love-500 hover:bg-love-600 text-white font-bold rounded-full px-8 py-4 text-xl"
              >
                Enter <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="container max-w-4xl mx-auto">
          <header className="flex flex-col items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-love-700 text-shadow">
              Crush Arcade Antics
            </h1>
            <p className="text-lg text-center text-foreground/70 mt-2">
              A sweet little space made just for you! ✨
            </p>
          </header>
          
          <Tabs defaultValue="game" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="game" className="text-lg py-3">
                <HeartPulse className="mr-2 h-5 w-5" />
                Play Game
              </TabsTrigger>
              <TabsTrigger value="message" className="text-lg py-3">
                <Gift className="mr-2 h-5 w-5" />
                Sweet Message
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="game" className="mt-0 animate-bounce-in">
              <HeartCatcher />
              
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Catch the falling hearts to reveal sweet messages!</p>
                <p className="mt-2">The more hearts you catch, the more points you earn!</p>
              </div>
            </TabsContent>
            
            <TabsContent value="message" className="mt-4 animate-bounce-in">
              <CrushMessage />
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  There might be more messages hidden in the game...
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      <footer className="mt-auto pt-8 pb-4 text-center text-sm text-muted-foreground">
        <p>Made with ❤️ just for you</p>
      </footer>
    </div>
  );
};

export default Index;
