"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import Image from "next/image";

/**
 * Pricing Cards Props
 */
interface PricingCardsProps {
    /**
     * Callback when Book Now is clicked
     */
    onBookNow?: (packageName: string) => void;
    /**
     * Callback when Book Destination is clicked
     */
    onBookDestination?: () => void;
    /**
     * Destination wedding image URL
     * @default "/images/destination-wedding.jpg"
     */
    destinationImage?: string;
}

/**
 * Pricing Cards Component with Destination Wedding Card
 * All content is built-in - just add callbacks
 */
export function PricingCards({
    onBookNow,
    onBookDestination,
    destinationImage = "/images/destination-wedding.jpg"
}: PricingCardsProps) {
    // Fixed pricing packages
    const packages = [
        {
            name: "Simple",
            description: "For smaller events",
            price: 1500,
            features: [
                "Cinematic Film",
                "Creative Highlights",
                "Unlimited Photography",
                "1 Cinematographer",
                "1 Photographer",
            ],
        },
        {
            name: "Balanced",
            description: "Our most popular package",
            price: 2300,
            features: [
                "Cinematic Film",
                "Creative Highlights",
                "Unlimited Photography",
                "1 Cinematographer",
                "1 Photographer",
                "Drone",
                "Social Media - 3 Shorts",
                "2 Cinematographers",
            ],
            popular: true,
        },
        {
            name: "Creative",
            description: "Our most premium package",
            price: 3500,
            features: [
                "Cinematic Film",
                "Creative Highlights",
                "Unlimited Photography",
                "1 Cinematographer",
                "1 Photographer",
                "Drone",
                "Social Media - 3 Shorts",
                "2 Cinematographers",
                "Photobook",
                "VHS",
            ],
        },
    ];


    return (
        <section className="w-full py-16 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                    {packages.map((pkg, index) => (
                        <motion.div
                            key={pkg.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative h-full flex"
                        >
                            <div
                                className={
                                    `${index === 1 ? "border-2 border-[#C9A961]" : ""} rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col w-full`
                                }
                                style={{ backgroundColor: "#F2F2F2" }}
                            >
                                {/* Header */}

                                <div
                                    className={
                                        `px-4 sm:px-6 py-6 sm:py-8 m-2 sm:m-4 rounded-lg relative ` +
                                        (index % 3 === 0
                                            ? 'bg-[#CEBA9B] '
                                            : index % 3 === 1
                                                ? 'bg-[#C0C0C0] '
                                                : 'bg-[#C79B56] ')
                                    }
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
                                        <div>
                                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-black">{pkg.name}</h3>
                                            <p className="text-sm sm:text-base md:text-lg text-black/70">{pkg.description}</p>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <span className="text-lg sm:text-xl md:text-2xl lg:text-[30px] font-bold text-black">£{pkg.price}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Features list */}
                                <div className="p-4 sm:p-6 flex-1 flex flex-col" style={{ backgroundColor: "#F2F2F2" }}>
                                    <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                                        {pkg.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-gray-700 mb-4">
                                                <Circle className="w-3 h-3 text-gray-600 flex-shrink-0 mt-2" />
                                                <span className="text-sm sm:text-base md:text-lg">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Book Now Button */}
                                    <button
                                        onClick={() => onBookNow?.(pkg.name)}
                                        className="w-full bg-black text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded hover:bg-gray-800 transition-colors duration-200 font-medium mt-auto text-sm sm:text-base"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>

                            {/* Optional Popular badge */}
                            {pkg.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A961] text-white px-4 py-1 rounded-full text-xs font-semibold">
                                    Most Popular
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Destination Wedding Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    style={{ backgroundColor: "#F2F2F2" }}
                >
                    <div className="flex flex-col md:flex-row items-center gap-0 overflow-hidden">
                        {/* Image */}
                        <div className="m-5 w-full md:w-1/3 relative md:h-[200px] lg:h-[330px] rounded-lg overflow-hidden md:ml-4">
                            <Image
                                src={destinationImage}
                                alt="Destination Wedding"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 20vw"
                                priority
                                unoptimized={true}
                                style={{ objectFit: 'cover', objectPosition: 'center bottom' }}

                            />
                        </div>

                        {/* Content */}
                        <div className="w-full md:w-2/3 p-6 sm:p-8 md:p-12">
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-[27px] font-bold text-gray-600 mb-0">Starting from £4500</p>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">Destination Wedding</h3>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                                Your destination wedding isn&apos;t just a day; it&apos;s a story that deserves to be told with depth,
                                beauty, and soul. From sun-drenched coasts to timeless cities, no two weddings are the same
                                and neither is the way we capture them.
                            </p>
                            <button
                                onClick={onBookDestination}
                                className="bg-black text-white py-2.5 sm:py-3 px-6 sm:px-8 rounded hover:bg-gray-800 transition-colors duration-200 font-medium text-sm sm:text-base"
                            >
                                Book Destination
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}