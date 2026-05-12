"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiPhone, FiMail, FiSend, FiCheck } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message sent successfully!");

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", phone: "", message: "" });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-background" />
      <div className="pattern-overlay absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Get in Touch
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">Contact</span>{" "}
            <span className="text-primary">Us</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Have questions about the puja? Want to volunteer or contribute? Reach
            out to us and we will get back to you soon.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Map Placeholder */}
            <div className="relative h-64 overflow-hidden rounded-2xl border border-border bg-secondary/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="mx-auto h-12 w-12 text-primary/50" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Konarpara Village, West Bengal
                  </p>
                </div>
              </div>
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            </div>

            {/* Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiMapPin className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif font-semibold text-card-foreground">
                  Address
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Konarpara Village, Block - XX, District - West Bengal, PIN -
                  XXXXXX
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <FiPhone className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif font-semibold text-card-foreground">
                  Phone
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  +91 98765 43210
                  <br />
                  +91 98765 43211
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg sm:col-span-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FiMail className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif font-semibold text-card-foreground">
                  Email
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  info@konarparapuja.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-6 lg:p-8"
          >
            <h3 className="font-serif text-xl font-semibold text-card-foreground">
              Send us a Message
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form below and we will respond as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-card-foreground"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-card-foreground"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-card-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="mt-1 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitted ? (
                  <>
                    <FiCheck className="h-5 w-5" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    Sending...
                  </>
                ) : (
                  <>
                    <FiSend className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
