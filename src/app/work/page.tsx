import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

export default function WorkPage() {
    return (
        <>
            <PageHero
                title="Our Work"
                description="Explore our portfolio of stunning photography projects."
            />
            <div className="container mx-auto px-4 py-16">
                <Section id="work">
                    <div className="mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <p className="text-secondary/80">
                                Browse through our collection of photography work across different categories.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <div className="rounded-lg bg-light p-8 shadow-md">
                                <h2 className="mb-4 font-heading text-3xl font-semibold text-secondary">
                                    Portfolio Gallery
                                </h2>
                                <p className="text-secondary/80">
                                    Our work gallery is being updated. Please check back soon to see our latest projects!
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
}

