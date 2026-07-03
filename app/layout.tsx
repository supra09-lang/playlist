import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import ThemeWrapper from "@/components/ThemeWrapper";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moments",
  description: "A calm music experience for toddlers",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full font-[family-name:var(--font-geist)] antialiased">
        <ThemeWrapper>
          {children}
          <footer className="text-center text-xs text-black-400 py-6">
            Website built by mommy ❤️ June 2026 
          </footer>
        </ThemeWrapper>
      </body>
    </html>
  );
}
