"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiImage } from "react-icons/fi";

const galleryImages = [
  {
    id: 1,
    title: "Durga Idol",
    category: "Pratima",
    aspect: "aspect-[4/5]",
    gradient: "from-primary/60 to-accent/40",
  },
  {
    id: 2,
    title: "Pandal Decoration",
    category: "Pandal",
    aspect: "aspect-square",
    gradient: "from-accent/60 to-primary/40",
  },
  {
    id: 3,
    title: "Dhunuchi Naach",
    category: "Rituals",
    aspect: "aspect-[4/3]",
    gradient: "from-foreground/60 to-primary/40",
  },
  {
    id: 4,
    title: "Cultural Program",
    category: "Events",
    aspect: "aspect-[3/4]",
    gradient: "from-primary/50 to-foreground/50",
  },
  {
    id: 5,
    title: "Sindoor Khela",
    category: "Traditions",
    aspect: "aspect-square",
    gradient: "from-primary/70 to-accent/30",
  },
  {
    id: 6,
    title: "Community Feast",
    category: "Bhog",
    aspect: "aspect-[4/3]",
    gradient: "from-accent/50 to-foreground/50",
  },
];

export default function GalleryPreview() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-secondary/50 px-4 py-20 sm:px-6 lg:py-28"
    >
      {/* Background Pattern */}
      <div className="pattern-overlay absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
              Photo Gallery
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              <span className="text-balance">Memories from</span>{" "}
              <span className="text-primary">Past Celebrations</span>
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
              Relive the beautiful moments from our previous Durga Puja
              celebrations. Each year brings new memories and blessings.
            </p>
          </div>
          <Link
            href="/gallery"
            className="group flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            View All Photos
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                index === 0 ? "sm:row-span-2" : ""
              } ${index === 3 ? "hidden sm:block" : ""}`}
            >
              {/* Placeholder with Gradient */}
              <div
                className={`${image.aspect} w-full bg-gradient-to-br ${image.gradient} transition-transform duration-500 group-hover:scale-110`}
              >
                {/* Decorative Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <FiImage className="h-16 w-16 text-background" />
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                <span className="text-xs font-medium uppercase tracking-wider text-accent">
                  {image.category}
                </span>
                <h3 className="mt-1 font-serif text-lg font-semibold text-background">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 rounded-2xl border border-border bg-card p-6 sm:gap-16"
        >
          {[
            { value: "500+", label: "Photos" },
            { value: "50", label: "Years Documented" },
            { value: "100+", label: "Events Captured" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-serif text-2xl font-bold text-primary">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
