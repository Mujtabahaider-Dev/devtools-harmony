import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, Shield, TrendingUp, Palette, Code, Database } from "lucide-react";

const categories = [
  { id: "all", label: "All Tools", icon: Zap },
  { id: "performance", label: "Performance", icon: Zap },
  { id: "security", label: "Security", icon: Shield },
  { id: "seo", label: "SEO", icon: TrendingUp },
  { id: "design", label: "Design", icon: Palette },
  { id: "development", label: "Development", icon: Code },
  { id: "database", label: "Database", icon: Database },
];

export const CategoryFilters = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        
        return (
          <Button
            key={category.id}
            variant={isActive ? "default" : "outline"}
            onClick={() => setActiveCategory(category.id)}
            className={`transition-all ${
              isActive 
                ? "bg-gradient-primary shadow-glow" 
                : "hover:border-primary/50"
            }`}
          >
            <Icon className="mr-2 h-4 w-4" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
};
