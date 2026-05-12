"use client";

import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

const sponsorTiers = [
  {
    tier: "Title Sponsor",
    amount: "Platinum Partner",
    sponsors: ["Your Business Name Here"],
    featured: true,
  },
  {
    tier: "Gold Sponsors",
    amount: "Major Contributors",
    sponsors: ["Business 1", "Business 2", "Business 3"],
    featured: false,
  },
  {
    tier: "Silver Sponsors",
    amount: "Valued Supporters",
    sponsors: ["Sponsor A", "Sponsor B", "Sponsor C", "Sponsor D"],
    featured: false,
  },
];

const donationTiers = [
  { amount: "501", label: "Pushpanjali", color: "bg-secondary" },
  { amount: "1,001", label: "Bhog Seva", color: "bg-accent/20" },
  { amount: "2,501", label: "Aarti Seva", color: "bg-primary/20" },
  { amount: "5,001+", label: "Maha Seva", color: "bg-gradient-to-r from-primary/30 to-accent/30" },
];

export default function SponsorsSection() {
  return (
    <section
      id="donate"
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
            Support Us
          </span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            <span className="text-balance">Sponsors &</span>{" "}
            <span className="text-primary">Donations</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-muted-foreground">
            Our celebration is made possible by the generous support of our
            sponsors and devotees. Your contribution helps us maintain traditions
            and serve the community.
          </p>
        </motion.div>

        {/* Sponsor Tiers */}
        <div className="mt-12 space-y-6">
          {sponsorTiers.map((tier, index) => (
            <motion.div
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`overflow-hidden rounded-2xl border ${
                tier.featured
                  ? "border-accent bg-gradient-to-r from-accent/10 via-card to-accent/10"
                  : "border-border bg-card"
              } p-6`}
            >
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3
                    className={`font-serif text-lg font-semibold ${
                      tier.featured ? "text-accent" : "text-card-foreground"
                    }`}
                  >
                    {tier.tier}
                  </h3>
                  <p className="text-sm text-muted-foreground">{tier.amount}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {tier.sponsors.map((sponsor, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-center rounded-xl border border-dashed px-6 py-3 text-sm font-medium ${
                        tier.featured
                          ? "border-accent/50 bg-accent/10 text-accent"
                          : "border-border bg-secondary/50 text-muted-foreground"
                      }`}
                    >
                      {sponsor}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Donation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Make a Donation
            </h3>
            <p className="mt-2 text-muted-foreground">
              Every contribution, big or small, helps us celebrate with devotion
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {donationTiers.map((tier, index) => (
              <motion.button
                key={tier.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-2xl border border-border ${tier.color} p-6 text-center transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10`}
              >
                <p className="font-serif text-2xl font-bold text-foreground">
                  ₹{tier.amount}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {tier.label}
                </p>
                <div className="mt-4 flex items-center justify-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <FiHeart className="h-3 w-3" />
                  <span>Click to Donate</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Bank Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border border-border bg-card p-6"
          >
            <h4 className="font-serif text-lg font-semibold text-card-foreground">
              Bank Transfer Details
            </h4>
            <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-muted-foreground">Account Name</p>
                <p className="font-medium text-card-foreground">
                  Konarpara Durga Puja Committee
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Bank</p>
                <p className="font-medium text-card-foreground">
                  State Bank of India
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Account No</p>
                <p className="font-medium text-card-foreground">
                  XXXXXXXXXXXX
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">IFSC Code</p>
                <p className="font-medium text-card-foreground">SBIN0XXXXXX</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Become a Sponsor CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-primary-foreground"
        >
          <h3 className="font-serif text-xl font-semibold">
            Interested in Sponsorship?
          </h3>
          <p className="mt-2 text-primary-foreground/80">
            Partner with us and get your business featured during the festival.
            Contact us for sponsorship opportunities.
          </p>
          <a
            href="tel:+919876543210"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-background/90 hover:shadow-lg"
          >
            Contact: +91 98765 43210
          </a>
        </motion.div>
      </div>
    </section>
  );
}
