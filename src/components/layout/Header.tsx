"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "../shared/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/packages", label: "Packages" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
] as const;

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  /**
   * Handle scroll behavior for header visibility
   */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide header when scrolling past 100px, show only at top
      if (currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  /**
   * Scroll to footer form
   */
  const scrollToQuoteForm = () => {
    setIsMobileMenuOpen(false);
    const quoteForm = document.getElementById("quote-form");
    if (quoteForm) {
      quoteForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 w-full"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 backdrop-blur-sm border-b bg-transparent border-white/5" />

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center space-x-3">
            <div className="relative h-12 w-24">
              <Image
                src="/images/logo.png"
                alt="Mian Visuals"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Right side - Navigation + CTA Button + Menu Button */}
          <div className="flex items-center space-x-6 lg:space-x-8">
            {/* Desktop Navigation - Right aligned */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    className="relative group py-2"
                  >
                    <span className={cn(
                      "text-sm font-light tracking-wide transition-colors duration-300",
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    )}>
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-white"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button - Hidden on mobile */}
            <div className="hidden md:block">
              <Button 
                variant="secondary" 
                size="small" 
                onClick={scrollToQuoteForm}
                className="border-2 border-white/30 text-sm font-light tracking-wide text-white backdrop-blur-sm hover:border-primary"
              >
                Book An Appointment
              </Button>
            </div>

            {/* Menu Button - Always visible */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative z-50 w-10 h-10 flex flex-col items-center justify-center space-y-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
                className="w-6 h-px bg-white"
              />
              <motion.span
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                className="w-6 h-px bg-white"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
                className="w-6 h-px bg-white"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-black border-l border-white/10 z-50"
            >
              <div className="flex flex-col h-full p-8 pt-28">
                {/* Navigation Links */}
                <div className="flex-1 space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = isActiveLink(link.href);
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <Link
                          href={link.href}
                          prefetch={true}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "block py-4 px-4 text-xl font-light tracking-wide transition-all duration-300 rounded-lg border border-transparent",
                            isActive
                              ? "text-white bg-primary/10 border-primary/20"
                              : "text-white/70 hover:text-white hover:bg-white/5 hover:border-white/10"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
                  className="mt-8"
                >
                  <Button 
                    variant="primary" 
                    size="large" 
                    fullWidth 
                    onClick={scrollToQuoteForm}
                    className="text-base font-medium tracking-wide"
                  >
                    Book An Appointment
                  </Button>
                </motion.div>

                {/* Close indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-center"
                >
                  <span className="text-xs text-white/40 uppercase tracking-widest">
                    Tap anywhere to close
                  </span>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}