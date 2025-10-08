import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilters } from "@/components/CategoryFilters";
import { ToolsGrid } from "@/components/ToolsGrid";
import { BlogSection } from "@/components/BlogSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="space-y-8">
          <SearchBar />
          <CategoryFilters />
        </div>
      </div>

      <ToolsGrid />
      <BlogSection />
      
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
              About WP DevTools
            </h2>
            <p className="text-lg text-muted-foreground">
              Your trusted companion for WordPress development
            </p>
          </div>
          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg">
              WP DevTools is a comprehensive suite of free tools designed to help WordPress developers
              build, optimize, and maintain websites more efficiently. Our mission is to provide
              professional-grade utilities that streamline your workflow.
            </p>
            <p className="text-lg">
              Whether you're analyzing site performance, detecting themes and plugins, or converting
              images to modern formats, we've got you covered with tools that are fast, reliable,
              and completely free to use.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
