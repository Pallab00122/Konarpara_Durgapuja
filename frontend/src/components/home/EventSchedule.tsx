import Link from "next/link";
import EventCard from "@/components/ui/EventCard";

const sampleDays = [
  { day: "Day 1", title: "Bodhon & Adhivasa", time: "Evening" },
  { day: "Day 2", title: "Panchami / Sasthi", time: "Morning & evening" },
  { day: "Day 3", title: "Saptami", time: "Full day" },
];

export default function EventSchedule() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Event schedule
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Sample rows — replace with your actual calendar.
            </p>
          </div>
          <Link
            href="/events"
            className="text-sm font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
          >
            Full schedule →
          </Link>
        </div>
        <ul className="mt-10 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-900">
          {sampleDays.map((row) => (
            <EventCard
              key={row.day}
              title={row.title}
              dayLabel={row.day}
              time={row.time}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
