import fs from "fs";
import path from "path";

export interface SongMetadata {
  id: string;
  title: string;
  slug: string;
  category: string;
  ageRange: string;
  duration: number;
  language: string;
  themeColor: string;
  image: string;
  thumbnail: string;
  audio: string;
  lyrics: string;
  tags: string[];
  favorite: boolean;
  playCount: number;
  credit?: string;
}

export interface Song {
  id: string;
  title: string;
  slug: string;
  category: string;
  ageRange: string;
  duration: number;
  language: string;
  themeColor: string;
  image: string;
  thumbnail: string;
  audio: string;
  lyrics: string;
  tags: string[];
  favorite: boolean;
  playCount: number;
  credit?: string;
}

/**
 * Scans public/songs/ at build time and returns all song data.
 * Each song folder must contain a metadata.json.
 * Asset paths are resolved relative to /songs/{slug}/.
 */
export function loadAllSongs(): Song[] {
  const songsDir = path.join(process.cwd(), "public", "songs");

  if (!fs.existsSync(songsDir)) {
    return [];
  }

  const folders = fs.readdirSync(songsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const songs: (Song & { _addedAt: number })[] = [];

  for (const folder of folders) {
    const metadataPath = path.join(songsDir, folder, "metadata.json");

    if (!fs.existsSync(metadataPath)) {
      continue;
    }

    const raw = fs.readFileSync(metadataPath, "utf-8");
    const metadata: SongMetadata = JSON.parse(raw);
    const stat = fs.statSync(metadataPath);

    // Resolve asset paths to be web-accessible
    const basePath = `/songs/${folder}`;

    songs.push({
      ...metadata,
      image: `${basePath}/${metadata.image}`,
      thumbnail: `${basePath}/${metadata.thumbnail}`,
      audio: `${basePath}/${metadata.audio}`,
      lyrics: `${basePath}/${metadata.lyrics}`,
      _addedAt: stat.mtimeMs,
    });
  }

  // Sort by newest added first
  songs.sort((a, b) => b._addedAt - a._addedAt);

  return songs;
}

/**
 * Load a single song by slug.
 */
export function loadSong(slug: string): Song | null {
  const songDir = path.join(process.cwd(), "public", "songs", slug);
  const metadataPath = path.join(songDir, "metadata.json");

  if (!fs.existsSync(metadataPath)) {
    return null;
  }

  const raw = fs.readFileSync(metadataPath, "utf-8");
  const metadata: SongMetadata = JSON.parse(raw);
  const basePath = `/songs/${slug}`;

  return {
    ...metadata,
    image: `${basePath}/${metadata.image}`,
    thumbnail: `${basePath}/${metadata.thumbnail}`,
    audio: `${basePath}/${metadata.audio}`,
    lyrics: `${basePath}/${metadata.lyrics}`,
  };
}

/**
 * Load lyrics content for a song.
 */
export function loadLyrics(slug: string): string {
  const lyricsPath = path.join(process.cwd(), "public", "songs", slug, "lyrics.md");

  if (!fs.existsSync(lyricsPath)) {
    return "";
  }

  return fs.readFileSync(lyricsPath, "utf-8");
}
