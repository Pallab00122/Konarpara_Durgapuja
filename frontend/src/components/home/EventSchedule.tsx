"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiMusic, FiStar } from "react-icons/fi";

const pujaSchedule = [
  {
    day: "Day 1",
    date: "October 9",
    title: "Maha Shashti",
    titleBn: "মহা ষষ্ঠী",
    events: [
      { time: "6:00 AM", name: "Bodhon & Amantran", icon: FiStar },
      { time: "5:00 PM", name: "Adhivas", icon: FiStar },
      { time: "7:00 PM", name: "Sandhya Aarti", icon: FiStar },
    ],
    highlight: "Beginning of the Festival",
  },
  {
    day: "Day 2",
    date: "October 10",
    title: "Maha Saptami",
    titleBn: "মহা সপ্তমী",
    events: [
      { time: "5:00 AM", name: "Nabapatrika Snan", icon: FiStar },
      { time: "8:00 AM", name: "Saptami Puja", icon: FiStar },
      { time: "6:00 PM", name: "Cultural Program", icon: FiMusic },
    ],
    highlight: "Nabapatrika Ceremony",
  },
  {
    day: "Day 3",
    date: "October 11",
    title: "Maha Ashtami",
    titleBn: "মহা অষ্টমী",
    events: [
      { time: "6:00 AM", name: "Pushpanjali", icon: FiStar },
      { time: "12:00 PM", name: "Sandhi Puja", icon: FiStar },
      { time: "7:00 PM", name: "Dhunuchi Naach", icon: FiMusic },
    ],
    highlight: "Kumari Puja & Sandhi Puja",
  },
  {
    day: "Day 4",
    date: "October 12",
    title: "Maha Nabami",
    titleBn: "মহা নবমী",
    events: [
      { time: "7:00 AM", name: "Nabami Puja", icon: FiStar },
      { time: "1:00 PM", name: "Bhog Distribution", icon: FiStar },
      { time: "8:00 PM", name: "Grand Cultural Night", icon: FiMusic },
    ],
    highlight: "Maha Aarti",
  },
  {
    day: "Day 5",
    date: "October 13",
    title: "Bijoya Dashami",
    titleBn: "বিজয়া দশমী",
    events: [
      { time: "8:00 AM", name: "Dashami Puja", icon: FiStar },
      { time: "11:00 AM", name: "Sindoor Khela", icon: FiStar },
      { time: "4:00 PM", name: "Bisarjan Procession", icon: FiStar },
    ],
    highlight: "Sindoor Khela & Visarjan",
  },
];

export default function EventSchedule() {
  return (
    <section id="schedule" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:py-28">
      {/* Background Decoration */}
      <div className="absolute right-0 top-1/4 h-96 w-96 translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Event Schedule
            </span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">
              <span className="text-balance">Puja Schedule</span>{" "}
              <span className="text-primary">2025</span>
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
              Five days of devotion, celebration, and community bonding. Join us
              for every moment of this sacred festival.
            </p>
          </div>
          <Link
            href="/events"
            className="group flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            Full Schedule
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Schedule Cards */}
        <div className="mt-12 space-y-4">
          {pujaSchedule.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Day Header */}
                <div className="flex items-center gap-4 border-b border-border bg-secondary/50 p-4 lg:w-64 lg:flex-col lg:items-start lg:justify-center lg:border-b-0 lg:border-r lg:p-6">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-1">
                    <span className="text-sm font-semibold text-primary">
                      {day.day}
                    </span>
                    <span className="text-xs text-muted-foreground lg:text-sm">
                      {day.date}
                    </span>
                  </div>
                  <div className="lg:mt-2">
                    <h3 className="font-serif text-lg font-bold text-card-foreground lg:text-xl">
                      {day.title}
                    </h3>
                    <p className="text-sm text-accent">{day.titleBn}</p>
                  </div>
                </div>

                {/* Events */}
                <div className="flex-1 p-4 lg:p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <FiClock className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Schedule
                    </span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {day.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="flex items-center gap-3 rounded-xl bg-secondary/50 p-3 transition-colors group-hover:bg-secondary"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <event.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">
                            {event.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {event.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="text-xs font-medium text-accent">
                      Highlight: {day.highlight}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
