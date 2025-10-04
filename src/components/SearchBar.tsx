import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search for tools, plugins, themes..."
        className="pl-12 h-14 text-base bg-card border-border shadow-soft focus:shadow-medium transition-shadow"
      />
    </div>
  );
};
