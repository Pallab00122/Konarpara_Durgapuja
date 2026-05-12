import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="border-b border-neutral-200 bg-gradient-to-b from-neutral-50 to-white px-6 py-20 dark:border-neutral-800 dark:from-neutral-950 dark:to-neutral-900">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          Konarpara Puja
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl dark:text-neutral-50">
          Celebrate tradition with the community
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
          Dates, events, and highlights for this year&apos;s festivities — swap
          this copy for your own welcome message.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/events"
            className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white"
          >
            View schedule
          </Link>
          <Link
            href="/gallery"
            className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
