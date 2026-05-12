"use client";

import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiUsers, FiHeart } from "react-icons/fi";

const highlights = [
  {
    icon: FiCalendar,
    title: "5 Days Festival",
    description: "From Shashti to Dashami",
  },
  {
    icon: FiMapPin,
    title: "Village Ground",
    description: "Traditional Pandal Setup",
  },
  {
    icon: FiUsers,
    title: "Community Event",
    description: "Open for All Devotees",
  },
  {
    icon: FiHeart,
    title: "Cultural Programs",
    description: "Music, Dance & Drama",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      {/* Background Decoration */}
      <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            About Our Puja
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            <span className="text-balance">A Tradition of Faith &</span>{" "}
            <span className="text-primary">Celebration</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            For over five decades, Konarpara Durga Puja has been the heart of
            our village community, bringing together families in devotion and
            celebration.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-primary via-accent to-transparent" />
              <div className="space-y-4 pl-6">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  Our Heritage
                </h3>
                <p className="text-muted-foreground">
                  Started in 1975 by a group of devoted villagers, our puja has
                  grown from a humble gathering to one of the most celebrated
                  Durga Pujas in the region. Every year, we honor Maa Durga with
                  traditional rituals, artistic pandal decorations, and vibrant
                  cultural programs.
                </p>
                <p className="text-muted-foreground">
                  Our celebration is known for its authentic Bengali traditions,
                  community participation, and the spirit of togetherness that
                  defines our village. From the morning aarti to the evening
                  cultural programs, every moment is filled with devotion and
                  joy.
                </p>
              </div>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Est. 1975
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  50+ Years Legacy
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Highlights Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="font-serif text-lg font-semibold text-card-foreground">
                  {item.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
