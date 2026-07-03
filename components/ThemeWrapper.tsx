"use client";

import { ReactNode } from "react";
import { ThemeProvider, useTheme } from "@/lib/ThemeContext";

function ThemedBody({ children }: { children: ReactNode }) {
  const { palette } = useTheme();

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${palette.bg} transition-colors duration-500`}
    >
      {children}
    </div>
  );
}

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ThemedBody>{children}</ThemedBody>
    </ThemeProvider>
  );
}
