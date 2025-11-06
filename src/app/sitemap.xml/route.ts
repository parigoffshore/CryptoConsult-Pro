import { getBlogPosts } from '@/lib/blog';

const URL = "https://cryptoconsult.me";

export async function GET() {
  const posts = await getBlogPosts();
  const postUrls = posts.map(post => ({
    url: `${URL}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date).toISOString(),
  }));

  const routes = ["", "/blog"].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const urls = [...routes, ...postUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(({ url, lastModified }) => {
      return `
    <url>
        <loc>${url}</loc>
        <lastmod>${lastModified}</lastmod>
    </url>
  `;
    })
    .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
