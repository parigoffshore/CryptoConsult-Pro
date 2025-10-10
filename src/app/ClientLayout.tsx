"use client";

import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ToastProvider>
        <main className="min-h-screen">
          {children}
          <Toaster />
        </main>
      </ToastProvider>
    </I18nextProvider>
  );
}