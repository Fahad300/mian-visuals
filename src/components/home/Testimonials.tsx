"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Facebook, Instagram, Youtube, MessageCircle, ExternalLink } from "lucide-react";
import Image from "next/image";

/**
 * Google Review interface
 */
interface GoogleReview {
    name: string;
    role: string;
    avatar: string;
    rating: number;
    review: string;
}

/**
 * Testimonials Component with Real Google Reviews
 * Reviews manually copied from: https://www.google.com/search?q=Mian+Visuals
 */
export function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

    // Fixed configuration
    const backgroundImage = "/images/testimonials-bg.png";
    const email = "info@mianvisuals.com";
    const autoScrollInterval = 5000;
    const socialLinks = {
        facebook: "https://facebook.com/mianvisuals",
        instagram: "https://instagram.com/mianvisuals",
        youtube: "https://youtube.com/@mianvisuals",
        tiktok: "https://tiktok.com/@mianvisuals",
        googleReviews: "https://www.google.com/search?q=Mian+Visuals", // Update with your actual Google Reviews URL
    };

    // Real Google Reviews - UPDATE THESE WITH YOUR ACTUAL REVIEWS
    const reviews: GoogleReview[] = [
        {
            name: "Aleem Ditta",
            role: "Google User",
            avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWo3aewKBE-5cgyZTYIblirf2AUlCfoI8uENbnNGV3HxalG-Q0h=s64-c-rp-mo-br100",
            rating: 5,
            review: "had Mian Visuals film my wedding, and they were absolutely fantastic from start to finish. The whole team was professional, on time, and really easy to work with. A special mention to Amaan, who was a top lad — friendly, genuine, and made everyone feel comfortable throughout the day.They stuck to their word the entire way through, and when it came to the editing, I actually got my video earlier than promised!",
        },
        {
            name: "Muhammad Shaheryar",
            role: "Google User",
            avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUQDxF8yKxP6CHJ9l3zi6vLQ7r0JuYWm1FnY3MFyFLXi2Wac55v=s64-c-rp-mo-br100",
            rating: 5,
            review: "Mian Visuals are honestly the best in the North! Super professional, creative and easy to work with. They really went above and beyond and the final results were amazing. Couldn’t recommend them enough!",
        },
        {
            name: "Shana Khan",
            role: "Google User",
            avatar: "https://lh3.googleusercontent.com/a/ACg8ocLpIBWqiAHSYr-IH8EdiZaLd602LjVAAQCTDE1FU9leokf5Z1Rm=s64-c-rp-mo-br100",
            rating: 5,
            review: "I used Mian for both my events wedding and mehndi, I honestly couldn’t fault them, they were amazing. I can’t wait to see the pictures!! I can’t recommend them enough, we will definitely be using them again in the future!!",
        },
    ];

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
        resetAutoScroll();
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
        resetAutoScroll();
    };

    const resetAutoScroll = () => {
        if (autoScrollRef.current) {
            clearInterval(autoScrollRef.current);
        }
        autoScrollRef.current = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % reviews.length);
        }, autoScrollInterval);
    };

    useEffect(() => {
        resetAutoScroll();
        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoScrollInterval]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <section className="relative w-full overflow-hidden py-10 md:py-16 lg:py-20">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage}
                    alt="Testimonials Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    {/* Left Side - Text and Email */}
                    <div className="w-full md:w-1/2 text-white z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                        >
                            Don&apos;t Just Take Our Word for It
                        </motion.h2>
                        <motion.a
                            href={"https://www.google.com/maps/search/?api=1&query=Google&query_place_id=ChIJ6yQIlFftfkgREsQbU9q2iek"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-5 "
                        >
                            <Image className="opacity-80 hover:opacity-100 transition-opacity" src="/images/Google-Review.svg" alt="Google Reviews" width={300} height={100} />
                        </motion.a>
                    </div>

                    {/* Right Side - Testimonial Card with Carousel */}
                    <div className="hidden md:block w-full md:w-1/2 z-10">
                        <div className="max-w-xl ml-auto relative">

                            {/* Testimonial Card */}
                            <div className="relative overflow-hidden">
                                <AnimatePresence initial={false} custom={direction} mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        custom={direction}
                                        variants={variants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            x: { type: "spring", stiffness: 300, damping: 30 },
                                            opacity: { duration: 0.2 },
                                        }}
                                    >
                                        <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col">
                                            {/* Header */}
                                            <div className="mb-4">
                                                <h3 className="text-[40px] font-bold text-gray-900 mb-3">
                                                    What Are Clients Saying?
                                                </h3>
                                                {/* Star Rating and Google Review Link */}
                                                <a
                                                    href={socialLinks.googleReviews}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
                                                >
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                                            />
                                                        ))}
                                                    </div>
                                                </a>
                                            </div>

                                            {/* Review Text */}
                                            <p className="text-base text-gray-700 mb-6 leading-relaxed">
                                                {reviews[currentIndex].review}
                                            </p>

                                            {/* Reviewer Info */}
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                                                    <Image
                                                        src={reviews[currentIndex].avatar}
                                                        alt={reviews[currentIndex].name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        {reviews[currentIndex].name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {reviews[currentIndex].role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Dots Indicator */}
                            <div className="flex justify-center gap-2 mt-4">
                                {reviews.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setDirection(idx > currentIndex ? 1 : -1);
                                            setCurrentIndex(idx);
                                            resetAutoScroll();
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex
                                            ? "bg-white w-8"
                                            : "bg-white/40 hover:bg-white/60"
                                            }`}
                                        aria-label={`Go to review ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media Links - Right Side */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Facebook"
                >
                    <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Instagram"
                >
                    <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="YouTube"
                >
                    <Youtube className="w-5 h-5 text-white" />
                </a>
                <a
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="TikTok"
                >
                    <MessageCircle className="w-5 h-5 text-white" />
                </a>
            </div>
        </section>
    );
}