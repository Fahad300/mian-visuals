import { QuoteForm } from "@/components/contact/QuoteForm";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

export default function QuotePage() {
  return (
    <>
      <PageHero
        title="Request a Quote"
        description="Request a personalized quote for your photography needs. Fill out the form below and we'll get back to you with a detailed proposal."
      />
      <div className="container mx-auto px-4 py-16">
        <Section id="quote">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-secondary p-8 shadow-lg">
              <QuoteForm />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

