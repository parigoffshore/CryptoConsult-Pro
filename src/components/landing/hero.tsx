import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
<<<<<<< HEAD
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
=======
    <section
      id="home"
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center text-white py-24"
    >
      {/* Background avec SVG */}
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

      {/* Contenu */}
      <div className="relative container mx-auto px-4 md:px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-shadow-lg">
            Smart crypto decisions start here
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-primary-foreground/80 md:text-xl">
            CryptoConsult Pro propose des conseils d'experts et des stratégies de pointe pour vous aider à maîtriser les complexités du marché des actifs numériques.
          </p>

          {/* Boutons alignés */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            {/* Bouton 1 */}
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-64 bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              <a href="#contact">Votre consultation gratuite</a>
            </Button>

            {/* Bouton 2 */}
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-64 bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              <a href="#services">Nos services</a>
            </Button>

            {/* Bouton 3 : téléchargement livre blanc */}
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-64 bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              <a
                href="https://cryptoconsultme.systeme.io/ton-livre-blanc-gratuit"
                target="_blank"
                rel="noopener noreferrer"
              >
                📥 Télécharger le livre blanc
              </a>
            </Button>
          </div>
>>>>>>> 6cb80e51d618dc6cfa1a4c2c2df3f050a6155d67
        </div>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))] opacity-50" aria-hidden="true" />
    </section>
  );
}