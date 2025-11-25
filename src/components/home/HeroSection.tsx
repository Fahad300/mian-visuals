"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

/**
 * Hero Section component props interface
 */
interface HeroSectionProps {
  /**
   * Background video/image source
   * @default "/images/hero/hero-video.mp4" or fallback image
   */
  backgroundVideo?: string;

  /**
   * Fallback background image if video is not available
   * @default "/images/hero/hero-image.jpg"
   */
  backgroundImage?: string;

  /**
   * Main headline text
   * @default "Capturing Moments, Creating Memories"
   */
  headline?: string;

  /**
   * Subheadline text
   * @default "Professional Photography for Weddings & Events"
   */
  subheadline?: string;

  /**
   * Enable parallax effect
   * @default true
   */
  enableParallax?: boolean;

  /**
   * Additional CSS classes to apply to the section
   */
  className?: string;
}

/**
 * Stunning Hero Section component with video background, parallax, and animations
 * Full-screen hero section for Mian Visuals photography portfolio
 */
export function HeroSection({
  backgroundVideo = "/images/hero/hero-video.mp4",
  backgroundImage = "/images/hero/hero.jpg",
  headline = "Capturing Moments, Creating Memories",
  subheadline = "Professional Photography for Weddings & Events",
  enableParallax = true,
  className,
}: HeroSectionProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [useVideo, setUseVideo] = useState(!!backgroundVideo);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /**
   * Parallax transform for background video/image
   * Reduced movement to prevent white background from showing
   */
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? ["0%", "30%"] : ["0%", "0%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /**
   * Handle smooth scroll to portfolio section
   */
  const handleScrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      const headerHeight = 80;
      const elementPosition = portfolioSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      // Fallback: navigate to portfolio page
      window.location.href = "/portfolio";
    }
  };

  /**
   * Handle video load error - fallback to image
   */
  const handleVideoError = () => {
    setUseVideo(false);
    setIsVideoLoaded(true);
    setImageLoaded(true);
  };

  /**
   * Handle video loaded
   */
  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  /**
   * Handle image loaded
   */
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  /**
   * Animation variants for text elements
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden bg-dark",
        className
      )}
    >
      {/* Background Video/Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
      >
        {/* Background Image - Always shown as base/fallback */}
        <div className="relative h-[120%] w-full -top-[10%]">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
            onLoad={handleImageLoad}
          />
        </div>

        {/* Video - Overlays image if available and loaded */}
        {useVideo && backgroundVideo && isVideoLoaded && (
          <div className="absolute inset-0 -top-[10%] h-[120%] w-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Video Loading - Try to load video if provided */}
        {useVideo && backgroundVideo && !isVideoLoaded && (
          <div className="absolute inset-0 -top-[10%] h-[120%] w-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
              style={{ opacity: 0 }}
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        )}

        {/* Dark Overlay (40% opacity) */}
        <div className="absolute inset-0 bg-dark/40" />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark/60" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-4xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-lg text-white/90 drop-shadow-md sm:text-xl md:text-2xl"
          >
            {subheadline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          >
            <Button
              variant="primary"
              size="large"
              onClick={handleScrollToPortfolio}
              className="min-w-[180px] shadow-xl"
            >
              View Portfolio
            </Button>
            <Link href="/booking">
              <Button
                variant="secondary"
                size="large"
                className="min-w-[180px] shadow-xl"
              >
                Book Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center space-y-2 text-white/80"
        >
          <span className="text-sm font-medium uppercase tracking-wider">
            Scroll
          </span>
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

