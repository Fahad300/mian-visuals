"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Loading spinner size types
 */
type SpinnerSize = "small" | "medium" | "large";

/**
 * LoadingSpinner component props interface
 */
export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default "medium"
   */
  size?: SpinnerSize;

  /**
   * Color of the spinner (hex, rgb, or Tailwind color class)
   * @default "primary" (gold color)
   */
  color?: string;

  /**
   * Center the spinner in its container
   * @default false
   */
  centered?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Accessibility label
   * @default "Loading"
   */
  "aria-label"?: string;
}

/**
 * Elegant loading spinner component with smooth Framer Motion animation
 * Minimal design matching Mian Visuals aesthetic
 */
export function LoadingSpinner({
  size = "medium",
  color = "primary",
  centered = false,
  className,
  "aria-label": ariaLabel = "Loading",
}: LoadingSpinnerProps) {
  /**
   * Size configurations
   */
  const sizes: Record<SpinnerSize, { container: string; stroke: string }> = {
    small: {
      container: "h-4 w-4",
      stroke: "2",
    },
    medium: {
      container: "h-8 w-8",
      stroke: "2.5",
    },
    large: {
      container: "h-12 w-12",
      stroke: "3",
    },
  };

  /**
   * Get color class - supports Tailwind classes or custom colors
   */
  const getColorClass = () => {
    // If it's a Tailwind color class (like "primary", "secondary"), use it
    if (color === "primary" || color === "secondary" || color === "accent") {
      return `text-${color}`;
    }
    // Otherwise, it's a custom color value
    return "";
  };

  /**
   * Get inline style for custom colors
   */
  const getColorStyle = () => {
    if (color === "primary" || color === "secondary" || color === "accent") {
      return {};
    }
    return { color };
  };

  const sizeConfig = sizes[size] || sizes.medium;
  const colorClass = getColorClass();
  const colorStyle = getColorStyle();

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        centered && "w-full h-full",
        className
      )}
      role="status"
      aria-label={ariaLabel}
    >
      <motion.svg
        className={cn(sizeConfig.container, colorClass)}
        style={colorStyle}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={sizeConfig.stroke}
        />
        <motion.path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
      <span className="sr-only">{ariaLabel}...</span>
    </div>
  );
}
