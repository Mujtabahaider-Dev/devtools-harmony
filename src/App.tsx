import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PasswordGenerator from "./pages/tools/PasswordGenerator";
import SpeedOptimizer from "./pages/tools/SpeedOptimizer";
import SEOAnalyzer from "./pages/tools/SEOAnalyzer";
import ThemeDetector from "./pages/tools/ThemeDetector";
import PluginDetector from "./pages/tools/PluginDetector";
import WebPConverter from "./pages/tools/WebPConverter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          <Route path="/tools/speed-optimizer" element={<SpeedOptimizer />} />
          <Route path="/tools/seo-analyzer" element={<SEOAnalyzer />} />
          <Route path="/tools/theme-detector" element={<ThemeDetector />} />
          <Route path="/tools/plugin-detector" element={<PluginDetector />} />
          <Route path="/tools/webp-converter" element={<WebPConverter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
