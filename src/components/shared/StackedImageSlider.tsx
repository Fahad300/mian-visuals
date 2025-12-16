'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export interface SliderImage {
  src: string
  alt: string
  title: string
}

interface StackedImageSliderProps {
  images: SliderImage[]
  autoScrollInterval?: number
  className?: string
}

export function StackedImageSlider({
  images,
  autoScrollInterval = 4000,
  className = ""
}: StackedImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-scroll images
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, autoScrollInterval)

    return () => clearInterval(interval)
  }, [images.length, autoScrollInterval])

  if (!images || images.length === 0) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="relative w-full max-w-xs sm:max-w-md h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center">
          <p className="text-gray-500 text-sm sm:text-base">No images available</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="relative w-full max-w-xs sm:max-w-md h-[300px] sm:h-[400px] md:h-[500px]">
        {/* Stack of Images with Auto-Scroll */}
        <div className="relative w-full h-full">
          {images.map((image, index) => {
            const isActive = index === currentImageIndex
            const isNext = index === (currentImageIndex + 1) % images.length
            const isPrev = index === (currentImageIndex - 1 + images.length) % images.length

            let zIndex = 1
            let opacity = 0.4
            let shadow = 'shadow-lg'

            if (isActive) {
              zIndex = 30
              opacity = 1
              shadow = 'shadow-2xl'
            } else if (isNext) {
              zIndex = 20
              opacity = 0.8
              shadow = 'shadow-xl'
            } else if (isPrev) {
              zIndex = 10
              opacity = 0.6
              shadow = 'shadow-lg'
            }

            return (
              <AnimatePresence key={image.src}>
                <motion.div
                  className="absolute inset-0 transform transition-all duration-700 ease-in-out"
                  style={{ zIndex }}
                  initial={{ opacity: 0, scale: 0.8, rotate: 12 }}
                  animate={{
                    opacity,
                    scale: isActive ? 1 : isPrev ? 0.95 : 0.98,
                    rotate: isActive ? 1 : isPrev ? 6 : -3
                  }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -12 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.5 }
                  }}
                  whileHover={isActive ? { scale: 1.05, rotate: 0 } : {}}
                >
                  <div className={`relative w-full h-full rounded-3xl overflow-hidden ${shadow} border border-muted ${isActive ? '' : 'bg-gradient-to-br from-primary/20 to-secondary/20'
                    }`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500"
                      priority={isActive}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={true}
                    />

                    {/* Overlay with subtle gradient - only on active image */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )
          })}

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-primary/80 rounded-full shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-6 -left-6 w-6 h-6 bg-secondary/60 rounded-full shadow-md"
            animate={{
              y: [0, -10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/4 -left-8 w-4 h-4 bg-primary/40 rounded-full shadow-sm"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>
    </div>
  )
}
