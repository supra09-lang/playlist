"use client";

import { Palette } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function PaletteButton() {
  const { palette, cyclePalette } = useTheme();

  return (
    <button
      onClick={cyclePalette}
      className={`w-10 h-10 flex items-center justify-center rounded-full ${palette.accentLight} ${palette.accentText} hover:scale-110 transition-all active:scale-95`}
      aria-label={`Change color theme (current: ${palette.name})`}
      title={`Theme: ${palette.name}`}
    >
      <Palette className="w-5 h-5" />
    </button>
  );
}
