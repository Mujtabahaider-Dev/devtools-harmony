import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SavedPassword {
  password: string;
  timestamp: string;
  length: number;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("savedPasswords");
    if (stored) {
      setSavedPasswords(JSON.parse(stored));
    }
  }, []);

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (charset === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length[0]; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);

    // Save to local storage
    const savedPassword: SavedPassword = {
      password: newPassword,
      timestamp: new Date().toLocaleString(),
      length: length[0],
    };
    const updated = [savedPassword, ...savedPasswords];
    setSavedPasswords(updated);
    localStorage.setItem("savedPasswords", JSON.stringify(updated));

    toast({
      title: "Success",
      description: "Password generated and saved to history",
    });
  };

  const copyToClipboard = (pwd: string) => {
    if (pwd) {
      navigator.clipboard.writeText(pwd);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
    }
  };

  const clearHistory = () => {
    setSavedPasswords([]);
    localStorage.removeItem("savedPasswords");
    toast({
      title: "History Cleared",
      description: "All saved passwords have been removed",
    });
  };

  const deletePassword = (index: number) => {
    const updated = savedPasswords.filter((_, i) => i !== index);
    setSavedPasswords(updated);
    localStorage.setItem("savedPasswords", JSON.stringify(updated));
    toast({
      title: "Deleted",
      description: "Password removed from history",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="font-mono font-bold text-4xl text-foreground mb-4">Password Generator</h1>
            <p className="text-muted-foreground">Generate secure passwords for WordPress admin accounts and databases.</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generate Secure Password</CardTitle>
              <CardDescription>Customize your password requirements below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Generated Password</Label>
                <div className="flex gap-2">
                  <Input
                    value={password}
                    readOnly
                    placeholder="Click generate to create password"
                    className="font-mono text-lg"
                  />
                  <Button variant="outline" size="icon" onClick={() => copyToClipboard(password)} disabled={!password}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password Length: {length[0]}</Label>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  min={8}
                  max={64}
                  step={1}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={includeUppercase}
                    onCheckedChange={(checked) => setIncludeUppercase(checked as boolean)}
                  />
                  <Label htmlFor="uppercase" className="cursor-pointer">Include Uppercase Letters (A-Z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={includeLowercase}
                    onCheckedChange={(checked) => setIncludeLowercase(checked as boolean)}
                  />
                  <Label htmlFor="lowercase" className="cursor-pointer">Include Lowercase Letters (a-z)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={includeNumbers}
                    onCheckedChange={(checked) => setIncludeNumbers(checked as boolean)}
                  />
                  <Label htmlFor="numbers" className="cursor-pointer">Include Numbers (0-9)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={includeSymbols}
                    onCheckedChange={(checked) => setIncludeSymbols(checked as boolean)}
                  />
                  <Label htmlFor="symbols" className="cursor-pointer">Include Symbols (!@#$%...)</Label>
                </div>
              </div>

              <Button onClick={generatePassword} className="w-full" size="lg">
                <RefreshCw className="mr-2 h-5 w-5" />
                Generate Password
              </Button>
            </CardContent>
          </Card>

          {savedPasswords.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Password History</CardTitle>
                    <CardDescription>Your recently generated passwords</CardDescription>
                  </div>
                  <Button variant="destructive" size="sm" onClick={clearHistory}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedPasswords.map((saved, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm truncate mb-1">{saved.password}</div>
                        <div className="text-xs text-muted-foreground">
                          {saved.timestamp} • Length: {saved.length}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => copyToClipboard(saved.password)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => deletePassword(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
