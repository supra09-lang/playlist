import Link from "next/link";
import { X } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">About</h1>
        <Link
          href="/"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-gray-700" />
        </Link>
      </div>
    
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          This is a story about why I built this little app for my son, Ibhaan.
        </p>
        
        <p>
            Like many parents, music is a big part of our home. Nursery rhymes help start our mornings, calm difficult moments, and often become the soundtrack to everyday life.
        </p>

        <p>
            As my son grew more interested in choosing his own songs, I found myself looking for a simple app that he could use independently. Most of the options I tried were filled with bright animations, advertisements, tiny buttons, or endless distractions. I wanted something calmer that simply let him enjoy music.
        </p>

        <p>
            So I decided to build one. Using AI as my development partner, I created this little music player in just a few hours. It focuses on familiar nursery rhymes, simple controls, and AI-generated illustrations designed to make each song feel a little more magical.
        </p>

        <p>
            The biggest lesson came from watching my son use it. He tapped the artwork instead of the controls, accidentally triggered gestures while holding the phone, and interacted with the app in ways I hadn't anticipated. It reminded me that great design starts with observing real users, not assumptions.
        </p>

        <p>
            This is an ongoing passion project. I'll continue improving it based on what I learn from my son and, hopefully, from other families. 
        </p>

        <p>
          If you enjoy using it, I'd love to hear your feedback, ideas, or observations. Every insight helps make it a little better for tiny hands and curious minds. 
        </p>

        <p>
          Thanks for being part of the journey. 
        </p>
      </div>

      <Link
        href="/"
        className="inline-block mt-10 text-sm text-gray-400 hover:text-gray-600 transition-colors"
      >
        &larr; Back to playlist
      </Link>
    </div>
  );
}
