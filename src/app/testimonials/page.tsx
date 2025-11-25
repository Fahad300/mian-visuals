import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

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
                                    "{testimonial.text}"
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
            </div>
        </>
    );
}

