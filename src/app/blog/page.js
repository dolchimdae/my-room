import { getPosts } from '@/lib/notion';
import BlogCard from '@/components/BlogCard';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-12 max-w-6xl mx-auto mt-12">
      <h1 className="text-gray-900 text-2xl font-bold mb-8">TIL 모음</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}