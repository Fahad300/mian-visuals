"use client";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaPinterest, FaTiktok } from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { InstagramFeed } from "@/components/footer/InstagramFeed";

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

  // Default contact information (can be overridden via props)
  const contact: ContactInfo = {
    email: contactInfo?.email || "hello@mianvisuals.com",
    phone: contactInfo?.phone || "+1 (555) 123-4567",
    location: contactInfo?.location || "New York, NY",
  };

  return (
    <footer className="w-full border-t border-light-dark bg-secondary text-accent">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Identity, Social Media, and Contact */}
          <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <div className="relative h-20 w-20 transition-opacity hover:opacity-80">
                <Image
                  src="/images/logo.png"
                  alt="Mian Visuals Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.name} page`}
                    className={cn(
                      "group flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-all duration-300",
                      "hover:bg-primary-dark hover:scale-110"
                    )}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </a>
                );
              })}
            </div>

            {/* Contact Information */}
            <div className="space-y-2 text-sm text-accent">
              <div className="flex items-start space-x-2 text-accent">
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-accent">{contact.location}</span>
              </div>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center space-x-2 text-accent transition-colors hover:text-primary"
              >
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="break-all text-accent">{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="flex items-center space-x-2 text-accent transition-colors hover:text-primary"
              >
                <svg
                  className="h-4 w-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="text-accent">{contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Column 2: About */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold italic text-accent">
              About
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-sm text-accent/80 transition-colors hover:text-primary"
              >
                Our Story
              </Link>
              <Link
                href="/about#faq"
                className="text-sm text-accent/80 transition-colors hover:text-primary"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-sm text-accent/80 transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3: Our Work */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold italic text-primary">
              Our Work
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/portfolio"
                className="text-sm text-accent/80 transition-colors hover:text-primary"
              >
                Portfolio
              </Link>
              <Link
                href="/portfolio#galleries"
                className="text-sm text-accent/80 transition-colors hover:text-primary"
              >
                Galleries
              </Link>
              <Link
                href="/reviews"
                className="text-sm text-accent/80 transition-colors hover:text-primary"
              >
                Testimonials
              </Link>
            </nav>
          </div>

          {/* Column 4: Instagram */}
          <div>
            <InstagramFeed />
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-12 border-t border-accent/10 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 text-center text-sm text-accent/60 md:flex-row md:space-y-0">
            <p>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/privacy"
                className="transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <span className="text-accent/30">|</span>
              <Link
                href="/terms"
                className="transition-colors hover:text-primary"
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
