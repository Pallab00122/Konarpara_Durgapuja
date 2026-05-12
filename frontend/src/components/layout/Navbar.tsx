"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const nav = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#schedule", label: "Schedule" },
  { href: "#committee", label: "Committee" },
  { href: "#contact", label: "Contact" },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-semibold leading-tight text-foreground">
              Konarpara
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-primary">
              Durga Puja
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {label}
            </Link>
          ))}
          <Link
            href="#donate"
            className="ml-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg"
          >
            Donate
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/50 bg-background md:hidden"
          >
            <nav className="flex flex-col gap-1 p-4">
              {nav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="#donate"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-lg bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Donate
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
