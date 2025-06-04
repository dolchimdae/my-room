import { getPost } from '@/lib/notion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default async function PostPage({ params }) {
  const { slug } = await params;
  const { page, content } = await getPost(slug);
  const title = page.properties.제목.title[0]?.plain_text || '제목 없음';
  const category = page.properties.카테고리.select?.name || '';
  const tags = page.properties.태그.multi_select || [];
  const publishDate = page.properties.발행일.date?.start || page.created_time;
  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
            {category}
          </span>
          <span className="text-gray-500">
            {new Date(publishDate).toLocaleDateString('ko-KR')}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}