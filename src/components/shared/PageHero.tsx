import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * PageHero component props
 */
interface PageHeroProps {
    /**
     * Page title
     */
    title: string;

    /**
     * Page description/subtitle
     */
    description?: string;

    /**
     * Background image URL
     * @default "/images/hero/hero.jpg"
     */
    backgroundImage?: string;

    /**
     * Additional className for customization
     */
    className?: string;
}

/**
 * Reusable Page Hero component with dark background and photo
 * Used across all pages for consistent hero sections
 */
export function PageHero({
    title,
    description,
    backgroundImage = "/images/hero/hero.jpg",
    className,
}: PageHeroProps) {
    return (
        <section className={cn("relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden", className)}>
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-dark/70" />

            {/* Content */}
            <div className="relative z-10 w-full">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1
                            className="mb-4 font-heading text-4xl font-bold md:text-5xl lg:text-6xl"
                            style={{ color: "#FFFFFF" }}
                        >
                            {title}
                        </h1>
                        {description && (
                            <p
                                className="mx-auto max-w-2xl text-lg md:text-xl"
                                style={{ color: "rgba(255, 255, 255, 0.9)" }}
                            >
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

