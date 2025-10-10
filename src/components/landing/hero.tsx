import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-primary-foreground">
      <div className="container text-center space-y-6">
        <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Smart crypto decisions start here
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          CryptoConsult Pro propose des conseils d'experts et des stratégies de pointe pour vous aider à maîtriser les complexités du marché des actifs numériques.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/consultation">Votre consultation gratuite</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/services">Nos services</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/whitepaper">Télécharger le livre blanc</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-50" aria-hidden="true" />
    </section>
  );
}