import { getPost } from '@/lib/notion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default async function PostPage({ params }) {
  const { slug } = await params;
  const { page, content } = await getPost(slug);
  const title = page.title;
  const category = page.category;
  const tags = page.tags;
  const publishDate = page.publishDate;
  return (
    <article className="max-w-5xl mx-auto py-12">
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded">
            {category}
          </span>
          <span className="text-gray-900">
            {new Date(publishDate).toLocaleDateString('ko-KR')}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4">{title}</h1>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-gray-700 text-sm rounded"
                style={{ backgroundColor: tag.color }}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none text-gray-900">
        <ReactMarkdown
          components={{
            code({ inline, className, children, ...props }) { // 코드 블록 렌더링
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