import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import Image from "next/image";

/**
 * Portfolio images
 */
const portfolioImages = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Wedding Photography",
        category: "Wedding",
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Portrait Session",
        category: "Portrait",
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Event Photography",
        category: "Event",
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Commercial Photography",
        category: "Commercial",
    },
    {
        id: "5",
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Lifestyle Photography",
        category: "Lifestyle",
    },
    {
        id: "6",
        src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Fashion Photography",
        category: "Fashion",
    },
];

export default function PortfolioPage() {
    return (
        <>
            <PageHero
                title="Portfolio"
                description="Explore our collection of stunning photography work across various styles and occasions."
            />
            <div className="container mx-auto px-4 py-16">
                <Section id="portfolio">

                    {/* Portfolio Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {portfolioImages.map((image) => (
                            <div
                                key={image.id}
                                className="group relative overflow-hidden rounded-lg bg-secondary shadow-lg transition-transform duration-300 hover:scale-105"
                            >
                                <div className="relative aspect-[4/5]">
                                    <Image
                                        src={image.src}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <div className="text-center text-white">
                                        <p className="font-heading text-lg font-semibold">{image.category}</p>
                                        <p className="text-sm text-white/80">{image.alt}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>
            </div>
        </>
    );
}

