"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

/**
 * Package options for quote form
 */
const PACKAGE_OPTIONS = [
  { value: "bronze", label: "Bronze" },
  { value: "silver", label: "Silver" },
  { value: "gold", label: "Gold" },
  { value: "destination-wedding", label: "Destination Wedding" },
] as const;

/**
 * Quote form validation schema
 */
const quoteFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  duration: z.string().min(1, "Duration is required"),
  datesRequired: z.string().min(1, "Dates required is required"),
  venue: z.string().min(2, "Venue must be at least 2 characters"),
  message: z.string().optional(),
  preferredPackage: z.enum(["bronze", "silver", "gold", "destination-wedding"], {
    required_error: "Please select a package",
  }),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

/**
 * Get a Quote form component with G Suite email integration
 */
export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit quote request");
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your quote request has been submitted successfully. We'll get back to you soon.",
      });
      reset();
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to submit quote request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-accent"
          >
            Name <span className="text-primary">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={cn(
              "w-full rounded-md border border-accent/30 bg-secondary-dark px-4 py-2 text-accent placeholder:text-accent/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.name && "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400/20"
            )}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-yellow-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-accent"
          >
            Email Address <span className="text-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={cn(
              "w-full rounded-md border border-accent/30 bg-secondary-dark px-4 py-2 text-accent placeholder:text-accent/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.email && "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400/20"
            )}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-yellow-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-accent"
          >
            Number <span className="text-primary">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className={cn(
              "w-full rounded-md border border-accent/30 bg-secondary-dark px-4 py-2 text-accent placeholder:text-accent/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.phone && "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400/20"
            )}
            placeholder="(555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-yellow-400">{errors.phone.message}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-medium text-accent"
          >
            Duration <span className="text-accent">*</span>
          </label>
          <input
            id="duration"
            type="text"
            {...register("duration")}
            className={cn(
              "w-full rounded-md border border-accent/30 bg-secondary-dark px-4 py-2 text-accent placeholder:text-accent/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.duration && "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400/20"
            )}
            placeholder="e.g., 8 hours, Full day"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-yellow-400">{errors.duration.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Dates Required */}
        <div>
          <label
            htmlFor="datesRequired"
            className="mb-2 block text-sm font-medium text-accent"
          >
            Dates Required <span className="text-primary">*</span>
          </label>
          <input
            id="datesRequired"
            type="text"
            {...register("datesRequired")}
            className={cn(
              "w-full rounded-md border border-accent/30 bg-secondary-dark px-4 py-2 text-accent placeholder:text-accent/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.datesRequired && "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400/20"
            )}
            placeholder="e.g., June 15, 2024 or June 15-16, 2024"
          />
          {errors.datesRequired && (
            <p className="mt-1 text-sm text-yellow-400">{errors.datesRequired.message}</p>
          )}
        </div>

        {/* Venue */}
        <div>
          <label
            htmlFor="venue"
            className="mb-2 block text-sm font-medium text-accent"
          >
            Venue <span className="text-primary">*</span>
          </label>
          <input
            id="venue"
            type="text"
            {...register("venue")}
            className={cn(
              "w-full rounded-md border border-accent/30 bg-secondary-dark px-4 py-2 text-accent placeholder:text-accent/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
              errors.venue && "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400/20"
            )}
            placeholder="Event venue location"
          />
          {errors.venue && (
            <p className="mt-1 text-sm text-yellow-400">{errors.venue.message}</p>
          )}
        </div>
      </div>

      {/* Preferred Package */}
      <div>
        <label
          htmlFor="preferredPackage"
          className="mb-2 block text-sm font-medium text-accent"
        >
          Preferred Package <span className="text-primary">*</span>
        </label>
        <select
          id="preferredPackage"
          {...register("preferredPackage")}
          className={cn(
            "w-full rounded-md border border-accent/30 bg-secondary-dark px-4 py-2 text-accent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            errors.preferredPackage && "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400/20"
          )}
        >
          <option value="" className="bg-secondary-dark text-accent">Select a package</option>
          {PACKAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="bg-secondary-dark text-accent">
              {option.label}
            </option>
          ))}
        </select>
        {errors.preferredPackage && (
          <p className="mt-1 text-sm text-yellow-400">{errors.preferredPackage.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-accent"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          {...register("message")}
          className="w-full rounded-md border border-accent/30 bg-secondary-dark px-4 py-2 text-accent placeholder:text-accent/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Tell us more about your event or any special requirements..."
        />
      </div>

      {/* Submit Status */}
      {submitStatus && (
        <div
          className={cn(
            "rounded-md p-4",
            submitStatus.type === "success"
              ? "bg-green-900/30 text-green-300 border border-green-500/50"
              : "bg-red-900/30 text-red-300 border border-red-500/50"
          )}
        >
          <p className="text-sm font-medium">{submitStatus.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="large"
        disabled={isSubmitting}
        fullWidth
      >
        {isSubmitting ? "Submitting..." : "Get a Quote"}
      </Button>
    </form>
  );
}

