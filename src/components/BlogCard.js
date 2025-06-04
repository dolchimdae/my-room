import Link from 'next/link';

export default function BlogCard({ post }) {
  const title = post.properties.제목.title[0]?.plain_text || '제목 없음';
  // const category = post.properties.카테고리.select?.name || '';
  const tags = post.properties.태그.multi_select || [];
  const summary = post.properties.요약.rich_text[0]?.plain_text || '';
  const publishDate = post.properties.발행일.date?.start || post.created_time;

  return (
    <Link href={`/blog/${post.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
        <div className="flex items-center gap-2 mb-3">
          {/* <span className="px-2 py-1 bg-blue-10 0text-sm rounded">
            {category}
          </span> */}
          <span className="text-gray-500 text-sm">
            {new Date(publishDate).toLocaleDateString('ko-KR')}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>

        {summary && (
          <p className="text-gray-600 mb-3 line-clamp-3">{summary}</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-purple-200 text-gray-700 text-xs rounded"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}