export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in seconds
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  image: string;
}

export interface GameStats {
  currentStreak: number;
  highestStreak: number;
  timeBonus: number;
}