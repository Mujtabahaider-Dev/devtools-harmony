import { ToolCard } from "./ToolCard";
import {
  Zap,
  Shield,
  TrendingUp,
  Palette,
  Code,
  Database,
  FileCode,
  Image,
  Gauge,
  Lock,
  Search,
  Wrench,
} from "lucide-react";

const tools = [
  {
    icon: Zap,
    title: "Speed Optimizer",
    description: "Analyze and optimize your WordPress site performance instantly.",
    category: "Performance",
    featured: true,
  },
  {
    icon: Shield,
    title: "Security Scanner",
    description: "Scan your site for vulnerabilities and security issues.",
    category: "Security",
    featured: true,
  },
  {
    icon: TrendingUp,
    title: "SEO Analyzer",
    description: "Comprehensive SEO audit and recommendations for better rankings.",
    category: "SEO",
  },
  {
    icon: Palette,
    title: "Theme Inspector",
    description: "Detect which WordPress theme any website is using.",
    category: "Design",
  },
  {
    icon: Database,
    title: "Database Optimizer",
    description: "Clean and optimize your WordPress database for better performance.",
    category: "Database",
  },
  {
    icon: Code,
    title: "Code Validator",
    description: "Validate your WordPress code against best practices.",
    category: "Development",
  },
  {
    icon: FileCode,
    title: "Plugin Generator",
    description: "Detect which WordPress plugins any website is using.",
    category: "Development",
  },
  {
    icon: Image,
    title: "Image Compressor",
    description: "Compress images without losing quality for faster load times.",
    category: "Performance",
  },
  {
    icon: Gauge,
    title: "Load Time Tester",
    description: "Test your site's loading speed from multiple locations.",
    category: "Performance",
  },
  {
    icon: Lock,
    title: "Password Generator",
    description: "Generate secure passwords for WordPress admin accounts.",
    category: "Security",
  },
  {
    icon: Search,
    title: "Broken Link Checker",
    description: "Find and fix broken links across your WordPress site.",
    category: "SEO",
  },
  {
    icon: Wrench,
    title: "Debug Helper",
    description: "Advanced debugging tools for WordPress developers.",
    category: "Development",
  },
];

export const ToolsGrid = () => {
  return (
    <section id="tools" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Developer Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build, optimize, and maintain WordPress sites efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
};
