import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">About</h1>

      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p>
          This is a story about why I built this little app for my son, Ibhaan.
        </p>

        <p>
          {/* Add your story here */}
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
