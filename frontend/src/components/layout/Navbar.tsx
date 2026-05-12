import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/history", label: "History" },
  { href: "/committee", label: "Committee" },
  { href: "/events", label: "Events" },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-50"
        >
          Konarpara Puja
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-neutral-600 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
