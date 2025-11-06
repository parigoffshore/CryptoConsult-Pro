import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { XIcon } from '@/components/x-icon';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="bg-black rounded-md inline-block p-2">
                <Logo />
            </div>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Expert crypto consulting to navigate the world of digital assets.
            </p>
          </div>
          <div className="grid grid-cols-2 md:col-span-2 gap-8">
            <div>
              <h4 className="font-semibold tracking-wider uppercase mb-4">Navigate</h4>
              <ul className="space-y-2">
                <li><Link href="#services" className="text-sm text-primary-foreground/70 hover:text-white">Services</Link></li>
                <li><Link href="/blog" className="text-sm text-primary-foreground/70 hover:text-white">Blog</Link></li>
                <li><Link href="#team" className="text-sm text-primary-foreground/70 hover:text-white">Team</Link></li>
                <li><Link href="#testimonials" className="text-sm text-primary-foreground/70 hover:text-white">Testimonials</Link></li>
                <li><Link href="#contact" className="text-sm text-primary-foreground/70 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold tracking-wider uppercase mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link href="https://x.com/ParigOffshore" aria-label="X (formerly Twitter)">
                  <XIcon className="h-6 w-6 text-primary-foreground/70 hover:text-white" />
                </Link>
                <Link href="https://www.linkedin.com/in/david-birota-cryptoconsultme/" aria-label="LinkedIn">
                  <Linkedin className="h-6 w-6 text-primary-foreground/70 hover:text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
          <p>&copy; {currentYear} CryptoConsult Pro. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
