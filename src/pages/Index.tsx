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
      <Footer />
    </div>
  );
};

export default Index;
