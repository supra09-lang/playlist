"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import type { Song } from "@/lib/songs";
import { useTheme } from "@/lib/ThemeContext";

interface BottomPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onTap: () => void;
}

export default function BottomPlayer({
  song,
  isPlaying,
  onTogglePlay,
  onTap,
}: BottomPlayerProps) {
  const { palette } = useTheme();

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3 z-50">
      <div className="max-w-2xl mx-auto flex items-center gap-3">
        <button
          onClick={onTap}
          className="flex items-center gap-3 flex-1 min-w-0"
          aria-label={`Now playing: ${song.title}`}
        >
          <div className={`relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 ${palette.cardBg}`}>
            <Image
              src={song.image}
              alt={song.title}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-gray-800 truncate">
              Now Playing
            </p>
            <p className="text-sm text-gray-500 truncate">{song.title}</p>
          </div>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onTogglePlay();
          }}
          className={`w-10 h-10 flex items-center justify-center rounded-full ${palette.accentBg} text-white flex-shrink-0`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" fill="currentColor" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
          )}
        </button>
      </div>
    </div>
  );
}
