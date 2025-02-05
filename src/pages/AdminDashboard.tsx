import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

type BlogPostFormData = {
  title: string;
  excerpt: string;
  content: string;
  category: "AI Chatbots" | "AI Images & Videos" | "AI Music" | "AI Coding" | "Other AI";
  tags: string;
};

type StoredBlogPost = Omit<BlogPostFormData, 'tags'> & {
  tags: string[];
  created_at: string;
};

export default function AdminDashboard() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<StoredBlogPost[]>([]);
  const { user } = useAuth();

  const form = useForm<BlogPostFormData>({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "AI Chatbots",
      tags: "",
    },
  });

  const handlePublish = async (data: BlogPostFormData) => {
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create posts",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from('posts').insert({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: data.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your blog post has been successfully published.",
      });

      // Fetch the latest posts after successful creation
      const { data: newPosts, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPosts(newPosts as StoredBlogPost[]);
      form.reset();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to publish post. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Write and publish a new blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePublish)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write a brief excerpt..."
                        className="h-20"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AI Chatbots">AI Chatbots</SelectItem>
                        <SelectItem value="AI Images & Videos">AI Images & Videos</SelectItem>
                        <SelectItem value="AI Music">AI Music</SelectItem>
                        <SelectItem value="AI Coding">AI Coding</SelectItem>
                        <SelectItem value="Other AI">Other AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter tags separated by commas..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your post content in Markdown format..."
                        className="min-h-[300px] font-mono"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit">Publish Post</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {posts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Published Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.map((post, index) => (
                <div key={index} className="p-4 border rounded">
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.category} - {post.created_at}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}