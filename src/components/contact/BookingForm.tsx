"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { validateEmail } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

/**
 * BookingForm component for session booking requests
 * Similar to ContactForm but specifically for booking sessions
 */
export function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handle form input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Client-side validation
    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setStatus("error");
      setErrorMessage("Email is required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    if (!formData.phone.trim()) {
      setStatus("error");
      setErrorMessage("Phone number is required");
      return;
    }

    if (!formData.eventType) {
      setStatus("error");
      setErrorMessage("Please select an event type");
      return;
    }

    if (!formData.eventDate) {
      setStatus("error");
      setErrorMessage("Event date is required");
      return;
    }

    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Message is required");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: "Booking Request", // Add subject to differentiate from contact form
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send booking request");
      }

      setStatus("success");
      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send booking request"
      );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-accent mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark border border-light-dark rounded-md text-accent placeholder-accent/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-accent mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark border border-light-dark rounded-md text-accent placeholder-accent/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
            placeholder="Enter your email address"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-accent mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark border border-light-dark rounded-md text-accent placeholder-accent/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Event Type Field */}
        <div>
          <label htmlFor="eventType" className="block text-sm font-medium text-accent mb-2">
            Event Type *
          </label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-dark border border-light-dark rounded-md text-accent focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
          >
            <option value="">Select event type</option>
            <option value="wedding">Wedding</option>
            <option value="engagement">Engagement</option>
            <option value="portrait">Portrait Session</option>
            <option value="family">Family Photos</option>
            <option value="corporate">Corporate Event</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Event Date Field */}
        <div>
          <label htmlFor="eventDate" className="block text-sm font-medium text-accent mb-2">
            Preferred Date *
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
            className="w-full px-4 py-3 bg-dark border border-light-dark rounded-md text-accent focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
          />
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-accent mb-2">
            Additional Details *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 bg-dark border border-light-dark rounded-md text-accent placeholder-accent/60 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-vertical"
            placeholder="Tell us more about your event, location, number of guests, specific requirements, etc."
          />
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-500/10 border border-green-500/20 rounded-md text-green-400 text-center"
          >
            ✓ Booking request sent successfully! We&apos;ll get back to you within 24 hours.
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-center"
          >
            ✕ {errorMessage}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-white font-medium py-4 px-6 rounded-md transition-colors duration-300 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "SENDING REQUEST..." : "REQUEST BOOKING"}
        </button>
      </form>
    </div>
  );
}
