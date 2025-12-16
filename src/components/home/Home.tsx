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
      src: "/images/about/about.png",
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
    { src: "/images/weddings/2.png", alt: "", width: 800, height: 1200 },
    { src: "/images/weddings/3.png", alt: "", width: 1200, height: 800 },
    { src: "/images/weddings/4.png", alt: "", width: 900, height: 1200 },
    { src: "/images/weddings/5.png", alt: "", width: 1200, height: 900 },
    { src: "/images/weddings/6.png", alt: "", width: 1000, height: 1200 },
    { src: "/images/weddings/7.png", alt: "", width: 1200, height: 800 },
    { src: "/images/weddings/8.png", alt: "", width: 900, height: 1200 },
    { src: "/images/weddings/9.png", alt: "", width: 1200, height: 900 },
    { src: "/images/weddings/10.png", alt: "", width: 800, height: 1200 },
    { src: "/images/weddings/11.png", alt: "", width: 1200, height: 800 },
    { src: "/images/weddings/12.png", alt: "", width: 900, height: 1200 },
    { src: "/images/weddings/13.png", alt: "", width: 1200, height: 900 },
    { src: "/images/weddings/14.png", alt: "", width: 1000, height: 1200 },
    { src: "/images/weddings/15.png", alt: "", width: 1200, height: 800 },
    { src: "/images/weddings/16.png", alt: "", width: 900, height: 1200 },
    { src: "/images/weddings/17.png", alt: "", width: 1200, height: 900 },
    { src: "/images/weddings/18.png", alt: "", width: 800, height: 1200 },
    { src: "/images/weddings/19.png", alt: "", width: 1200, height: 800 },
    { src: "/images/weddings/20.png", alt: "", width: 900, height: 1200 },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 items-center">
            {/* Left - Text content */}
            <div>
              <h5 className='text-lg sm:text-xl md:text-2xl font-light tracking-wide text-secondary mb-2'>About Us</h5>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-dark mb-4 sm:mb-6">
                Behind the Lens
              </h2>
              <p className="text-base sm:text-lg font-light tracking-wide text-dark mb-4 sm:mb-6">
                At Mian Visuals, we believe that every moment tells a story worth preserving.
                With years of experience in professional photography, we specialize in capturing
                the essence of your most important occasions.<br /><br />
                From intimate weddings to grand celebrations, we approach each project with
                creativity, attention to detail, and a genuine passion for storytelling through
                the lens.<br /><br />
                Our goal is to create timeless, elegant photographs that capture the emotion, beauty, and
                authenticity of your special moments. We strive to exceed expectations and deliver
                images that you&apos;ll treasure for a lifetime.<br /><br />
                We are a team of professional photographers who are passionate about capturing the beauty of your special moments.<br /><br />
              </p>
              <Button variant="primary" size="medium" className="text-white backdrop-blur-sm hover:border-primary inline-block text-sm sm:text-base">
                Learn More <ArrowUpRightIcon className="w-3 h-3 sm:w-4 sm:h-4 inline-block ml-2" />
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
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-black mb-3 sm:mb-4 px-4">
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
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-black mb-3 sm:mb-4 px-4">
              Price Package Plans
            </h2>
          </div>
        </div>
        <PricingCards
          onBookNow={handleBookNow}
          onBookDestination={handleBookDestination}
          destinationImage="/images/destination.png"
        />
      </Section>

      <Testimonials />
    </>
  );
}

