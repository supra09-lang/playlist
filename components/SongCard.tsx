"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";
import type { Song } from "@/lib/songs";

interface SongCardProps {
  song: Song;
  playCount: number;
  onPlay: (song: Song) => void;
}

export default function SongCard({ song, playCount, onPlay }: SongCardProps) {
  const { palette } = useTheme();

  return (
    <button
      onClick={() => onPlay(song)}
      className="flex-shrink-0 w-[70vw] md:w-[32vw] snap-start flex flex-col rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-[0.97]"
      aria-label={`Play ${song.title}`}
    >
      {/* Artwork with play overlay */}
      <div className={`relative aspect-square w-full ${palette.cardBg}`}>
        <Image
          src={song.image}
          alt={song.title}
          fill
          className="object-cover"
          sizes="60vw"
        />
        {/* Slight dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        {/* Play button centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`w-20 h-20 flex items-center justify-center rounded-full ${palette.accentBg} text-white shadow-lg backdrop-blur-sm`}>
            <Play className="w-10 h-10 ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Title area */}
      <div className="p-4 text-left">
        <p className="font-semibold text-gray-800 text-lg truncate">{song.title}</p>
        {playCount > 0 && (
          <p className="text-sm text-gray-500 mt-1">Played {playCount} times</p>
        )}
      </div>
    </button>
  );
}
