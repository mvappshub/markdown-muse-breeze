import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Image, Music, Code, Atom } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type BlogPost = {
  title: string;
  content: string;
  category: "AI Chatbots" | "AI Images & Videos" | "AI Music" | "AI Coding" | "Other AI";
  created_at: string;
  tags: string[];
};

const categoryIcons = {
  "AI Chatbots": MessageSquare,
  "AI Images & Videos": Image,
  "AI Music": Music,
  "AI Coding": Code,
  "Other AI": Atom,
};

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          setPost(data as BlogPost);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container py-8">
        <p className="text-center text-muted-foreground">Post not found</p>
      </div>
    );
  }

  const Icon = categoryIcons[post.category];

  return (
    <article className="container max-w-4xl py-8">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{post.category}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <time className="text-sm text-muted-foreground">
            {new Date(post.created_at).toLocaleDateString()}
          </time>
        </div>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>
      <div className="prose dark:prose-invert max-w-none">
        {post.content}
      </div>
    </article>
  );
};

export default BlogPost;