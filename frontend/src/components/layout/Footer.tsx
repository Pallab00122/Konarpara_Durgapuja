"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiFacebook,
  FiInstagram,
  FiYoutube,
} from "react-icons/fi";

const quickLinks = [
  { href: "#about", label: "About Us" },
  { href: "#gallery", label: "Photo Gallery" },
  { href: "#schedule", label: "Event Schedule" },
  { href: "#committee", label: "Committee" },
  { href: "#donate", label: "Donate" },
] as const;

const socialLinks = [
  { href: "#", icon: FiFacebook, label: "Facebook" },
  { href: "#", icon: FiInstagram, label: "Instagram" },
  { href: "#", icon: FiYoutube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-foreground text-background">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="footerPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footerPattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-2">
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
                <span className="font-serif text-lg font-semibold leading-tight">
                  Konarpara
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-accent">
                  Durga Puja
                </span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-background/70">
              Celebrating tradition, faith, and community spirit. Join us in
              honoring Maa Durga with devotion and festivity.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-serif text-lg font-semibold text-accent">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-background/70 transition-colors hover:text-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-serif text-lg font-semibold text-accent">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-background/70">
                <FiMapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>Konarpara Village, West Bengal, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <FiPhone className="h-4 w-4 shrink-0 text-accent" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <FiMail className="h-4 w-4 shrink-0 text-accent" />
                <span>info@konarparapuja.com</span>
              </li>
            </ul>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-serif text-lg font-semibold text-accent">
              Follow Us
            </h3>
            <div className="mt-4 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 text-background transition-all hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-background/70">
              Stay updated with the latest news and announcements about Durga
              Puja celebrations.
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-background/50">
            {new Date().getFullYear()} Konarpara Durga Puja Committee. All
            rights reserved.
          </p>
          <p className="text-center text-xs text-background/50">
            Made with devotion for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
