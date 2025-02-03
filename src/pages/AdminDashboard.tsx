import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function AdminDashboard() {
  const [content, setContent] = useState("");

  const handlePublish = () => {
    // TODO: Implement blog post publishing
    console.log("Publishing:", content);
  };

  return (
    <div className="container py-8 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Write your blog post in Markdown format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Write your post content here..."
              className="min-h-[300px] font-mono"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handlePublish}>Publish Post</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}