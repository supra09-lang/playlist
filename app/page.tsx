import { loadAllSongs } from "@/lib/songs";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const songs = loadAllSongs();
  return <HomeContent songs={songs} />;
}
