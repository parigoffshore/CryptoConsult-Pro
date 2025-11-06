
import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import Team from '@/components/landing/team';
import Testimonials from '@/components/landing/testimonials';
import Contact from '@/components/landing/contact';
import Footer from '@/components/landing/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <main className="flex-1">
        <Hero />
        <Services />
        <section className="py-20 md:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-4xl md:text-5xl font-bold">Restez informés avec notre blog</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
              Toutes les informations fondamentales sur les cryptos c'est ici !
            </p>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/blog">
                  Visitez le blog <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
