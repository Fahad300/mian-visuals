"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

/**
 * Wedding image interface
 */
interface WeddingImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * Featured Weddings Gallery Props
 */
interface FeaturedWeddingsGalleryProps {
  /**
   * Array of wedding images to display
   */
  images: WeddingImage[];
  /**
   * Auto-scroll interval in milliseconds
   * @default 5000
   */
  autoScrollInterval?: number;
}

/**
 * Featured Weddings Gallery Component
 * Simple 2-row gallery with horizontal scrolling, edge to edge
 */
export function FeaturedWeddingsGallery({
  images,
  autoScrollInterval = 5000,
}: FeaturedWeddingsGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Split images into two rows
  const row1Images = images.filter((_, index) => index % 2 === 0);
  const row2Images = images.filter((_, index) => index % 2 === 1).reverse(); // Reverse for opposite direction

  // Duplicate for seamless infinite loop
  const row1Duplicated = [...row1Images, ...row1Images, ...row1Images];
  const row2Duplicated = [...row2Images, ...row2Images, ...row2Images];

  // Width variations (same height for all)
  const widths = [
    "w-[280px] md:w-[400px]",
    "w-[320px] md:w-[450px]",
    "w-[300px] md:w-[420px]",
    "w-[350px] md:w-[480px]",
  ];

  // Auto-scroll Row 1 - moves left
  useEffect(() => {
    if (!row1Ref.current || row1Images.length === 0) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.15;
    let animationId: number;

    const animate = () => {
      if (row1Ref.current) {
        scrollPosition += scrollSpeed;
        const scrollWidth = row1Ref.current.scrollWidth / 3;

        if (scrollPosition >= scrollWidth) {
          scrollPosition = 0;
        }

        row1Ref.current.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [row1Images.length]);

  // Auto-scroll Row 2 - moves right (opposite direction)
  useEffect(() => {
    if (!row2Ref.current || row2Images.length === 0) return;

    const scrollWidth = row2Ref.current.scrollWidth / 3;
    let scrollPosition = scrollWidth; // Start from middle
    const scrollSpeed = -0.15; // NEGATIVE for opposite direction
    let animationId: number;

    const animate = () => {
      if (row2Ref.current) {
        scrollPosition += scrollSpeed; // Adding negative value = moving right

        // Reset when reaching start
        if (scrollPosition <= 0) {
          scrollPosition = scrollWidth;
        }

        row2Ref.current.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [row2Images.length]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxSlides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    width: img.width,
    height: img.height,
  }));

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="w-full">
        {/* Row 1 - Edge to edge, moves left */}
        <div
          ref={row1Ref}
          className="flex overflow-x-hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 min-w-max">
            {row1Duplicated.map((image, idx) => {
              const globalIdx = (idx % row1Images.length) * 2;
              return (
                <div
                  key={`r1-${idx}`}
                  className={`relative group cursor-pointer flex-shrink-0 ${widths[idx % 4]} h-[300px] md:h-[400px]`}
                  onClick={() => handleImageClick(globalIdx)}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 350px, 480px"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 - Edge to edge, moves RIGHT (opposite direction) */}
        <div
          ref={row2Ref}
          className="flex overflow-x-hidden mt-[1rem]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 min-w-max">
            {row2Duplicated.map((image, idx) => {
              const originalRow2Idx = row2Images.length - 1 - (idx % row2Images.length);
              const globalIdx = (originalRow2Idx * 2) + 1;
              return (
                <div
                  key={`r2-${idx}`}
                  className={`relative group cursor-pointer flex-shrink-0 ${widths[idx % 4]} h-[300px] md:h-[400px]`}
                  onClick={() => handleImageClick(globalIdx)}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 350px, 480px"
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </>
  );
}