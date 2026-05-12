import Link from "next/link";

const placeholders = Array.from({ length: 6 }, (_, i) => i);

export default function GalleryPreview() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50 px-6 py-16 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Gallery preview
            </h2>
            <p className="mt-2 max-w-xl text-neutral-600 dark:text-neutral-400">
              Thumbnail grid — wire to real images or a CMS when ready.
            </p>
          </div>
          <Link
            href="/gallery"
            className="text-sm font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
          >
            See all photos →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {placeholders.map((i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-lg border border-dashed border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900"
              aria-hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}
