import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary py-8">
      <div className="container flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-muted-foreground">© 2025 CryptoConsult Pro. Tous droits réservés.</p>
        <nav className="flex space-x-4">
          <Link href="/privacy" rel="nofollow">Politique de confidentialité</Link>
          <Link href="/terms" rel="nofollow">Conditions d'utilisation</Link>
        </nav>
        <div className="flex space-x-4">
          <Link href="https://github.com/parigoffshore" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://twitter.com/parigoffshore" aria-label="Twitter">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://www.linkedin.com/in/david-birota-cryptoconsultme/" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}