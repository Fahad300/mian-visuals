import { NextResponse } from "next/server";

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
 * Instagram API response interface
 */
interface InstagramApiResponse {
  data: InstagramPost[];
  paging?: {
    cursors?: {
      before?: string;
      after?: string;
    };
    next?: string;
  };
}

/**
 * GET handler for fetching Instagram posts
 * Uses Instagram Graph API or Basic Display API
 * Returns empty array if credentials are missing or invalid (using demo images)
 */
export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    // If credentials are not configured, return empty array silently
    // Component will use demo images from Unsplash
    if (!accessToken || !userId) {
      return NextResponse.json(
        {
          posts: [],
        },
        { status: 200 }
      );
    }

    // Fetch posts from Instagram Graph API
    // Using Instagram Graph API v18+
    const apiUrl = `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink,caption,timestamp,media_type&access_token=${accessToken}&limit=12`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      // Silently return empty array if API fails
      // Component will use demo images from Unsplash
      return NextResponse.json(
        {
          posts: [],
        },
        { status: 200 }
      );
    }

    const data: InstagramApiResponse = await response.json();

    // Transform and return posts
    const posts: InstagramPost[] = (data.data || []).map((post) => ({
      id: post.id,
      media_url: post.media_url,
      permalink: post.permalink,
      caption: post.caption,
      timestamp: post.timestamp,
      media_type: post.media_type,
    }));

    return NextResponse.json(
      {
        posts,
        count: posts.length,
      },
      { status: 200 }
    );
  } catch (error) {
    // Silently return empty array on any error
    // Component will use demo images from Unsplash
    return NextResponse.json(
      {
        posts: [],
      },
      { status: 200 }
    );
  }
}

