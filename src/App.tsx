
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import PatientDashboard from "./pages/PatientDashboard";
import RevenueDashboard from "./pages/RevenueDashboard";
import ManagementDashboard from "./pages/ManagementDashboard";
import SymptomChecker from "./pages/SymptomChecker";
import QRGenerator from "./pages/QRGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PatientDashboard />} />
            <Route path="/revenue" element={<RevenueDashboard />} />
            <Route path="/management" element={<ManagementDashboard />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/qr-generator" element={<QRGenerator />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
