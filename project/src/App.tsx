import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Trophy, Zap } from 'lucide-react';
import { categories, questions, difficultyPoints } from './data';
import { CategoryCard } from './components/CategoryCard';
import { QuizQuestion } from './components/QuizQuestion';
import { GameStats } from './types';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    currentStreak: 0,
    highestStreak: 0,
    timeBonus: 0
  });

  const categoryQuestions = questions.filter(q => q.category === selectedCategory);
  const currentQuestion = categoryQuestions[currentQuestionIndex];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setGameStats({
      currentStreak: 0,
      highestStreak: 0,
      timeBonus: 0
    });
  };

  const playSound = (correct: boolean) => {
    const audio = new Audio(
      correct 
        ? 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3'
    );
    audio.play().catch(() => {});
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    playSound(correct);
    
    if (correct) {
      const difficultyScore = difficultyPoints[currentQuestion.difficulty];
      const streakBonus = Math.floor(gameStats.currentStreak / 3) * 5;
      setScore(prev => prev + difficultyScore + streakBonus);
      
      setGameStats(prev => ({
        ...prev,
        currentStreak: prev.currentStreak + 1,
        highestStreak: Math.max(prev.highestStreak, prev.currentStreak + 1)
      }));
    } else {
      setGameStats(prev => ({
        ...prev,
        currentStreak: 0
      }));
    }

    setTimeout(() => {
      if (currentQuestionIndex < categoryQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const handleTimeout = () => {
    setSelectedAnswer(-1);
    setIsCorrect(false);
    playSound(false);
    setGameStats(prev => ({
      ...prev,
      currentStreak: 0
    }));

    setTimeout(() => {
      if (currentQuestionIndex < categoryQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setQuizComplete(false);
    setGameStats({
      currentStreak: 0,
      highestStreak: 0,
      timeBonus: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">KayQuiz</h1>
            </div>
            {selectedCategory && (
              <button
                onClick={resetQuiz}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Choose Another Category
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {!selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))}
            </motion.div>
          )}

          {selectedCategory && !quizComplete && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="text-sm font-medium text-gray-500">
                  Question {currentQuestionIndex + 1} of {categoryQuestions.length}
                </div>
                <div className="flex items-center space-x-4">
                  {gameStats.currentStreak >= 3 && (
                    <div className="flex items-center space-x-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-yellow-500">
                        Hot Streak!
                      </span>
                    </div>
                  )}
                  <div className="text-sm font-medium text-indigo-600">
                    Score: {score}
                  </div>
                </div>
              </div>

              <QuizQuestion
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                onSelectAnswer={handleAnswerSelect}
                isCorrect={isCorrect}
                onTimeout={handleTimeout}
                streak={gameStats.currentStreak}
              />
            </motion.div>
          )}

          {quizComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-600">
                    Final Score: {score} points
                  </p>
                  <p className="text-gray-600">
                    Highest Streak: {gameStats.highestStreak}
                  </p>
                </div>
                <button
                  onClick={resetQuiz}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Try Another Category
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;