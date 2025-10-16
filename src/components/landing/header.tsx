"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/language-switcher";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/consultation", label: "consultation", rel: "canonical" },
  { href: "/services", label: "services", rel: "canonical" },
  { href: "/blog", label: "blog", rel: "canonical" },
  { href: "/contact", label: "contact", rel: "canonical" },
];

export default function Header({ className }: { className?: string }) {
  const { t } = useLanguage() || { t: (key: string) => key };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 p-0">
        <Link href="/" className="flex items-center space-x-2" aria-label="Accueil CryptoConsult Pro">
          <Image
            src="/logo.png"
            alt="Logo CryptoConsult Pro"
            width={100}
            height={50}
            loading="lazy"
            className="object-contain"
          />
          <span className="font-headline text-xl font-bold">CryptoConsult Pro</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {navLinks.map(({ href, label, rel }) => (
              <Button key={href} variant="ghost" asChild>
                <Link href={href} rel={rel}>
                  {t(label)}
                </Link>
              </Button>
            ))}
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" aria-label="Outils AI">
              <Globe className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}