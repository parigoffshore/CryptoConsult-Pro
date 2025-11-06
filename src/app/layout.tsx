import './globals.css';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/landing/header';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-playfair-display',
});

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={cn(
          'font-body antialiased',
          ptSans.variable,
          playfairDisplay.variable
        )}
      >
        <Toaster />
        <Header />
        {children}
      </body>
    </html>
  );
}
