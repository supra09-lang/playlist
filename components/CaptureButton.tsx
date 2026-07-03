"use client";

import { useRef } from "react";
import { Camera } from "lucide-react";
import { saveCapture } from "@/lib/storage";

interface CaptureButtonProps {
  songId: string;
  onCapture?: (imageUrl: string) => void;
}

export default function CaptureButton({ songId, onCapture }: CaptureButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    saveCapture(songId, imageUrl);
    onCapture?.(imageUrl);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white transition-all active:scale-[0.97] min-h-[56px] w-full justify-center"
        aria-label="Capture a moment"
      >
        <Camera className="w-5 h-5 text-purple-500" />
        <span className="font-medium text-lg">Capture Moment</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />
    </>
  );
}
