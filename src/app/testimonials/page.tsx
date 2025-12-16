"use client";

import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import { motion } from "framer-motion";
import { Heart, Camera, Users, Briefcase } from "lucide-react";

/**
 * Testimonials data
 */
const testimonials = [
    {
        id: "1",
        name: "Sarah & Michael",
        event: "Wedding",
        rating: 5,
        text: "Mian Visuals captured our wedding day perfectly! Every moment was beautifully documented, and we couldn't be happier with the results. Highly recommended!",
    },
    {
        id: "2",
        name: "Jennifer Martinez",
        event: "Portrait Session",
        rating: 5,
        text: "The portrait session was amazing. The photographer made me feel comfortable and the final images exceeded all my expectations. Truly professional service.",
    },
    {
        id: "3",
        name: "David Chen",
        event: "Corporate Event",
        rating: 5,
        text: "Outstanding photography services for our corporate event. Professional, punctual, and delivered stunning photos that perfectly captured the essence of our event.",
    },
    {
        id: "4",
        name: "Emily & James",
        event: "Wedding",
        rating: 5,
        text: "From engagement photos to our wedding day, Mian Visuals has been incredible. The attention to detail and artistic vision is unmatched. Thank you for preserving our memories!",
    },
    {
        id: "5",
        name: "Robert Thompson",
        event: "Commercial Photography",
        rating: 5,
        text: "Professional commercial photography that elevated our brand. The quality and creativity of the work is exceptional. Will definitely work with them again.",
    },
    {
        id: "6",
        name: "Lisa Anderson",
        event: "Portrait Session",
        rating: 5,
        text: "Such a wonderful experience! The photographer was patient, creative, and the final portraits are absolutely stunning. I'm so happy with the results.",
    },
];

export default function TestimonialsPage() {
    return (
        <>
            <PageHero
                title="Testimonials"
                description="See what our clients have to say about their experience with Mian Visuals."
            />
            <div className="container mx-auto px-4 py-16">
                <Section id="testimonials">

                    {/* Testimonials Grid */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="rounded-lg bg-light p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
                            >
                                {/* Rating Stars */}
                                <div className="mb-4 flex gap-1">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <svg
                                            key={i}
                                            className="h-5 w-5 text-primary"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <p className="mb-6 text-secondary/80 italic">
                                    &ldquo;{testimonial.text}&rdquo;
                                </p>

                                {/* Author Info */}
                                <div className="border-t border-secondary/10 pt-4">
                                    <p className="font-semibold text-secondary">{testimonial.name}</p>
                                    <p className="text-sm text-secondary/60">{testimonial.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
                {/* Services Section */}
                <Section className="py-16 bg-gray-100">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h5 className='text-2xl font-light tracking-wide text-secondary'>Time stands still in every shot</h5>
                            <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-semibold text-black mb-4">
                                Our Services
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Wedding Photography */}
                            <motion.div
                                className="border border-muted rounded-2xl p-8 text-left group cursor-pointer relative overflow-hidden"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: '#C9A961',
                                    boxShadow: '0 20px 40px rgba(201, 169, 97, 0.2)'
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Animated background gradient on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ scale: 0, rotate: 45 }}
                                    whileHover={{ scale: 1.2, rotate: 0 }}
                                    transition={{ duration: 0.4 }}
                                />

                                <div className="relative z-10">
                                    <div className="mb-2">
                                        <Heart className="w-10 h-10 text-black group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                    <motion.h3
                                        className="font-heading text-3xl font-semibold text-black mb-4 group-hover:text-primary transition-colors duration-300"
                                        whileHover={{ x: 10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Weddings
                                    </motion.h3>
                                    <motion.p
                                        className="text-black leading-relaxed"
                                        initial={{ opacity: 1 }}
                                        whileHover={{ opacity: 0.8, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Capture the magic of your special day with elegant, timeless photography that tells your unique love story.
                                    </motion.p>
                                </div>

                                {/* Floating particles effect */}
                                <motion.div
                                    className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-60"
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0, 0.6, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: 0.2
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-6 right-8 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-40"
                                    animate={{
                                        y: [0, -15, 0],
                                        opacity: [0, 0.4, 0]
                                    }}
                                    transition={{
                                        duration: 1.8,
                                        repeat: Infinity,
                                        delay: 0.5
                                    }}
                                />
                            </motion.div>

                            {/* Portrait Photography */}
                            <motion.div
                                className="border border-muted rounded-2xl p-8 text-left group cursor-pointer relative overflow-hidden"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: '#C9A961',
                                    boxShadow: '0 20px 40px rgba(201, 169, 97, 0.2)'
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileHover={{ scale: 1.2, rotate: 0 }}
                                    transition={{ duration: 0.4 }}
                                />

                                <div className="relative z-10">
                                    <div className="mb-2">
                                        <Camera className="w-10 h-10 text-black group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                    <motion.h3
                                        className="font-heading text-3xl font-semibold text-black mb-4 group-hover:text-primary transition-colors duration-300"
                                        whileHover={{ x: 10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Portraits
                                    </motion.h3>
                                    <motion.p
                                        className="text-black leading-relaxed"
                                        whileHover={{ opacity: 0.8, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Professional portrait sessions that capture personality, emotion, and authentic moments for individuals and families.
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="absolute top-6 right-6 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-60"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0, 0.6, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: 0.3
                                    }}
                                />
                            </motion.div>

                            {/* Event Photography */}
                            <motion.div
                                className="border border-muted rounded-2xl p-8 text-left group cursor-pointer relative overflow-hidden"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: '#C9A961',
                                    boxShadow: '0 20px 40px rgba(201, 169, 97, 0.2)'
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ scale: 0, rotate: 90 }}
                                    whileHover={{ scale: 1.2, rotate: 0 }}
                                    transition={{ duration: 0.4 }}
                                />

                                <div className="relative z-10">
                                    <div className="mb-2">
                                        <Users className="w-10 h-10 text-black group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                    <motion.h3
                                        className="font-heading text-3xl font-semibold text-black mb-4 group-hover:text-primary transition-colors duration-300"
                                        whileHover={{ x: 10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Events
                                    </motion.h3>
                                    <motion.p
                                        className="text-black leading-relaxed"
                                        whileHover={{ opacity: 0.8, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Document your celebrations, corporate events, and special occasions with professional coverage and attention to detail.
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="absolute top-4 left-4 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-50"
                                    animate={{
                                        x: [0, 20, 0],
                                        y: [0, 15, 0],
                                        opacity: [0, 0.5, 0]
                                    }}
                                    transition={{
                                        duration: 2.2,
                                        repeat: Infinity,
                                        delay: 0.1
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-4 left-6 w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-40"
                                    animate={{
                                        x: [0, -10, 0],
                                        opacity: [0, 0.4, 0]
                                    }}
                                    transition={{
                                        duration: 1.8,
                                        repeat: Infinity,
                                        delay: 0.4
                                    }}
                                />
                            </motion.div>

                            {/* Commercial Photography */}
                            <motion.div
                                className="border border-muted rounded-2xl p-8 text-left group cursor-pointer relative overflow-hidden"
                                whileHover={{
                                    scale: 1.05,
                                    borderColor: '#C9A961',
                                    boxShadow: '0 20px 40px rgba(201, 169, 97, 0.2)'
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ scale: 0, rotate: -90 }}
                                    whileHover={{ scale: 1.2, rotate: 0 }}
                                    transition={{ duration: 0.4 }}
                                />

                                <div className="relative z-10">
                                    <div className="mb-2">
                                        <Briefcase className="w-10 h-10 text-black group-hover:text-primary transition-colors duration-300" />
                                    </div>
                                    <motion.h3
                                        className="font-heading text-3xl font-semibold text-black mb-4 group-hover:text-primary transition-colors duration-300"
                                        whileHover={{ x: 10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Commercial
                                    </motion.h3>
                                    <motion.p
                                        className="text-black leading-relaxed"
                                        whileHover={{ opacity: 0.8, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        Professional business photography including product shots, branding content, and marketing materials for your company.
                                    </motion.p>
                                </div>

                                <motion.div
                                    className="absolute top-8 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-60"
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.5, 1],
                                        opacity: [0, 0.6, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: 0.2
                                    }}
                                />
                                <motion.div
                                    className="absolute bottom-8 right-6 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-50"
                                    animate={{
                                        y: [0, -10, 0],
                                        x: [0, 5, 0],
                                        opacity: [0, 0.5, 0]
                                    }}
                                    transition={{
                                        duration: 1.6,
                                        repeat: Infinity,
                                        delay: 0.6
                                    }}
                                />
                            </motion.div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
}

