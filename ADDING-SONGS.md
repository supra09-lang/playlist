# Adding a New Song

## Quick Summary

1. Create a folder
2. Add 5 files
3. Restart / rebuild
4. Done — no code changes needed

---

## Step by Step

### 1. Create the folder

```
public/songs/your-song-name/
```

Use lowercase, hyphens for spaces. Examples:
- `twinkle-twinkle`
- `five-little-ducks`
- `old-macdonald`

---

### 2. Add the files

Your folder needs these 5 files:

```
public/songs/your-song-name/
├── metadata.json
├── artwork.svg (or .webp / .jpg / .png)
├── thumbnail.svg (or .webp / .jpg / .png)
├── audio.mp3
└── lyrics.md
```

Optional:
```
├── cover-color.json
```

---

### 3. Create metadata.json

Copy this template and fill it in:

```json
{
  "id": "your-song-name",
  "title": "Your Song Name",
  "slug": "your-song-name",
  "category": "Animals",
  "ageRange": "1-4",
  "duration": 60,
  "language": "English",
  "themeColor": "#7C4DFF",
  "image": "artwork.svg",
  "thumbnail": "thumbnail.svg",
  "audio": "audio.mp3",
  "lyrics": "lyrics.md",
  "tags": ["tag1", "tag2", "nursery rhyme"],
  "favorite": false,
  "playCount": 0
}
```

**Fields to change:**

| Field | What to put |
|-------|-------------|
| `id` | Same as folder name |
| `title` | Display name (e.g. "Five Little Ducks") |
| `slug` | Same as folder name |
| `category` | Animals, Learning, Transport, Bedtime, Action, etc. |
| `duration` | Song length in seconds |
| `themeColor` | A hex color that represents the song |
| `tags` | Searchable keywords |

**Fields that stay the same:** `image`, `thumbnail`, `audio`, `lyrics` (always use these exact filenames)

---

### 4. Create lyrics.md

Plain text, one line per lyric line:

```
Twinkle, twinkle, little star,
How I wonder what you are.
Up above the world so high,
Like a diamond in the sky.
```

No special formatting needed.

---

### 5. Add artwork

**artwork.svg** — The main illustration shown on the player screen.
- Should be calming, toddler-friendly colors
- Square aspect ratio works best (400x400)
- Can be SVG, WEBP, JPG, or PNG

**thumbnail.svg** — Small version for song cards on the home screen.
- Simplified version of the artwork
- 100x100 is fine

> If using a different format, update `"image"` and `"thumbnail"` in metadata.json to match (e.g. `"artwork.webp"`)

---

### 6. Add audio

**audio.mp3** — The nursery rhyme recording.

Sources:
- [Pixabay Music](https://pixabay.com/music/) — Free, no attribution required
- [Singing-bell.com](https://www.singing-bell.com/) — Free for personal use with attribution
- Record your own

---

### 7. (Optional) Create cover-color.json

Colors that match the artwork, for future use:

```json
{
  "primary": "#7C4DFF",
  "secondary": "#B388FF",
  "background": "#F3E5F5",
  "text": "#1A202C"
}
```

---

### 8. Restart

In development:
```
# Just refresh the browser (hot reload picks it up)
# Or restart: npm run dev
```

For production:
```
npm run build
# Then deploy
```

---

## Example: Adding "Twinkle Twinkle"

```bash
mkdir public/songs/twinkle-twinkle
```

Create `public/songs/twinkle-twinkle/metadata.json`:
```json
{
  "id": "twinkle-twinkle",
  "title": "Twinkle Twinkle Little Star",
  "slug": "twinkle-twinkle",
  "category": "Bedtime",
  "ageRange": "1-4",
  "duration": 45,
  "language": "English",
  "themeColor": "#FDD835",
  "image": "artwork.svg",
  "thumbnail": "thumbnail.svg",
  "audio": "audio.mp3",
  "lyrics": "lyrics.md",
  "tags": ["stars", "bedtime", "lullaby", "nursery rhyme"],
  "favorite": false,
  "playCount": 0
}
```

Drop in your artwork, thumbnail, audio, and lyrics. Done.

---

## Checklist

- [ ] Folder created in `public/songs/`
- [ ] `metadata.json` filled in
- [ ] `artwork.svg` (or other image format) added
- [ ] `thumbnail.svg` added
- [ ] `audio.mp3` added
- [ ] `lyrics.md` written
- [ ] Tested in browser

---

## Categories in use

- Animals
- Learning
- Transport
- Bedtime
- Action
- Seasonal

---

## Audio licensing notes

- **Pixabay**: Free for any use, no attribution needed
- **Singing-bell.com**: Free for personal/non-commercial. $45/track for app use.
- **Super Simple Songs / Noodle & Pals**: Copyrighted (Warner Music). Cannot use.
- The underlying compositions (ABC, Bingo, etc.) are public domain — only specific recordings are copyrighted.
