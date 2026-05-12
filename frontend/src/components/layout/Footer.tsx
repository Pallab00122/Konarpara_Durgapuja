import Link from "next/link";

const links = [
  { href: "/gallery", label: "Gallery" },
  { href: "/history", label: "History" },
  { href: "/committee", label: "Committee" },
  { href: "/events", label: "Events" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 px-6 py-12 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
            Konarpara Puja
          </p>
          <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
            Add address, contact email, and social links in this footer.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-5xl text-center text-xs text-neutral-500 dark:text-neutral-500">
        © {new Date().getFullYear()} Konarpara Puja. All rights reserved.
      </p>
    </footer>
  );
}
