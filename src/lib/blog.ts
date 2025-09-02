import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    date: string;
    author: string;
    summary: string;
    categories: string[];
  };
  content: string;
  htmlContent: string;
}

const postsDirectory = path.join(process.cwd(), 'src', 'content', 'blog');

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const filenames = await fs.readdir(postsDirectory);
    const mdxFiles = filenames.filter((fn) => fn.endsWith('.md') || fn.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (filename) => {
        const filePath = path.join(postsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');

        const { data, content } = matter(fileContents);
        
        const processedContent = await remark().use(html).process(content);
        const htmlContent = processedContent.toString();

        return {
          slug: filename.replace(/\.mdx?$/, ''),
          metadata: data as BlogPost['metadata'],
          content,
          htmlContent,
        };
      })
    );

    return posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
  } catch (error) {
    console.error("Could not read blog posts directory:", error);
    return [];
  }
}
