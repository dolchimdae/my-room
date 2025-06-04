import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    filter: {
      property: '상태',
      select: { equals: '발행' }
    },
    sorts: [
      {
        property: '발행일',
        direction: 'descending'
      }
    ]
  });

  return response.results;
}

export async function getPost(pageId) {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);

    return {
      page,
      content: mdString.parent || mdString // 안전하게 문자열 추출
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      page: null,
      content: '내용을 불러올 수 없습니다.'
    };
  }
}