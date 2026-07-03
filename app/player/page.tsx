import { Suspense } from "react";
import { loadAllSongs } from "@/lib/songs";
import PlayerContent from "@/components/PlayerContent";

export default function PlayerPage() {
  const songs = loadAllSongs();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      }
    >
      <PlayerContent songs={songs} />
    </Suspense>
  );
}
