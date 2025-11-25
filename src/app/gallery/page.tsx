import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";
import Image from "next/image";

/**
 * Gallery images
 */
const galleryImages = [
    {
        id: "1",
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Wedding Gallery Image 1",
    },
    {
        id: "2",
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Portrait Gallery Image 1",
    },
    {
        id: "3",
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Event Gallery Image 1",
    },
    {
        id: "4",
        src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Commercial Gallery Image 1",
    },
    {
        id: "5",
        src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Lifestyle Gallery Image 1",
    },
    {
        id: "6",
        src: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Fashion Gallery Image 1",
    },
    {
        id: "7",
        src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Wedding Gallery Image 2",
    },
    {
        id: "8",
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Portrait Gallery Image 2",
    },
    {
        id: "9",
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop&auto=format&q=90",
        alt: "Event Gallery Image 2",
    },
];

export default function GalleryPage() {
    return (
        <>
            <PageHero
                title="Gallery"
                description="Browse through our curated collection of beautiful photography work."
            />
            <div className="container mx-auto px-4 py-16">
                <Section id="gallery">

                    {/* Gallery Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {galleryImages.map((image) => (
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
                            </div>
                        ))}
                    </div>
                </Section>
            </div>
        </>
    );
}

