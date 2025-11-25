"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga4";

/**
 * Google Analytics component
 * Initializes GA4 and tracks page views
 */
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!measurementId) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Google Analytics Measurement ID is not configured");
      }
      return;
    }

    // Initialize GA4
    ReactGA.initialize(measurementId, {
      testMode: process.env.NODE_ENV === "development",
    });
  }, []);

  useEffect(() => {
    const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (!measurementId) {
      return;
    }

    // Track page view
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    ReactGA.send({ hitType: "pageview", page: url });
  }, [pathname, searchParams]);

  return null;
}

