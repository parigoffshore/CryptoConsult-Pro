import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center text-white py-24">
      <div className="absolute inset-0 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-black opacity-80"></div>
        <svg
          className="absolute bottom-0 left-0 w-full h-auto text-background"
          fill="currentColor"
          viewBox="0 0 1440 120"
        >
          <path d="M0,64L80,80C160,96,320,128,480,117.3C640,107,800,53,960,37.3C1120,21,1280,43,1360,53.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
      <div className="relative container mx-auto px-4 md:px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-shadow-lg">
            Smart crypto decisions starts here
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-primary-foreground/80 md:text-xl">
            CryptoConsult Pro propose des conseils d'experts et des stratégies de pointe pour vous aider à maîtriser les complexités du marché des actifs numériques.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#contact">
                Votre consultation gratuite
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link href="#services">
                Nos Services
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link href="https://cryptoconsultme.systeme.io/ton-livre-blanc-gratuit" target="_blank">
                Télécharger le livre blanc
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
