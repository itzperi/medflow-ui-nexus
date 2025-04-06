
import { useState } from "react";
import { toast } from "sonner";
import { 
  Activity, 
  Search, 
  Loader2, 
  FileText, 
  Thermometer, 
  Stethoscope,
  AlertTriangle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data for symptom analysis
const mockConditions = {
  "fever,headache,fatigue": [
    { name: "Common Cold", probability: "High", description: "A viral infection causing upper respiratory symptoms" },
    { name: "Influenza", probability: "High", description: "A contagious respiratory illness caused by influenza viruses" },
    { name: "COVID-19", probability: "Medium", description: "A respiratory illness caused by the SARS-CoV-2 virus" },
  ],
  "chest pain,shortness of breath": [
    { name: "Angina", probability: "High", description: "Chest pain due to reduced blood flow to the heart" },
    { name: "Myocardial Infarction", probability: "Medium", description: "Heart attack due to blocked blood flow" },
    { name: "Pulmonary Embolism", probability: "Medium", description: "Blockage in the pulmonary arteries in the lungs" },
  ],
  "nausea,vomiting,abdominal pain": [
    { name: "Gastroenteritis", probability: "High", description: "Inflammation of the stomach and intestines" },
    { name: "Appendicitis", probability: "Medium", description: "Inflammation of the appendix" },
    { name: "Food Poisoning", probability: "High", description: "Illness caused by consuming contaminated food" },
  ],
  "rash,itching": [
    { name: "Contact Dermatitis", probability: "High", description: "Skin inflammation caused by allergens" },
    { name: "Eczema", probability: "Medium", description: "Chronic skin condition causing inflamed, itchy patches" },
    { name: "Psoriasis", probability: "Low", description: "Chronic skin condition causing red, scaly patches" },
  ],
  "cough,sore throat": [
    { name: "Common Cold", probability: "High", description: "A viral infection causing upper respiratory symptoms" },
    { name: "Strep Throat", probability: "Medium", description: "Bacterial infection causing inflammation of the throat" },
    { name: "Laryngitis", probability: "Medium", description: "Inflammation of the voice box (larynx)" },
  ],
};

type Condition = {
  name: string;
  probability: string;
  description: string;
};

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<Condition[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const isMobile = useIsMobile();

  const handleSymptomAnalysis = () => {
    if (!symptoms.trim()) {
      toast.error("Please enter your symptoms");
      return;
    }

    setIsAnalyzing(true);
    setHasSearched(true);

    // Simulate API call delay
    setTimeout(() => {
      const cleanSymptoms = symptoms.toLowerCase().trim();
      
      // Find closest match in our mock data
      let conditions: Condition[] = [];
      
      // Check for direct matches first
      if (mockConditions[cleanSymptoms as keyof typeof mockConditions]) {
        conditions = mockConditions[cleanSymptoms as keyof typeof mockConditions];
      } else {
        // If no direct match, look for partial matches
        const allSymptoms = cleanSymptoms.split(",").map(s => s.trim());
        
        // Check each mock entry for partial matches
        let bestMatch = "";
        let bestMatchCount = 0;
        
        Object.keys(mockConditions).forEach(key => {
          const keySymptoms = key.split(",").map(s => s.trim());
          const matchCount = allSymptoms.filter(s => keySymptoms.includes(s)).length;
          
          if (matchCount > bestMatchCount) {
            bestMatchCount = matchCount;
            bestMatch = key;
          }
        });
        
        if (bestMatchCount > 0) {
          conditions = mockConditions[bestMatch as keyof typeof mockConditions];
        } else {
          // If no matches, return general message
          conditions = [
            { 
              name: "Inconclusive", 
              probability: "Unknown", 
              description: "Not enough information to determine potential conditions. Please provide more specific symptoms or consult with a healthcare professional."
            }
          ];
        }
      }
      
      setResults(conditions);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case "High":
        return "bg-healthcare-red-light/20 text-healthcare-red-DEFAULT border-healthcare-red-DEFAULT";
      case "Medium":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500";
      case "Low":
        return "bg-healthcare-blue-light/20 text-healthcare-blue-DEFAULT border-healthcare-blue-DEFAULT";
      default:
        return "bg-muted/20 text-muted-foreground border-muted-foreground";
    }
  };

  const pulseAnimation = "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]";

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className={`bg-healthcare-blue-light/20 p-3 md:p-4 rounded-full ${!isAnalyzing ? pulseAnimation : ""}`}>
              <Activity className="h-8 w-8 md:h-10 md:w-10 text-healthcare-blue-DEFAULT" />
            </div>
            {isAnalyzing && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"></div>
                <Loader2 className="h-8 w-8 md:h-10 md:w-10 animate-spin text-healthcare-blue-DEFAULT relative" />
              </div>
            )}
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-healthcare-blue-DEFAULT to-healthcare-teal-DEFAULT bg-clip-text text-transparent">
          AI Symptom Checker
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Enter your symptoms below, separated by commas, and our AI system will
          analyze potential conditions. This is not a substitute for professional
          medical advice.
        </p>
      </div>

      <Card className="glass overflow-hidden border-healthcare-blue-DEFAULT/30 shadow-lg shadow-healthcare-blue-DEFAULT/10">
        <CardHeader className="bg-gradient-to-r from-healthcare-blue-light/10 to-healthcare-teal-light/10 border-b border-healthcare-blue-DEFAULT/20">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-healthcare-teal-DEFAULT" />
            Symptom Analysis
          </CardTitle>
          <CardDescription>
            Describe your symptoms in detail for more accurate results
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="symptoms" className="text-sm font-medium flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-healthcare-blue-DEFAULT" />
                Symptoms
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="symptoms"
                  placeholder="e.g., fever, headache, fatigue"
                  className="pl-8 transition-all border-healthcare-blue-DEFAULT/30 focus-visible:ring-healthcare-blue-DEFAULT/30"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground italic">
                Separate multiple symptoms with commas
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 bg-gradient-to-r from-healthcare-blue-light/5 to-healthcare-teal-light/5 border-t border-healthcare-blue-DEFAULT/20">
          <Button 
            className="w-full bg-gradient-to-r from-healthcare-blue-DEFAULT to-healthcare-teal-DEFAULT hover:from-healthcare-blue-dark hover:to-healthcare-teal-dark transition-all duration-300 shadow-md hover:shadow-lg" 
            onClick={handleSymptomAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Symptoms
              </>
            ) : (
              <>
                <Stethoscope className="mr-2 h-4 w-4" />
                Analyze Symptoms
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {hasSearched && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-healthcare-blue-DEFAULT" />
              Potential Conditions
            </h2>
            <Badge variant="outline" className="bg-healthcare-blue-light/10 text-healthcare-blue-DEFAULT border-healthcare-blue-DEFAULT">
              AI-Generated Analysis
            </Badge>
          </div>

          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full animate-ping bg-healthcare-blue-DEFAULT/20"></div>
                <Loader2 className="h-8 w-8 animate-spin text-healthcare-blue-DEFAULT relative" />
              </div>
              <p className="text-muted-foreground mt-4">Analyzing your symptoms...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4 sm:gap-6">
              {results.map((condition, index) => (
                <Card 
                  key={index} 
                  className={`overflow-hidden transition-all duration-300 hover:shadow-md ${index === 0 ? "border-2 border-healthcare-blue-DEFAULT/40" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className={`bg-healthcare-blue-DEFAULT/10 p-4 flex items-center justify-center md:w-16 ${isMobile ? "py-3" : ""}`}>
                      <FileText className="h-6 w-6 text-healthcare-blue-DEFAULT" />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{condition.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={getProbabilityColor(condition.probability)}
                        >
                          {condition.probability} Probability
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{condition.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                No conditions found matching your symptoms.
              </p>
            </Card>
          )}

          <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4 border border-yellow-200 dark:border-yellow-900/30">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Medical Disclaimer
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                  <p>
                    This symptom checker is for informational purposes only and is not a qualified medical opinion. Always consult with a healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
