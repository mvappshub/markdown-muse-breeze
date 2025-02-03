import { BlogCard } from "@/components/BlogCard";

const posts = [
  {
    title: "The Future of Large Language Models",
    excerpt: "Exploring the next generation of AI language models and their potential impact on society...",
    category: "AI Chatbots" as const,
    date: "2024-02-20",
    tags: ["LLM", "GPT", "Future Tech"],
  },
  {
    title: "Understanding Neural Networks",
    excerpt: "A comprehensive guide to neural networks and their applications in modern AI...",
    category: "AI Images & Videos" as const,
    date: "2024-02-19",
    tags: ["Neural Networks", "Deep Learning"],
  },
  {
    title: "AI Ethics in Practice",
    excerpt: "Examining real-world cases of ethical challenges in AI development and deployment...",
    category: "AI Music" as const,
    date: "2024-02-18",
    tags: ["Ethics", "AI Safety"],
  },
];

const Index = () => {
  return (
    <main className="container py-8">
      <h1 className="mb-8 text-4xl font-bold">Latest Articles</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.title} {...post} />
        ))}
      </div>
    </main>
  );
};

export default Index;