"use client"

import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Changer de langue">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")} className={cn(language === "en" && "text-primary")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("fr")} className={cn(language === "fr" && "text-primary")}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")} className={cn(language === "es" && "text-primary")}>
          Español
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}