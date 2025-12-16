"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  backgroundImage?: string;
  headline?: string;
  subheadline?: string;
  enableParallax?: boolean;
  className?: string;
}

/**
 * Enhanced Hero Section with cinematic design and smooth animations
 * Features parallax scrolling, floating elements, and professional photography aesthetics
 */
export function HeroSection({
  backgroundImage = "/images/hero/hero.jpg",
  headline = "Capturing Moments, Creating Memories",
  subheadline = "Professional Photography for Weddings & Events",
  enableParallax = true,
  className,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring animation for parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax transforms
  const y = useTransform(smoothProgress, [0, 1], ["0%", enableParallax ? "50%" : "0%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);

  // Scroll to next section
  const handleScrollDown = () => {
    const nextSection = containerRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animated gradient overlay
  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)",
        "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 100%)",
        "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)",
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  // Text animation variants - optimized for instant loading
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reduced stagger for faster appearance
        delayChildren: 0, // Removed delay for instant start
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 }, // Reduced movement for faster animation
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Faster animation
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Floating particles animation
  const floatingVariants = {
    animate: (custom: number) => ({
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 6 + custom,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: custom * 0.5,
      },
    }),
  };

  // Subtle zoom animation for video-like effect
  const zoomVariants = {
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-dark",
        className
      )}
    >
      {/* Background Image with Parallax and Zoom Effect */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <motion.div
          className="absolute inset-0"
          variants={zoomVariants}
          animate="animate"
        >
          <Image
            src={backgroundImage}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85} // Reduced for faster loading
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </motion.div>
      </motion.div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        variants={gradientVariants}
        animate="animate"
      />

      {/* Additional Gradient for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark/70" />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-3 w-3 rounded-full bg-primary/60 shadow-lg shadow-primary/30"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            custom={i}
            variants={floatingVariants}
            animate="animate"
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Decorative Line Above Headline */}
          <motion.div
            variants={itemVariants}
            className="mx-auto flex w-32 items-center justify-center space-x-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/50" />
            <div className="h-2 w-2 rotate-45 bg-primary" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/50" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="space-y-2">
            <span className="block font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wider text-white/90 px-4">
            {headline}
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide px-4">{subheadline}</motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:gap-6">
            <Button
              variant="primary"
              size="medium"
              onClick={() => {
                const quoteForm = document.getElementById("quote-form");
                if (quoteForm) {
                  quoteForm.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="text-white backdrop-blur-sm hover:border-primary"
            >
              Let&apos;s Create Your Story
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }} // Faster appearance
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/70 transition-colors hover:text-primary"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-xs font-light uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>

      {/* Bottom Fade Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
    </section>
  );
}