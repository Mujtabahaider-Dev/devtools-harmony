import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-hero -z-10" />
      
      {/* Animated Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm font-medium text-primary">🚀 Free WordPress Developer Tools</span>
          </div>

          {/* Headline */}
          <h1 className="font-mono font-bold text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
            Build Better WordPress
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Faster & Smarter</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Essential free tools and resources to supercharge your WordPress development workflow.
            Performance, security, SEO, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" variant="hero" className="text-lg px-10 py-7 rounded-xl">
              <Search className="mr-2 h-5 w-5" />
              Explore Tools
            </Button>
            <Button size="lg" variant="heroOutline" className="text-lg px-10 py-7 rounded-xl">
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div>
              <div className="font-mono font-bold text-3xl md:text-4xl text-foreground">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Free Tools</div>
            </div>
            <div>
              <div className="font-mono font-bold text-3xl md:text-4xl text-foreground">100k+</div>
              <div className="text-sm text-muted-foreground mt-1">Developers</div>
            </div>
            <div>
              <div className="font-mono font-bold text-3xl md:text-4xl text-foreground">4.9★</div>
              <div className="text-sm text-muted-foreground mt-1">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
