import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SEOAnalyzer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const analyzeSEO = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults({
        score: Math.floor(Math.random() * 20) + 75,
        checks: [
          { name: "Meta Title", status: "pass", message: "Title tag is present and optimized" },
          { name: "Meta Description", status: "pass", message: "Meta description is present (155 characters)" },
          { name: "H1 Tag", status: "pass", message: "Single H1 tag found" },
          { name: "Image Alt Text", status: "warning", message: "3 images missing alt text" },
          { name: "SSL Certificate", status: "pass", message: "HTTPS is enabled" },
          { name: "Mobile Friendly", status: "pass", message: "Page is mobile responsive" },
          { name: "Page Speed", status: "warning", message: "Load time could be improved" },
          { name: "XML Sitemap", status: "pass", message: "Sitemap.xml found" },
          { name: "Robots.txt", status: "pass", message: "Robots.txt is configured" },
          { name: "Broken Links", status: "fail", message: "2 broken links detected" },
        ],
      });
      setLoading(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "fail":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      pass: "default",
      warning: "secondary",
      fail: "destructive",
    };
    return variants[status] || "default";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="font-mono font-bold text-4xl text-foreground mb-4">SEO Analyzer</h1>
            <p className="text-muted-foreground">Comprehensive SEO audit and recommendations for better rankings.</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Analyze Website SEO</CardTitle>
              <CardDescription>Enter your WordPress site URL for a complete SEO analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">Website URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="url"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <Button onClick={analyzeSEO} disabled={loading} size="lg">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Analyze
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {results && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="font-mono font-bold text-6xl text-primary mb-2">
                      {results.score}
                    </div>
                    <p className="text-muted-foreground">Out of 100</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Checks</CardTitle>
                  <CardDescription>Detailed analysis of your site's SEO factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.checks.map((check: any, index: number) => (
                      <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="mt-0.5">
                          {getStatusIcon(check.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{check.name}</span>
                            <Badge variant={getStatusBadge(check.status)} className="text-xs">
                              {check.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{check.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
