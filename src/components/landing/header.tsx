"use client";

import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/language-switcher";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

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
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Logo CryptoConsult Pro" width={100} height={50} />
          <span className="font-headline text-xl font-bold">CryptoConsult Pro</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/consultation" rel="canonical">
                {t("consultation")}
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/services" rel="canonical">
                {t("services")}
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/blog" rel="canonical">
                {t("blog")}
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/contact" rel="canonical">
                {t("contact")}
              </Link>
            </Button>
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" aria-label="Outils AI">
              <Globe className="h-5 w-5" alt="Icône Globe" />
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}