"use client";

import SongCard from "@/components/SongCard";
import type { Song } from "@/lib/songs";

interface SongCarouselProps {
  songs: Song[];
  playCounts: Record<string, number>;
  onPlay: (song: Song) => void;
}

export default function SongCarousel({ songs, playCounts, onPlay }: SongCarouselProps) {
  if (songs.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">No songs yet</p>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {songs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          playCount={playCounts[song.id] || song.playCount}
          onPlay={onPlay}
        />
      ))}
      <div className="flex-shrink-0 w-4" aria-hidden="true" />
    </div>
  );
}
