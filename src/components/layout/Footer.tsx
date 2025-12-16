"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaPinterest, FaTiktok } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { InstagramFeed } from "@/components/footer/InstagramFeed";
import { QuoteForm } from "@/components/contact/QuoteForm";

/**
 * Footer navigation links
 */
const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/**
 * Social media links configuration
 */
const socialLinks = [
  {
    name: "Instagram",
    href: siteConfig.links.instagram,
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: siteConfig.links.facebook,
    icon: FaFacebook,
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    icon: FaPinterest,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: FaTiktok,
  },
] as const;

/**
 * Contact information interface
 */
interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

/**
 * Footer component props
 */
interface FooterProps {
  contactInfo?: Partial<ContactInfo>;
}

/**
 * Professional Footer component with three-column layout
 */
export function Footer({ contactInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
      throw error;
    }
  };

  return (
    <footer className="w-full bg-[#F2F2F2] text-black">
      <div className="container mx-auto px-3 py-12 sm:px-6 lg:px-8">
        {/* Quote Form Section */}
        <div id="quote-form" className="mb-12 scroll-mt-20">
          <QuoteForm onSubmit={handleFormSubmit} />
        </div>
        <hr className="my-12" />
        {/* Copyright Notice */}
        <div className="border-t border-accent/10 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 text-center text-sm text-black md:flex-row md:space-y-0">
            <p>
              © {currentYear} Mian Visuals. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer">
                    <Icon className="w-5 h-5 text-black" />
                  </a>
                );
              })}
            </div>
            <div className="flex space-x-4">
              <Link
                href="/privacy"
                className="text-black transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <span className="text-black/30">|</span>
              <Link
                href="/terms"
                className="text-black transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
