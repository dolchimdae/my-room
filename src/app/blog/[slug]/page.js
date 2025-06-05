import { getPost } from '@/lib/notion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { ExternalLink, Globe, BookOpen } from 'lucide-react';
async function fetchLinkPreview(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const title = doc.querySelector('meta[property="og:title"]')?.content
      || doc.querySelector('title')?.textContent;
    const description = doc.querySelector('meta[property="og:description"]')?.content
      || doc.querySelector('meta[name="description"]')?.content;
    const image = doc.querySelector('meta[property="og:image"]')?.content;

    return { title, description, image };
  } catch (error) {
    console.error('Error fetching preview:', error);
  }
}
// 북마크 카드 컴포넌트
const BookmarkCard = async ({ url }) => {
  // URL에서 도메인 추출
  const getDomain = (url) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };
  const { title, description, image } = await fetchLinkPreview(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block no-underline hover:no-underline"
    >
      <div className="border border-gray-200 rounded-lg p-4 my-4 hover:shadow-md transition-all duration-200 bg-white hover:bg-gray-50 group">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <BookOpen className="w-4 h-4 text-gray-500" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {title}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Globe className="w-3 h-3 text-gray-400" />
              <span className="text-sm text-gray-500 truncate">
                {getDomain(url)}
              </span>
            </div>
          </div>

          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
        </div>
      </div>
    </a>
  );
};
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
          remarkPlugins={[remarkGfm]}
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
            },
            p({ children }) {
              // 모든 p 태그를 div로 변환 (북마크 카드 호환성을 위해)
              return <div className="my-2">{children}</div>;
            },
            a({ href, children, ...props }) {
              // 링크 텍스트가 'bookmark'인 경우 카드로 렌더링
              if (children && children.toString().toLowerCase() === 'bookmark') {
                return <BookmarkCard url={href} />;
              }

              // 일반 링크는 그대로 처리
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                  {...props}
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border-collapse border border-gray-300">
                    {children}
                  </table>
                </div>
              );
            },
            th({ children }) {
              return (
                <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="border border-gray-300 px-4 py-2">
                  {children}
                </td>
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