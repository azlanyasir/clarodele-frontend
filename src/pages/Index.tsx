import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-6 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-foreground">Master Your DELE B2:</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AI-Powered Spanish Exam Prep
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Unlock your full potential with personalized AI tutors for speaking and writing, plus comprehensive practice exams.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Button
                size="lg"
                className="text-lg px-8 py-6 rounded-full hover:scale-105 transition-transform duration-200"
                onClick={() => {
                  if (currentUser) {
                    navigate("/practice");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                I want to practice
              </Button>
              {/* <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 rounded-full"
                onClick={() => navigate("/exam")}
              >
                I want to simulate an exam
              </Button> */}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Copyright © 2025 ClaroDELE
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
