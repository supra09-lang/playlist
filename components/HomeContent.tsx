"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Music } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import SongCarousel from "@/components/SongCarousel";
import PaletteButton from "@/components/PaletteButton";
import { useTheme } from "@/lib/ThemeContext";
import { getPlayCounts, incrementPlayCount, getRecentlyPlayedIds } from "@/lib/storage";
import type { Song } from "@/lib/songs";

type FilterTab = "recent" | "new" | "all";

interface HomeContentProps {
  songs: Song[];
}

export default function HomeContent({ songs }: HomeContentProps) {
  const router = useRouter();
  const { palette } = useTheme();
  const [query, setQuery] = useState("");
  const [playCounts, setPlayCounts] = useState<Record<string, number>>({});
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<FilterTab>("recent");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPlayCounts(getPlayCounts());
    setRecentIds(getRecentlyPlayedIds());
  }, []);

  const handleTabChange = (tab: FilterTab) => {
    setIsLoading(true);
    setActiveTab(tab);
    setTimeout(() => setIsLoading(false), 900);
  };

  const handlePlay = (song: Song) => {
    const newCount = incrementPlayCount(song.id);
    setPlayCounts((prev) => ({ ...prev, [song.id]: newCount }));
    setRecentIds(getRecentlyPlayedIds());
    router.push(`/player?id=${song.id}`);
  };

  // Filter by search
  const searchFiltered = useMemo(() => {
    if (!query) return songs;
    return songs.filter((song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );
  }, [songs, query]);

  // Sort by tab
  const displaySongs = useMemo(() => {
    if (query) return searchFiltered;

    if (activeTab === "recent") {
      const played = recentIds
        .map((id) => searchFiltered.find((s) => s.id === id))
        .filter(Boolean) as Song[];
      const unplayed = searchFiltered.filter((s) => !recentIds.includes(s.id));
      return [...played, ...unplayed];
    }

    if (activeTab === "new") {
      return [...searchFiltered].slice(0, 3);
    }

    // "all"
    return [...searchFiltered];
  }, [searchFiltered, activeTab, recentIds, query]);

  return (
    <div className="min-h-full pb-20">
      {/* Hero section */}
      <div className="max-w-2xl mx-auto px-4 pt-36 pb-20 flex flex-col items-center">
        {/* Header row */}
        <div className="w-full flex items-center justify-between mb-8 fixed top-0 left-0 right-0 px-4 pt-4 pb-2 z-50">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${palette.accentBg} flex items-center justify-center`}>
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800">Ibhaan&apos;s playlist</span>
          </div>
          <PaletteButton />
        </div>

        {/* Large centered search */}
        <div className="w-full sticky top-14 z-40">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </div>

      {/* Filter tabs */}
      {!query && (
        <div className="max-w-2xl mx-auto px-4 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("recent")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "recent"
                  ? `${palette.accentBg} text-white`
                  : "bg-white/60 text-gray-600 hover:bg-white/80"
              }`}
            >
              Recently Played
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "new"
                  ? `${palette.accentBg} text-white`
                  : "bg-white/60 text-gray-600 hover:bg-white/80"
              }`}
            >
              New Songs
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? `${palette.accentBg} text-white`
                  : "bg-white/60 text-gray-600 hover:bg-white/80"
              }`}
            >
              All Songs
            </button>
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="max-w-2xl mx-auto px-4">
        <SongCarousel
          songs={displaySongs}
          playCounts={playCounts}
          onPlay={handlePlay}
        />
      </div>

      {/* Empty state for search */}
      {query && displaySongs.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No songs found</p>
      )}
    </div>
  );
}
