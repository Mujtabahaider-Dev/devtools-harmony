import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Search, Loader2, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PluginInfo {
  name: string;
  slug: string;
}

const PluginDetector = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [plugins, setPlugins] = useState<PluginInfo[]>([]);
  const { toast } = useToast();

  const detectPlugins = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setPlugins([]);

    try {
      // Normalize URL
      let cleanUrl = url.trim();
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        cleanUrl = 'https://' + cleanUrl;
      }

      // Fetch the website HTML
      const response = await fetch(cleanUrl);
      const html = await response.text();

      // Parse plugin information from HTML
      const pluginMatches = html.matchAll(/wp-content\/plugins\/([^\/\?"']+)/gi);
      const detectedPlugins = new Set<string>();

      for (const match of pluginMatches) {
        const pluginSlug = match[1];
        if (pluginSlug && !pluginSlug.includes('.')) {
          detectedPlugins.add(pluginSlug);
        }
      }

      if (detectedPlugins.size === 0) {
        toast({
          title: "No Plugins Detected",
          description: "Could not detect any WordPress plugins. The site might be hiding plugin information.",
        });
        setLoading(false);
        return;
      }

      const pluginList = Array.from(detectedPlugins).map(slug => ({
        name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        slug: slug,
      }));

      setPlugins(pluginList);

      toast({
        title: "Plugins Detected!",
        description: `Found ${pluginList.length} plugin(s)`,
      });
    } catch (error) {
      console.error("Error detecting plugins:", error);
      toast({
        title: "Error",
        description: "Failed to detect plugins. The site might be blocking requests or is not accessible.",
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
              <Package className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-mono font-bold text-4xl md:text-5xl text-foreground mb-4">
              WP Plugin Detector
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover which WordPress plugins any website is using. Enter a URL to scan for active plugins.
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
                  onKeyDown={(e) => e.key === "Enter" && detectPlugins()}
                />
                <Button onClick={detectPlugins} disabled={loading}>
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
          {plugins.length > 0 && (
            <Card className="bg-gradient-card border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Detected Plugins</CardTitle>
                  <Badge className="bg-gradient-primary">{plugins.length} Found</Badge>
                </div>
                <CardDescription>
                  These plugins were detected on the website
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {plugins.map((plugin, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-lg border border-border bg-background hover:border-primary/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Wrench className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{plugin.name}</h3>
                          <p className="text-sm text-muted-foreground">{plugin.slug}</p>
                        </div>
                        <a
                          href={`https://wordpress.org/plugins/${plugin.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          View on WordPress.org
                        </a>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="pt-4 mt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    💡 Note: Only publicly visible plugins can be detected. Some plugins may be hidden by security measures.
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
                  <li>• Scans the website's HTML source code</li>
                  <li>• Identifies WordPress plugin directory paths</li>
                  <li>• Extracts plugin slugs and names</li>
                  <li>• Links to official WordPress plugin pages</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Limitations</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="space-y-2">
                  <li>• Only detects publicly visible plugins</li>
                  <li>• Security plugins may hide information</li>
                  <li>• Custom plugins may not be identified</li>
                  <li>• Results depend on site accessibility</li>
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

export default PluginDetector;