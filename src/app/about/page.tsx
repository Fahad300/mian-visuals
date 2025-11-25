import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

export default function AboutPage() {
    return (
        <>
            <PageHero
                title="About Us"
                description="Capturing life's most precious moments with artistry and passion."
            />
            <div className="container mx-auto px-4 py-16">
                <Section id="about">
                    <div className="mx-auto max-w-4xl">

                        {/* Content Sections */}
                        <div className="space-y-12">
                            {/* Our Story */}
                            <div className="rounded-lg bg-light p-8 shadow-md">
                                <h2 className="mb-4 font-heading text-3xl font-semibold text-secondary">
                                    Our Story
                                </h2>
                                <div className="space-y-4 text-secondary/80">
                                    <p>
                                        At Mian Visuals, we believe that every moment tells a story worth preserving.
                                        With years of experience in professional photography, we specialize in capturing
                                        the essence of your most important occasions.
                                    </p>
                                    <p>
                                        From intimate weddings to grand celebrations, we approach each project with
                                        creativity, attention to detail, and a genuine passion for storytelling through
                                        the lens.
                                    </p>
                                </div>
                            </div>

                            {/* Our Mission */}
                            <div className="rounded-lg bg-light p-8 shadow-md">
                                <h2 className="mb-4 font-heading text-3xl font-semibold text-secondary">
                                    Our Mission
                                </h2>
                                <p className="text-secondary/80">
                                    To create timeless, elegant photographs that capture the emotion, beauty, and
                                    authenticity of your special moments. We strive to exceed expectations and deliver
                                    images that you'll treasure for a lifetime.
                                </p>
                            </div>

                            {/* What We Offer */}
                            <div className="rounded-lg bg-light p-8 shadow-md">
                                <h2 className="mb-6 font-heading text-3xl font-semibold text-secondary">
                                    What We Offer
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-2 font-heading text-xl font-semibold text-primary">
                                            Wedding Photography
                                        </h3>
                                        <p className="text-secondary/80">
                                            Comprehensive coverage of your special day, from preparation to reception.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-heading text-xl font-semibold text-primary">
                                            Portrait Sessions
                                        </h3>
                                        <p className="text-secondary/80">
                                            Professional portraits that capture your personality and style.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-heading text-xl font-semibold text-primary">
                                            Event Photography
                                        </h3>
                                        <p className="text-secondary/80">
                                            Corporate events, celebrations, and special occasions.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 font-heading text-xl font-semibold text-primary">
                                            Commercial Photography
                                        </h3>
                                        <p className="text-secondary/80">
                                            Professional product and brand photography services.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
}

