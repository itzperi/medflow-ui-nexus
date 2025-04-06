
import { useState } from "react";
import { toast } from "sonner";
import { Activity, Search, Loader2, BookMedical, Thermometer, Stethoscope } from "lucide-react";
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
        return "text-healthcare-red-DEFAULT border-healthcare-red-DEFAULT";
      case "Medium":
        return "text-amber-500 border-amber-500";
      case "Low":
        return "text-healthcare-blue-DEFAULT border-healthcare-blue-DEFAULT";
      default:
        return "text-muted-foreground border-muted-foreground";
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="bg-healthcare-blue-light/20 p-3 rounded-full">
            <Activity className="h-8 w-8 text-healthcare-blue-DEFAULT" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">AI Symptom Checker</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Enter your symptoms below, separated by commas, and our AI system will
          analyze potential conditions. This is not a substitute for professional
          medical advice.
        </p>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle>Symptom Analysis</CardTitle>
          <CardDescription>
            Describe your symptoms in detail for more accurate results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="symptoms" className="text-sm font-medium">
                Symptoms
              </label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="symptoms"
                  placeholder="e.g., fever, headache, fatigue"
                  className="pl-8"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Separate multiple symptoms with commas
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Potential Conditions</h2>
            <Badge variant="outline" className="text-healthcare-blue-DEFAULT border-healthcare-blue-DEFAULT">
              AI-Generated Analysis
            </Badge>
          </div>

          {isAnalyzing ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-healthcare-blue-DEFAULT mb-4" />
              <p className="text-muted-foreground">Analyzing your symptoms...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-4">
              {results.map((condition, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-healthcare-blue-DEFAULT/10 p-4 flex items-center justify-center md:w-16">
                      <BookMedical className="h-6 w-6 text-healthcare-blue-DEFAULT" />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
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
                <Thermometer className="h-5 w-5 text-yellow-400" aria-hidden="true" />
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
