import { BlogCard } from "@/components/BlogCard";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: "AI Chatbots" | "AI Images & Videos" | "AI Music" | "AI Coding" | "Other AI";
  created_at: string;
  tags: string[];
};

const isValidCategory = (category: string): category is BlogPost['category'] => {
  const validCategories = [
    "AI Chatbots",
    "AI Images & Videos",
    "AI Music",
    "AI Coding",
    "Other AI"
  ];
  return validCategories.includes(category);
};

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Transform and validate the data
        const validPosts = (data || [])
          .filter(post => post.category && isValidCategory(post.category))
          .map(post => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt || "",
            category: post.category as BlogPost['category'],
            created_at: post.created_at,
            tags: post.tags || []
          }));

        setPosts(validPosts);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <main className="container py-8">
        <h1 className="mb-8 text-4xl font-bold">Latest Articles</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 animate-pulse bg-muted rounded-lg" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">Latest Articles</h1>
      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No articles published yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              excerpt={post.excerpt}
              category={post.category}
              date={new Date(post.created_at).toLocaleDateString()}
              tags={post.tags}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default Index;