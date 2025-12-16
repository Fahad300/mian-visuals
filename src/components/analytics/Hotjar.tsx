"use client";

import { useEffect } from "react";
import hotjar from "@hotjar/browser";

/**
 * Hotjar tracking component
 * Initializes Hotjar for user behavior analytics
 */
export function Hotjar() {
  useEffect(() => {
    const siteId = process.env.NEXT_PUBLIC_HOTJAR_SITE_ID;
    const hotjarVersion = process.env.NEXT_PUBLIC_HOTJAR_VERSION || "6";

    if (!siteId) {
      console.warn("Hotjar Site ID is not configured");
      return;
    }

    // Initialize Hotjar
    hotjar.init(parseInt(siteId, 10), parseInt(hotjarVersion, 10));
  }, []);

  return null;
}

