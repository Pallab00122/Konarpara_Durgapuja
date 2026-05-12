"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-foreground">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />

        {/* Decorative Pattern */}
        <div className="pattern-overlay absolute inset-0 opacity-30" />

        {/* Animated Floating Elements */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[10%] top-[20%] h-32 w-32 rounded-full bg-accent/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[30%] left-[5%] h-40 w-40 rounded-full bg-primary/20 blur-3xl"
        />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 backdrop-blur-sm"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
          <span className="text-sm font-medium text-accent">
            Sharod Utsav 2025
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-4xl font-bold leading-tight tracking-tight text-background sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-balance">Konarpara</span>
          <br />
          <span className="bg-gradient-to-r from-accent via-accent to-primary bg-clip-text text-transparent">
            Durga Puja
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-background/70 sm:text-xl"
        >
          Join us in celebrating the divine victory of Goddess Durga. Experience
          the rich traditions, cultural programs, and community spirit of our
          village puja.
        </motion.p>

        {/* Event Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-background/80"
        >
          <div className="flex items-center gap-2">
            <FiCalendar className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">October 9 - 13, 2025</span>
          </div>
          <div className="hidden h-4 w-px bg-background/30 sm:block" />
          <div className="flex items-center gap-2">
            <FiMapPin className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium">
              Konarpara Village, West Bengal
            </span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#schedule"
            className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/40"
          >
            View Schedule
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#gallery"
            className="rounded-full border border-background/30 bg-background/5 px-8 py-4 text-sm font-semibold text-background backdrop-blur-sm transition-all hover:border-accent hover:bg-accent/10"
          >
            Explore Gallery
          </Link>
        </motion.div>

        {/* Countdown or Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
        >
          {[
            { value: "50+", label: "Years of Tradition" },
            { value: "5000+", label: "Devotees Annually" },
            { value: "5", label: "Days of Celebration" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-serif text-2xl font-bold text-accent sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-background/60 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FDF8F3"
          />
        </svg>
      </div>
    </section>
  );
}
