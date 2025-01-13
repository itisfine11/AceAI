"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  // CheckCircle,
  // XCircle,
  ArrowRight,
  RotateCcw,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Dummy quiz data
const dummyQuiz = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
    explanation: "Paris is the capital and most populous city of France.",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation:
      "Mars is often called the Red Planet due to its reddish appearance in night sky, caused by iron oxide (rust) on surface.",
  },
  {
    question: "What is the largest mammal in world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1,
    explanation:
      "The Blue Whale is the largest animal known to have ever existed, reaching lengths of up 100 feet and weights 200 tons.",
  },
];

export function Quiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((currentQuestion / dummyQuiz.length) * 100);
  }, [currentQuestion]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setScore(0);
    setShowFeedback(false);
    setProgress(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < dummyQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const newScore = selectedAnswers.reduce((acc, answer, index) => {
      return answer === dummyQuiz[index].correctAnswer ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
    setQuizCompleted(true);
  };

  const getFeedback = () => {
    const incorrectQuestions = dummyQuiz.filter(
      (_, index) => selectedAnswers[index] !== dummyQuiz[index].correctAnswer
    );
    const weaknesses = incorrectQuestions.map((q) => q.question);
    return {
      score: score,
      totalQuestions: dummyQuiz.length,
      weaknesses: weaknesses,
      tips: [
        "Review the explanations for questions you got wrong",
        "Focus on understanding the concepts behind each question",
        "Practice similar questions to reinforce your learning",
      ],
    };
  };

  if (!quizStarted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Ready to Test Your Knowledge?
          </CardTitle>
          <CardDescription className="text-center">
            Challenge yourself with our quick quiz!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={startQuiz} size="lg" className="text-lg">
              <BookOpen className="mr-2 h-5 w-5" /> Start Quiz
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted && !showFeedback) {
    const feedback = getFeedback();
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Quiz Completed!
          </CardTitle>
          <CardDescription className="text-center text-xl">
            You scored {score} out of {dummyQuiz.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <Award className="inline-block h-16 w-16 text-yellow-500 mb-2" />
            <p className="text-lg font-semibold">
              {score === dummyQuiz.length
                ? "Perfect Score!"
                : score > dummyQuiz.length / 2
                ? "Great Job!"
                : "Keep Practicing!"}
            </p>
          </div>
          <Button onClick={() => setShowFeedback(true)} className="w-full mb-4">
            View Detailed Feedback
          </Button>
          <Button onClick={startQuiz} variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showFeedback) {
    const feedback = getFeedback();
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Your Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Score Breakdown:</h3>
              <Progress
                value={(score / dummyQuiz.length) * 100}
                className="h-4"
              />
              <p className="text-center mt-2">
                {score} out of {dummyQuiz.length} correct
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Areas for Improvement:</h3>
              <ul className="list-disc list-inside">
                {feedback.weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Study Tips:</h3>
              <ul className="list-disc list-inside">
                {feedback.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={startQuiz} className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" /> Retake Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Question {currentQuestion + 1} of {dummyQuiz.length}
        </CardTitle>
        <CardDescription className="text-center text-lg">
          {dummyQuiz[currentQuestion].question}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        <RadioGroup
          onValueChange={(value) => handleAnswerSelect(parseInt(value))}
        >
          <AnimatePresence mode="wait">
            {dummyQuiz[currentQuestion].options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <label
                    htmlFor={`option-${index}`}
                    className="flex-grow cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={nextQuestion}
          disabled={selectedAnswers[currentQuestion] === undefined}
          className="w-full"
        >
          {currentQuestion === dummyQuiz.length - 1
            ? "Finish Quiz"
            : "Next Question"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
