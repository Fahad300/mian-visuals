'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { HeroSection } from "./HeroSection";
import { Section } from '@/components/shared/Section';
import { StackedImageSlider, SliderImage } from '@/components/shared/StackedImageSlider';
import { FeaturedWeddingsGallery } from './FeaturedWeddingsGallery';
import { Button } from '../shared/Button';
import { ArrowUpRightIcon } from 'lucide-react'
import { PricingCards } from './PricingCards';
import { Testimonials } from './Testimonials';


export function Home() {

  /**
   * Scroll to footer form
   */
  const scrollToQuoteForm = () => {
    const quoteForm = document.getElementById("quote-form");
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookNow = () => {
    scrollToQuoteForm();
  };

  const handleBookDestination = () => {
    scrollToQuoteForm();
  };


  // About section images for the stacked slider
  const aboutImages: SliderImage[] = [
    {
      src: "/images/about/about.jpg",
      alt: "",
      title: ""
    },
    {
      src: "/images/about/about-2.jpg",
      alt: "",
      title: ""
    }
  ]

  // Featured weddings gallery images
  const featuredWeddingsImages = [
    { src: "/images/weddings/1.png", alt: "", width: 1200, height: 900 },
    { src: "/images/weddings/2.jpg", alt: "", width: 800, height: 1200 },
    { src: "/images/weddings/3.jpg", alt: "", width: 1200, height: 800 },
    { src: "/images/weddings/4.jpg", alt: "", width: 900, height: 1200 },
    { src: "/images/weddings/5.png", alt: "", width: 1200, height: 900 },
    { src: "/images/weddings/6.jpg", alt: "", width: 1000, height: 1200 },
    { src: "/images/weddings/7.jpg", alt: "", width: 1200, height: 800 },
    { src: "/images/weddings/8.jpg", alt: "", width: 900, height: 1200 },
    { src: "/images/weddings/9.png", alt: "", width: 1200, height: 800 },
    { src: "/images/weddings/10.png", alt: "", width: 900, height: 1200 },
  ]


  return (
    <>
      <HeroSection
        backgroundImage="/images/hero/heroHeader.png"
        headline="Unfiltered. Moment Makers"
        subheadline="“These wedding storytellers are doing something different”"
        enableParallax={true}
      />

      <Section id="about" className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center overflow-hidden">
            {/* Left - Text content */}
            <div>
              <h5 className='text-lg sm:text-xl md:text-2xl font-light tracking-wide text-secondary mb-2'>About Us</h5>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-dark mb-4 sm:mb-6">
                Behind the Lens
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-dark mb-4 sm:mb-6">
                At Mian Visuals, we’re not just here to capture your wedding.
                We’re here to be part of the energy, the laughter, the emotion and the moments
                that make the day feel alive. We bring a mix of creativity, personality and good
                vibes that make everything feel easy from the moment we arrive.
              </p>
              <p className="text-sm sm:text-base md:text-lg font-light tracking-wide text-dark mb-4 sm:mb-6">
                Our approach is simple. Real moments. Real vibes. Beautifully told.
                Your wedding means everything to you, and we show up with the same heart.
                We want your film and photos to feel like your day felt. warm, emotional, fun and full of life.
              </p>
              <Button variant="primary" size="medium" className="text-white backdrop-blur-sm hover:border-primary inline-block text-sm sm:text-base">
                Let’s create something unforgettable <ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4 inline-block ml-2" />
              </Button>
            </div>
            {/* Right - Auto-Scrolling Stacked Image Slider */}
            <StackedImageSlider
              images={aboutImages}
              autoScrollInterval={4000}
            />
          </div>
        </div>
      </Section>



      {/* Featured Weddings Section */}
      <Section id="featured-weddings" className="py-12 sm:py-16 bg-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h5 className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-secondary mb-2">
              Time stands still in every shot
            </h5>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-black mb-3 sm:mb-4 px-4">
              Featured Weddings
            </h2>
          </div>
        </div>

        {/* Edge to edge gallery */}
        <div className="w-screen relative left-1/2 -translate-x-1/2">
          <FeaturedWeddingsGallery
            images={featuredWeddingsImages}
            autoScrollInterval={5000}
          />
        </div>
      </Section>
      {/* Featured Weddings Section */}
      <Section id="pricing-tables" className="py-12 sm:py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h5 className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-secondary mb-2">
              Choose the package that fits your story
            </h5>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-black mb-3 sm:mb-4 px-4">
              Price Package Plans
            </h2>
          </div>
        </div>
        <PricingCards
          onBookNow={handleBookNow}
          onBookDestination={handleBookDestination}
          destinationImage="/images/destination.jpg"
        />
      </Section>

      <Testimonials />
    </>
  );
}

