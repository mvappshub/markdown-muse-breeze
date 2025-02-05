
import { MessageSquare, Image, Music, Code, Atom, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  { name: "AI Chatbots", icon: MessageSquare },
  { name: "AI Images & Videos", icon: Image },
  { name: "AI Music", icon: Music },
  { name: "AI Coding", icon: Code },
  { name: "Other AI", icon: Atom },
];

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Atom className="h-6 w-6" />
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
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
