"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * Instagram post interface
 */
interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

/**
 * Dummy Unsplash images for photography portfolio
 * These will be replaced with actual Instagram posts once credentials are available
 * Using high-quality photography images from Unsplash
 */
const dummyImages: InstagramPost[] = [
  {
    id: "1",
    media_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop&auto=format",
    permalink: siteConfig.links.instagram,
    caption: "Wedding Photography",
    timestamp: new Date().toISOString(),
    media_type: "IMAGE",
  },
  {
    id: "2",
    media_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop&auto=format",
    permalink: siteConfig.links.instagram,
    caption: "Portrait Session",
    timestamp: new Date().toISOString(),
    media_type: "IMAGE",
  },
  {
    id: "3",
    media_url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop&auto=format",
    permalink: siteConfig.links.instagram,
    caption: "Event Photography",
    timestamp: new Date().toISOString(),
    media_type: "IMAGE",
  },
  {
    id: "4",
    media_url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop&auto=format&q=80",
    permalink: siteConfig.links.instagram,
    caption: "Commercial Photography",
    timestamp: new Date().toISOString(),
    media_type: "IMAGE",
  },
  {
    id: "5",
    media_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop&auto=format&q=80",
    permalink: siteConfig.links.instagram,
    caption: "Lifestyle Photography",
    timestamp: new Date().toISOString(),
    media_type: "IMAGE",
  },
  {
    id: "6",
    media_url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=400&fit=crop&auto=format&q=80",
    permalink: siteConfig.links.instagram,
    caption: "Fine Art Photography",
    timestamp: new Date().toISOString(),
    media_type: "IMAGE",
  },
];

/**
 * Instagram feed component
 * Displays latest Instagram images in a grid
 * Uses Unsplash placeholder images until Instagram credentials are configured
 */
export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useDummyImages, setUseDummyImages] = useState(false);

  useEffect(() => {
    /**
     * Fetch Instagram posts from API
     * Falls back to dummy images if API fails or credentials are not configured
     */
    async function fetchInstagramPosts() {
      try {
        setIsLoading(true);

        const response = await fetch("/api/instagram");
        const data = await response.json();

        // If API returns posts, use them
        if (response.ok && data.posts && data.posts.length > 0) {
          setPosts(data.posts.slice(0, 6));
          setUseDummyImages(false);
        } else {
          // Use dummy images if no posts or credentials not configured
          setPosts(dummyImages);
          setUseDummyImages(true);
        }
      } catch (err) {
        console.error("Error fetching Instagram posts:", err);
        // Use dummy images on error
        setPosts(dummyImages);
        setUseDummyImages(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInstagramPosts();

    // Refresh every 5 minutes (only if using real Instagram API)
    const interval = setInterval(() => {
      if (!useDummyImages) {
        fetchInstagramPosts();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [useDummyImages]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded bg-accent/10"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative aspect-square overflow-hidden rounded transition-transform duration-300",
              "hover:scale-105 hover:shadow-lg"
            )}
          >
            <Image
              src={post.media_url}
              alt={post.caption || "Instagram post"}
              fill
              sizes="(max-width: 768px) 33vw, 150px"
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {post.media_type === "VIDEO" && (
              <div className="absolute top-2 right-2">
                <svg
                  className="h-4 w-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
            )}
          </Link>
        ))}
      </div>
      <Link
        href={siteConfig.links.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center space-x-2 text-sm text-accent/70 transition-colors hover:text-primary"
      >
        <span>Follow us on Instagram</span>
        <FaInstagram className="h-4 w-4" />
      </Link>
    </div>
  );
}

