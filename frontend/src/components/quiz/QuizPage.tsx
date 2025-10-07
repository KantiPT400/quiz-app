import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Question } from "@/pages/QuizApp";
import { cn } from "@/lib/utils";

interface QuizPageProps {
  questions: Question[];
  answers: Record<number, string>;
  setAnswers: (answers: Record<number, string>) => void;
  submitQuiz: () => void;
  loading: boolean;
}

const QuizPage = ({ questions, answers, setAnswers, submitQuiz, loading }: QuizPageProps) => {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitQuiz]);

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Clock className="w-12 h-12 mx-auto animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;
  const timePercentage = (timeLeft / 60) * 100;

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [q.id]: option });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        {/* Header with Timer */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-md">
            <Clock className={cn(
              "w-5 h-5",
              timeLeft <= 10 ? "text-destructive animate-bounce-subtle" : "text-primary"
            )} />
            <span className={cn(
              "font-bold text-lg",
              timeLeft <= 10 ? "text-destructive" : "text-foreground"
            )}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {current + 1} of {questions.length}</span>
              <span>{Object.keys(answers).length} answered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </header>

        {/* Question Card */}
        <Card className="p-8 shadow-elegant animate-scale-in">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 leading-relaxed">
            {q.text}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {(q.options || []).map((opt, index) => {
              const isSelected = answers[q.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={cn(
                    "w-full p-5 rounded-xl text-left transition-all duration-300 border-2 flex items-center gap-4 group",
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]"
                      : "bg-card hover:bg-muted border-border hover:border-primary/50 hover:scale-[1.01]"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 font-semibold transition-colors",
                    isSelected
                      ? "bg-white text-primary border-white"
                      : "bg-muted border-border group-hover:border-primary"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1 font-medium">{opt}</span>
                  {isSelected && <CheckCircle2 className="w-6 h-6 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-4">
          <Button
            onClick={handlePrevious}
            disabled={current === 0}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {current < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              size="lg"
              className="gap-2 bg-primary hover:bg-primary-dark"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={submitQuiz}
              disabled={loading}
              size="lg"
              className="gap-2 bg-success hover:bg-success/90 text-success-foreground"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Quiz
                </>
              )}
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 pt-4">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === current
                  ? "bg-primary w-8"
                  : answers[questions[index].id]
                  ? "bg-success"
                  : "bg-muted hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Timer Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-muted">
        <div
          className={cn(
            "h-full transition-all duration-1000 ease-linear",
            timeLeft <= 10 ? "bg-destructive" : "bg-primary"
          )}
          style={{ width: `${timePercentage}%` }}
        />
      </div>
    </div>
  );
};

export default QuizPage;
