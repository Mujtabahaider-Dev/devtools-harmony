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

    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (e.g., https://example.com)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      const html = data.contents;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const checks = [];
      let passCount = 0;

      if (validUrl.protocol === 'https:') {
        checks.push({ name: "SSL Certificate", status: "pass", message: "HTTPS is enabled" });
        passCount++;
      } else {
        checks.push({ name: "SSL Certificate", status: "fail", message: "Site should use HTTPS for security" });
      }

      const title = doc.querySelector('title')?.textContent || '';
      if (title && title.length >= 30 && title.length <= 60) {
        checks.push({ name: "Meta Title", status: "pass", message: `Title exists and is optimized (${title.length} characters)` });
        passCount++;
      } else if (title && title.length > 0) {
        checks.push({ name: "Meta Title", status: "warning", message: `Title found but ${title.length < 30 ? 'too short' : 'too long'} (${title.length} characters)` });
      } else {
        checks.push({ name: "Meta Title", status: "fail", message: "Missing title tag" });
      }

      const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      if (metaDesc && metaDesc.length >= 120 && metaDesc.length <= 160) {
        checks.push({ name: "Meta Description", status: "pass", message: `Description exists and is optimized (${metaDesc.length} characters)` });
        passCount++;
      } else if (metaDesc && metaDesc.length > 0) {
        checks.push({ name: "Meta Description", status: "warning", message: `Description found but ${metaDesc.length < 120 ? 'too short' : 'too long'} (${metaDesc.length} characters)` });
      } else {
        checks.push({ name: "Meta Description", status: "fail", message: "Missing meta description" });
      }

      const h1Tags = doc.querySelectorAll('h1');
      if (h1Tags.length === 1) {
        checks.push({ name: "H1 Tag", status: "pass", message: `Single H1 tag found: "${h1Tags[0].textContent?.substring(0, 50)}..."` });
        passCount++;
      } else if (h1Tags.length > 1) {
        checks.push({ name: "H1 Tag", status: "warning", message: `Multiple H1 tags found (${h1Tags.length}). Best practice is one per page` });
      } else {
        checks.push({ name: "H1 Tag", status: "fail", message: "No H1 tag found" });
      }

      const images = doc.querySelectorAll('img');
      const imagesWithoutAlt = Array.from(images).filter(img => !img.getAttribute('alt'));
      if (images.length > 0) {
        const altPercentage = ((images.length - imagesWithoutAlt.length) / images.length * 100).toFixed(0);
        if (imagesWithoutAlt.length === 0) {
          checks.push({ name: "Image Alt Text", status: "pass", message: `All ${images.length} images have alt text` });
          passCount++;
        } else {
          checks.push({ name: "Image Alt Text", status: "warning", message: `${altPercentage}% of images have alt text (${imagesWithoutAlt.length} missing)` });
        }
      } else {
        checks.push({ name: "Image Alt Text", status: "warning", message: "No images found on page" });
      }

      const viewport = doc.querySelector('meta[name="viewport"]');
      if (viewport) {
        checks.push({ name: "Mobile Friendly", status: "pass", message: "Viewport meta tag is present" });
        passCount++;
      } else {
        checks.push({ name: "Mobile Friendly", status: "fail", message: "Missing viewport meta tag for mobile responsiveness" });
      }

      const ogTags = doc.querySelectorAll('meta[property^="og:"]');
      if (ogTags.length >= 3) {
        checks.push({ name: "Open Graph Tags", status: "pass", message: `${ogTags.length} Open Graph tags found for social sharing` });
        passCount++;
      } else if (ogTags.length > 0) {
        checks.push({ name: "Open Graph Tags", status: "warning", message: `Only ${ogTags.length} Open Graph tags found. Add more for better social sharing` });
      } else {
        checks.push({ name: "Open Graph Tags", status: "fail", message: "No Open Graph tags found" });
      }

      const canonical = doc.querySelector('link[rel="canonical"]');
      if (canonical) {
        checks.push({ name: "Canonical URL", status: "pass", message: "Canonical URL is set" });
        passCount++;
      } else {
        checks.push({ name: "Canonical URL", status: "warning", message: "Consider adding canonical URL to avoid duplicate content issues" });
      }

      const headings = {
        h2: doc.querySelectorAll('h2').length,
        h3: doc.querySelectorAll('h3').length,
        h4: doc.querySelectorAll('h4').length,
      };
      if (headings.h2 > 0) {
        checks.push({ name: "Content Structure", status: "pass", message: `Good heading structure: ${headings.h2} H2, ${headings.h3} H3, ${headings.h4} H4 tags` });
        passCount++;
      } else {
        checks.push({ name: "Content Structure", status: "warning", message: "Add more heading tags (H2, H3) to improve content structure" });
      }

      const score = Math.floor((passCount / checks.length) * 100);

      setResults({ score, checks, pageTitle: title });
      setLoading(false);

      toast({
        title: "Analysis Complete",
        description: `SEO Score: ${score}/100`,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze the website. Please check the URL and try again.",
        variant: "destructive",
      });
    }
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
