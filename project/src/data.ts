import { Category, Question } from './types';

export const categories: Category[] = [
  {
    id: 'tech',
    name: 'Technology',
    icon: 'Code',
    description: 'Test your knowledge of programming and technology',
    image: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'Brain',
    description: 'Explore the wonders of scientific discoveries',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'art',
    name: 'Art & Culture',
    icon: 'Palette',
    description: 'Dive into the world of art and culture',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: 'Globe',
    description: 'Test your knowledge of world geography',
    image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000'
  }
];

export const questions: Question[] = [
  {
    id: 1,
    category: 'tech',
    question: 'Which programming language was created by Brendan Eich?',
    options: ['Python', 'JavaScript', 'Java', 'C++'],
    correctAnswer: 1,
    difficulty: 'medium',
    timeLimit: 30
  },
  {
    id: 2,
    category: 'tech',
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Hyper Transfer Markup Language',
      'Home Tool Markup Language'
    ],
    correctAnswer: 0,
    difficulty: 'easy',
    timeLimit: 20
  },
  {
    id: 3,
    category: 'science',
    question: 'What is the chemical symbol for gold?',
    options: ['Ag', 'Fe', 'Au', 'Cu'],
    correctAnswer: 2,
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 4,
    category: 'science',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
    difficulty: 'easy',
    timeLimit: 15
  },
  {
    id: 5,
    category: 'art',
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 2,
    difficulty: 'medium',
    timeLimit: 25
  },
  {
    id: 6,
    category: 'geography',
    question: 'What is the capital of Japan?',
    options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'],
    correctAnswer: 2,
    difficulty: 'easy',
    timeLimit: 20
  }
];

export const difficultyColors = {
  easy: 'text-green-500',
  medium: 'text-yellow-500',
  hard: 'text-red-500'
};

export const difficultyPoints = {
  easy: 10,
  medium: 20,
  hard: 30
};