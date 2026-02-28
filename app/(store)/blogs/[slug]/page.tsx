"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  video: string;
  poster?: string;
};

const POSTS: BlogPost[] = [
  {
    slug: "workday-flow",
    title: "Workday Flow: The White Shirt, Perfected",
    excerpt: "Style your white shirt effortlessly.",
    category: "Workwear",
    date: "JANUARY 29, 2026",
    video: "/blog/post-1.mp4",
    poster: "/blog/post-1.jpg",
  },
  {
    slug: "new-arrivals",
    title: "New Arrivals: February Drop Highlights",
    excerpt: "Textures, tones and silhouettes we love.",
    category: "New Arrivals",
    date: "FEBRUARY 20, 2026",
    video: "/blog/post-2.mp4",
    poster: "/blog/post-2.jpg",
  },
  {
    slug: "evening-wear",
    title: "Evening Wear: 5 Looks That Always Work",
    excerpt: "Perfect combinations for events.",
    category: "Evening Wear",
    date: "FEBRUARY 10, 2026",
    video: "/blog/post-3.mp4",
    poster: "/blog/post-3.jpg",
  },
  {
    slug: "style-guide",
    title: "Minimal Style Guide 2026",
    excerpt: "Neutral tones and timeless silhouettes.",
    category: "Style",
    date: "FEBRUARY 05, 2026",
    video: "/blog/post-4.mp4",
    poster: "/blog/post-4.jpg",
  },
];

export default function BlogSlugPage() {
  const params = useParams();
  const slug = String(params?.slug || "");

  const post = POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-2xl font-semibold">Post not found</h1>
        <p className="text-gray-600 mt-2">
          The blog article you requested does not exist.
        </p>
        <Link
          href="/blogs"
          className="inline-flex mt-6 rounded-full bg-black text-white px-6 py-3 text-sm font-medium"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link href="/blogs" className="text-sm text-gray-600 hover:text-black">
            ← Back
          </Link>

          <div className="text-xs text-gray-500">
            {post.category} • {post.date}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {post.title}
        </h1>
        <p className="text-gray-700 mt-3 max-w-3xl">{post.excerpt}</p>

        {/* Video full width */}
        <div className="mt-10 rounded-3xl overflow-hidden border bg-gray-100">
          <div className="relative aspect-[16/9]">
            <video
              src={post.video}
              poster={post.poster}
              controls
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Dummy content (replace later) */}
        <div className="prose max-w-none mt-10">
          <p>
            Add your blog content here later (text, images, styling tips, product links, etc.).
          </p>
          <p>
            This page is now working for every slug like: <b>/blogs/workday-flow</b>
          </p>
        </div>
      </div>
    </div>
  );
}