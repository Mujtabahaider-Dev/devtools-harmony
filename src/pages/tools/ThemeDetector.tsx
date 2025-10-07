import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Search, ExternalLink, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThemeInfo {
  name: string;
  version?: string;
  author?: string;
  themeUri?: string;
  description?: string;
}

const ThemeDetector = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const { toast } = useToast();

  const detectTheme = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setThemeInfo(null);

    try {
      // Normalize URL
      let cleanUrl = url.trim();
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl;
      }

      // Fetch the website HTML
      const response = await fetch(cleanUrl);
      const html = await response.text();

      // Parse theme information from HTML
      const themeStyleMatch = html.match(/wp-content\/themes\/([^\/\?"']+)/i);
      const themeName = themeStyleMatch ? themeStyleMatch[1] : null;

      if (!themeName) {
        toast({
          title: "No Theme Detected",
          description: "Could not detect a WordPress theme. Make sure the URL is a WordPress site.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Try to extract more info from theme stylesheet
      const versionMatch = html.match(/Version:\s*([^\s<]+)/i);
      const authorMatch = html.match(/Author:\s*([^<\n]+)/i);
      const themeUriMatch = html.match(/Theme URI:\s*([^\s<]+)/i);
      const descMatch = html.match(/Description:\s*([^<\n]+)/i);

      setThemeInfo({
        name: themeName,
        version: versionMatch ? versionMatch[1] : undefined,
        author: authorMatch ? authorMatch[1].trim() : undefined,
        themeUri: themeUriMatch ? themeUriMatch[1] : undefined,
        description: descMatch ? descMatch[1].trim() : undefined,
      });

      toast({
        title: "Theme Detected!",
        description: `Found theme: ${themeName}`,
      });
    } catch (error) {
      console.error("Error detecting theme:", error);
      toast({
        title: "Error",
        description: "Failed to detect theme. The site might be blocking requests or is not accessible.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Palette className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-mono font-bold text-4xl md:text-5xl text-foreground mb-4">
              WP Theme Detector
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Detect which WordPress theme any website is using. Enter a URL to analyze the theme.
            </p>
          </div>

          {/* Detector Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Enter Website URL</CardTitle>
              <CardDescription>
                Provide the URL of the WordPress site you want to analyze
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && detectTheme()}
                />
                <Button onClick={detectTheme} disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {themeInfo && (
            <Card className="bg-gradient-card border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Theme Detected</CardTitle>
                  <Badge className="bg-gradient-primary">Active Theme</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    {themeInfo.name}
                    {themeInfo.version && (
                      <Badge variant="secondary">v{themeInfo.version}</Badge>
                    )}
                  </h3>
                  {themeInfo.description && (
                    <p className="text-muted-foreground mb-4">{themeInfo.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themeInfo.author && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Author</p>
                      <p className="text-foreground">{themeInfo.author}</p>
                    </div>
                  )}
                  {themeInfo.themeUri && (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Theme URI</p>
                      <a 
                        href={themeInfo.themeUri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View Details
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    💡 Tip: Check out the theme's documentation and support resources for customization options.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Analyzes the website's HTML source code</li>
                  <li>• Detects WordPress theme directory paths</li>
                  <li>• Extracts theme metadata and information</li>
                  <li>• Works with most public WordPress sites</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Use Cases</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Research competitor websites</li>
                  <li>• Find themes for inspiration</li>
                  <li>• Verify theme installations</li>
                  <li>• Audit client websites</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThemeDetector;