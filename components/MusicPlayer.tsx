"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";
import type { Song } from "@/lib/songs";
import { useTheme } from "@/lib/ThemeContext";

interface MusicPlayerProps {
  song: Song;
  onNext?: () => void;
  onPrevious?: () => void;
  onShuffle?: () => void;
}

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function MusicPlayer({
  song,
  onNext,
  onPrevious,
  onShuffle,
}: MusicPlayerProps) {
  const { palette } = useTheme();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = song.audio;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    return () => {
      audio.pause();
    };
  }, [song]);

  const handleEnded = useCallback(() => {
    if (repeat) {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    } else if (shuffle && onShuffle) {
      onShuffle();
    } else if (onNext) {
      onNext();
    } else {
      setIsPlaying(false);
    }
  }, [repeat, shuffle, onShuffle, onNext]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <audio ref={audioRef} />

      {/* Progress bar */}
      <div
        className="w-full h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
        onClick={handleSeek}
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className={`h-full ${palette.accentBg} rounded-full transition-all duration-200`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Timestamps */}
      <div className="flex justify-between w-full text-xs text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShuffle(!shuffle)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            shuffle
              ? `${palette.accentText} ${palette.accentLight}`
              : "text-gray-400 hover:bg-gray-100"
          }`}
          aria-label={shuffle ? "Shuffle on" : "Shuffle off"}
          aria-pressed={shuffle}
        >
          <Shuffle className="w-5 h-5" />
        </button>

        <button
          onClick={onPrevious}
          className="w-12 h-12 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Previous song"
          disabled={!onPrevious}
        >
          <SkipBack className="w-6 h-6" />
        </button>

        <button
          onClick={togglePlay}
          className={`w-16 h-16 flex items-center justify-center rounded-full ${palette.accentBg} ${palette.accentBgHover} text-white transition-colors active:scale-95`}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7" fill="currentColor" />
          ) : (
            <Play className="w-7 h-7 ml-1" fill="currentColor" />
          )}
        </button>

        <button
          onClick={onNext}
          className="w-12 h-12 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
          aria-label="Next song"
          disabled={!onNext}
        >
          <SkipForward className="w-6 h-6" />
        </button>

        <button
          onClick={() => setRepeat(!repeat)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
            repeat
              ? `${palette.accentText} ${palette.accentLight}`
              : "text-gray-400 hover:bg-gray-100"
          }`}
          aria-label={repeat ? "Repeat on" : "Repeat off"}
          aria-pressed={repeat}
        >
          <Repeat className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
