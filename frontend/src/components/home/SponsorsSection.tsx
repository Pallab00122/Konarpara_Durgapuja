const tiers = [
  { label: "Title sponsor", width: "max-w-xs" },
  { label: "Gold", width: "max-w-[5rem]" },
  { label: "Silver", width: "max-w-[5rem]" },
  { label: "Friends", width: "max-w-[5rem]" },
];

export default function SponsorsSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Sponsors & supporters
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Logo strip — drop in SVG/PNG assets or partner names by tier.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          {tiers.map((t) => (
            <div
              key={t.label}
              className={`flex h-16 ${t.width} flex-1 items-center justify-center rounded-lg border border-dashed border-neutral-300 px-4 text-center text-xs font-medium text-neutral-500 dark:border-neutral-700 dark:text-neutral-400`}
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
