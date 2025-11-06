import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AppHeader from "@/components/AppHeader";
import { Book, Headphones, Keyboard, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Practice = () => {
  const navigate = useNavigate();
  
  const practiceOptions = [
    {
      title: "Comprensión de Lectura",
      icon: <Book className="w-8 h-8 text-primary" />,
      path: "/practice/reading"
    },
    {
      title: "Comprensión Auditiva",
      icon: <Headphones className="w-8 h-8 text-primary" />,
      path: "/practice/listening"
    },
    {
      title: "Expresión e Interacción Escritas",
      icon: <Keyboard className="w-8 h-8 text-primary" />,
      path: "/practice/writing"
    },
    {
      title: "Expresión e Interacción Orales",
      icon: <Mic className="w-8 h-8 text-primary" />,
      path: "/practice/speaking"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            What would you like to practice?
          </h1>

          <div className="mb-8">
            <div className="text-sm text-muted-foreground text-center mb-2">
              Your free tasks this week: 3 of 5 completed
            </div>
            <Progress value={60} className="h-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceOptions.map((option, index) => (
              <Card
                key={index}
                className="p-6 cursor-pointer hover:border-primary transition-colors duration-200"
                onClick={() => navigate(option.path)}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    {option.icon}
                  </div>
                  <h2 className="text-xl font-semibold">
                    {option.title}
                  </h2>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Practice;