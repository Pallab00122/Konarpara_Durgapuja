export default function AboutSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            About the puja
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400">
            Replace this block with your mandir or barowari story, mission, and
            what visitors can expect each year.
          </p>
        </div>
        <ul className="space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
          <li className="flex gap-2">
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              When:
            </span>
            <span>Add dates and timings</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              Where:
            </span>
            <span>Add venue and map link</span>
          </li>
          <li className="flex gap-2">
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              All are welcome
            </span>
            <span>Volunteering, prasad, cultural programs</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
