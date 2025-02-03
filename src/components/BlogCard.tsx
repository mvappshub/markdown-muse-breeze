import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, Sparkles, Shield, Newspaper, BookOpen } from "lucide-react";

const categoryIcons = {
  "AI Research": Brain,
  "Machine Learning": Sparkles,
  "AI Ethics": Shield,
  "Industry News": Newspaper,
  "Tutorials": BookOpen,
};

interface BlogCardProps {
  title: string;
  excerpt: string;
  category: keyof typeof categoryIcons;
  date: string;
  tags: string[];
}

export function BlogCard({ title, excerpt, category, date, tags }: BlogCardProps) {
  const Icon = categoryIcons[category];

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{category}</span>
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}