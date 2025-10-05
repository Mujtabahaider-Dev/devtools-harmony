import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SpeedOptimizer() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const analyzeSpeed = async () => {
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
        score: Math.floor(Math.random() * 30) + 70,
        loadTime: (Math.random() * 2 + 1).toFixed(2),
        pageSize: (Math.random() * 2 + 1).toFixed(2),
        requests: Math.floor(Math.random() * 50) + 30,
        recommendations: [
          "Enable GZIP compression",
          "Optimize images (reduce size by ~40%)",
          "Minify CSS and JavaScript files",
          "Leverage browser caching",
          "Reduce server response time",
        ],
      });
      setLoading(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="font-mono font-bold text-4xl text-foreground mb-4">Speed Optimizer</h1>
            <p className="text-muted-foreground">Analyze and optimize your WordPress site performance instantly.</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Analyze Website Speed</CardTitle>
              <CardDescription>Enter your WordPress site URL to get performance insights</CardDescription>
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
                  <Button onClick={analyzeSpeed} disabled={loading} size="lg">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-5 w-5" />
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
                  <CardTitle>Performance Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className={`font-mono font-bold text-6xl ${getScoreColor(results.score)}`}>
                      {results.score}
                    </div>
                    <p className="text-muted-foreground mt-2">Out of 100</p>
                  </div>
                  <Progress value={results.score} className="h-3" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Load Time</div>
                      <div className="font-mono font-bold text-2xl">{results.loadTime}s</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Page Size</div>
                      <div className="font-mono font-bold text-2xl">{results.pageSize}MB</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">Requests</div>
                      <div className="font-mono font-bold text-2xl">{results.requests}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Optimization Recommendations</CardTitle>
                  <CardDescription>Implement these suggestions to improve your site speed</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Badge variant="secondary" className="mt-0.5">{index + 1}</Badge>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
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
