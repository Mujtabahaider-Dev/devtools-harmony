import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
}

export const ToolCard = ({ icon: Icon, title, description, category, featured }: ToolCardProps) => {
  const navigate = useNavigate();

  const getToolUrl = (title: string) => {
    const urlMap: { [key: string]: string } = {
      "Password Generator": "/tools/password-generator",
      "Speed Optimizer": "/tools/speed-optimizer",
      "SEO Analyzer": "/tools/seo-analyzer",
      "Theme Inspector": "/tools/theme-detector",
      "Plugin Generator": "/tools/plugin-detector",
    };
    return urlMap[title] || "#";
  };

  const handleToolClick = () => {
    const url = getToolUrl(title);
    if (url !== "#") {
      navigate(url);
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-large hover:-translate-y-1">
      {featured && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-bl-lg rounded-tr-lg bg-gradient-primary border-0">
            Featured
          </Badge>
        </div>
      )}
      
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="font-mono text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <Badge variant="secondary" className="font-normal">
          {category}
        </Badge>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
          onClick={handleToolClick}
        >
          {getToolUrl(title) !== "#" ? "Try Tool" : "Coming Soon"}
        </Button>
      </CardFooter>
    </Card>
  );
};
