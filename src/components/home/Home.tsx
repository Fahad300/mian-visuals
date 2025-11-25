'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { HeroSection } from "./HeroSection";
import HeroSwiperGallery from './HeroSwiperGallery';
import { QuoteForm } from '@/components/contact/QuoteForm';
import { ContactForm } from '@/components/contact/ContactForm';
import { Section } from '@/components/shared/Section';

/**
 * Gallery images for the tilted gallery
 */
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&auto=format&q=90",
    alt: "Wedding Photography",
    width: 800,
    height: 1200,
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop&auto=format&q=90",
    alt: "Portrait Session",
    width: 800,
    height: 1200,
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop&auto=format&q=90",
    alt: "Event Photography",
    width: 800,
    height: 1200,
  },
  {
    src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1200&fit=crop&auto=format&q=90",
    alt: "Commercial Photography",
    width: 800,
    height: 1200,
  },
  {
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop&auto=format&q=90",
    alt: "Lifestyle Photography",
    width: 800,
    height: 1200,
  },
  {
    src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&h=1200&fit=crop&auto=format&q=90",
    alt: "Fashion Photography",
    width: 800,
    height: 1200,
  },
];

export function Home() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  /**
   * Handle image click - open lightbox
   */
  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  };

  /**
   * Prepare lightbox slides from gallery images
   */
  const lightboxSlides = galleryImages.map((image) => ({
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
  }))

  return (
    <>
      <HeroSection
        backgroundImage="/images/hero/hero.jpg"
        headline="Capturing Moments, Creating Memories"
        subheadline="Professional Photography for Weddings & Events"
        enableParallax={true}
      />
      <HeroSwiperGallery
        images={galleryImages}
        onImageClick={handleImageClick}
      />

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />
    </>
  );
}

