
import React, { useState, useEffect } from 'react';
import { HeartPulse, Gift, Sparkles, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HeartCatcher from '@/components/HeartCatcher';
import CrushMessage from '@/components/CrushMessage';
import FloatingHearts from '@/components/FloatingHearts';
import { generateSpecialBondQuote, generateNicknames } from '@/lib/gameUtils';

const Index = () => {
  const [name, setName] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [bondQuote, setBondQuote] = useState("");
  const [nicknames, setNicknames] = useState<{ userNickname: string; myNickname: string } | null>(null);
  const [nameSubmitted, setNameSubmitted] = useState(false);
  
  const handleNameSubmit = () => {
    if (name.trim()) {
      const quote = generateSpecialBondQuote(name);
      const generatedNicknames = generateNicknames(name);
      
      setBondQuote(quote);
      setNicknames(generatedNicknames);
      setNameSubmitted(true);
    }
  };
  
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
              
              {!nameSubmitted ? (
                <div className="space-y-4 mb-6">
                  <p className="mb-4 text-foreground/80">
                    Hi there! I'd love to know your name before we begin this sweet journey together.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-left block">What's your name?</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="bg-white/50"
                    />
                  </div>
                  <Button
                    onClick={handleNameSubmit}
                    size="sm"
                    className="bg-love-500 hover:bg-love-600 text-white font-bold rounded-full mt-2"
                  >
                    <UserCircle className="mr-2 h-4 w-4" /> Continue
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 mb-6 animate-fade-in">
                  <p className="text-lg font-medium text-love-700">
                    Hi, {name}! ✨
                  </p>
                  
                  <div className="bg-cute-pink/20 p-4 rounded-lg">
                    <p className="italic text-love-800">{bondQuote}</p>
                  </div>
                  
                  {nicknames && (
                    <div className="flex flex-col gap-2">
                      <p className="text-md text-foreground/70">I think these cute nicknames suit us:</p>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-love-100 p-2 rounded-lg">
                          <p className="text-sm text-foreground/60">You</p>
                          <p className="font-bold text-love-700">{nicknames.userNickname}</p>
                        </div>
                        <div className="bg-love-100 p-2 rounded-lg">
                          <p className="text-sm text-foreground/60">Me (Pratik)</p>
                          <p className="font-bold text-love-700">{nicknames.myNickname}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    onClick={handleEnter}
                    size="lg"
                    className="bg-love-500 hover:bg-love-600 text-white font-bold rounded-full px-8 py-4 text-xl"
                  >
                    Enter <Sparkles className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
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
              A sweet little space made just for {name || "you"}! ✨
            </p>
            {nicknames && (
              <div className="flex items-center gap-2 mt-2 text-sm text-foreground/60">
                <span>{nicknames.myNickname}</span>
                <span>❤️</span>
                <span>{nicknames.userNickname}</span>
              </div>
            )}
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
        <p>Made with ❤️ just for {name || "you"}</p>
      </footer>
    </div>
  );
};

export default Index;
