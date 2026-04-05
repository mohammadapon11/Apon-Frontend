import { DesktopNavbar, MobileNavbar } from "@/components/layout/navbar";
import { ThemeScript } from "@/providers/theme-script";
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { AppProviders } from "./providers";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body
        suppressHydrationWarning
        className={`${geistMono.variable} flex min-h-full flex-col bg-background font-sans text-foreground antialiased`}
      >
        <ThemeScript />
        <AppProviders>
          <MobileNavbar />
          <DesktopNavbar />
          <main id="page-main" className="flex-1 bg-background">
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
