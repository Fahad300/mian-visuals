"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { validateEmail } from "@/lib/utils";
import { Button } from "@/components/shared/Button";

/**
 * Form data interface for contact form
 */
interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
}

/**
 * Contact form component with dark theme
 * Handles form submission, validation, and status messages
 */
export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handle input field changes
   * Updates form data state when user types
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /**
   * Handle form submission
   * Validates email, sends POST request to API, and handles response
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Client-side email validation
    if (!validateEmail(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Success: clear form and show success message
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        message: "",
      });

      // Reset status to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-light text-white/90 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-white/30 focus:outline-none transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-light text-white/90 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-white/30 focus:outline-none transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-light text-white/90 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-white/30 focus:outline-none transition-colors"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        {/* Event Type Field */}
        <div>
          <label htmlFor="eventType" className="block text-sm font-light text-white/90 mb-2">
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-white/30 focus:outline-none transition-colors"
          >
            <option value="" className="bg-gray-900">
              Select event type
            </option>
            <option value="Wedding" className="bg-gray-900">
              Wedding
            </option>
            <option value="Engagement" className="bg-gray-900">
              Engagement
            </option>
            <option value="Portrait Session" className="bg-gray-900">
              Portrait Session
            </option>
            <option value="Event Photography" className="bg-gray-900">
              Event Photography
            </option>
            <option value="Commercial" className="bg-gray-900">
              Commercial
            </option>
            <option value="Other" className="bg-gray-900">
              Other
            </option>
          </select>
        </div>

        {/* Event Date Field */}
        <div>
          <label htmlFor="eventDate" className="block text-sm font-light text-white/90 mb-2">
            Event Date *
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-white/30 focus:outline-none transition-colors"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-light text-white/90 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-white/30 focus:outline-none transition-colors resize-none"
            placeholder="Tell us about your event..."
          />
        </div>

        {/* Success Message */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-500/20 border border-green-500/50 text-green-300 text-sm"
          >
            ✓ Message sent successfully! We&apos;ll get back to you soon.
          </motion.div>
        )}

        {/* Error Message */}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/20 border border-red-500/50 text-red-300 text-sm"
          >
            ✕ {errorMessage}
          </motion.div>
        )}

        {/* Submit Button */}
        <Button variant="primary" size="medium" fullWidth disabled={status === "loading"}
          type="submit">
          {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
        </Button>
      </form>
    </div>
  );
}
