import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MessageSquare, Image, Music, Code, Atom } from "lucide-react";
import { Link } from "react-router-dom";

const categoryIcons = {
  "AI Chatbots": MessageSquare,
  "AI Images & Videos": Image,
  "AI Music": Music,
  "AI Coding": Code,
  "Other AI": Atom,
};

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  category: keyof typeof categoryIcons;
  date: string;
  tags: string[];
}

export function BlogCard({ id, title, excerpt, category, date, tags }: BlogCardProps) {
  const Icon = categoryIcons[category];

  return (
    <Link to={`/post/${id}`}>
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
    </Link>
  );
}