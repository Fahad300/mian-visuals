import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

export default function ReviewsPage() {
    return (
        <>
            <PageHero
                title="Reviews"
                description="See what our clients have to say about their experience with us."
            />
            <div className="container mx-auto px-4 py-16">
                <Section id="reviews">
                    <div className="mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <p className="text-secondary/80">
                                Read testimonials from our satisfied clients.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <div className="rounded-lg bg-light p-8 shadow-md">
                                <h2 className="mb-4 font-heading text-3xl font-semibold text-secondary">
                                    Client Reviews
                                </h2>
                                <p className="text-secondary/80">
                                    Reviews section coming soon. Check back later to see what our clients are saying!
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
}

