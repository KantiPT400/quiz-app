import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import StartPage from "@/components/quiz/StartPage";
import QuizPage from "@/components/quiz/QuizPage";
import ResultPage from "@/components/quiz/ResultPage";
import { toast } from "@/hooks/use-toast";

export interface Question {
  id: number;
  text: string;
  options: string[];
}

export interface QuizResults {
  score: number;
  total: number;
  details?: Array<{
    questionId: number;
    correct: boolean;
    userAnswer: string;
    correctAnswer: string;
  }>;
}

const QuizApp = () => {
  const [stage, setStage] = useState<"start" | "quiz" | "result">("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/quiz/questions`);
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startQuiz = () => {
    setAnswers({});
    setResults(null);
    setStage("quiz");
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/quiz/submit`, { answers });
      setResults(res.data);
      setStage("result");
      toast({
        title: "Quiz Completed!",
        description: `You scored ${res.data.score} out of ${res.data.total}`,
      });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const restartQuiz = () => {
    setAnswers({});
    setResults(null);
    setStage("start");
    fetchQuestions();
  };

  if (stage === "start") {
    return <StartPage onStart={startQuiz} loading={loading} />;
  }

  if (stage === "quiz") {
    return (
      <QuizPage
        questions={questions}
        answers={answers}
        setAnswers={setAnswers}
        submitQuiz={submitQuiz}
        loading={loading}
      />
    );
  }

  if (stage === "result" && results) {
    return <ResultPage results={results} onRestart={restartQuiz} />;
  }

  return null;
};

export default QuizApp;
