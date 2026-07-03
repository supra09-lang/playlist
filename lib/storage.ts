const PLAY_COUNT_KEY = "moments_play_counts";
const CAPTURES_KEY = "moments_captures";
const LAST_PLAYED_KEY = "moments_last_played";

export interface CapturedMoment {
  id: string;
  songId: string;
  imageUrl: string;
  timestamp: number;
}

export function getPlayCounts(): Record<string, number> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(PLAY_COUNT_KEY);
  return data ? JSON.parse(data) : {};
}

export function incrementPlayCount(songId: string): number {
  const counts = getPlayCounts();
  counts[songId] = (counts[songId] || 0) + 1;
  localStorage.setItem(PLAY_COUNT_KEY, JSON.stringify(counts));
  // Also update last played timestamp
  recordLastPlayed(songId);
  return counts[songId];
}

export function getPlayCount(songId: string): number {
  const counts = getPlayCounts();
  return counts[songId] || 0;
}

export function recordLastPlayed(songId: string): void {
  if (typeof window === "undefined") return;
  const data = getLastPlayedMap();
  data[songId] = Date.now();
  localStorage.setItem(LAST_PLAYED_KEY, JSON.stringify(data));
}

export function getLastPlayedMap(): Record<string, number> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(LAST_PLAYED_KEY);
  return data ? JSON.parse(data) : {};
}

export function getRecentlyPlayedIds(): string[] {
  const map = getLastPlayedMap();
  return Object.entries(map)
    .sort(([, a], [, b]) => b - a)
    .map(([id]) => id);
}

export function saveCapture(songId: string, imageUrl: string): CapturedMoment {
  const captures = getCaptures();
  const moment: CapturedMoment = {
    id: crypto.randomUUID(),
    songId,
    imageUrl,
    timestamp: Date.now(),
  };
  captures.push(moment);
  localStorage.setItem(CAPTURES_KEY, JSON.stringify(captures));
  return moment;
}

export function getCaptures(): CapturedMoment[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CAPTURES_KEY);
  return data ? JSON.parse(data) : [];
}

export function getCapturesForSong(songId: string): CapturedMoment[] {
  return getCaptures().filter((c) => c.songId === songId);
}
