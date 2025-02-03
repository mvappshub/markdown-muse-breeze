import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";

type BlogPostFormData = {
  title: string;
  excerpt: string;
  content: string;
  category: "AI Research" | "Machine Learning" | "AI Ethics" | "Industry News" | "Tutorials";
  tags: string;
};

export default function AdminDashboard() {
  const form = useForm<BlogPostFormData>({
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "AI Research",
      tags: "",
    },
  });

  const handlePublish = (data: BlogPostFormData) => {
    // Convert tags string to array
    const formattedData = {
      ...data,
      tags: data.tags.split(",").map((tag) => tag.trim()),
      date: new Date().toISOString().split("T")[0],
    };
    
    console.log("Publishing:", formattedData);
    // TODO: Implement actual publishing logic
    form.reset();
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
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="AI Research">AI Research</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="AI Ethics">AI Ethics</option>
                        <option value="Industry News">Industry News</option>
                        <option value="Tutorials">Tutorials</option>
                      </select>
                    </FormControl>
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
    </div>
  );
}