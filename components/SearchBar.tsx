"use client";

import { Search } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { palette } = useTheme();

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search songs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 ${palette.accentRing} text-lg`}
        aria-label="Search songs"
      />
    </div>
  );
}
