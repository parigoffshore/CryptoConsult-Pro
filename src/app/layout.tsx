import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display, PT_Sans } from "next/font/google";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });
const playfairDisplay = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-playfair",
});
const ptSans = PT_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-sans",
});

export const metadata: Metadata = {
  title: "CryptoConsult Pro",
  description: "Expert crypto consulting to navigate the world of digital assets.",
  keywords: ["crypto", "consulting", "blockchain", "digital assets"],
  authors: [{ name: "David Birota", url: "https://cryptoconsult.me" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CryptoConsult Pro",
    description: "Expert crypto consulting to navigate the world of digital assets.",
    url: "https://cryptoconsult.me",
    siteName: "CryptoConsult Pro",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoConsult Pro",
    description: "Expert crypto consulting to navigate the world of digital assets.",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} ${playfairDisplay.variable} ${ptSans.variable} font-body antialiased transition-colors duration-300 m-0 p-0`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}