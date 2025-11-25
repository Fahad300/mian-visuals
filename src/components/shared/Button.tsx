"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import "@/app/globals.css";
/**
 * Button variant types
 */
type ButtonVariant = "primary" | "secondary" | "ghost";

/**
 * Button size types
 */
type ButtonSize = "small" | "medium" | "large";

/**
 * Button component props interface
 */
export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "size" | "onDrag" | "onDragEnd" | "onDragStart"> {
  /**
   * Button variant style
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default "medium"
   */
  size?: ButtonSize;

  /**
   * Show loading spinner and disable button
   * @default false
   */
  loading?: boolean;

  /**
   * Make button full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Button content
   */
  children: React.ReactNode;
}

/**
 * Reusable Button component with variants, sizes, and loading states
 * Includes Framer Motion animations for smooth interactions
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      loading = false,
      fullWidth = false,
      disabled,
      className,
      children,
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    /**
     * Base styles for all buttons
     */
    const baseStyles =
      "relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed";

    /**
     * Variant styles
     */
    const variants: Record<ButtonVariant, string> = {
      primary:
        "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark focus-visible:ring-primary/20 shadow-md hover:shadow-lg transition-colors",
      secondary:
        "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary/20 transition-colors",
      ghost:
        "bg-transparent text-secondary hover:bg-light active:bg-light-dark focus-visible:ring-secondary/20 hover:text-primary transition-colors",
    };

    /**
     * Size styles
     */
    const sizes: Record<ButtonSize, string> = {
      small: "h-9 px-4 text-sm",
      medium: "h-11 px-6 text-base",
      large: "h-14 px-8 text-lg",
    };

    /**
     * Loading spinner component
     */
    const LoadingSpinner = () => (
      <svg
        className="h-5 w-5 animate-spin text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="mr-2">
            <LoadingSpinner />
          </span>
        )}
        <span className={cn(loading && "opacity-70")}>{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";
