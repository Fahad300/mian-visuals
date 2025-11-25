import { BookingForm } from "@/components/contact/BookingForm";
import { Section } from "@/components/shared/Section";
import { PageHero } from "@/components/shared/PageHero";

export default function BookingPage() {
  return (
    <>
      <PageHero
        title="Book a Session"
        description="Ready to capture your special moments? Fill out the form below to request a booking. We'll confirm your session and add it to our calendar."
      />
      <div className="container mx-auto px-4 py-16">
        <Section id="booking">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-lg bg-secondary p-8 shadow-lg">
              <BookingForm />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
}

