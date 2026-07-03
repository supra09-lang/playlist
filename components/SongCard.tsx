"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/ThemeContext";
import type { Song } from "@/lib/songs";

interface SongCardProps {
  song: Song;
  playCount: number;
  onPlay: (song: Song) => void;
}

export default function SongCard({ song, playCount, onPlay }: SongCardProps) {
  const { palette } = useTheme();
  const router = useRouter();

  const handleClick = () => {
    onPlay(song);
  };

  return (
    <div
      className="flex-shrink-0 w-[70vw] md:w-[32vw] flex flex-col rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm"
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
        {/* Play button centered - this is the tap target */}
        <button
          onClick={handleClick}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={`Play ${song.title}`}
        >
          <div className={`w-20 h-20 flex items-center justify-center rounded-full ${palette.accentBg} text-white shadow-lg`}>
            <Play className="w-10 h-10 ml-0.5" fill="currentColor" />
          </div>
        </button>
      </div>

      {/* Title area - also tappable */}
      <button onClick={handleClick} className="p-4 text-left w-full">
        <p className="font-semibold text-gray-800 text-lg truncate">{song.title}</p>
        {playCount > 0 && (
          <p className="text-sm text-gray-500 mt-1">Played {playCount} times</p>
        )}
      </button>
    </div>
  );
}
