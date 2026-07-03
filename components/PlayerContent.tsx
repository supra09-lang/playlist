"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";
import CaptureButton from "@/components/CaptureButton";
import PaletteButton from "@/components/PaletteButton";
import { useTheme } from "@/lib/ThemeContext";
import type { Song } from "@/lib/songs";

interface PlayerContentProps {
  songs: Song[];
}

export default function PlayerContent({ songs }: PlayerContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { palette } = useTheme();
  const songId = searchParams.get("id");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const currentIndex = songs.findIndex((s) => s.id === songId);
  const song: Song | undefined = songs[currentIndex];

  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Song not found</p>
      </div>
    );
  }

  const handleNext = currentIndex < songs.length - 1
    ? () => router.push(`/player?id=${songs[currentIndex + 1].id}`)
    : undefined;

  const handlePrevious = currentIndex > 0
    ? () => router.push(`/player?id=${songs[currentIndex - 1].id}`)
    : undefined;

  const handleShuffle = () => {
    const otherSongs = songs.filter((_, i) => i !== currentIndex);
    const random = otherSongs[Math.floor(Math.random() * otherSongs.length)];
    router.push(`/player?id=${random.id}`);
  };

  const handleCapture = useCallback((imageUrl: string) => {
    setCapturedImage(imageUrl);
    setTimeout(() => setCapturedImage(null), 3000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6 pb-4">
        <button
          onClick={() => router.push("/")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
          aria-label="Go to home"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <PaletteButton />
      </header>

      {/* Illustration */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <div className={`relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-xl ${palette.cardBg}`}>
          <Image
            src={song.image}
            alt={song.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 384px"
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-800 text-center">
          {song.title}
        </h1>
      </div>

      {/* Controls */}
      <div className="px-6 pb-8 space-y-4 max-w-sm mx-auto w-full">
        <MusicPlayer
          song={song}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onShuffle={handleShuffle}
        />

        <CaptureButton songId={song.id} onCapture={handleCapture} />

        {/* Per-song credit */}
        {song.credit && (
          <p className="text-center text-xs text-gray-400">{song.credit}</p>
        )}

        {/* Capture preview */}
        {capturedImage && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 border border-green-200">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={capturedImage}
                alt="Captured moment"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <p className="text-sm text-green-700 font-medium">
              Moment captured!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
