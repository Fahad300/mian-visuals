import { ContactForm } from "@/components/contact/ContactForm";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="Have a question or want to discuss your photography needs? We'd love to hear from you."
      />
      <div className="container mx-auto px-4 py-16">
        <Section id="contact">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-secondary p-8 shadow-lg">
              <ContactForm />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

