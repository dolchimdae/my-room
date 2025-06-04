import Link from "next/link";
import { getPosts } from "@/lib/notion";
import BlogCard from "@/components/BlogCard";
export default async function Home() {
  const allPosts = await getPosts();
  const recentPosts = allPosts.slice(0, 6); // 최근 6개 글만 표시

  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      {/* Recent Posts */}
      <section>
        <div className="flex items-center justify-between mb-8 pt-8">
          <h2 className="text-2xl font-bold text-gray-900">최근 글</h2>
          <Link
            href="/blog"
            className="text-lg  text-[#F4B083] hover:text-[#EF904F]"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Features */}
      {/* <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          무엇을 찾을 수 있나요?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">TIL (Today I Learned)</h3>
            <p className="text-gray-600">
              매일 배운 개발 지식과 경험을 기록합니다.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-2">독후감</h3>
            <p className="text-gray-600">
              개발 관련 도서부터 자기계발서까지 다양한 책 리뷰를 공유합니다.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-bold mb-2">유용한 도구</h3>
            <p className="text-gray-600">
              만다라트 생성기 등 일상에서 유용한 웹 도구들을 제공합니다.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
