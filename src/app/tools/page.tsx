import AITools from '@/components/ai-tools';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
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
            <h1 className="text-4xl md:text-5xl font-bold font-headline">AI Content Generation</h1>
            <p className="text-muted-foreground mt-4 md:text-lg">
              Leverage our powerful AI to craft compelling marketing copy and detailed service descriptions tailored to your brand.
            </p>
        </div>
        <AITools />
      </main>
    </div>
  );
}
