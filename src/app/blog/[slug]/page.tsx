import { getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { format } from 'date-fns';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = (await getBlogPosts()).find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.metadata.title} | CryptoConsult Pro`,
    description: post.metadata.summary,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = (await getBlogPosts()).find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Logo />
                <Button variant="outline" asChild>
                    <Link href="/blog">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                    </Link>
                </Button>
            </div>
        </header>
        <main className="container mx-auto p-4 sm:p-6 lg:p-8">
            <article className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-4xl font-headline">{post.metadata.title}</CardTitle>
                        <CardDescription className="text-base">
                            <span>{format(new Date(post.metadata.date), 'MM/dd/yyyy')}</span> | <span>By {post.metadata.author}</span>
                        </CardDescription>
                        <div className="flex gap-2 pt-2">
                            {post.metadata.categories.map(category => (
                                <Badge key={category}>{category}</Badge>
                            ))}
                        </div>
                    </CardHeader>
                    <CardContent className="prose prose-invert max-w-none">
                       <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
                    </CardContent>
                </Card>
            </article>
        </main>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
