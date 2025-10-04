import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

const blogPosts = [
  {
    title: "10 Essential WordPress Security Best Practices",
    description: "Learn how to secure your WordPress site from common threats and vulnerabilities.",
    category: "Security",
    date: "Mar 15, 2024",
  },
  {
    title: "Optimizing WordPress Performance in 2024",
    description: "A comprehensive guide to making your WordPress site lightning fast.",
    category: "Performance",
    date: "Mar 10, 2024",
  },
  {
    title: "Modern WordPress Development Workflow",
    description: "Set up a professional development environment for WordPress projects.",
    category: "Development",
    date: "Mar 5, 2024",
  },
];

export const BlogSection = () => {
  return (
    <section id="blog" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-4">
            Latest Guides & Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest WordPress development tips and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <Card
              key={index}
              className="group cursor-pointer bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-large hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.date}
                  </div>
                </div>
                <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{post.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
