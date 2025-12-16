import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

export default function BlogPage() {
    return (
        <>
            <PageHero
                title="Blog"
                description="Latest photography tips, stories, and insights from our team."
            />
            <div className="container mx-auto px-4 py-16">
                <Section id="blog">
                    <div className="mx-auto max-w-4xl">
                        <div className="text-center mb-12">
                            <p className="text-secondary/80">
                                Stay updated with our latest blog posts, photography tips, and behind-the-scenes stories.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <div className="rounded-lg bg-light p-8 shadow-md">
                                <h2 className="mb-4 font-heading text-3xl font-semibold text-secondary">
                                    Blog Posts
                                </h2>
                                <p className="text-secondary/80">
                                    Our blog is coming soon. Check back later for photography tips, client stories, and more!
                                </p>
                            </div>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    );
}

