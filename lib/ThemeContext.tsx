"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface ThemePalette {
  name: string;
  accent: string;        // Tailwind class prefix e.g. "purple", "pink"
  bg: string;            // Body gradient classes
  accentBg: string;      // e.g. "bg-purple-500"
  accentBgHover: string; // e.g. "hover:bg-purple-600"
  accentText: string;    // e.g. "text-purple-500"
  accentLight: string;   // e.g. "bg-purple-50"
  accentRing: string;    // e.g. "focus:ring-purple-300"
  cardBg: string;        // e.g. "bg-purple-100"
}

const palettes: ThemePalette[] = [
  {
    name: "Purple",
    accent: "purple",
    bg: "from-purple-50 to-pink-50",
    accentBg: "bg-purple-500",
    accentBgHover: "hover:bg-purple-600",
    accentText: "text-purple-500",
    accentLight: "bg-purple-50",
    accentRing: "focus:ring-purple-300",
    cardBg: "bg-purple-100",
  },
  {
    name: "Ocean",
    accent: "sky",
    bg: "from-sky-50 to-cyan-50",
    accentBg: "bg-sky-500",
    accentBgHover: "hover:bg-sky-600",
    accentText: "text-sky-500",
    accentLight: "bg-sky-50",
    accentRing: "focus:ring-sky-300",
    cardBg: "bg-sky-100",
  },
  {
    name: "Sunshine",
    accent: "amber",
    bg: "from-amber-50 to-orange-50",
    accentBg: "bg-amber-500",
    accentBgHover: "hover:bg-amber-600",
    accentText: "text-amber-500",
    accentLight: "bg-amber-50",
    accentRing: "focus:ring-amber-300",
    cardBg: "bg-amber-100",
  },
  {
    name: "Forest",
    accent: "emerald",
    bg: "from-emerald-50 to-teal-50",
    accentBg: "bg-emerald-500",
    accentBgHover: "hover:bg-emerald-600",
    accentText: "text-emerald-500",
    accentLight: "bg-emerald-50",
    accentRing: "focus:ring-emerald-300",
    cardBg: "bg-emerald-100",
  },
  {
    name: "Rose",
    accent: "rose",
    bg: "from-rose-50 to-pink-50",
    accentBg: "bg-rose-500",
    accentBgHover: "hover:bg-rose-600",
    accentText: "text-rose-500",
    accentLight: "bg-rose-50",
    accentRing: "focus:ring-rose-300",
    cardBg: "bg-rose-100",
  },
  {
    name: "Lavender",
    accent: "violet",
    bg: "from-violet-50 to-purple-50",
    accentBg: "bg-violet-500",
    accentBgHover: "hover:bg-violet-600",
    accentText: "text-violet-500",
    accentLight: "bg-violet-50",
    accentRing: "focus:ring-violet-300",
    cardBg: "bg-violet-100",
  },
  {
    name: "Coral",
    accent: "orange",
    bg: "from-orange-50 to-red-50",
    accentBg: "bg-orange-500",
    accentBgHover: "hover:bg-orange-600",
    accentText: "text-orange-500",
    accentLight: "bg-orange-50",
    accentRing: "focus:ring-orange-300",
    cardBg: "bg-orange-100",
  },
  {
    name: "Berry",
    accent: "fuchsia",
    bg: "from-fuchsia-50 to-pink-50",
    accentBg: "bg-fuchsia-500",
    accentBgHover: "hover:bg-fuchsia-600",
    accentText: "text-fuchsia-500",
    accentLight: "bg-fuchsia-50",
    accentRing: "focus:ring-fuchsia-300",
    cardBg: "bg-fuchsia-100",
  },
  {
    name: "Mint",
    accent: "teal",
    bg: "from-teal-50 to-green-50",
    accentBg: "bg-teal-500",
    accentBgHover: "hover:bg-teal-600",
    accentText: "text-teal-500",
    accentLight: "bg-teal-50",
    accentRing: "focus:ring-teal-300",
    cardBg: "bg-teal-100",
  },
  {
    name: "Blueberry",
    accent: "indigo",
    bg: "from-indigo-50 to-blue-50",
    accentBg: "bg-indigo-500",
    accentBgHover: "hover:bg-indigo-600",
    accentText: "text-indigo-500",
    accentLight: "bg-indigo-50",
    accentRing: "focus:ring-indigo-300",
    cardBg: "bg-indigo-100",
  },
];

interface ThemeContextValue {
  palette: ThemePalette;
  cyclePalette: () => void;
  paletteIndex: number;
}

const ThemeContext = createContext<ThemeContextValue>({
  palette: palettes[0],
  cyclePalette: () => {},
  paletteIndex: 0,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [paletteIndex, setPaletteIndex] = useState(0);

  const cyclePalette = useCallback(() => {
    setPaletteIndex((prev) => (prev + 1) % palettes.length);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ palette: palettes[paletteIndex], cyclePalette, paletteIndex }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
