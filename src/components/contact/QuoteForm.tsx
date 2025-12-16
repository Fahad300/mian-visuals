"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { showToast } from "../shared/Toaster";

/**
 * Quote Form Props
 */
interface QuoteFormProps {
  /**
   * Callback when form is submitted
   */
  onSubmit?: (data: FormData) => void | Promise<void>;
}

/**
 * Form Data Interface
 */
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCountry: string;
  venue: string;
  dateFrom: string;
  dateTo: string;
  howYouFoundUs: string;
  duration: string[];
  preferredPackage: string[];
}

/**
 * Contact Form Component
 */
export function QuoteForm({ onSubmit }: QuoteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCountry: "+44",
    venue: "",
    dateFrom: "",
    dateTo: "",
    howYouFoundUs: "",
    duration: [],
    preferredPackage: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setFormData((prev) => {
        const currentArray = (prev[name as keyof FormData] as string[]) || [];
        if (checked) {
          return { ...prev, [name]: [...currentArray, value] };
        } else {
          return { ...prev, [name]: currentArray.filter((item) => item !== value) };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit?.(formData);
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        phoneCountry: "+44",
        venue: "",
        dateFrom: "",
        dateTo: "",
        howYouFoundUs: "",
        duration: [],
        preferredPackage: [],
      });
      showToast("Thank you! We will get back to you soon.", "success");
    } catch (error) {
      console.error("Form submission error:", error);
      showToast(
        error instanceof Error ? error.message : "Failed to submit form. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full" style={{ fontFamily: "'Sora', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-[50px]">
          <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide text-secondary mb-2">Let’s Connect and Create</p>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-black mb-3 sm:mb-4 px-4">Get a Quote</h2>
        </div>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Smith"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Phone & Venue */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Phone
              </label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg">
                  <span className="text-lg">🇬🇧</span>
                  <span className="text-sm font-medium text-gray-700">+44</span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="7700 900123"
                  required
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="venue"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Venue
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Dates Required - From and To */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Dates Required
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dateFrom"
                  className="block text-xs text-gray-600 mb-2"
                >
                  From
                </label>
                <input
                  type="date"
                  id="dateFrom"
                  name="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:saturate-100 [&::-webkit-calendar-picker-indicator]:invert-[0.7]"
                />
              </div>
              <div>
                <label
                  htmlFor="dateTo"
                  className="block text-xs text-gray-600 mb-2"
                >
                  To
                </label>
                <input
                  type="date"
                  id="dateTo"
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleChange}
                  required
                  min={formData.dateFrom || undefined}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:brightness-0 [&::-webkit-calendar-picker-indicator]:saturate-100 [&::-webkit-calendar-picker-indicator]:invert-[0.7]"
                />
              </div>
            </div>
          </div>

          {/* Duration and How you found us - Same Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Duration
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="duration"
                    value="under4hours"
                    checked={formData.duration.includes("under4hours")}
                    onChange={handleChange}
                    className="custom-checkbox"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">Under 4 hours</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="duration"
                    value="above4hours"
                    checked={formData.duration.includes("above4hours")}
                    onChange={handleChange}
                    className="custom-checkbox"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">Above 4 hours</span>
                </label>
              </div>
            </div>

            {/* How you found us */}
            <div>
              <label
                htmlFor="howYouFoundUs"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                How you found us
              </label>
              <select
                id="howYouFoundUs"
                name="howYouFoundUs"
                value={formData.howYouFoundUs}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23C9A961' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="">Select an option</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google Search</option>
                <option value="friend">Friend/Family Referral</option>
                <option value="venue">Venue Recommendation</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Preferred Package */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Preferred Package
            </label>
            <div className="flex flex-wrap gap-4">
              {["Custom Quote", "Bronze", "Silver", "Gold", "Destination Wedding"].map((pkg) => {
                const value = pkg.toLowerCase().replace(" ", "");
                return (
                  <label
                    key={pkg}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      name="preferredPackage"
                      value={value}
                      checked={formData.preferredPackage.includes(value)}
                      onChange={handleChange}
                      className="custom-checkbox"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-primary transition-colors">{pkg}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-12 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Get A Quote"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}