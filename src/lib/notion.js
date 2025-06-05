import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({
  notionClient: notion, config: {
    parseChildPages: false, // 자식 페이지 파싱 비활성화 (성능 향상)
    convertImage: true, // 이미지 변환 활성화
  }
});

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

export const notionColors = {
  default: 'rgba(0,0,0,0)',      // 기본(투명)
  gray: 'rgba(128,128,128,0.4)',
  brown: 'rgba(165, 42, 42, 0.4)',
  orange: 'rgba(255, 165, 0, 0.4)',
  yellow: 'rgba(255, 255, 0, 0.4)',
  green: 'rgba(0, 128, 0, 0.4)',
  blue: 'rgba(0, 0, 255, 0.4)',
  purple: 'rgba(128, 0, 128, 0.4)',
  pink: 'rgba(255, 192, 203, 0.4)',
  red: 'rgba(255, 0, 0, 0.4)',
};



export async function getPost(pageId) {
  try {
    const originalPage = await notion.pages.retrieve({ page_id: pageId });
    const originalTags = originalPage.properties.태그.multi_select || [];
    const tags = originalTags.map(tag => ({
      id: tag.id,
      name: tag.name,
      color: notionColors[tag.color] || notionColors.default
    }));
    const page = {
      title: originalPage.properties.제목.title[0]?.plain_text || '제목 없음',
      category: originalPage.properties.카테고리.select?.name || '',
      tags: tags,
      publishDate: originalPage.properties.발행일.date?.start || originalPage.created_time
    }

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
