import Link from "next/link";
import CommitteeCard from "@/components/ui/CommitteeCard";

const sampleRoles = [
  { name: "Name", role: "President" },
  { name: "Name", role: "Secretary" },
  { name: "Name", role: "Treasurer" },
];

export default function CommitteeSection() {
  return (
    <section className="border-t border-neutral-200 bg-neutral-50 px-6 py-16 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
              Committee
            </h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Placeholder names — update with your organizing team.
            </p>
          </div>
          <Link
            href="/committee"
            className="text-sm font-medium text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-100"
          >
            Meet the team →
          </Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {sampleRoles.map((m) => (
            <CommitteeCard key={m.role} name={m.name} role={m.role} />
          ))}
        </div>
      </div>
    </section>
  );
}
