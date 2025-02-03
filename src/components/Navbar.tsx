import { Brain, Sparkles, Shield, Newspaper, BookOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const categories = [
  { name: "AI Research", icon: Brain },
  { name: "Machine Learning", icon: Sparkles },
  { name: "AI Ethics", icon: Shield },
  { name: "Industry News", icon: Newspaper },
  { name: "Tutorials", icon: BookOpen },
];

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Brain className="h-6 w-6" />
          <span className="font-bold">AI Blog</span>
        </Link>
        <div className="flex flex-1 items-center justify-center space-x-4">
          {categories.map((category) => (
            <Button key={category.name} variant="ghost" className="flex items-center space-x-1">
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link to="/admin">
            <Button variant="outline">Admin</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}