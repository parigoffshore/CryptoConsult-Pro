"use client";

import { ToastProvider } from "@/hooks/use-toast";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
