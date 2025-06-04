import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Dev Blog
            </Link>
            <div className="flex space-x-6">
              <Link href="/blog" className="text-gray-700 hover:text-gray-900">
                블로그
              </Link>
              <Link href="/tools" className="text-gray-700 hover:text-gray-900">
                도구
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                소개
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 Dev Blog. Built with Next.js & Notion API</p>
          </div>
        </div>
      </footer>
    </div>
  );
}