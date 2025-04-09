
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
