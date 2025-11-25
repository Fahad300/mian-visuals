import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.)
 * @returns Merged and deduplicated class string
 *
 * @example
 * cn("px-2 py-1", "px-4") // Returns "py-1 px-4" (px-2 is overridden by px-4)
 * cn("text-red", { "text-blue": true }) // Returns "text-blue"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format dates for display with various format options
 *
 * @param date - Date object, string, or number (timestamp)
 * @param options - Intl.DateTimeFormatOptions for custom formatting
 * @param locale - Locale string (default: "en-US")
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date()) // "12/25/2023"
 * formatDate(new Date(), { dateStyle: "full" }) // "Monday, December 25, 2023"
 * formatDate(new Date(), { month: "long", year: "numeric" }) // "December 2023"
 */
export function formatDate(
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "en-US"
): string {
  const dateObj = typeof date === "string" || typeof date === "number"
    ? new Date(date)
    : date;

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided");
  }

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

/**
 * Validate email address format using regex pattern
 *
 * @param email - Email address string to validate
 * @returns Boolean indicating if email is valid
 *
 * @example
 * validateEmail("user@example.com") // true
 * validateEmail("invalid-email") // false
 * validateEmail("test@domain") // false
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email.trim());
}

/**
 * Convert text to URL-friendly slug
 * Removes special characters, converts to lowercase, and replaces spaces with hyphens
 *
 * @param text - Text string to convert to slug
 * @param separator - Separator character (default: "-")
 * @returns URL-friendly slug string
 *
 * @example
 * generateSlug("Hello World!") // "hello-world"
 * generateSlug("Mian Visuals Photography") // "mian-visuals-photography"
 * generateSlug("Special@Characters#Here", "_") // "special_characters_here"
 */
export function generateSlug(text: string, separator: string = "-"): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  return text
    .toLowerCase()
    .trim()
    // Replace accented characters with their base equivalents
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Replace special characters and spaces with separator
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, separator)
    // Remove multiple consecutive separators
    .replace(new RegExp(`${separator}+`, "g"), separator)
    // Remove leading/trailing separators
    .replace(new RegExp(`^${separator}|${separator}$`, "g"), "");
}

/**
 * Truncate long text with ellipsis
 * Cuts text at specified length and appends ellipsis if truncated
 *
 * @param text - Text string to truncate
 * @param maxLength - Maximum length before truncation (default: 100)
 * @param ellipsis - Ellipsis string to append (default: "...")
 * @returns Truncated text string with ellipsis if needed
 *
 * @example
 * truncateText("This is a very long text", 10) // "This is a..."
 * truncateText("Short text", 20) // "Short text" (no truncation)
 * truncateText("Long text here", 8, "…") // "Long tex…"
 */
export function truncateText(
  text: string,
  maxLength: number = 100,
  ellipsis: string = "..."
): string {
  if (!text || typeof text !== "string") {
    return "";
  }

  if (text.length <= maxLength) {
    return text;
  }

  // Truncate at word boundary if possible
  const truncated = text.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");

  // If there's a space near the end, truncate at word boundary
  if (lastSpaceIndex > maxLength * 0.8) {
    return truncated.substring(0, lastSpaceIndex) + ellipsis;
  }

  return truncated + ellipsis;
}

