'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

interface GalleryImage {
  src: string
  alt: string
}

interface HeroSwiperGalleryProps {
  images: GalleryImage[]
  variant?: 'default' | 'coverflow' | 'cards'
  onImageClick?: (index: number) => void
}

export default function HeroSwiperGallery({
  images,
  variant = 'default',
  onImageClick
}: HeroSwiperGalleryProps) {

  // Configuration based on variant
  const configs = {
    default: {
      slidesPerView: 'auto' as const,
      spaceBetween: 30,
      centeredSlides: false,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    },
    coverflow: {
      effect: 'coverflow' as const,
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto' as const,
      loop: true,
      speed: 800,
      coverflowEffect: {
        rotate: 15,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    },
    cards: {
      slidesPerView: 'auto' as const,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      speed: 1500,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    }
  }

  const config = configs[variant]

  /**
   * Handle image click
   */
  const handleImageClick = (index: number) => {
    if (onImageClick) {
      onImageClick(index)
    }
  }

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 md:py-20">

      {/* Curved top edge */}
      <div
        className="absolute top-0 left-0 right-0 h-32 bg-black z-10"
        style={{
          clipPath: 'ellipse(60% 100% at 50% 0%)'
        }}
      />

      {/* Curved bottom edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-black z-10"
        style={{
          clipPath: 'ellipse(60% 100% at 50% 100%)'
        }}
      />

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

      {/* Top decorative shapes */}
      <motion.div
        className="absolute top-8 right-12 w-32 h-32 opacity-10"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.9,-45.8C88,-32.6,91.2,-16.3,89.9,-0.7C88.6,14.9,82.8,29.8,74.4,43.2C66,56.6,55,68.5,41.7,76.1C28.4,83.7,14.2,87,-0.5,88C-15.2,89,-30.4,87.7,-43.3,80.4C-56.2,73.1,-66.8,59.8,-74.5,45.2C-82.2,30.6,-87,14.8,-86.9,-1C-86.8,-16.8,-81.8,-33.6,-73.3,-47.7C-64.8,-61.8,-52.8,-73.2,-38.9,-80.5C-25,-87.8,-9.2,-91,6.3,-100.3C21.8,-109.6,30.6,-83.6,44.7,-76.4Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-16 w-24 h-24 opacity-10"
        animate={{
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#ffffff"
            d="M39.5,-65.6C51.4,-58.2,61.4,-47.8,67.2,-35.5C73,-23.2,74.6,-9,74.1,5.1C73.6,19.2,71,33.2,63.7,44.7C56.4,56.2,44.4,65.2,31.2,70.5C18,75.8,3.6,77.4,-11.3,76.3C-26.2,75.2,-41.6,71.4,-54.3,62.8C-67,54.2,-77,40.8,-81.3,25.7C-85.6,10.6,-84.2,-6.2,-78.9,-21.1C-73.6,-36,-64.4,-49,-52.2,-56.7C-40,-64.4,-25.8,-66.8,-12.4,-67.2C1,-67.6,27.6,-73,39.5,-65.6Z"
            transform="translate(100 100)"
          />
        </svg>
      </motion.div>

      {/* Swiper Gallery */}
      <Swiper
        {...config}
        modules={[Autoplay, EffectCoverflow, Pagination]}
        className="hero-swiper-gallery"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!w-[280px] md:!w-[360px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer"
              onClick={() => handleImageClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleImageClick(index)
                }
              }}
              aria-label={`View ${image.alt}`}
            >
              {/* Image container */}
              <div className="relative h-[350px] md:h-[480px] rounded-xl overflow-hidden shadow-2xl bg-gray-900">
                {/* Border effect */}
                <div className="absolute inset-0 border-[6px] border-white/5 rounded-xl z-10 pointer-events-none" />

                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 280px, 360px"
                  priority={index < 3}
                  unoptimized={true}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity">
                  <svg viewBox="0 0 100 100" className="text-white">
                    <path d="M0,0 L50,0 L0,50 Z" fill="currentColor" />
                  </svg>
                </div>

                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-30 transition-opacity">
                  <svg viewBox="0 0 100 100" className="text-white">
                    <path d="M100,100 L50,100 L100,50 Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Hover effect - view icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                    <svg
                      className="w-8 h-8 text-gray-900"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Shadow beneath card */}
              <div className="absolute inset-0 -z-10 rounded-xl bg-black/50 blur-2xl transform translate-y-6 scale-95" />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  )
}