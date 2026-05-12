"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiPhone, FiUser } from "react-icons/fi";

const committeeMembers = [
  {
    name: "Sri Ramesh Mondal",
    role: "President",
    phone: "+91 98765 43210",
    image: null,
  },
  {
    name: "Sri Bikash Ghosh",
    role: "Vice President",
    phone: "+91 98765 43211",
    image: null,
  },
  {
    name: "Sri Subir Das",
    role: "Secretary",
    phone: "+91 98765 43212",
    image: null,
  },
  {
    name: "Sri Arun Sarkar",
    role: "Joint Secretary",
    phone: "+91 98765 43213",
    image: null,
  },
  {
    name: "Sri Tapas Biswas",
    role: "Treasurer",
    phone: "+91 98765 43214",
    image: null,
  },
  {
    name: "Sri Pranab Roy",
    role: "Cultural Secretary",
    phone: "+91 98765 43215",
    image: null,
  },
];

export default function CommitteeSection() {
  return (
    <section
      id="committee"
      className="relative overflow-hidden bg-foreground px-4 py-20 text-background sm:px-6 lg:py-28"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="pattern-overlay h-full w-full" />
      </div>
      <div className="absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />

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
              Our Team
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
              <span className="text-balance">Puja Committee</span>{" "}
              <span className="text-accent">2025</span>
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-background/70">
              Meet the dedicated volunteers who work tirelessly to make our
              Durga Puja celebration a grand success every year.
            </p>
          </div>
          <Link
            href="/committee"
            className="group flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-accent transition-colors hover:text-accent/80"
          >
            View Full Team
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Committee Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {committeeMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-background/10"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-background">
                  <FiUser className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-background">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-accent">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-4 flex items-center gap-2 text-sm text-background/60">
                <FiPhone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -bottom-4 -right-4 h-16 w-16 rounded-tl-3xl bg-accent/10 transition-all group-hover:h-20 group-hover:w-20" />
            </motion.div>
          ))}
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-accent/30 bg-accent/10 p-8 text-center backdrop-blur-sm"
        >
          <h3 className="font-serif text-xl font-semibold text-background">
            Want to Volunteer?
          </h3>
          <p className="mt-2 text-background/70">
            Join our team and be a part of this sacred celebration. We welcome
            volunteers for various activities.
          </p>
          <Link
            href="#contact"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-accent/90 hover:shadow-lg"
          >
            Contact Us
            <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
