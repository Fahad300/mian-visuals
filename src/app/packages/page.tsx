import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

export default function PackagesPage() {
    return (
        <>
            <PageHero
                title="Packages"
                description="Choose the perfect photography package for your special occasion."
            />
            <div className="container mx-auto px-4 py-16">
                <Section id="packages">
                    <div className="mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <p className="text-secondary/80">
                                Our carefully crafted packages are designed to meet your needs and budget.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <div className="rounded-lg bg-light p-8 shadow-md">
                                <h2 className="mb-4 font-heading text-3xl font-semibold text-secondary">
                                    Package Details Coming Soon
                                </h2>
                                <p className="text-secondary/80">
                                    We are currently updating our packages. Please contact us for custom pricing and availability.
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
}

