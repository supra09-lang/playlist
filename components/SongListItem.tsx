"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import type { Song } from "@/lib/songs";

interface SongListItemProps {
  song: Song;
  playCount: number;
  onPlay: (song: Song) => void;
}

export default function SongListItem({ song, playCount, onPlay }: SongListItemProps) {
  const { palette } = useTheme();

  return (
    <button
      onClick={() => onPlay(song)}
      className="flex items-center gap-4 w-full p-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-100 hover:bg-white/80 transition-all active:scale-[0.98]"
      aria-label={`Play ${song.title}`}
    >
      <div className={`relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 ${palette.cardBg}`}>
        <Image
          src={song.image}
          alt={song.title}
          fill
          className="object-cover"
          sizes="112px"
        />
      </div>
      <div className="flex-1 text-left min-w-0">
        <p className="font-semibold text-gray-800 text-base truncate">{song.title}</p>
        {playCount > 0 && (
          <p className="text-xs text-gray-500 mt-0.5">Played {playCount} times</p>
        )}
      </div>
      <div className={`w-10 h-10 flex items-center justify-center rounded-full ${palette.accentBg} text-white flex-shrink-0`}>
        <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
      </div>
    </button>
  );
}
