"use client";

import { ReactNode } from "react";
import { Palette } from "lucide-react";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

function ThemedBody({ children }: { children: ReactNode }) {
  const { palette } = useTheme();

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${palette.bg} transition-colors duration-500`}
    >
      {children}
      <FloatingPalette />
    </div>
  );
}

function FloatingPalette() {
  const { palette, cyclePalette } = useTheme();

  return (
    <button
      onClick={cyclePalette}
      className={`fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full ${palette.accentBg} text-white shadow-lg hover:scale-110 transition-all active:scale-95 z-50`}
      aria-label={`Change color theme (current: ${palette.name})`}
    >
      <Palette className="w-6 h-6" />
    </button>
  );
}

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ThemedBody>{children}</ThemedBody>
    </ThemeProvider>
  );
}
