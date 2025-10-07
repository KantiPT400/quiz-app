import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, RefreshCw, Star, TrendingUp, Target } from "lucide-react";
import { QuizResults } from "@/pages/QuizApp";
import { Progress } from "@/components/ui/progress";

interface ResultPageProps {
  results: QuizResults;
  onRestart: () => void;
}

const ResultPage = ({ results, onRestart }: ResultPageProps) => {
  const percentage = (results.score / results.total) * 100;
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding!", emoji: "🏆", color: "text-yellow-500" };
    if (percentage >= 75) return { message: "Great Job!", emoji: "🌟", color: "text-green-500" };
    if (percentage >= 60) return { message: "Good Effort!", emoji: "👍", color: "text-blue-500" };
    return { message: "Keep Practicing!", emoji: "💪", color: "text-orange-500" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-primary-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      <div className="max-w-2xl w-full space-y-8 animate-scale-in relative z-10">
        {/* Trophy Icon */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-md rounded-full mb-6 animate-bounce-subtle">
            <Trophy className="w-12 h-12 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Quiz Complete!
          </h1>
          <p className={`text-3xl font-bold ${performance.color} flex items-center justify-center gap-2`}>
            <span className="text-4xl">{performance.emoji}</span>
            {performance.message}
          </p>
        </div>

        {/* Score Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8 shadow-elegant">
          <div className="text-center mb-6">
            <div className="text-7xl font-bold text-white mb-2">
              {results.score}/{results.total}
            </div>
            <p className="text-xl text-white/80">
              {percentage.toFixed(0)}% Correct
            </p>
            <Progress value={percentage} className="h-3 mt-4" />
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Target className="w-8 h-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{results.score}</div>
              <p className="text-sm text-white/70">Correct</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{results.total - results.score}</div>
              <p className="text-sm text-white/70">Incorrect</p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{percentage.toFixed(0)}%</div>
              <p className="text-sm text-white/70">Accuracy</p>
            </div>
          </div>
        </Card>

        {/* Question Review (if details provided) */}
        {results.details && results.details.length > 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 max-h-64 overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Question Review</h3>
            <div className="space-y-3">
              {results.details.map((detail, index) => (
                <div
                  key={detail.questionId}
                  className={`p-3 rounded-lg ${
                    detail.correct
                      ? "bg-success/20 border-l-4 border-success"
                      : "bg-destructive/20 border-l-4 border-destructive"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-white">Q{index + 1}</span>
                    <div className="flex-1 text-sm text-white/90">
                      <div>Your answer: <span className="font-medium">{detail.userAnswer}</span></div>
                      {!detail.correct && (
                        <div>Correct answer: <span className="font-medium text-success-foreground">{detail.correctAnswer}</span></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Action Button */}
        <div className="text-center">
          <Button
            onClick={onRestart}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-6 h-auto rounded-full font-bold shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <p className="text-white/70 text-sm mt-4">
            Challenge yourself with a new quiz
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
