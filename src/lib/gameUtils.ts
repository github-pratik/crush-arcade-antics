
/**
 * Game utility functions for the heart catcher game
 */

// Sweet messages that will appear randomly when catching hearts
const sweetMessages = [
  "You're amazing! ✨",
  "You make my heart flutter! 💓",
  "You're the sweetest! 🍭",
  "My day is better with you in it! 🌞",
  "Your smile is my favorite! 😊",
  "You're absolutely wonderful! 💫",
  "I think about you all the time! 💭",
  "You brighten up my world! 🌈",
  "You're so cute when you play this game! 🎮",
  "I'm falling for you! 💘",
  "We'd make a perfect pair! 👫",
  "You give me butterflies! 🦋",
  "You're my sunshine! ☀️",
  "I like you more than pizza! 🍕",
  "Your laugh is my favorite sound! 🎵"
];

// Generate a random sweet message
export const generateRandomMessage = (): string => {
  const randomIndex = Math.floor(Math.random() * sweetMessages.length);
  return sweetMessages[randomIndex];
};

// Calculate the final score with bonus points
export const calculateFinalScore = (
  heartsCollected: number, 
  timeRemaining: number
): number => {
  // Base score is hearts collected
  let score = heartsCollected * 10;
  
  // Bonus points for remaining time (if any)
  if (timeRemaining > 0) {
    score += timeRemaining * 2;
  }
  
  return score;
};

// Get a rank based on the score
export const getRank = (score: number): string => {
  if (score >= 300) return "Love Expert! 💘";
  if (score >= 200) return "Super Sweet! 🍬";
  if (score >= 100) return "Heart Catcher! ❤️";
  if (score >= 50) return "Crush Worthy! 😊";
  return "Sweet Beginner! 🌱";
};

// Generate game tips
export const getTip = (): string => {
  const tips = [
    "Move your mouse or finger to catch the falling hearts!",
    "Try to catch hearts in a row for bonus points!",
    "The pink hearts are worth more points!",
    "Watch out for special hearts with messages!",
    "Higher scores might reveal special messages!"
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
};

// Special quotes about the bond between two people
export const generateSpecialBondQuote = (name: string): string => {
  const quotes = [
    `The stars aligned when Pratik and ${name} met, creating a connection that feels written in the stars.`,
    `What makes Pratik and ${name}'s bond special is how they understand each other without saying a word.`,
    `Like two puzzle pieces, Pratik and ${name} just fit together perfectly in ways that can't be explained.`,
    `Some connections are beyond explanation, and that's exactly what Pratik and ${name} share.`,
    `The universe works in mysterious ways to bring special people together, just like it did with Pratik and ${name}.`,
    `When Pratik and ${name} are together, even ordinary moments become extraordinary memories.`,
    `The way Pratik and ${name} complement each other is like a beautiful harmony that was meant to be.`,
    `There's a certain magic in the air whenever Pratik and ${name} share the same space.`,
    `Distance means nothing when the connection between Pratik and ${name} is this strong.`,
    `Time seems to stand still when Pratik and ${name} are lost in conversation with each other.`
  ];
  
  return quotes[Math.floor(Math.random() * quotes.length)];
};

// Generate cute nicknames based on user's name
export const generateNicknames = (name: string): { userNickname: string; myNickname: string } => {
  const nicknamePrefixes = ["Sweet", "Lovely", "Cutie", "Honey", "Sparkly", "Sunshine", "Angel", "Dreamy", "Star"];
  const nicknameSuffixes = ["Bean", "Heart", "Cake", "Pie", "Pop", "Boo", "Bug", "Dove", "Petal"];
  
  // Get first letter or syllable of names
  const userInitial = name.charAt(0).toUpperCase();
  const myInitial = "P"; // for Pratik
  
  // Generate random but paired nicknames
  const randomPrefix = nicknamePrefixes[Math.floor(Math.random() * nicknamePrefixes.length)];
  const randomSuffix = nicknameSuffixes[Math.floor(Math.random() * nicknameSuffixes.length)];
  
  // Create pair of nicknames that go together
  const pair1 = `${randomPrefix} ${userInitial}${randomSuffix.toLowerCase()}`;
  const pair2 = `${randomPrefix} ${myInitial}${randomSuffix.toLowerCase()}`;
  
  return {
    userNickname: pair1,
    myNickname: pair2
  };
};
