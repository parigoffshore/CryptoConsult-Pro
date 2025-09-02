import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getBlogPosts } from '@/lib/blog';
import Blog from '@/components/blog';

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">Crypto Insights</h1>
          <p className="text-muted-foreground mt-4 md:text-lg">
            Your source for the latest news, analysis, and insights in the crypto world.
          </p>
        </div>
        <Blog posts={allPosts} />
      </main>
    </div>
  );
}
