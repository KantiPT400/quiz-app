import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Clock, Trophy, Zap } from "lucide-react";

interface StartPageProps {
  onStart: () => void;
  loading: boolean;
}

const StartPage = ({ onStart, loading }: StartPageProps) => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary via-accent to-primary-dark overflow-hidden relative">
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary-glow/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      
      <div className="max-w-2xl w-full space-y-8 animate-fade-in relative z-10">
        {/* Hero Section */}
        <header className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl animate-bounce-subtle">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Timed Quiz Challenge
          </h1>
          <p className="text-xl text-white/90 max-w-xl mx-auto">
            Test your knowledge, race against time, and discover what you know!
          </p>
        </header>

        {/* Features Cards */}
        <div className="grid md:grid-cols-3 gap-4 animate-slide-up">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:scale-105 transition-transform duration-300">
            <Clock className="w-8 h-8 text-secondary mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-1">Timed Challenge</h3>
            <p className="text-sm text-white/80">60 seconds per quiz</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:scale-105 transition-transform duration-300" style={{ animationDelay: "0.1s" }}>
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-1">Quick Questions</h3>
            <p className="text-sm text-white/80">Multiple choice format</p>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center hover:scale-105 transition-transform duration-300" style={{ animationDelay: "0.2s" }}>
            <Trophy className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-1">Instant Results</h3>
            <p className="text-sm text-white/80">See your score immediately</p>
          </Card>
        </div>

        {/* Start Button */}
        <div className="text-center pt-4">
          <Button
            onClick={onStart}
            disabled={loading}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-6 h-auto rounded-full font-bold shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            {loading ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Loading Quiz...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Start Quiz Now
              </>
            )}
          </Button>
          <p className="text-white/70 text-sm mt-4">
            Click to begin your timed challenge
          </p>
        </div>
      </div>
    </main>
  );
};

export default StartPage;
